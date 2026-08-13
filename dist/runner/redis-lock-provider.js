/**
 * Redis-backed distributed lock.
 *
 * Uses `SET key value NX PX <ttlMs>` for acquire (atomic with TTL) and a
 * Lua check-and-delete script for release so we only delete locks whose
 * token we still own — protects against a stale releaser stomping a lock
 * that's been reclaimed by another holder after a TTL expiry.
 *
 * Duck-typed against ioredis via {@link RedisLockCommandable}. ioredis users
 * pass their client directly; node-redis users can wrap their client to
 * match the small interface (set / eval).
 */
import { randomUUID } from "node:crypto";
const RELEASE_SCRIPT = `
if redis.call("GET", KEYS[1]) == ARGV[1] then
    return redis.call("DEL", KEYS[1])
else
    return 0
end
`;
export class RedisLockProvider {
    constructor(client, options = {}) {
        this.client = client;
        this.prefix = options.prefix ?? "fc:lock";
    }
    makeKey(key) {
        return `${this.prefix}:${key}`;
    }
    async acquire(key, ttlMs) {
        if (!Number.isFinite(ttlMs) || ttlMs <= 0) {
            throw new Error("RedisLockProvider: ttlMs must be greater than zero");
        }
        const fullKey = this.makeKey(key);
        const token = randomUUID();
        // SET key token NX PX ttlMs — returns "OK" on success, null on collision.
        const result = await this.client.set(fullKey, token, "NX", "PX", ttlMs);
        if (result === null)
            return null;
        const client = this.client;
        let released = false;
        return {
            async release() {
                if (released)
                    return;
                released = true;
                try {
                    await client.eval(RELEASE_SCRIPT, 1, fullKey, token);
                }
                catch {
                    // Best-effort: Redis TTL expiry will reclaim if release fails.
                }
            },
        };
    }
}
