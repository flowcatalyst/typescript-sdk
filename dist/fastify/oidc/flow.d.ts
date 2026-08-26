/**
 * OIDC authorization-code flow with PKCE.
 *
 *   GET  /auth/login    — generate PKCE + state, stash in transient cookie, 302 to authorize
 *   GET  /auth/callback — exchange code, verify id_token, return tokens to caller
 *
 * The plugin wires these handlers into Fastify; this module only does the
 * crypto and the network call.
 */
import { createOidcClient, type OidcEndpoints } from "./discovery.js";
import { type FcAccessTokenClaims } from "./claims.js";
export interface AuthCodeBag {
    state: string;
    codeVerifier: string;
    returnTo: string;
}
export declare function generateAuthCodeBag(returnTo: string): AuthCodeBag;
export declare function buildAuthorizeUrl(opts: {
    endpoints: OidcEndpoints;
    clientId: string;
    redirectUri: string;
    scope: string;
    bag: AuthCodeBag;
    prompt?: string;
    /**
     * FlowCatalyst client identifier (URL-safe slug) whose login branding the
     * sign-in pages should wear. Purely cosmetic: the platform falls back to
     * its own theme when this is absent or unrecognised, and it never affects
     * who may sign in or what they may access.
     */
    client?: string;
}): Promise<string>;
export interface TokenExchangeResult {
    accessToken: string;
    accessTokenExpiresAt: number;
    refreshToken?: string;
    /** Raw ID token, when the exchange returned one (`openid` scope). */
    idToken?: string;
    /**
     * Claims the principal should be built from: the access token's, with the
     * ID token's authority overlaid when one was returned. See
     * {@link mergeIdTokenAuthority} — on the platform's default identity token
     * the ID token is the ONLY place the user's roles appear.
     */
    claims: FcAccessTokenClaims;
}
export declare function exchangeCode(opts: {
    endpoints: OidcEndpoints;
    clientId: string;
    clientSecret: string;
    redirectUri: string;
    code: string;
    codeVerifier: string;
}): Promise<TokenExchangeResult>;
export declare function refreshAccessToken(opts: {
    endpoints: OidcEndpoints;
    clientId: string;
    clientSecret: string;
    refreshToken: string;
}): Promise<TokenExchangeResult>;
export { createOidcClient };
//# sourceMappingURL=flow.d.ts.map