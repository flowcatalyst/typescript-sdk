/**
 * CookieSessionStore — default backend. The encrypted cookie IS the session.
 *
 * Pros: zero infra, stateless, no DB hop on every request.
 * Cons: ~4KB hard browser cookie limit. Once `sessionData` gets fat, switch
 * to {@link PgSessionStore} or {@link RedisSessionStore}.
 *
 * Cookie shape: `<envelope>` produced by {@link SessionCrypto}.
 */
import { createSessionCrypto } from "../crypto.js";
/** `principal.id` of the OAuth state stash (see the plugin's `bagToSession`). */
export const OAUTH_STATE_PRINCIPAL_ID = "_oauth_state";
export class CookieSessionStore {
    constructor(opts) {
        this.opts = opts;
        this.crypto = createSessionCrypto(opts.secret);
    }
    async read(req) {
        const raw = req.cookies?.[this.opts.cookieName];
        if (!raw)
            return null;
        const json = await this.crypto.decrypt(raw);
        if (!json)
            return null;
        try {
            const parsed = JSON.parse(json);
            if (!parsed || typeof parsed !== "object")
                return null;
            if (typeof parsed.expiresAt !== "number" || parsed.expiresAt < Date.now()) {
                return null;
            }
            if (!this.acceptsPayload(parsed))
                return null;
            // The binding fields are the store's business; callers get the
            // payload they wrote.
            const { purpose: _purpose, cookie: _cookie, ...payload } = parsed;
            return payload;
        }
        catch {
            return null;
        }
    }
    /**
     * Purpose / cookie-name binding. The binding fields live inside the
     * encrypted JSON (the `v1.<iv>.<ct>` envelope is unchanged, so old SDK
     * versions still read what we write and ignore the extra fields). Legacy
     * payloads written before the binding existed carry neither field and are
     * told apart by shape: the state stash has `principal.id === "_oauth_state"`
     * and an empty access token; a real session has neither.
     */
    acceptsPayload(p) {
        const want = this.purpose();
        if (p.purpose !== undefined) {
            if (p.purpose !== want)
                return false;
        }
        else {
            const isStateShape = p.principal?.id === OAUTH_STATE_PRINCIPAL_ID;
            if (want === "oauth_state") {
                if (!isStateShape)
                    return false;
            }
            else if (isStateShape || !p.tokens?.accessToken) {
                return false;
            }
        }
        if (p.cookie !== undefined && p.cookie !== this.opts.cookieName)
            return false;
        return true;
    }
    purpose() {
        return this.opts.purpose ?? "session";
    }
    async write(reply, session) {
        const bound = {
            ...session,
            purpose: this.purpose(),
            cookie: this.opts.cookieName,
        };
        const envelope = await this.crypto.encrypt(JSON.stringify(bound));
        reply.setCookie(this.opts.cookieName, envelope, this.opts.cookieOptions);
    }
    async clear(_req, reply) {
        reply.clearCookie(this.opts.cookieName, {
            path: this.opts.cookieOptions.path,
            ...(this.opts.cookieOptions.domain
                ? { domain: this.opts.cookieOptions.domain }
                : {}),
        });
    }
}
