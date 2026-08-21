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
}
export declare class PgSessionStore implements SessionStore {
    private readonly executor;
    private readonly table;
    private readonly cookieName;
    private readonly cookieOptions;
    constructor(opts: PgSessionStoreOptions);
    read<TData>(req: FastifyRequest): Promise<SessionPayload<TData> | null>;
    write<TData>(reply: FastifyReply, session: SessionPayload<TData>): Promise<void>;
    clear(req: FastifyRequest, reply: FastifyReply): Promise<void>;
    /** Delete rows whose TTL has elapsed. Returns the number of rows removed. */
    reapExpired(): Promise<number>;
}
export declare const CREATE_SESSION_TABLE_SQL: (table?: string) => string;
export declare function initSessionSchema(executor: PgQueryable, table?: string): Promise<void>;
//# sourceMappingURL=pg-session-store.d.ts.map