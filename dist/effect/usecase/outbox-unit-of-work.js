/**
 * `OutboxUnitOfWork.layer` — Effect Layer for the `UnitOfWork` Tag, backed by
 * the existing `OutboxManager`. Same semantics as the neverthrow
 * `OutboxUnitOfWork` in `src/usecase/outbox-unit-of-work.ts`; the difference
 * is that success is produced as a `Sealed<E>`.
 */
import { Effect, Layer } from "effect";
import { CreateAuditLogDto } from "../../outbox/create-audit-log-dto.js";
import { CreateEventDto } from "../../outbox/create-event-dto.js";
import { OutboxManager } from "../../outbox/outbox-manager.js";
import { DomainEvent as DomainEventUtils, } from "../../usecase/domain-event.js";
import { InfrastructureError } from "./errors.js";
import { seal } from "./seal.js";
import { UnitOfWork } from "./unit-of-work.js";
const parseJson = (json) => {
    try {
        const v = JSON.parse(json);
        return typeof v === "object" && v !== null
            ? v
            : {};
    }
    catch {
        return {};
    }
};
const toEventDto = (event) => {
    let dto = CreateEventDto.create(event.eventType, parseJson(event.toDataJson()))
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
            value: DomainEventUtils.extractAggregateType(event.subject),
        },
    ]);
    if (event.causationId)
        dto = dto.withCausationId(event.causationId);
    return dto;
};
const toAuditDto = (event, command, fallbackPrincipalId) => {
    const entityId = DomainEventUtils.extractEntityId(event.subject) ?? "";
    const entityType = DomainEventUtils.extractAggregateType(event.subject);
    const operation = event.eventType.split(":").pop() ?? "unknown";
    const operationData = command && typeof command === "object"
        ? command
        : { command };
    return CreateAuditLogDto.create(entityType, entityId, operation)
        .withOperationData(operationData)
        .withPrincipalId(event.principalId || fallbackPrincipalId)
        .withCorrelationId(event.correlationId)
        .withSource(event.source)
        .withPerformedAt(event.time);
};
/**
 * Build a `UnitOfWork` Layer backed by an existing `OutboxManager`.
 *
 * @example
 * ```ts
 * import { OutboxManager } from "@flowcatalyst/sdk";
 * import { OutboxUnitOfWork } from "@flowcatalyst/sdk/effect/usecase";
 *
 * const outboxManager = new OutboxManager(driver, clientId);
 * const Live = OutboxUnitOfWork.layer(outboxManager, { auditEnabled: true });
 * ```
 */
export const layer = (outboxManager, options) => {
    const auditEnabled = options?.auditEnabled ?? false;
    const fallbackPrincipalId = options?.fallbackPrincipalId ?? "system";
    const doCommit = (event, command, persist) => Effect.tryPromise({
        try: async () => {
            if (persist)
                await persist();
            await outboxManager.createEvent(toEventDto(event));
            if (auditEnabled) {
                await outboxManager.createAuditLog(toAuditDto(event, command, fallbackPrincipalId));
            }
            return seal(event);
        },
        catch: (e) => new InfrastructureError({
            code: "COMMIT_FAILED",
            message: e instanceof Error ? e.message : String(e),
        }),
    });
    return Layer.succeed(UnitOfWork, {
        commit: doCommit,
        commitDelete: (_aggregate, event, command, persist) => doCommit(event, command, persist),
        emitEvent: (event, command) => doCommit(event, command),
    });
};
/** Build a Layer from a raw driver + `clientId`. */
export const layerFromDriver = (driver, clientId, options) => layer(new OutboxManager(driver, clientId), options);
