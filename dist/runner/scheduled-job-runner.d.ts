/**
 * ScheduledJobRunner — handler registry + envelope dispatch + lock + optional
 * completion callback. Mount the `process()` method on whatever HTTP framework
 * you use (Express, Fastify, Hono, raw `Bun.serve`, etc.) at the URL you set
 * as `targetUrl` on the job definition.
 *
 * Two outputs from `process()`:
 *   • The HTTP response (always 202 Accepted on a recognised envelope).
 *   • A background promise (started but not awaited): the actual handler
 *     execution + completion callback. The platform expects 202 within the
 *     dispatcher's `http_timeout` (default 10s) — your handler should run
 *     async, not block the HTTP response.
 *
 * The runner enforces concurrency via an injected `LockProvider`. For
 * `concurrent: false` jobs (the platform doesn't enforce this — see
 * CLAUDE.md), the lock-key defaults to `scheduled-job:{jobCode}`; concurrent
 * fires return immediately without invoking the handler.
 */
import type { ScheduledJobsResource } from "../resources/scheduled-jobs.js";
import { type LockProvider } from "./lock-provider.js";
/** Envelope shape POSTed by the platform dispatcher. */
export interface ScheduledJobEnvelope {
    jobId: string;
    jobCode: string;
    instanceId: string;
    scheduledFor?: string;
    firedAt: string;
    triggerKind: "CRON" | "MANUAL";
    correlationId?: string;
    payload?: unknown;
    tracksCompletion: boolean;
    timeoutSeconds?: number;
}
/** Context passed to user handlers. */
export interface HandlerContext {
    envelope: ScheduledJobEnvelope;
    /** Append a structured log entry to this instance. Best-effort. */
    log: (message: string, opts?: {
        level?: "DEBUG" | "INFO" | "WARN" | "ERROR";
        metadata?: unknown;
    }) => Promise<void>;
}
/** User handler. Resolve = success; throw / reject = failure. */
export type Handler = (ctx: HandlerContext) => Promise<unknown>;
export interface RunnerOptions {
    /** Lock provider for `concurrent: false` jobs. Default `NoOpLockProvider`. */
    lockProvider?: LockProvider;
    /**
     * Lock key derivation. Default: `scheduled-job:{jobCode}`. Override if you
     * want per-(job + payload-hash) locking, etc.
     */
    lockKey?: (envelope: ScheduledJobEnvelope) => string;
    /**
     * Whether to enforce locking. Default: always lock. The platform doesn't
     * tell the SDK whether the job is `concurrent: false` (the envelope is
     * the same), so we treat ALL fires as needing a lock; consumers who don't
     * care can use `NoOpLockProvider`.
     */
    enforceLock?: boolean;
    /** Lock TTL in ms. Default 10 minutes. */
    lockTtlMs?: number;
    /** Hook fired on every uncaught handler error (after completion is reported). */
    onError?: (err: unknown, envelope: ScheduledJobEnvelope) => void;
}
export type RunResult = {
    ok: true;
    status: 202;
    bodyJson: {
        ok: true;
    };
} | {
    ok: false;
    status: 400 | 404;
    bodyJson: {
        error: string;
    };
};
export declare class ScheduledJobRunner {
    private readonly handlers;
    private readonly resource;
    private readonly lockProvider;
    private readonly lockKey;
    private readonly enforceLock;
    private readonly lockTtlMs;
    private readonly onError?;
    constructor(_client: unknown, resource: ScheduledJobsResource, options?: RunnerOptions);
    /** Register a handler keyed by the job's `code`. */
    handler(code: string, fn: Handler): this;
    /** Convenience: list registered codes (for diagnostics). */
    registeredCodes(): string[];
    /**
     * Process an inbound platform → SDK firing. Validates the envelope,
     * acquires the lock, kicks off the handler in the background, and
     * returns 202 immediately. The actual handler execution + completion
     * callback continues asynchronously.
     */
    process(envelope: unknown): Promise<RunResult>;
    private runInBackground;
}
//# sourceMappingURL=scheduled-job-runner.d.ts.map