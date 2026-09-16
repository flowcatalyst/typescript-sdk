/**
 * Redis-backed cache.
 *
 * Duck-typed against ioredis. Works directly with `new Redis()` from
 * `ioredis`; with node-redis (`redis` package, v4+) wrap your client to
 * match the {@link RedisCommandable} shape — the four methods used here
 * (`set`, `get`, `del`, `eval`) all have an ioredis-equivalent invocation.
 *
 * Uses `SET key value PX millis` for atomic writes with TTL and `GET` for
 * reads. TTL is enforced by Redis itself, so there's no separate reaper to
 * run — expired keys disappear automatically.
 */
import { CacheError, ensurePositiveTtl } from "./types.js";
export class RedisCacheStore {
    constructor(client, options = {}) {
        this.client = client;
        this.prefix = options.prefix ?? "";
    }
    makeKey(key) {
        return this.prefix.length === 0 ? key : `${this.prefix}:${key}`;
    }
    async get(key) {
        const fullKey = this.makeKey(key);
        let raw;
        try {
            raw = await this.client.get(fullKey);
        }
        catch (e) {
            throw CacheError.backend(e instanceof Error ? e.message : String(e), e);
        }
        if (raw === null)
            return null;
        try {
            return JSON.parse(raw);
        }
        catch (e) {
            throw CacheError.deserialize(e instanceof Error ? e.message : String(e), e);
        }
    }
    async set(key, value, ttlMs) {
        ensurePositiveTtl(ttlMs);
        const fullKey = this.makeKey(key);
        let payload;
        try {
            payload = JSON.stringify(value);
        }
        catch (e) {
            throw CacheError.serialize(e instanceof Error ? e.message : String(e), e);
        }
        try {
            await this.client.set(fullKey, payload, "PX", ttlMs);
        }
        catch (e) {
            throw CacheError.backend(e instanceof Error ? e.message : String(e), e);
        }
    }
    async delete(key) {
        const fullKey = this.makeKey(key);
        try {
            await this.client.del(fullKey);
        }
        catch (e) {
            throw CacheError.backend(e instanceof Error ? e.message : String(e), e);
        }
    }
    async getOrSet(key, ttlMs, supplier) {
        const hit = await this.get(key);
        if (hit !== null)
            return hit;
        const value = await supplier();
        await this.set(key, value, ttlMs);
        return value;
    }
}
