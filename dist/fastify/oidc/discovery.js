/**
 * OIDC discovery + JWKS cache.
 *
 * Lazy first-use fetch of `{baseUrl}/.well-known/openid-configuration`.
 * JWKS is cached by `jose.createRemoteJWKSet` with its own refresh policy
 * (cooldown + rotation tolerance). We expose only the bits the plugin
 * needs — token, authorize, end-session endpoints + a verifier callable.
 */
import { createRemoteJWKSet, jwtVerify } from "jose";
export function createOidcClient(opts) {
    let pending;
    return {
        endpoints() {
            if (!pending) {
                pending = { endpoints: load(opts.baseUrl, opts.expectedAudience) };
            }
            return pending.endpoints;
        },
    };
}
async function load(baseUrl, expectedAudience) {
    const url = `${stripSlash(baseUrl)}/.well-known/openid-configuration`;
    const res = await fetch(url, { headers: { Accept: "application/json" } });
    if (!res.ok) {
        throw new Error(`OIDC discovery failed: ${res.status} ${res.statusText} (${url})`);
    }
    const doc = (await res.json());
    if (!doc.issuer || !doc.token_endpoint || !doc.authorization_endpoint || !doc.jwks_uri) {
        throw new Error("OIDC discovery document missing required fields");
    }
    const jwks = createRemoteJWKSet(new URL(doc.jwks_uri));
    return {
        issuer: doc.issuer,
        authorizationEndpoint: doc.authorization_endpoint,
        tokenEndpoint: doc.token_endpoint,
        ...(doc.end_session_endpoint
            ? { endSessionEndpoint: doc.end_session_endpoint }
            : {}),
        async verify(token) {
            const { payload } = await jwtVerify(token, jwks, {
                issuer: doc.issuer,
                ...(expectedAudience ? { audience: expectedAudience } : {}),
            });
            return payload;
        },
    };
}
function stripSlash(s) {
    return s.endsWith("/") ? s.slice(0, -1) : s;
}
