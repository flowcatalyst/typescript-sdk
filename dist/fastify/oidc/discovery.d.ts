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
export interface OidcEndpoints {
    issuer: string;
    authorizationEndpoint: string;
    tokenEndpoint: string;
    endSessionEndpoint?: string;
    verify: (token: string) => Promise<JWTPayload>;
}
export declare function createOidcClient(opts: {
    baseUrl: string;
    expectedAudience?: string;
}): {
    endpoints(): Promise<OidcEndpoints>;
};
//# sourceMappingURL=discovery.d.ts.map