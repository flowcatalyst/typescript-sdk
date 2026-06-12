/**
 * Redis-backed session store.
 *
 * Cookie holds an opaque 32-byte session id (base64url). Payload is stored
 * in Redis under `${prefix}:${sid}` with TTL enforced by Redis itself.
 *
 * Duck-typed against ioredis ({@link RedisCommandable}). For node-redis,
 * wrap your client to match.
 */
import type { FastifyReply, FastifyRequest } from "fastify";
import type { RedisCommandable } from "../../cache/redis-cache-store.js";
import type { CookieAttrs } from "./cookie-store.js";
import type { SessionPayload, SessionStore } from "./types.js";
export interface RedisSessionStoreOptions {
    client: RedisCommandable;
    cookieName: string;
    cookieOptions: CookieAttrs;
    /** Key prefix; defaults to `fc:session`. */
    prefix?: string;
}
export declare class RedisSessionStore implements SessionStore {
    private readonly client;
    private readonly prefix;
    private readonly cookieName;
    private readonly cookieOptions;
    constructor(opts: RedisSessionStoreOptions);
    private key;
    read<TData>(req: FastifyRequest): Promise<SessionPayload<TData> | null>;
    write<TData>(reply: FastifyReply, session: SessionPayload<TData>): Promise<void>;
    clear(req: FastifyRequest, reply: FastifyReply): Promise<void>;
}
//# sourceMappingURL=redis-session-store.d.ts.map