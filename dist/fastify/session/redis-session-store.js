/**
 * Redis-backed session store.
 *
 * Cookie holds an opaque 32-byte session id (base64url). Payload is stored
 * in Redis under `${prefix}:${sid}` with TTL enforced by Redis itself.
 *
 * Duck-typed against ioredis ({@link RedisCommandable}). For node-redis,
 * wrap your client to match.
 */
export class RedisSessionStore {
    constructor(opts) {
        this.client = opts.client;
        this.prefix = opts.prefix ?? "fc:session";
        this.cookieName = opts.cookieName;
        this.cookieOptions = opts.cookieOptions;
    }
    key(sid) {
        return `${this.prefix}:${sid}`;
    }
    async read(req) {
        const sid = req.cookies?.[this.cookieName];
        if (!sid)
            return null;
        const raw = await this.client.get(this.key(sid));
        if (!raw)
            return null;
        try {
            return JSON.parse(raw);
        }
        catch {
            return null;
        }
    }
    async write(reply, session) {
        const sid = generateSid();
        const ttlMs = Math.max(1, session.expiresAt - Date.now());
        await this.client.set(this.key(sid), JSON.stringify(session), "PX", ttlMs);
        reply.setCookie(this.cookieName, sid, this.cookieOptions);
    }
    async clear(req, reply) {
        const sid = req.cookies?.[this.cookieName];
        if (sid)
            await this.client.del(this.key(sid));
        reply.clearCookie(this.cookieName, {
            path: this.cookieOptions.path,
            ...(this.cookieOptions.domain ? { domain: this.cookieOptions.domain } : {}),
        });
    }
}
function generateSid() {
    return Buffer.from(crypto.getRandomValues(new Uint8Array(32))).toString("base64url");
}
