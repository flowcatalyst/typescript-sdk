/**
 * Outbox types for transactional outbox pattern.
 *
 * Schema must match the outbox poller's expected format.
 * The poller reads from these tables and manages status transitions.
 */
/**
 * Outbox status codes matching the outbox poller.
 *
 * The wire contract uses SMALLINT status codes, NOT strings.
 * Only PENDING (0) is written by the SDK; all others are set by the poller.
 */
export const OutboxStatus = {
    /** Waiting to be processed. */
    PENDING: 0,
    /** Successfully sent to FlowCatalyst. */
    SUCCESS: 1,
    /** API returned 400 Bad Request (permanent failure). */
    BAD_REQUEST: 2,
    /** API returned 500 Internal Server Error (retryable). */
    INTERNAL_ERROR: 3,
    /** API returned 401 Unauthorized (retryable). */
    UNAUTHORIZED: 4,
    /** API returned 403 Forbidden (permanent failure). */
    FORBIDDEN: 5,
    /** API returned 502/503/504 Gateway Error (retryable). */
    GATEWAY_ERROR: 6,
    /** Currently being processed - crash recovery marker. */
    IN_PROGRESS: 9,
};
