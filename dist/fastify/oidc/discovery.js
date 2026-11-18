/**
 * OIDC discovery + JWKS cache.
 *
 * Lazy first-use fetch of `{baseUrl}/.well-known/openid-configuration`.
 * JWKS is cached by `jose.createRemoteJWKSet` with its own refresh policy
 * (cooldown + rotation tolerance). We expose only the bits the plugin
 * needs — token, authorize, end-session endpoints + a verifier callable.
 */
import { createRemoteJWKSet, jwtVerify } from "jose";
/**
 * `token_use` values an access token may carry to be accepted here: `api`
 * (authority-bearing), `identity` (login proof, no authority) or absent
 * (older platform versions). Anything else (notably `field`, the
 * field-worker plane) is refused: a token minted for another plane must
 * never authenticate as a platform principal, whatever its `aud`.
 */
export const ACCEPTED_TOKEN_USE = ["api", "identity"];
export function assertAccessTokenUse(payload) {
    const use = payload["token_use"];
    if (use === undefined)
        return;
    if (typeof use !== "string" || !ACCEPTED_TOKEN_USE.includes(use)) {
        throw new Error(`token_use ${String(use)} is not an access token for this plane`);
    }
}
/**
 * Refuse an ID-token-shaped JWT on the Bearer path. A token with a
 * `token_use` claim is classified by {@link assertAccessTokenUse}; one with
 * none is an older-platform access token OR an ID token (the platform's ID
 * tokens carry no `token_use`), told apart by the claims only an ID token
 * has: `nonce`, `auth_time`, `at_hash`, or `azp` equal to its single `aud`
 * (the OAuth client id the token was issued to).
 */
export function assertNotIdTokenShaped(payload) {
    const p = payload;
    if (p["token_use"] !== undefined)
        return;
    const aud = Array.isArray(p["aud"]) && p["aud"].length === 1 ? p["aud"][0] : p["aud"];
    const azpIsAud = typeof p["azp"] === "string" && typeof aud === "string" && p["azp"] === aud;
    if (p["nonce"] !== undefined ||
        p["auth_time"] !== undefined ||
        p["at_hash"] !== undefined ||
        azpIsAud) {
        throw new Error("ID token presented as a Bearer access token");
    }
}
export function createOidcClient(opts) {
    let pending;
    return {
        endpoints() {
            if (!pending) {
                const endpoints = load(opts.baseUrl, opts.expectedAudience, opts.authorizationEndpoint);
                // A rejected discovery must NOT stay memoized: with the platform
                // briefly unreachable, a poisoned memo would 500 every login in
                // this process until restart. Clear the memo on rejection (the
                // caller still sees the rejection) so the next call retries.
                endpoints.catch(() => {
                    if (pending?.endpoints === endpoints) {
                        pending = undefined;
                    }
                });
                pending = { endpoints };
            }
            return pending.endpoints;
        },
    };
}
async function load(baseUrl, expectedAudience, authorizationEndpointOverride) {
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
        authorizationEndpoint: authorizationEndpointOverride ?? doc.authorization_endpoint,
        tokenEndpoint: doc.token_endpoint,
        ...(doc.end_session_endpoint
            ? { endSessionEndpoint: doc.end_session_endpoint }
            : {}),
        async verify(token) {
            const { payload } = await jwtVerify(token, jwks, {
                issuer: doc.issuer,
                ...(expectedAudience ? { audience: expectedAudience } : {}),
            });
            assertAccessTokenUse(payload);
            return payload;
        },
        async verifyIdToken(token, clientId) {
            const { payload } = await jwtVerify(token, jwks, {
                issuer: doc.issuer,
                audience: clientId,
            });
            return payload;
        },
    };
}
function stripSlash(s) {
    return s.endsWith("/") ? s.slice(0, -1) : s;
}
