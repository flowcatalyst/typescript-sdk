/**
 * Ordering behavior within a message group.
 * - IMMEDIATE: no ordering, jobs dispatch concurrently (platform default)
 * - NEXT_ON_ERROR: FIFO per message group; a failed job is retried later but the group moves on
 * - BLOCK_ON_ERROR: strict FIFO per message group; a failed job blocks the group until resolved
 */
export type DispatchMode = "IMMEDIATE" | "NEXT_ON_ERROR" | "BLOCK_ON_ERROR";
export declare class CreateDispatchJobDto {
    readonly source: string;
    readonly code: string;
    readonly targetUrl: string;
    readonly payload: string;
    readonly dispatchPoolId: string;
    readonly subject: string | null;
    readonly correlationId: string | null;
    readonly eventId: string | null;
    readonly metadata: Record<string, string>;
    readonly headers: Record<string, string>;
    readonly payloadContentType: string;
    readonly dataOnly: boolean;
    readonly messageGroup: string | null;
    readonly mode: DispatchMode | null;
    readonly sequence: number | null;
    readonly timeoutSeconds: number;
    readonly maxRetries: number;
    readonly retryStrategy: string | null;
    readonly scheduledFor: Date | null;
    readonly expiresAt: Date | null;
    readonly idempotencyKey: string | null;
    readonly externalId: string | null;
    readonly connectionId: string | null;
    private constructor();
    /**
     * Create a new dispatch job DTO.
     *
     * @param code - Fully qualified `application:subdomain:aggregate:action`
     *   code — the platform facets on its segments and resolves delivery
     *   signing credentials from the application segment; bare codes are
     *   rejected.
     * @param payload - The payload string. If you have an object, JSON.stringify it first.
     */
    static create(source: string, code: string, targetUrl: string, payload: string | Record<string, unknown>, dispatchPoolId: string): CreateDispatchJobDto;
    withSubject(subject: string): CreateDispatchJobDto;
    withCorrelationId(correlationId: string): CreateDispatchJobDto;
    withEventId(eventId: string): CreateDispatchJobDto;
    withMetadata(metadata: Record<string, string>): CreateDispatchJobDto;
    withHeaders(headers: Record<string, string>): CreateDispatchJobDto;
    withPayloadContentType(payloadContentType: string): CreateDispatchJobDto;
    withDataOnly(dataOnly: boolean): CreateDispatchJobDto;
    withMessageGroup(messageGroup: string): CreateDispatchJobDto;
    /** Ordering behavior within the message group; unset defaults to IMMEDIATE on the platform. */
    withMode(mode: DispatchMode): CreateDispatchJobDto;
    withSequence(sequence: number): CreateDispatchJobDto;
    withTimeoutSeconds(timeoutSeconds: number): CreateDispatchJobDto;
    withMaxRetries(maxRetries: number): CreateDispatchJobDto;
    withRetryStrategy(retryStrategy: string): CreateDispatchJobDto;
    withScheduledFor(scheduledFor: Date): CreateDispatchJobDto;
    withExpiresAt(expiresAt: Date): CreateDispatchJobDto;
    withIdempotencyKey(idempotencyKey: string): CreateDispatchJobDto;
    withExternalId(externalId: string): CreateDispatchJobDto;
    withConnectionId(connectionId: string): CreateDispatchJobDto;
    /** Build the dispatch job payload for the outbox. Filters out null values. */
    toPayload(): Record<string, unknown>;
    private toParams;
}
//# sourceMappingURL=create-dispatch-job-dto.d.ts.map