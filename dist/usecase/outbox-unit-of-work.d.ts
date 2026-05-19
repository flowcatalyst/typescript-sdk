/**
 * OutboxUnitOfWork — UnitOfWork that dispatches events via the outbox table.
 *
 * `commit()` builds a `CreateEventDto` from the DomainEvent and routes it
 * through `OutboxManager`. The fc-outbox-processor then forwards it to the
 * FlowCatalyst platform. For true atomicity with your entity writes, wrap
 * both the `persist` callback and this commit in a single DB transaction
 * using a tx-aware `OutboxDriver`.
 */
import { OutboxManager } from "../outbox/outbox-manager.js";
import type { OutboxDriver } from "../outbox/types.js";
import type { DomainEvent as DomainEventType } from "./domain-event.js";
import { Result } from "./result.js";
import type { Aggregate, UnitOfWork } from "./unit-of-work.js";
export interface OutboxUnitOfWorkOptions {
    /** Emit an audit log alongside every event. Default: false. */
    auditEnabled?: boolean;
    /** Principal ID used in audit logs when the event doesn't carry one. */
    fallbackPrincipalId?: string;
}
export interface OutboxUnitOfWorkConfig {
    outboxManager: OutboxManager;
    options?: OutboxUnitOfWorkOptions;
}
export declare class OutboxUnitOfWork implements UnitOfWork {
    private readonly outboxManager;
    private readonly auditEnabled;
    private readonly fallbackPrincipalId;
    constructor(config: OutboxUnitOfWorkConfig);
    /**
     * Convenience: build from a raw driver + clientId.
     */
    static fromDriver(driver: OutboxDriver, clientId: string, options?: OutboxUnitOfWorkOptions): OutboxUnitOfWork;
    commit<T extends DomainEventType>(event: T, command: unknown, persist?: () => Promise<void>): Promise<Result<T>>;
    commitAggregate<T extends DomainEventType>(_aggregate: Aggregate, event: T, command: unknown, persist?: () => Promise<void>): Promise<Result<T>>;
    commitDelete<T extends DomainEventType>(_aggregate: Aggregate, event: T, command: unknown, persist?: () => Promise<void>): Promise<Result<T>>;
    emitEvent<T extends DomainEventType>(event: T, command: unknown): Promise<Result<T>>;
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
     * Mirrors the Rust SDK's `OutboxUnitOfWork::run` and the platform crate's
     * `PgUnitOfWork::run` so apps and platform follow one orchestration shape.
     */
    run<T extends DomainEventType>(callback: (session: TxScopedOutboxUnitOfWork) => Promise<Result<T>>): Promise<Result<T>>;
    private doCommit;
    private toEventDto;
    private toAuditDto;
    private parseData;
}
interface TxScopedConfig {
    outboxManager: OutboxManager;
    tx: unknown;
    auditEnabled: boolean;
    fallbackPrincipalId: string;
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
export declare class TxScopedOutboxUnitOfWork implements UnitOfWork {
    private readonly outboxManager;
    private readonly tx;
    private readonly auditEnabled;
    private readonly fallbackPrincipalId;
    constructor(config: TxScopedConfig);
    commit<T extends DomainEventType>(event: T, command: unknown, persist?: () => Promise<void>): Promise<Result<T>>;
    commitAggregate<T extends DomainEventType>(_aggregate: Aggregate, event: T, command: unknown, persist?: () => Promise<void>): Promise<Result<T>>;
    commitDelete<T extends DomainEventType>(_aggregate: Aggregate, event: T, command: unknown, persist?: () => Promise<void>): Promise<Result<T>>;
    emitEvent<T extends DomainEventType>(event: T, command: unknown): Promise<Result<T>>;
    /**
     * Invoke the callback with the underlying transaction handle so the
     * caller can run ad-hoc writes (raw SQL, repository methods, etc.) on
     * the same tx as the outbox rows. Throws propagate to trigger rollback
     * of the entire `run` block.
     */
    withTx<R>(callback: (tx: unknown) => Promise<R>): Promise<R>;
    private doCommit;
}
export {};
//# sourceMappingURL=outbox-unit-of-work.d.ts.map