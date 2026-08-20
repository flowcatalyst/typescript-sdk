/**
 * Process-local in-memory cache.
 *
 * Suitable for tests, single-Node-process dev servers, and anywhere durable
 * cross-process state isn't needed. Expired entries are reaped lazily on
 * read; call {@link MemoryCacheStore.reapExpired} from a periodic task if
 * you write keys that are rarely read back.
 */
import { type CacheStore } from "./types.js";
export declare class MemoryCacheStore implements CacheStore {
    private readonly entries;
    get<T>(key: string): Promise<T | null>;
    set<T>(key: string, value: T, ttlMs: number): Promise<void>;
    delete(key: string): Promise<void>;
    getOrSet<T>(key: string, ttlMs: number, supplier: () => Promise<T>): Promise<T>;
    /** Drop entries whose TTL has elapsed. Returns count removed. */
    reapExpired(): number;
    /** @internal — exposed for tests; do not use in production code. */
    size(): number;
}
//# sourceMappingURL=memory-cache-store.d.ts.map