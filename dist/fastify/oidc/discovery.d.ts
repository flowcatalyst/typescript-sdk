/**
 * OIDC discovery + JWKS cache.
 *
 * Lazy first-use fetch of `{baseUrl}/.well-known/openid-configuration`.
 * JWKS is cached by `jose.createRemoteJWKSet` with its own refresh policy
 * (cooldown + rotation tolerance). We expose only the bits the plugin
 * needs — token, authorize, end-session endpoints + a verifier callable.
 */
import { type JWTPayload } from "jose";
export interface DiscoveryDoc {
    issuer: string;
    authorization_endpoint: string;
    token_endpoint: string;
    jwks_uri: string;
    end_session_endpoint?: string;
    userinfo_endpoint?: string;
    introspection_endpoint?: string;
    revocation_endpoint?: string;
}
/**
 * `token_use` values an access token may carry to be accepted here: `api`
 * (authority-bearing), `identity` (login proof, no authority) or absent
 * (older platform versions). Anything else (notably `field`, the
 * field-worker plane) is refused: a token minted for another plane must
 * never authenticate as a platform principal, whatever its `aud`.
 */
export declare const ACCEPTED_TOKEN_USE: readonly string[];
export declare function assertAccessTokenUse(payload: JWTPayload): void;
export interface OidcEndpoints {
    issuer: string;
    authorizationEndpoint: string;
    tokenEndpoint: string;
    endSessionEndpoint?: string;
    verify: (token: string) => Promise<JWTPayload>;
    /**
     * Verify an ID token. Distinct from {@link verify} because the two have
     * different audiences: an access token is addressed to the platform API
     * (`expectedAudience`), while an ID token is addressed to the relying
     * party — OIDC Core §3.1.3.7 requires `aud` to contain the client_id.
     * Passing an ID token to `verify` would fail whenever `expectedAudience`
     * is configured, and would skip the client check when it is not.
     */
    verifyIdToken: (token: string, clientId: string) => Promise<JWTPayload>;
}
export declare function createOidcClient(opts: {
    baseUrl: string;
    expectedAudience?: string;
    /**
     * Override the discovered authorization endpoint. Portal-plane logins
     * (docs/portal-identity-plan.md) enter through `/portal/authorize`
     * instead of the discovered `/oauth/authorize`; the token endpoint and
     * JWKS stay as discovered.
     */
    authorizationEndpoint?: string;
}): {
    endpoints(): Promise<OidcEndpoints>;
};
//# sourceMappingURL=discovery.d.ts.map