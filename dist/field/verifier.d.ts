/**
 * Field-worker token verification.
 *
 * A field worker signs in from an enrolled device with a PIN at the
 * platform's `/field/*`; the platform issues a short RS256 access token
 * (JOSE `typ: fc-field+jwt`, `token_use: "field"`, `aud` = app code) bound to
 * the device key (`cnf.jkt`). The app backend verifies, per request, the token
 * AND a DPoP proof (ES256 JWS) signed by the same device key:
 *
 *   Authorization: DPoP <token>
 *   DPoP: <proof>
 *
 * PINs never reach app backends; this module only verifies. Mirrors the Go
 * SDK's `auth.FieldTokenVerifier` (same checks, same refusal reasons). Nonce
 * checking is not done here; the proof's iat window is the replay bound.
 */
import { type JWTVerifyGetKey } from "jose";
/** Stable refusal reasons; the shared fixtures (api/field-fixtures) expect these strings. */
export declare const FieldReason: {
    readonly Malformed: "malformed";
    readonly WrongTyp: "wrong_typ";
    readonly WrongTokenUse: "wrong_token_use";
    readonly WrongAud: "wrong_aud";
    readonly Expired: "expired";
    readonly InvalidToken: "invalid_token";
    readonly PCR: "pcr";
    readonly MissingProof: "missing_proof";
    readonly InvalidProof: "invalid_proof";
    readonly JKTMismatch: "jkt_mismatch";
    readonly HTMMismatch: "htm_mismatch";
    readonly HTUMismatch: "htu_mismatch";
    readonly ATHMismatch: "ath_mismatch";
    readonly StaleProof: "stale_proof";
};
export type FieldReasonCode = (typeof FieldReason)[keyof typeof FieldReason];
/** A refused field credential. `reason` is one of {@link FieldReason}. */
export declare class FieldError extends Error {
    readonly reason: FieldReasonCode;
    readonly detail: string;
    constructor(reason: FieldReasonCode, detail?: string);
}
/**
 * Discovery or key fetch failed: not a verdict on the credential. Callers
 * should answer 503, not 401.
 */
export declare class FieldVerifierUnavailableError extends Error {
    constructor(message: string, options?: {
        cause?: unknown;
    });
}
export interface FieldTokenVerifierConfig {
    /** FlowCatalyst base URL and the tokens' `iss` claim. */
    issuer: string;
    /** This application's code; tokens must be addressed to it (`aud`). */
    appCode: string;
    /** Skip OIDC discovery and fetch keys from this URL. */
    jwksUrl?: string;
    /**
     * Supply the key resolver directly (e.g. `createLocalJWKSet`), bypassing
     * discovery and fetching. Used by tests and offline fixtures.
     */
    keys?: JWTVerifyGetKey;
    /** Transport for discovery (default: global `fetch`). */
    fetch?: typeof fetch;
    /** exp/nbf skew in seconds (default 60). */
    clockSkewSeconds?: number;
    /**
     * How far a proof's iat may be from now, either way, in seconds
     * (default 300). Widen it for devices with bad clocks.
     */
    proofMaxAgeSeconds?: number;
    /** Override the clock (tests, fixtures). */
    now?: () => Date;
}
/** A verified field worker on a verified device. */
export interface FieldPrincipal {
    workerId: string;
    clientId: string;
    clientIdentifier: string;
    workerCode: string;
    name: string;
    appCode: string;
    deviceId: string;
    deviceMode: string;
    /** The login family (`sid`). */
    sessionId: string;
    amr: string[];
    authTime: Date;
    expiresAt: Date;
    /** Thumbprint of the device key the request was proven with. */
    jkt: string;
    tokenId: string;
}
export declare class FieldTokenVerifier {
    private readonly cfg;
    private readonly fetchFn;
    private readonly explicitJwksUrl;
    private keys;
    private pendingKeys;
    constructor(config: FieldTokenVerifierConfig);
    private resolveKeys;
    /**
     * Check a request's credentials: the `Authorization` header (`DPoP
     * <token>`), the `DPoP` proof header, and the request's method and full
     * URL (scheme, host and path; any query is ignored). Resolves with the
     * verified principal, or rejects with a {@link FieldError} naming the
     * reason. Discovery/key-fetch failures reject with
     * {@link FieldVerifierUnavailableError}.
     */
    verify(authorizationHeader: string | undefined, dpopHeader: string | undefined, method: string, requestUrl: string): Promise<FieldPrincipal>;
}
/** Convenience: build a verifier and verify once. */
export declare function verifyFieldToken(config: FieldTokenVerifierConfig, authorizationHeader: string | undefined, dpopHeader: string | undefined, method: string, requestUrl: string): Promise<FieldPrincipal>;
//# sourceMappingURL=verifier.d.ts.map