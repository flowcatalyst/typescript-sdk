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
    /**
     * What this store's cookie is for. Written into the encrypted payload and
     * enforced on read, so a cookie minted for one purpose (e.g. the OAuth
     * state stash) can never be replayed as another (a session). Default
     * `"session"`.
     */
    purpose?: CookiePurpose;
}
export type CookiePurpose = "session" | "oauth_state";
/** `principal.id` of the OAuth state stash (see the plugin's `bagToSession`). */
export declare const OAUTH_STATE_PRINCIPAL_ID = "_oauth_state";
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
    /**
     * Purpose / cookie-name binding. The binding fields live inside the
     * encrypted JSON (the `v1.<iv>.<ct>` envelope is unchanged, so old SDK
     * versions still read what we write and ignore the extra fields). Legacy
     * payloads written before the binding existed carry neither field and are
     * told apart by shape: the state stash has `principal.id === "_oauth_state"`
     * and an empty access token; a real session has neither.
     */
    private acceptsPayload;
    private purpose;
    write<TData>(reply: FastifyReply, session: SessionPayload<TData>): Promise<void>;
    clear(_req: FastifyRequest, reply: FastifyReply): Promise<void>;
}
//# sourceMappingURL=cookie-store.d.ts.map