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
import { randomUUID } from "node:crypto";
export class PgLockProvider {
    constructor(executor, options = {}) {
        this.executor = executor;
        this.table = options.table ?? "fc_locks";
    }
    async acquire(key, ttlMs) {
        if (!Number.isFinite(ttlMs) || ttlMs <= 0) {
            throw new Error("PgLockProvider: ttlMs must be greater than zero");
        }
        const holder = randomUUID();
        const expiresAt = new Date(Date.now() + ttlMs);
        const sql = `
			INSERT INTO ${this.table} (key, holder, expires_at) VALUES ($1, $2, $3)
			ON CONFLICT (key) DO UPDATE
				SET holder = EXCLUDED.holder, expires_at = EXCLUDED.expires_at
				WHERE ${this.table}.expires_at <= NOW()
			RETURNING holder
		`;
        const result = (await this.executor.query(sql, [
            key,
            holder,
            expiresAt,
        ]));
        const row = result.rows?.[0];
        if (!row || row.holder !== holder) {
            // No-op (existing non-expired holder won) — we lost.
            return null;
        }
        const executor = this.executor;
        const table = this.table;
        let released = false;
        return {
            async release() {
                if (released)
                    return;
                released = true;
                try {
                    await executor.query(`DELETE FROM ${table} WHERE key = $1 AND holder = $2`, [key, holder]);
                }
                catch {
                    // Best-effort: TTL expiry will reclaim if release fails.
                }
            },
        };
    }
    /** Delete rows whose TTL has elapsed without being released. Returns count. */
    async reapExpired() {
        const result = (await this.executor.query(`DELETE FROM ${this.table} WHERE expires_at <= NOW()`));
        return result.rowCount ?? 0;
    }
}
