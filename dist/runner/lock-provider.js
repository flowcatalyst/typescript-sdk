/**
 * Distributed lock interface for the ScheduledJobRunner.
 *
 * The platform DOES NOT enforce concurrency for `concurrent: false` jobs —
 * it always fires the cron tick and POSTs to the SDK. Single-instance-at-a-
 * time is the SDK consumer's responsibility, implemented via this hook.
 *
 * Ship a real implementation backed by Redis SETNX, Postgres advisory locks,
 * Cloudflare Durable Objects, etc. Default is `NoOpLockProvider`, which never
 * blocks — appropriate for jobs that can run concurrently or for single-pod
 * deployments where a process-local mutex is enough.
 */
/**
 * Default no-op lock — every acquire succeeds. Use this when:
 *   • the job is `concurrent: true`, OR
 *   • you only ever run one consumer pod, OR
 *   • you have a different mechanism for de-duping (e.g. idempotency-by-id).
 */
export class NoOpLockProvider {
    async acquire(_key, _ttlMs) {
        return {
            async release() {
                /* no-op */
            },
        };
    }
}
/**
 * Process-local mutex. Useful when running a single Node/Bun process and you
 * just want the runner to serialize handler invocations for a given job-code
 * within THIS process. Does NOT survive multiple replicas.
 */
export class InMemoryLockProvider {
    constructor() {
        this.held = new Map();
    }
    async acquire(key, ttlMs) {
        const now = Date.now();
        const existing = this.held.get(key);
        if (existing !== undefined && existing > now)
            return null;
        const expiresAt = now + ttlMs;
        this.held.set(key, expiresAt);
        return {
            release: async () => {
                const cur = this.held.get(key);
                if (cur === expiresAt)
                    this.held.delete(key);
            },
        };
    }
}
