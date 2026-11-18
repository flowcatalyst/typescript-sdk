/**
 * ScheduledJobRunner — handler registry + envelope dispatch + lock + optional
 * completion callback. Mount the `process()` method on whatever HTTP framework
 * you use (Express, Fastify, Hono, raw `Bun.serve`, etc.) at the URL you set
 * as `targetUrl` on the job definition.
 *
 * Mount `processSigned(rawBody, headers)` — it verifies the platform's
 * HMAC signature (`X-FlowCatalyst-Signature` / `X-FlowCatalyst-Timestamp`,
 * the same scheme as webhooks) before anything runs. `process(envelope)` has
 * no headers to verify: it is the unverified path, kept for integrations that
 * do not configure a `signingSecret`.
 *
 * Two outputs from `process()` / `processSigned()`:
 *   • The HTTP response (always 202 Accepted on a recognised envelope).
 *   • A background promise (started but not awaited): the actual handler
 *     execution + completion callback. The platform expects 202 within the
 *     dispatcher's `http_timeout` (default 10s) — your handler should run
 *     async, not block the HTTP response.
 *
 * The runner enforces concurrency via an injected `LockProvider`. The
 * platform echoes each job definition's `concurrent` attribute in the
 * envelope, and by default the runner locks exactly when the definition asks
 * for it (`concurrent: false`, the definition default); the lock-key defaults
 * to `scheduled-job:{jobCode}`, and contended fires return immediately
 * without invoking the handler. The default `NoOpLockProvider` cannot
 * actually block overlapping fires — wire a Redis/Postgres provider (a
 * one-time warning is logged when a non-concurrent fire runs without one).
 */
import { verifyDeliverySignature, WebhookSignatureError, } from "../webhook/signature.js";
import { NoOpLockProvider } from "./lock-provider.js";
export class ScheduledJobRunner {
    constructor(_client, resource, options = {}) {
        this.handlers = new Map();
        this.warnedNoOpLock = false;
        this.warnedUnverified = false;
        this.resource = resource;
        this.lockProvider = options.lockProvider ?? new NoOpLockProvider();
        this.lockKey =
            options.lockKey ?? ((e) => `scheduled-job:${e.jobCode}`);
        this.enforceLock = options.enforceLock;
        this.lockTtlMs = options.lockTtlMs ?? 10 * 60 * 1000;
        this.onError = options.onError;
        this.secretOptionSet = options.signingSecret !== undefined;
        this.signingSecret = options.signingSecret || undefined;
        this.requireSignature = options.requireSignature ?? false;
    }
    /** Register a handler keyed by the job's `code`. */
    handler(code, fn) {
        this.handlers.set(code, fn);
        return this;
    }
    /** Convenience: list registered codes (for diagnostics). */
    registeredCodes() {
        return Array.from(this.handlers.keys());
    }
    /**
     * Process an inbound platform → SDK firing. Validates the envelope,
     * acquires the lock, kicks off the handler in the background, and
     * returns 202 immediately. The actual handler execution + completion
     * callback continues asynchronously.
     */
    async process(envelope) {
        if (this.secretOptionSet) {
            return unauthorized("A signingSecret is configured: firings must be verified — call processSigned(rawBody, headers) with the raw request body and the X-FlowCatalyst-Signature / X-FlowCatalyst-Timestamp headers.");
        }
        if (this.requireSignature) {
            return unauthorized("requireSignature is set but no signingSecret is configured.");
        }
        this.warnUnverified();
        return this.dispatch(envelope);
    }
    /**
     * Verify a signed firing and process it. Pass the RAW request body bytes
     * exactly as received (not re-serialised JSON) and the two delivery headers.
     * With a `signingSecret`, a missing or bad signature (or a stale timestamp)
     * returns 401 and nothing runs; without one, behaves like {@link process}
     * (unless `requireSignature`).
     */
    async processSigned(rawBody, headers) {
        if (!this.signingSecret) {
            if (this.requireSignature || this.secretOptionSet) {
                return unauthorized(this.secretOptionSet
                    ? "signingSecret is configured but empty."
                    : "requireSignature is set but no signingSecret is configured.");
            }
            this.warnUnverified();
        }
        else {
            try {
                verifyDeliverySignature({
                    rawBody,
                    signature: headers.signature,
                    timestamp: headers.timestamp,
                    secret: this.signingSecret,
                });
            }
            catch (e) {
                if (e instanceof WebhookSignatureError) {
                    return unauthorized(`${e.code}: ${e.message}`);
                }
                throw e;
            }
        }
        let envelope;
        try {
            envelope = JSON.parse(typeof rawBody === "string" ? rawBody : new TextDecoder().decode(rawBody));
        }
        catch {
            return { ok: false, status: 400, bodyJson: { error: "Body is not valid JSON" } };
        }
        return this.dispatch(envelope);
    }
    warnUnverified() {
        if (this.warnedUnverified)
            return;
        this.warnedUnverified = true;
        console.warn("[flowcatalyst] scheduled-job firings are NOT being signature-verified: anyone who can reach the route can trigger handlers. Pass signingSecret in RunnerOptions and mount processSigned(rawBody, headers).");
    }
    async dispatch(envelope) {
        const validated = validateEnvelope(envelope);
        if (!validated.ok) {
            return { ok: false, status: 400, bodyJson: { error: validated.error } };
        }
        const env = validated.envelope;
        const handler = this.handlers.get(env.jobCode);
        if (!handler) {
            return {
                ok: false,
                status: 404,
                bodyJson: { error: `No handler registered for code '${env.jobCode}'` },
            };
        }
        // Spawn but don't await — the platform expects 202 within ~10s. The
        // runner promises only "I have it" via 202; the actual work runs async.
        void this.runInBackground(env, handler);
        return { ok: true, status: 202, bodyJson: { ok: true } };
    }
    async runInBackground(envelope, handler) {
        const wantLock = this.enforceLock ?? !(envelope.concurrent ?? false);
        let lock = null;
        try {
            if (wantLock) {
                if (this.lockProvider instanceof NoOpLockProvider &&
                    !this.warnedNoOpLock) {
                    this.warnedNoOpLock = true;
                    console.warn(`[flowcatalyst] scheduled job '${envelope.jobCode}' wants overlap protection (concurrent: false) but the runner has no real LockProvider — overlapping fires will NOT be blocked. Pass a RedisLockProvider/PgLockProvider in RunnerOptions.lockProvider.`);
                }
                lock = await this.lockProvider.acquire(this.lockKey(envelope), this.lockTtlMs);
                if (lock === null) {
                    // Lock contention — skip this firing. If the job tracks
                    // completion, mark as failure with a clear reason; otherwise
                    // just no-op (the instance will sit DELIVERED forever).
                    if (envelope.tracksCompletion) {
                        await this.resource
                            .completeInstance(envelope.instanceId, {
                            status: "FAILURE",
                            result: { skipped: true, reason: "lock-held" },
                        })
                            .match(() => undefined, (e) => {
                            this.onError?.(e, envelope);
                        });
                    }
                    return;
                }
            }
            const ctx = {
                envelope,
                log: (message, opts = {}) => this.resource
                    .logForInstance(envelope.instanceId, {
                    message,
                    level: opts.level ?? "INFO",
                    metadata: opts.metadata,
                })
                    .match(() => undefined, (e) => {
                    this.onError?.(e, envelope);
                }),
            };
            let result;
            let succeeded = true;
            let thrownError = undefined;
            try {
                result = await handler(ctx);
            }
            catch (err) {
                succeeded = false;
                thrownError = err;
            }
            if (envelope.tracksCompletion) {
                await this.resource
                    .completeInstance(envelope.instanceId, {
                    status: succeeded ? "SUCCESS" : "FAILURE",
                    result: succeeded
                        ? sanitiseResult(result)
                        : { error: errorMessage(thrownError) },
                })
                    .match(() => undefined, (e) => {
                    this.onError?.(e, envelope);
                });
            }
            if (!succeeded)
                this.onError?.(thrownError, envelope);
        }
        finally {
            if (lock) {
                try {
                    await lock.release();
                }
                catch (e) {
                    this.onError?.(e, envelope);
                }
            }
        }
    }
}
// ── Helpers ────────────────────────────────────────────────────────────────
function unauthorized(error) {
    return { ok: false, status: 401, bodyJson: { error } };
}
function validateEnvelope(v) {
    if (!v || typeof v !== "object") {
        return { ok: false, error: "Envelope must be a JSON object" };
    }
    const o = v;
    const required = ["jobId", "jobCode", "instanceId", "firedAt", "triggerKind"];
    for (const k of required) {
        if (typeof o[k] !== "string") {
            return { ok: false, error: `Envelope missing string field '${k}'` };
        }
    }
    if (typeof o["tracksCompletion"] !== "boolean") {
        return { ok: false, error: "Envelope missing boolean field 'tracksCompletion'" };
    }
    const trigger = o["triggerKind"];
    if (trigger !== "CRON" && trigger !== "MANUAL") {
        return { ok: false, error: `Invalid triggerKind '${trigger}'` };
    }
    return {
        ok: true,
        envelope: {
            jobId: o["jobId"],
            jobCode: o["jobCode"],
            instanceId: o["instanceId"],
            scheduledFor: typeof o["scheduledFor"] === "string" ? o["scheduledFor"] : undefined,
            firedAt: o["firedAt"],
            triggerKind: trigger,
            correlationId: typeof o["correlationId"] === "string" ? o["correlationId"] : undefined,
            payload: o["payload"],
            tracksCompletion: o["tracksCompletion"],
            timeoutSeconds: typeof o["timeoutSeconds"] === "number" ? o["timeoutSeconds"] : undefined,
            concurrent: typeof o["concurrent"] === "boolean" ? o["concurrent"] : undefined,
        },
    };
}
function sanitiseResult(v) {
    // Small payload only — completion_result is JSONB but should not be huge.
    // Cap at ~10KB by JSON-stringifying and substringing if needed.
    try {
        const json = JSON.stringify(v);
        if (json.length > 10000) {
            return { truncated: true, preview: json.slice(0, 10000) };
        }
        return v;
    }
    catch {
        return { unserialisable: true };
    }
}
function errorMessage(e) {
    if (e instanceof Error)
        return e.message;
    if (typeof e === "string")
        return e;
    try {
        return JSON.stringify(e);
    }
    catch {
        return "Unknown error";
    }
}
