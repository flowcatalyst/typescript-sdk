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
import type { FastifyReply, FastifyRequest } from "fastify";
import type { PgQueryable } from "../../cache/types.js";
import type { CookieAttrs } from "./cookie-store.js";
import type { SessionPayload, SessionStore } from "./types.js";
export interface PgSessionStoreOptions {
    executor: PgQueryable;
    cookieName: string;
    cookieOptions: CookieAttrs;
    table?: string;
    /**
     * Interval between periodic sweeps of expired rows, started by
     * {@link PgSessionStore.startReaper} (the `flowcatalystAuth` plugin calls
     * this once when the store is wired in, and `close()` on shutdown).
     * Defaults to hourly. Reads already filter on `expires_at > NOW()`, so a
     * missed or disabled sweep never affects correctness — only table
     * growth. Pass `false` to opt out entirely.
     */
    reapIntervalMs?: number | false;
}
export declare class PgSessionStore implements SessionStore {
    private readonly executor;
    private readonly table;
    private readonly cookieName;
    private readonly cookieOptions;
    private readonly reapIntervalMs;
    private reapTimer;
    constructor(opts: PgSessionStoreOptions);
    read<TData>(req: FastifyRequest): Promise<SessionPayload<TData> | null>;
    write<TData>(reply: FastifyReply, session: SessionPayload<TData>): Promise<void>;
    clear(req: FastifyRequest, reply: FastifyReply): Promise<void>;
    /** Delete rows whose TTL has elapsed. Returns the number of rows removed. */
    reapExpired(): Promise<number>;
    /**
     * Start the periodic sweep of expired rows (idempotent — a second call is
     * a no-op while one is already running). No-op when opted out via
     * `reapIntervalMs: false`. The interval is `unref()`'d so it never by
     * itself holds the process open.
     */
    startReaper(): void;
    /** Stop the periodic sweep, if running. Call on shutdown. */
    close(): void;
}
export declare const CREATE_SESSION_TABLE_SQL: (table?: string) => string;
export declare function initSessionSchema(executor: PgQueryable, table?: string): Promise<void>;
//# sourceMappingURL=pg-session-store.d.ts.map