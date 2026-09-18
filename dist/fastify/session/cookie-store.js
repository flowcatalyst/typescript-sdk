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
            if (typeof parsed.expiresAt !== "number" || parsed.expiresAt < Date.now()) {
                return null;
            }
            return parsed;
        }
        catch {
            return null;
        }
    }
    async write(reply, session) {
        const envelope = await this.crypto.encrypt(JSON.stringify(session));
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
