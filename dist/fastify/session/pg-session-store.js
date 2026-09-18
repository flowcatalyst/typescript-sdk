/**
 * Postgres-backed session store.
 *
 * Cookie holds an opaque session id (32B random, base64url-encoded). Payload
 * lives in `fc_sessions`. Lookups filter on `expires_at > NOW()` so expired
 * rows are invisible even pre-reap; reap them lazily via {@link reapExpired}.
 *
 * Duck-typed against any node-postgres-compatible executor (`pg.Pool`,
 * `pg.PoolClient`, Drizzle underlying client).
 *
 * Run {@link initSessionSchema} once at startup (or fold into your migration
 * tool).
 */
const DEFAULT_REAP_INTERVAL_MS = 60 * 60 * 1000; // hourly
export class PgSessionStore {
    constructor(opts) {
        this.executor = opts.executor;
        this.table = opts.table ?? "fc_sessions";
        this.cookieName = opts.cookieName;
        this.cookieOptions = opts.cookieOptions;
        this.reapIntervalMs = opts.reapIntervalMs ?? DEFAULT_REAP_INTERVAL_MS;
    }
    async read(req) {
        const sid = req.cookies?.[this.cookieName];
        if (!sid)
            return null;
        const result = (await this.executor.query(`SELECT payload FROM ${this.table} WHERE sid = $1 AND expires_at > NOW()`, [sid]));
        const row = result.rows?.[0];
        if (!row)
            return null;
        const text = Buffer.isBuffer(row.payload)
            ? row.payload.toString("utf-8")
            : row.payload;
        try {
            return JSON.parse(text);
        }
        catch {
            return null;
        }
    }
    async write(reply, session) {
        const sid = generateSid();
        const payload = JSON.stringify(session);
        const expiresAt = new Date(session.expiresAt);
        // The store interface doesn't pass `req`, but Fastify hands every
        // reply a back-reference to the request that produced it — that's
        // where the superseded sid (if any) lives. Deleting it in the same
        // statement means a rotation (every mid-session refresh calls write()
        // again) never orphans the row it replaces.
        const previousSid = reply.request?.cookies?.[this.cookieName] ?? null;
        await this.executor.query(`WITH superseded AS (
				DELETE FROM ${this.table} WHERE sid = $3 AND sid <> $1
			 )
			 INSERT INTO ${this.table} (sid, payload, expires_at) VALUES ($1, $2, $4)
			 ON CONFLICT (sid) DO UPDATE SET payload = EXCLUDED.payload, expires_at = EXCLUDED.expires_at`, [sid, payload, previousSid, expiresAt]);
        reply.setCookie(this.cookieName, sid, this.cookieOptions);
    }
    async clear(req, reply) {
        const sid = req.cookies?.[this.cookieName];
        if (sid) {
            await this.executor.query(`DELETE FROM ${this.table} WHERE sid = $1`, [
                sid,
            ]);
        }
        reply.clearCookie(this.cookieName, {
            path: this.cookieOptions.path,
            ...(this.cookieOptions.domain ? { domain: this.cookieOptions.domain } : {}),
        });
    }
    /** Delete rows whose TTL has elapsed. Returns the number of rows removed. */
    async reapExpired() {
        const result = (await this.executor.query(`DELETE FROM ${this.table} WHERE expires_at <= NOW()`));
        return result.rowCount ?? 0;
    }
    /**
     * Start the periodic sweep of expired rows (idempotent — a second call is
     * a no-op while one is already running). No-op when opted out via
     * `reapIntervalMs: false`. The interval is `unref()`'d so it never by
     * itself holds the process open.
     */
    startReaper() {
        if (this.reapIntervalMs === false || this.reapTimer)
            return;
        const timer = setInterval(() => {
            void this.reapExpired();
        }, this.reapIntervalMs);
        timer.unref();
        this.reapTimer = timer;
    }
    /** Stop the periodic sweep, if running. Call on shutdown. */
    close() {
        if (this.reapTimer) {
            clearInterval(this.reapTimer);
            this.reapTimer = undefined;
        }
    }
}
function generateSid() {
    return Buffer.from(crypto.getRandomValues(new Uint8Array(32))).toString("base64url");
}
export const CREATE_SESSION_TABLE_SQL = (table = "fc_sessions") => `
CREATE TABLE IF NOT EXISTS ${table} (
	sid         TEXT PRIMARY KEY,
	payload     TEXT NOT NULL,
	expires_at  TIMESTAMPTZ NOT NULL
);
CREATE INDEX IF NOT EXISTS ${table}_expires_at_idx ON ${table} (expires_at);
`;
export async function initSessionSchema(executor, table = "fc_sessions") {
    await executor.query(CREATE_SESSION_TABLE_SQL(table));
}
