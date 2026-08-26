/**
 * OIDC authorization-code flow with PKCE.
 *
 *   GET  /auth/login    — generate PKCE + state, stash in transient cookie, 302 to authorize
 *   GET  /auth/callback — exchange code, verify id_token, return tokens to caller
 *
 * The plugin wires these handlers into Fastify; this module only does the
 * crypto and the network call.
 */
import { createOidcClient } from "./discovery.js";
import { mergeIdTokenAuthority } from "./claims.js";
const PKCE_LENGTH = 64;
const STATE_LENGTH = 16;
export function generateAuthCodeBag(returnTo) {
    return {
        state: randomB64u(STATE_LENGTH),
        codeVerifier: randomB64u(PKCE_LENGTH),
        returnTo,
    };
}
export async function buildAuthorizeUrl(opts) {
    const challenge = await s256(opts.bag.codeVerifier);
    const params = new URLSearchParams({
        response_type: "code",
        client_id: opts.clientId,
        redirect_uri: opts.redirectUri,
        scope: opts.scope,
        state: opts.bag.state,
        code_challenge: challenge,
        code_challenge_method: "S256",
    });
    if (opts.prompt)
        params.set("prompt", opts.prompt);
    if (opts.client)
        params.set("client", opts.client);
    return `${opts.endpoints.authorizationEndpoint}?${params.toString()}`;
}
export async function exchangeCode(opts) {
    const body = new URLSearchParams({
        grant_type: "authorization_code",
        code: opts.code,
        redirect_uri: opts.redirectUri,
        client_id: opts.clientId,
        client_secret: opts.clientSecret,
        code_verifier: opts.codeVerifier,
    });
    return tokenRequest(opts.endpoints, body, opts.clientId);
}
export async function refreshAccessToken(opts) {
    const body = new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: opts.refreshToken,
        client_id: opts.clientId,
        client_secret: opts.clientSecret,
    });
    return tokenRequest(opts.endpoints, body, opts.clientId);
}
async function tokenRequest(endpoints, body, clientId) {
    const res = await fetch(endpoints.tokenEndpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
        },
        body,
    });
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`OIDC token request failed: ${res.status} ${res.statusText} ${text}`);
    }
    const data = (await res.json());
    if (!data.access_token) {
        throw new Error("OIDC token response missing access_token");
    }
    const accessClaims = (await endpoints.verify(data.access_token));
    // An ID token, when present, is the authoritative source of the user's
    // roles: the platform's default interactive access token is identity-only.
    // A returned ID token that does not verify fails the exchange rather than
    // falling back — a session silently stripped of its roles is worse than a
    // failed login, and an unverifiable token is never evidence of anything.
    let claims = accessClaims;
    if (data.id_token) {
        const idClaims = (await endpoints.verifyIdToken(data.id_token, clientId));
        claims = mergeIdTokenAuthority(accessClaims, idClaims);
    }
    return {
        accessToken: data.access_token,
        accessTokenExpiresAt: Date.now() + data.expires_in * 1000,
        ...(data.refresh_token ? { refreshToken: data.refresh_token } : {}),
        ...(data.id_token ? { idToken: data.id_token } : {}),
        claims,
    };
}
function randomB64u(bytes) {
    return Buffer.from(crypto.getRandomValues(new Uint8Array(bytes))).toString("base64url");
}
async function s256(verifier) {
    const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(verifier));
    return Buffer.from(new Uint8Array(digest)).toString("base64url");
}
export { createOidcClient };
