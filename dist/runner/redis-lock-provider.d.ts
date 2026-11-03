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
import type { LockHandle, LockProvider } from "./lock-provider.js";
/**
 * Minimal ioredis-compatible command surface used by {@link RedisLockProvider}.
 */
export interface RedisLockCommandable {
    set(key: string, value: string, ...args: (string | number)[]): Promise<string | null>;
    eval(script: string, numKeys: number, ...args: (string | number)[]): Promise<unknown>;
}
export interface RedisLockProviderOptions {
    /** Key prefix prepended as `${prefix}:${key}`. Default: `fc:lock`. */
    prefix?: string;
}
export declare class RedisLockProvider implements LockProvider {
    private readonly client;
    private readonly prefix;
    constructor(client: RedisLockCommandable, options?: RedisLockProviderOptions);
    private makeKey;
    acquire(key: string, ttlMs: number): Promise<LockHandle | null>;
}
//# sourceMappingURL=redis-lock-provider.d.ts.map