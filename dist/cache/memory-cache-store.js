/**
 * Process-local in-memory cache.
 *
 * Suitable for tests, single-Node-process dev servers, and anywhere durable
 * cross-process state isn't needed. Expired entries are reaped lazily on
 * read; call {@link MemoryCacheStore.reapExpired} from a periodic task if
 * you write keys that are rarely read back.
 */
import { ensurePositiveTtl } from "./types.js";
export class MemoryCacheStore {
    constructor() {
        this.entries = new Map();
    }
    async get(key) {
        const entry = this.entries.get(key);
        if (!entry)
            return null;
        if (entry.expiresAt <= Date.now()) {
            this.entries.delete(key);
            return null;
        }
        return entry.value;
    }
    async set(key, value, ttlMs) {
        ensurePositiveTtl(ttlMs);
        this.entries.set(key, { value, expiresAt: Date.now() + ttlMs });
    }
    async delete(key) {
        this.entries.delete(key);
    }
    async getOrSet(key, ttlMs, supplier) {
        const hit = await this.get(key);
        if (hit !== null)
            return hit;
        const value = await supplier();
        await this.set(key, value, ttlMs);
        return value;
    }
    /** Drop entries whose TTL has elapsed. Returns count removed. */
    reapExpired() {
        const now = Date.now();
        let removed = 0;
        for (const [key, entry] of this.entries) {
            if (entry.expiresAt <= now) {
                this.entries.delete(key);
                removed++;
            }
        }
        return removed;
    }
    /** @internal — exposed for tests; do not use in production code. */
    size() {
        return this.entries.size;
    }
}
