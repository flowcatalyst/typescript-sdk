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
import { type CacheStore } from "./types.js";
/**
 * Minimal ioredis-compatible command surface. ioredis users can pass their
 * Redis client directly; node-redis users can wrap their client to match.
 */
export interface RedisCommandable {
    set(key: string, value: string, ...args: (string | number)[]): Promise<string | null>;
    get(key: string): Promise<string | null>;
    del(...keys: string[]): Promise<number>;
}
export interface RedisCacheStoreOptions {
    /** Key prefix prepended as `${prefix}:${key}`. Defaults to no prefix. */
    prefix?: string;
}
export declare class RedisCacheStore implements CacheStore {
    private readonly client;
    private readonly prefix;
    constructor(client: RedisCommandable, options?: RedisCacheStoreOptions);
    private makeKey;
    get<T>(key: string): Promise<T | null>;
    set<T>(key: string, value: T, ttlMs: number): Promise<void>;
    delete(key: string): Promise<void>;
    getOrSet<T>(key: string, ttlMs: number, supplier: () => Promise<T>): Promise<T>;
}
//# sourceMappingURL=redis-cache-store.d.ts.map