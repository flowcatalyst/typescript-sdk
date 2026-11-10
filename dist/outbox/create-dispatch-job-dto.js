/**
 * DTO for creating a dispatch job in the outbox.
 *
 * Uses an immutable builder pattern - all `with*()` methods return a new instance.
 *
 * @example
 * ```typescript
 * const job = CreateDispatchJobDto
 *   .create('order-service', 'shop:orders:order:process', 'https://api.example.com/webhook', '{"orderId":"123"}', 'pool-1')
 *   .withCorrelationId('corr-789')
 *   .withTimeoutSeconds(60);
 * ```
 *
 * The payload is an item of `POST /api/dispatch-jobs/batch`. Fields the
 * platform does not honour on that route are kept for source compatibility but
 * are NOT sent: `headers`, `retryStrategy`, `scheduledFor` and `expiresAt` (and
 * their withers). Setting them has no effect.
 */
import { assertQualifiedCode } from "./qualified-code.js";
export class CreateDispatchJobDto {
    constructor(params) {
        this.source = params.source;
        this.code = params.code;
        this.targetUrl = params.targetUrl;
        this.payload = params.payload;
        this.dispatchPoolId = params.dispatchPoolId;
        this.subject = params.subject ?? null;
        this.correlationId = params.correlationId ?? null;
        this.eventId = params.eventId ?? null;
        this.metadataPairs = params.metadataPairs ?? [];
        this.headers = params.headers ?? {};
        this.payloadContentType = params.payloadContentType ?? "application/json";
        this.dataOnly = params.dataOnly ?? true;
        this.messageGroup = params.messageGroup ?? null;
        this.mode = params.mode ?? null;
        this.sequence = params.sequence ?? null;
        this.timeoutSeconds = params.timeoutSeconds ?? 30;
        this.maxRetries = params.maxRetries ?? 5;
        this.retryStrategy = params.retryStrategy ?? null;
        this.scheduledFor = params.scheduledFor ?? null;
        this.expiresAt = params.expiresAt ?? null;
        this.idempotencyKey = params.idempotencyKey ?? null;
        this.externalId = params.externalId ?? null;
        this.connectionId = params.connectionId ?? null;
        this.queue = params.queue ?? null;
    }
    /**
     * Create a new dispatch job DTO.
     *
     * @param code - Fully qualified `application:subdomain:aggregate:action`
     *   code — the platform facets on its segments and resolves delivery
     *   signing credentials from the application segment; bare codes are
     *   rejected.
     * @param payload - The payload string. If you have an object, JSON.stringify it first.
     */
    static create(source, code, targetUrl, payload, dispatchPoolId) {
        assertQualifiedCode(code, "Dispatch job code");
        return new CreateDispatchJobDto({
            source,
            code,
            targetUrl,
            payload: typeof payload === "string" ? payload : JSON.stringify(payload),
            dispatchPoolId,
        });
    }
    withSubject(subject) {
        return new CreateDispatchJobDto({ ...this.toParams(), subject });
    }
    withCorrelationId(correlationId) {
        return new CreateDispatchJobDto({ ...this.toParams(), correlationId });
    }
    withEventId(eventId) {
        return new CreateDispatchJobDto({ ...this.toParams(), eventId });
    }
    /** The metadata as an object (a view: JavaScript orders integer-like keys first). */
    get metadata() {
        return Object.fromEntries(this.metadataPairs);
    }
    withMetadata(keyOrMetadata, value) {
        const added = typeof keyOrMetadata === "string"
            ? [[keyOrMetadata, value ?? ""]]
            : Object.entries(keyOrMetadata);
        const pairs = this.metadataPairs.map(([k, v]) => [k, v]);
        for (const [k, v] of added) {
            const at = pairs.findIndex(([existing]) => existing === k);
            if (at >= 0)
                pairs[at] = [k, v];
            else
                pairs.push([k, v]);
        }
        return new CreateDispatchJobDto({ ...this.toParams(), metadataPairs: pairs });
    }
    /** @deprecated Not sent: the platform does not take per-job headers. Kept so existing callers compile. */
    withHeaders(headers) {
        return new CreateDispatchJobDto({
            ...this.toParams(),
            headers: { ...this.headers, ...headers },
        });
    }
    withPayloadContentType(payloadContentType) {
        return new CreateDispatchJobDto({ ...this.toParams(), payloadContentType });
    }
    withDataOnly(dataOnly) {
        return new CreateDispatchJobDto({ ...this.toParams(), dataOnly });
    }
    withMessageGroup(messageGroup) {
        return new CreateDispatchJobDto({ ...this.toParams(), messageGroup });
    }
    /** Ordering behavior within the message group; unset defaults to NEXT_ON_ERROR on the platform (in-sequence, moving on past a failure). */
    withMode(mode) {
        return new CreateDispatchJobDto({ ...this.toParams(), mode });
    }
    withSequence(sequence) {
        return new CreateDispatchJobDto({ ...this.toParams(), sequence });
    }
    withTimeoutSeconds(timeoutSeconds) {
        return new CreateDispatchJobDto({ ...this.toParams(), timeoutSeconds });
    }
    withMaxRetries(maxRetries) {
        return new CreateDispatchJobDto({ ...this.toParams(), maxRetries });
    }
    /** @deprecated Not sent: the batch route does not take one. Kept so existing callers compile. */
    withRetryStrategy(retryStrategy) {
        return new CreateDispatchJobDto({ ...this.toParams(), retryStrategy });
    }
    /**
     * @deprecated Not sent: the batch route has no scheduledFor, so the job is
     * created for immediate dispatch. Kept so existing callers compile.
     */
    withScheduledFor(scheduledFor) {
        return new CreateDispatchJobDto({ ...this.toParams(), scheduledFor });
    }
    /** @deprecated Not sent: the batch route does not take one. Kept so existing callers compile. */
    withExpiresAt(expiresAt) {
        return new CreateDispatchJobDto({ ...this.toParams(), expiresAt });
    }
    /**
     * Makes the create idempotent: the first job with a key, within its
     * application (the code's first segment) and client, wins it; a repeat
     * answers that job's id and creates nothing. At most 100 characters.
     */
    withIdempotencyKey(idempotencyKey) {
        return new CreateDispatchJobDto({ ...this.toParams(), idempotencyKey });
    }
    withExternalId(externalId) {
        return new CreateDispatchJobDto({ ...this.toParams(), externalId });
    }
    /**
     * The connection the job is delivered through: pausing it holds the job,
     * and (with no subscription) its service account signs the delivery.
     * Must be global or the job's client's, shared or the job's application's.
     */
    withConnectionId(connectionId) {
        return new CreateDispatchJobDto({ ...this.toParams(), connectionId });
    }
    /**
     * The job's own dispatch priority: `DEFAULT` or `HIGH_PRIORITY`, matched
     * ignoring case. Unset stays absent — never silently defaulted — so "not
     * asked for" stays distinguishable from an explicit `DEFAULT`. Wins over
     * the target subscription's own priority at publish time when set.
     *
     * Not validated here: the platform rejects an invalid value, and
     * duplicating that check client-side would just be another place to drift.
     */
    withQueue(queue) {
        return new CreateDispatchJobDto({ ...this.toParams(), queue });
    }
    /** Build the dispatch job payload for the outbox. Filters out null values. */
    toPayload() {
        return filterNulls({
            source: this.source,
            code: this.code,
            targetUrl: this.targetUrl,
            payload: this.payload,
            payloadContentType: this.payloadContentType,
            dispatchPoolId: this.dispatchPoolId,
            subject: this.subject,
            correlationId: this.correlationId,
            eventId: this.eventId,
            // The platform takes a list of {key, value}; an object fails the whole batch.
            metadata: this.metadataPairs.length > 0
                ? this.metadataPairs.map(([key, value]) => ({ key, value: String(value) }))
                : null,
            dataOnly: this.dataOnly,
            messageGroup: this.messageGroup,
            mode: this.mode,
            sequence: this.sequence,
            timeoutSeconds: this.timeoutSeconds,
            maxRetries: this.maxRetries,
            idempotencyKey: this.idempotencyKey,
            externalId: this.externalId,
            connectionId: this.connectionId,
            queue: this.queue,
        });
    }
    toParams() {
        return {
            source: this.source,
            code: this.code,
            targetUrl: this.targetUrl,
            payload: this.payload,
            dispatchPoolId: this.dispatchPoolId,
            subject: this.subject,
            correlationId: this.correlationId,
            eventId: this.eventId,
            metadataPairs: this.metadataPairs,
            headers: this.headers,
            payloadContentType: this.payloadContentType,
            dataOnly: this.dataOnly,
            messageGroup: this.messageGroup,
            mode: this.mode,
            sequence: this.sequence,
            timeoutSeconds: this.timeoutSeconds,
            maxRetries: this.maxRetries,
            retryStrategy: this.retryStrategy,
            scheduledFor: this.scheduledFor,
            expiresAt: this.expiresAt,
            idempotencyKey: this.idempotencyKey,
            externalId: this.externalId,
            connectionId: this.connectionId,
            queue: this.queue,
        };
    }
}
function filterNulls(obj) {
    const result = {};
    for (const [key, value] of Object.entries(obj)) {
        if (value !== null && value !== undefined) {
            result[key] = value;
        }
    }
    return result;
}
