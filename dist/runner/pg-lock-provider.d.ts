/**
 * Postgres-backed distributed lock.
 *
 * Duck-typed against any node-postgres-compatible client via
 * {@link PgQueryable} — works with `pg.Pool`, `pg.PoolClient`, and
 * Drizzle's underlying client. No `pg` peer dep required.
 *
 * **Table-based, not `pg_try_advisory_lock`.** Advisory locks have no TTL —
 * a crashed holder keeps the lock until its session ends. With a table the
 * TTL is explicit and enforced by the upsert's `WHERE` clause: another
 * holder can reclaim an expired row in a single atomic statement.
 *
 * Acquire is one `INSERT ... ON CONFLICT DO UPDATE WHERE ... RETURNING`, so
 * there's no race window between checking and taking. Release deletes only
 * the row whose `holder` token matches ours — protects against a stale
 * releaser stomping a lock that's already been reclaimed by another holder.
 *
 * Run {@link initLockSchema} once at startup before the first acquire.
 */
import type { PgQueryable } from "../cache/types.js";
import type { LockHandle, LockProvider } from "./lock-provider.js";
export interface PgLockProviderOptions {
    /** Table name. Defaults to `fc_locks`. Must match the schema you create. */
    table?: string;
}
export declare class PgLockProvider implements LockProvider {
    private readonly executor;
    private readonly table;
    constructor(executor: PgQueryable, options?: PgLockProviderOptions);
    acquire(key: string, ttlMs: number): Promise<LockHandle | null>;
    /** Delete rows whose TTL has elapsed without being released. Returns count. */
    reapExpired(): Promise<number>;
}
//# sourceMappingURL=pg-lock-provider.d.ts.map