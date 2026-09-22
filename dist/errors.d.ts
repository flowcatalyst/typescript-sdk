/**
 * SDK Error Types
 *
 * Discriminated union types for typed error handling with neverthrow.
 * All errors have a `type` field for pattern matching.
 */
/** Authentication errors */
export type AuthenticationError = {
    type: "missing_credentials";
    message: string;
} | {
    type: "invalid_credentials";
    message: string;
} | {
    type: "token_expired";
    message: string;
} | {
    type: "token_fetch_failed";
    message: string;
    cause?: Error;
};
/** HTTP/Network errors */
export type HttpError = {
    type: "network";
    message: string;
    cause?: Error;
} | {
    type: "timeout";
    message: string;
    durationMs: number;
} | {
    type: "http_error";
    status: number;
    message: string;
    body?: unknown;
};
/** Validation errors (422) */
export type ValidationError = {
    type: "validation";
    message: string;
    errors: Record<string, string[]>;
};
/** Not found errors (404) */
export type NotFoundError = {
    type: "not_found";
    message: string;
    resource?: string;
    id?: string;
};
/** Forbidden errors (403) */
export type ForbiddenError = {
    type: "forbidden";
    message: string;
};
/** Conflict errors (409) */
export type ConflictError = {
    type: "conflict";
    message: string;
    code?: string;
};
/** Rate limit errors (429) */
export type RateLimitError = {
    type: "rate_limited";
    message: string;
    retryAfterMs?: number;
};
/**
 * A multi-step operation (currently: `DefinitionSynchronizer.sync()` /
 * `syncGrouped()` / `syncAll()`) completed the whole call but one or more of
 * its steps failed. Generic over the shape of "whatever succeeded" — a
 * caller must not be forced to discard good work just because part of a
 * batch failed, so the partial result rides on the error itself rather than
 * being lost when the call fails loud.
 *
 * Deliberately NOT part of the base `SdkError` union: `partial` is only
 * meaningfully typed per call site (e.g. `SyncResult` for `sync()`,
 * `SyncResult[]` for `syncAll()`), and folding it into `SdkError` would
 * either lose that typing (widen `partial` to `unknown` everywhere) or force
 * every unrelated `SdkError` consumer to account for a variant it can't
 * produce. Operations that can return this instead widen their own return
 * type, e.g. `ResultAsync<SyncResult, SdkError | PartialFailureError<SyncResult>>`.
 */
export type PartialFailureError<T> = {
    type: "partial_failure";
    message: string;
    partial: T;
};
/** Union of all SDK errors */
export type SdkError = AuthenticationError | HttpError | ValidationError | NotFoundError | ForbiddenError | ConflictError | RateLimitError;
/**
 * Create an authentication error
 */
export declare const authError: {
    missingCredentials: (message?: string) => AuthenticationError;
    invalidCredentials: (message?: string) => AuthenticationError;
    tokenExpired: (message?: string) => AuthenticationError;
    tokenFetchFailed: (message: string, cause?: Error) => AuthenticationError;
};
/**
 * Create an HTTP error
 */
export declare const httpError: {
    network: (message: string, cause?: Error) => HttpError;
    timeout: (durationMs: number) => HttpError;
    http: (status: number, message: string, body?: unknown) => HttpError;
};
/**
 * Create a validation error from API response
 */
export declare const validationError: (message: string, errors?: Record<string, string[]>) => ValidationError;
/**
 * Create a not found error
 */
export declare const notFoundError: (message: string, resource?: string, id?: string) => NotFoundError;
/**
 * Create a forbidden error
 */
export declare const forbiddenError: (message?: string) => ForbiddenError;
/**
 * Create a conflict error
 */
export declare const conflictError: (message: string, code?: string) => ConflictError;
/**
 * Create a rate limit error
 */
export declare const rateLimitError: (message: string, retryAfterMs?: number) => RateLimitError;
/**
 * Create a partial-failure error, carrying whatever succeeded so it isn't
 * lost when the overall call reports failure. See {@link PartialFailureError}.
 */
export declare function partialFailureError<T>(message: string, partial: T): PartialFailureError<T>;
/** Narrow an error to a {@link PartialFailureError}, recovering its `partial` payload's type. */
export declare function isPartialFailureError<T>(error: unknown): error is PartialFailureError<T>;
/**
 * Map HTTP status code to appropriate error
 */
export declare function mapHttpStatusToError(status: number, body?: unknown, message?: string): SdkError;
//# sourceMappingURL=errors.d.ts.map