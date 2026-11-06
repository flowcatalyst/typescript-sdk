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
import { CacheError, ensurePositiveTtl, } from "./types.js";
export class PgCacheStore {
    constructor(executor, table = "fc_cache") {
        this.executor = executor;
        this.table = table;
    }
    async get(key) {
        try {
            const result = (await this.executor.query(`SELECT value FROM ${this.table} WHERE key = $1 AND expires_at > NOW()`, [key]));
            const row = result.rows?.[0];
            if (!row)
                return null;
            const raw = row.value;
            const text = Buffer.isBuffer(raw) ? raw.toString("utf-8") : raw;
            try {
                return JSON.parse(text);
            }
            catch (e) {
                throw CacheError.deserialize(e instanceof Error ? e.message : String(e), e);
            }
        }
        catch (e) {
            if (e instanceof CacheError)
                throw e;
            throw CacheError.backend(e instanceof Error ? e.message : String(e), e);
        }
    }
    async set(key, value, ttlMs) {
        ensurePositiveTtl(ttlMs);
        let payload;
        try {
            payload = Buffer.from(JSON.stringify(value), "utf-8");
        }
        catch (e) {
            throw CacheError.serialize(e instanceof Error ? e.message : String(e), e);
        }
        const expiresAt = new Date(Date.now() + ttlMs);
        try {
            await this.executor.query(`INSERT INTO ${this.table} (key, value, expires_at) VALUES ($1, $2, $3)
				 ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, expires_at = EXCLUDED.expires_at`, [key, payload, expiresAt]);
        }
        catch (e) {
            throw CacheError.backend(e instanceof Error ? e.message : String(e), e);
        }
    }
    async delete(key) {
        try {
            await this.executor.query(`DELETE FROM ${this.table} WHERE key = $1`, [
                key,
            ]);
        }
        catch (e) {
            throw CacheError.backend(e instanceof Error ? e.message : String(e), e);
        }
    }
    async getOrSet(key, ttlMs, supplier) {
        const hit = await this.get(key);
        if (hit !== null)
            return hit;
        const value = await supplier();
        await this.set(key, value, ttlMs);
        return value;
    }
    /** Delete rows whose TTL has elapsed. Returns the number of rows removed. */
    async reapExpired() {
        try {
            const result = (await this.executor.query(`DELETE FROM ${this.table} WHERE expires_at <= NOW()`));
            return result.rowCount ?? 0;
        }
        catch (e) {
            throw CacheError.backend(e instanceof Error ? e.message : String(e), e);
        }
    }
}
