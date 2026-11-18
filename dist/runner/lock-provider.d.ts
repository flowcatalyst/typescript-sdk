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
export interface LockHandle {
    /** Release the lock. Idempotent — safe to call multiple times. */
    release(): Promise<void>;
}
export interface LockProvider {
    /**
     * Try to acquire `key` for at most `ttlMs` milliseconds. Returns `null`
     * immediately if the lock is held by another holder; never block. The
     * runner converts `null` into "skip this firing" — the platform will
     * still see the firing's normal lifecycle (DELIVERED, then either
     * COMPLETED with a "skipped: locked" result or never completed if
     * tracksCompletion is false).
     */
    acquire(key: string, ttlMs: number): Promise<LockHandle | null>;
}
/**
 * Default no-op lock — every acquire succeeds. Use this when:
 *   • the job is `concurrent: true`, OR
 *   • you only ever run one consumer pod, OR
 *   • you have a different mechanism for de-duping (e.g. idempotency-by-id).
 */
export declare class NoOpLockProvider implements LockProvider {
    acquire(_key: string, _ttlMs: number): Promise<LockHandle>;
}
/**
 * Process-local mutex. Useful when running a single Node/Bun process and you
 * just want the runner to serialize handler invocations for a given job-code
 * within THIS process. Does NOT survive multiple replicas.
 */
export declare class InMemoryLockProvider implements LockProvider {
    private readonly held;
    acquire(key: string, ttlMs: number): Promise<LockHandle | null>;
}
//# sourceMappingURL=lock-provider.d.ts.map