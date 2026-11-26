/**
 * `PgOutboxDriver` — outbox driver for node-postgres-compatible clients.
 *
 * Works with anything that exposes the minimal `query(text, params)` shape:
 * `pg.Pool`, `pg.PoolClient`, and Drizzle's underlying client (accessible via
 * `db.$client` on node-postgres-backed Drizzle instances). No hard dep on
 * `pg` — duck-typed via {@link PgQueryable} so the SDK doesn't pull node-
 * postgres into installs that don't need it.
 *
 * Transactional outbox usage:
 *
 * ```ts
 * import { Pool } from "pg";
 * import {
 *   OutboxManager,
 *   OutboxUnitOfWork,
 *   PgOutboxDriver,
 * } from "@flowcatalyst/sdk";
 *
 * const pool = new Pool({ connectionString });
 * const driver = new PgOutboxDriver(pool);
 * const outbox = new OutboxManager(driver, "clt_0HZXEQ5Y8JY5Z");
 * const uow = OutboxUnitOfWork.fromDriver(driver, "clt_0HZXEQ5Y8JY5Z");
 *
 * await uow.run(async (session) => {
 *   // Every write inside the callback joins the same transaction:
 *   await session.withTx(async (tx) => {
 *     await tx.query("UPDATE orders SET status='shipped' WHERE id=$1", [orderId]);
 *   });
 *   return await session.commit(orderShippedEvent, command);
 * });
 * ```
 */
import type { OutboxDriver, OutboxMessage } from "../types.js";
/**
 * Minimal `pg`-compatible query interface. Both `pg.Pool` and `pg.PoolClient`
 * (and Drizzle's underlying client) satisfy this shape — no explicit `pg`
 * dependency required.
 */
export interface PgQueryable {
    query(text: string, params?: ReadonlyArray<unknown>): Promise<{
        rowCount?: number | null;
    } | unknown>;
}
/**
 * `PgQueryable` augmented with the transaction-checkout method exposed by
 * `pg.Pool`. Only `Pool` (not `PoolClient`) supports `connect`, so
 * `withTransaction` is only available when the driver was constructed with
 * a pool-like executor.
 */
export interface PgPoolLike extends PgQueryable {
    connect(): Promise<PgPoolClientLike>;
}
/** Minimal shape of `pg.PoolClient` used inside `withTransaction`. */
export interface PgPoolClientLike extends PgQueryable {
    release(err?: Error | boolean): void;
}
/**
 * A PUSH row's insert: the same columns as {@link INSERT_SQL}, written in one
 * statement with `pg_notify`, so the platform's outbox processor (which
 * LISTENs on the channel) delivers the push the moment the writer's
 * transaction commits and not before; a rollback notifies nobody. The poll is
 * the fallback for a processor that is not listening. Mirrors the Go SDK's
 * `outbox.PushInsertStatement`.
 */
declare const PUSH_INSERT_SQL = "\nWITH woken AS (SELECT pg_notify('fc_outbox_push', ''))\nINSERT INTO outbox_messages (\n  id, type, message_group, payload, status, created_at, updated_at,\n  client_id, payload_size, headers\n)\nSELECT $1::text, $2::text, $3::text, $4::text, $5::smallint, $6::timestamptz, $7::timestamptz,\n  $8::text, $9::integer, $10::jsonb\nFROM woken\n";
export { PUSH_INSERT_SQL };
export declare class PgOutboxDriver implements OutboxDriver {
    private readonly executor;
    constructor(executor: PgQueryable);
    /**
     * Insert a single outbox row.
     *
     * If `tx` is a checked-out `pg.PoolClient` (typically obtained inside
     * `withTransaction`), the row joins that transaction. Otherwise the row
     * is written against the default executor passed to the constructor.
     */
    insert(message: OutboxMessage, tx?: unknown): Promise<void>;
    /**
     * Insert multiple outbox rows.
     *
     * If `tx` is provided, all rows join that transaction. Otherwise the
     * driver checks out a client from its pool, opens a short-lived
     * transaction so the batch is atomic, and releases the client.
     *
     * Note: this is N round trips. If you have a large batch, prefer
     * passing your own `tx` from inside `withTransaction` and let the
     * surrounding work decide when to commit.
     */
    insertBatch(messages: OutboxMessage[], tx?: unknown): Promise<void>;
    /**
     * Open a transaction on the pool, run the callback against the checked-
     * out client, and commit (or roll back on throw). Used by
     * `OutboxUnitOfWork.run` to give the caller a single tx that spans both
     * business writes and outbox writes.
     *
     * Only available when the driver was constructed with a pool-like
     * executor (one that exposes `connect()`). With a bare `PgQueryable`
     * (e.g. a single `pg.Client`), the caller must manage the transaction
     * boundary themselves and pass the client as `tx` to insert calls.
     */
    withTransaction<T>(callback: (tx: PgPoolClientLike) => Promise<T>): Promise<T>;
}
//# sourceMappingURL=pg-outbox-driver.d.ts.map