/**
 * CookieSessionStore — default backend. The encrypted cookie IS the session.
 *
 * Pros: zero infra, stateless, no DB hop on every request.
 * Cons: ~4KB hard browser cookie limit. Once `sessionData` gets fat, switch
 * to {@link PgSessionStore} or {@link RedisSessionStore}.
 *
 * Cookie shape: `<envelope>` produced by {@link SessionCrypto}.
 */
import type { FastifyReply, FastifyRequest } from "fastify";
import type { SessionPayload, SessionStore } from "./types.js";
export interface CookieSessionStoreOptions {
    cookieName: string;
    secret: string | readonly string[];
    cookieOptions: CookieAttrs;
}
export interface CookieAttrs {
    path: string;
    domain?: string;
    httpOnly: boolean;
    secure: boolean;
    sameSite: "lax" | "strict" | "none";
    maxAge: number;
}
export declare class CookieSessionStore implements SessionStore {
    private readonly crypto;
    private readonly opts;
    constructor(opts: CookieSessionStoreOptions);
    read<TData>(req: FastifyRequest): Promise<SessionPayload<TData> | null>;
    write<TData>(reply: FastifyReply, session: SessionPayload<TData>): Promise<void>;
    clear(_req: FastifyRequest, reply: FastifyReply): Promise<void>;
}
//# sourceMappingURL=cookie-store.d.ts.map