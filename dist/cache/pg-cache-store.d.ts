/**
 * Postgres-backed cache.
 *
 * Duck-typed against any node-postgres-compatible client via the
 * {@link PgQueryable} shape — works with `pg.Pool`, `pg.PoolClient`, and
 * Drizzle's underlying client. No `pg` peer dep required.
 *
 * Stores values as JSON (TEXT) in a `fc_cache` table. Reads filter on
 * `expires_at > NOW()` so an expired row is invisible even before it's
 * reaped; writes upsert on the primary key so callers can refresh the TTL
 * by writing again. Run {@link initCacheSchema} once at startup (or fold
 * the SQL into your migration tool).
 *
 * Stale rows are reaped lazily by {@link PgCacheStore.reapExpired}; call it
 * from a periodic task if you write keys that are rarely read back.
 */
import { type CacheStore, type PgQueryable } from "./types.js";
export declare class PgCacheStore implements CacheStore {
    private readonly executor;
    private readonly table;
    constructor(executor: PgQueryable, table?: string);
    get<T>(key: string): Promise<T | null>;
    set<T>(key: string, value: T, ttlMs: number): Promise<void>;
    delete(key: string): Promise<void>;
    getOrSet<T>(key: string, ttlMs: number, supplier: () => Promise<T>): Promise<T>;
    /** Delete rows whose TTL has elapsed. Returns the number of rows removed. */
    reapExpired(): Promise<number>;
}
//# sourceMappingURL=pg-cache-store.d.ts.map