/**
 * OutboxUnitOfWork — UnitOfWork that dispatches events via the outbox table.
 *
 * `commit()` builds a `CreateEventDto` from the DomainEvent and routes it
 * through `OutboxManager`. The outbox poller then forwards it to the
 * FlowCatalyst platform. For true atomicity with your entity writes, wrap
 * both the `persist` callback and this commit in a single DB transaction
 * using a tx-aware `OutboxDriver`.
 */
import { OutboxManager } from "../outbox/outbox-manager.js";
import { CreateEventDto } from "../outbox/create-event-dto.js";
import { CreateAuditLogDto } from "../outbox/create-audit-log-dto.js";
import { DomainEvent } from "./domain-event.js";
import { UseCaseError } from "./errors.js";
import { isSuccess, RESULT_SUCCESS_TOKEN, Result, } from "./result.js";
export class OutboxUnitOfWork {
    constructor(config) {
        this.outboxManager = config.outboxManager;
        this.auditEnabled = config.options?.auditEnabled ?? false;
        this.fallbackPrincipalId =
            config.options?.fallbackPrincipalId ?? "system";
        this.applicationCode = config.options?.applicationCode;
        this.clientCode = config.options?.clientCode;
    }
    /**
     * Convenience: build from a raw driver + clientId.
     */
    static fromDriver(driver, clientId, options) {
        return new OutboxUnitOfWork({
            outboxManager: new OutboxManager(driver, clientId),
            options,
        });
    }
    async commit(event, command, persist) {
        return this.doCommit(event, command, persist);
    }
    async commitAggregate(_aggregate, event, command, persist) {
        // The aggregate arg is kept for API parity with the platform UnitOfWork;
        // persistence is the caller's responsibility via `persist`.
        return this.doCommit(event, command, persist);
    }
    async commitDelete(_aggregate, event, command, persist) {
        return this.doCommit(event, command, persist);
    }
    async emitEvent(event, command) {
        return this.doCommit(event, command);
    }
    /**
     * Run a callback inside a single application-orchestrated transaction.
     *
     * Opens a tx on the underlying driver (via `OutboxDriver.withTransaction`),
     * builds a {@link TxScopedOutboxUnitOfWork} bound to that tx, and passes
     * it to the callback. Every outbox write performed against the session —
     * plus any ad-hoc writes the callback makes via `session.withTx(...)` —
     * commits atomically when the callback resolves, or rolls back if it
     * throws or returns a failed `Result`.
     *
     * Requires the underlying driver to implement `withTransaction` (the
     * bundled `PgOutboxDriver` does). Throws at runtime if it doesn't.
     *
     * ```ts
     * const result = await uow.run(async (session) => {
     *   await session.withTx(async (tx) => {
     *     await orderRepo.save(order, tx);
     *   });
     *   return await session.commit(orderShippedEvent, command);
     * });
     * ```
     *
     * Mirrors the platform's own unit-of-work orchestration so apps and
     * platform follow one orchestration shape.
     */
    async run(callback) {
        const driver = this.outboxManager.getDriver();
        if (!driver.withTransaction) {
            return Result.failure(UseCaseError.infrastructure("DRIVER_NOT_TX_AWARE", "OutboxUnitOfWork.run requires a driver with withTransaction (e.g. PgOutboxDriver)"));
        }
        try {
            return await driver.withTransaction(async (tx) => {
                const session = new TxScopedOutboxUnitOfWork({
                    outboxManager: this.outboxManager,
                    tx,
                    auditEnabled: this.auditEnabled,
                    fallbackPrincipalId: this.fallbackPrincipalId,
                    applicationCode: this.applicationCode,
                    clientCode: this.clientCode,
                });
                const result = await callback(session);
                if (!isSuccess(result)) {
                    // Throw to trigger rollback; the original Result is preserved
                    // via the OutboxRunRollback envelope we catch below.
                    throw new OutboxRunRollback(result);
                }
                return result;
            });
        }
        catch (err) {
            if (err instanceof OutboxRunRollback) {
                return err.result;
            }
            const message = err instanceof Error ? err.message : String(err);
            return Result.failure(UseCaseError.infrastructure("COMMIT_FAILED", message, {
                cause: message,
            }));
        }
    }
    async doCommit(event, command, persist) {
        try {
            if (persist) {
                await persist();
            }
            await this.outboxManager.createEvent(this.toEventDto(event));
            if (this.auditEnabled) {
                await this.outboxManager.createAuditLog(this.toAuditDto(event, command));
            }
            return Result.success(RESULT_SUCCESS_TOKEN, event);
        }
        catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            return Result.failure(UseCaseError.infrastructure("COMMIT_FAILED", message, {
                cause: message,
            }));
        }
    }
    toEventDto(event) {
        return toEventDtoFor(event, this.clientCode);
    }
    toAuditDto(event, command) {
        return toAuditDtoFor(event, command, this.fallbackPrincipalId, this.applicationCode, this.clientCode);
    }
}
/**
 * UnitOfWork implementation bound to a single, externally-orchestrated
 * transaction opened by {@link OutboxUnitOfWork.run}.
 *
 * Every outbox write performed against this session — events, audit logs —
 * joins the same transaction. The session does NOT commit the tx; the
 * surrounding `run` does (on success) or rolls back (on failure or throw).
 *
 * Use {@link TxScopedOutboxUnitOfWork.withTx} for ad-hoc writes that need
 * to be atomic with the outbox rows (e.g. updating a non-aggregate row).
 */
export class TxScopedOutboxUnitOfWork {
    constructor(config) {
        this.outboxManager = config.outboxManager;
        this.tx = config.tx;
        this.auditEnabled = config.auditEnabled;
        this.fallbackPrincipalId = config.fallbackPrincipalId;
        this.applicationCode = config.applicationCode;
        this.clientCode = config.clientCode;
    }
    async commit(event, command, persist) {
        return this.doCommit(event, command, persist);
    }
    async commitAggregate(_aggregate, event, command, persist) {
        return this.doCommit(event, command, persist);
    }
    async commitDelete(_aggregate, event, command, persist) {
        return this.doCommit(event, command, persist);
    }
    async emitEvent(event, command) {
        return this.doCommit(event, command);
    }
    /**
     * Invoke the callback with the underlying transaction handle so the
     * caller can run ad-hoc writes (raw SQL, repository methods, etc.) on
     * the same tx as the outbox rows. Throws propagate to trigger rollback
     * of the entire `run` block.
     */
    async withTx(callback) {
        return callback(this.tx);
    }
    async doCommit(event, command, persist) {
        try {
            if (persist) {
                await persist();
            }
            const eventDto = toEventDtoFor(event, this.clientCode);
            await this.outboxManager.createEvent(eventDto, this.tx);
            if (this.auditEnabled) {
                const auditDto = toAuditDtoFor(event, command, this.fallbackPrincipalId, this.applicationCode, this.clientCode);
                await this.outboxManager.createAuditLog(auditDto, this.tx);
            }
            return Result.success(RESULT_SUCCESS_TOKEN, event);
        }
        catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            return Result.failure(UseCaseError.infrastructure("COMMIT_FAILED", message, {
                cause: message,
            }));
        }
    }
}
// ─── Internal helpers ────────────────────────────────────────────────────────
/**
 * Thrown by `OutboxUnitOfWork.run` to surface a failed `Result` past the
 * driver's `withTransaction` so the tx rolls back. Caught and unwrapped
 * inside `run` — never escapes the SDK.
 */
class OutboxRunRollback extends Error {
    constructor(result) {
        super("OutboxUnitOfWork.run: rolling back transaction");
        this.result = result;
    }
}
const parseDataLocal = (json) => {
    try {
        const parsed = JSON.parse(json);
        return typeof parsed === "object" && parsed !== null ? parsed : {};
    }
    catch {
        return {};
    }
};
const toEventDtoFor = (event, clientCode) => {
    let dto = CreateEventDto.create(event.eventType, parseDataLocal(event.toDataJson()))
        .withSource(event.source)
        .withSubject(event.subject)
        .withCorrelationId(event.correlationId)
        .withMessageGroup(event.messageGroup)
        .withDeduplicationId(`${event.eventType}-${event.eventId}`)
        .withContextData([
        { key: "principalId", value: event.principalId },
        { key: "executionId", value: event.executionId },
        {
            key: "aggregateType",
            value: DomainEvent.extractAggregateType(event.subject),
        },
    ]);
    if (event.causationId) {
        dto = dto.withCausationId(event.causationId);
    }
    // Client linkage (the platform resolves the code → client_id at ingest).
    if (clientCode) {
        dto = dto.withClientCode(clientCode);
    }
    return dto;
};
const toAuditDtoFor = (event, command, fallbackPrincipalId, applicationCode, clientCode) => {
    const entityId = DomainEvent.extractEntityId(event.subject) ?? "";
    const entityType = DomainEvent.extractAggregateType(event.subject);
    const operation = event.eventType.split(":").pop() ?? "unknown";
    const operationData = command && typeof command === "object"
        ? command
        : { command };
    let dto = CreateAuditLogDto.create(entityType, entityId, operation)
        .withOperationData(operationData)
        .withPrincipalId(event.principalId || fallbackPrincipalId)
        .withCorrelationId(event.correlationId)
        .withSource(event.source)
        .withPerformedAt(event.time);
    // Application + client linkage (client-centric platform).
    if (applicationCode) {
        dto = dto.withApplicationCode(applicationCode);
    }
    if (clientCode) {
        dto = dto.withClientCode(clientCode);
    }
    return dto;
};
