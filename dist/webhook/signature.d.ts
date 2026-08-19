/**
 * Verification for FlowCatalyst-signed deliveries: scheduled-job firings and
 * dispatch webhooks both carry
 *
 *   X-FlowCatalyst-Signature: hex(HMAC-SHA256(timestamp + rawBody, secret))
 *   X-FlowCatalyst-Timestamp: 2026-08-07T09:32:12.123Z   (ms-precision ISO8601)
 *
 * signed with your application service account's signing secret. Byte-format
 * matches the platform's router/dispatcher signers and the Laravel SDK's
 * WebhookValidator: 5-minute replay tolerance, 60-second future grace,
 * constant-time compare.
 *
 * The verifier is framework-agnostic — hand it the raw body and the two
 * header values from whatever HTTP framework hosts your runner. The body MUST
 * be the raw bytes as received (sign-then-parse; a re-serialised JSON body
 * will not verify).
 *
 *   // e.g. Fastify with a raw-body content-type parser
 *   verifyDeliverySignature({
 *     rawBody,
 *     signature: req.headers["x-flowcatalyst-signature"],
 *     timestamp: req.headers["x-flowcatalyst-timestamp"],
 *     secret: process.env.FLOWCATALYST_SIGNING_SECRET!,
 *   }); // throws WebhookSignatureError on any failure
 *   const result = await runner.process(JSON.parse(rawBody));
 */
export type WebhookSignatureErrorCode = "missing_secret" | "missing_signature" | "missing_timestamp" | "invalid_timestamp" | "timestamp_expired" | "timestamp_in_future" | "invalid_signature" | "missing_bearer" | "invalid_bearer";
/** Verification failure; `code` says exactly what to fix. */
export declare class WebhookSignatureError extends Error {
    readonly code: WebhookSignatureErrorCode;
    constructor(code: WebhookSignatureErrorCode, message: string);
}
export interface VerifyDeliverySignatureParams {
    /** Raw request body, exactly as received. */
    rawBody: string | Uint8Array;
    /** Value of the X-FlowCatalyst-Signature header. */
    signature: string | string[] | null | undefined;
    /** Value of the X-FlowCatalyst-Timestamp header. */
    timestamp: string | string[] | null | undefined;
    /** Your application service account's signing secret. */
    secret: string;
    /** Max age in seconds before a delivery is considered a replay. Default 300. */
    toleranceSeconds?: number;
    /**
     * Optional second gate, AND-ed with the signature (never a substitute for
     * it): when set, the delivery's Authorization header must be exactly
     * `Bearer <expectedBearerToken>` — your service account's webhook auth
     * token, sent by the platform alongside the signature.
     */
    expectedBearerToken?: string;
    /** Value of the Authorization header (required when expectedBearerToken is set). */
    authorization?: string | string[] | null | undefined;
}
/**
 * Verify a signed delivery; throws {@link WebhookSignatureError} on any
 * failure (fail-closed — an empty secret is an error, not a bypass).
 */
export declare function verifyDeliverySignature(params: VerifyDeliverySignatureParams): void;
//# sourceMappingURL=signature.d.ts.map