/**
 * Cache primitive
 *
 * Pluggable key-value cache. TTL is **required** on every write —
 * open-ended caches silently leak memory in long-running services.
 *
 * Backends:
 *   - {@link MemoryCacheStore} — process-local, default for tests/dev.
 *   - {@link PgCacheStore} — Postgres-backed (any node-postgres-compatible
 *     pool or client). Ships {@link initCacheSchema} for the migration.
 *   - {@link RedisCacheStore} — ioredis-compatible client. Expiry enforced
 *     by Redis itself.
 *
 * Mirrors the Rust SDK's `Cache` trait so apps written in either language
 * follow the same shape.
 */
/**
 * Errors thrown by a {@link CacheStore} implementation. Backends should
 * throw `CacheError` (or a subclass) rather than leaking driver-specific
 * errors. Use {@link CacheError.invalidTtl} for zero / negative TTLs.
 */
export class CacheError extends Error {
    constructor(message, cause) {
        super(message);
        this.name = "CacheError";
        this.underlyingCause = cause;
    }
    static invalidTtl() {
        return new CacheError("cache TTL must be greater than zero");
    }
    static backend(message, cause) {
        return new CacheError(`cache backend error: ${message}`, cause);
    }
    static deserialize(message, cause) {
        return new CacheError(`cache value deserialization failed: ${message}`, cause);
    }
    static serialize(message, cause) {
        return new CacheError(`cache value serialization failed: ${message}`, cause);
    }
}
/** Internal helper used by every backend to validate TTL the same way. */
export function ensurePositiveTtl(ttlMs) {
    if (!Number.isFinite(ttlMs) || ttlMs <= 0) {
        throw CacheError.invalidTtl();
    }
}
