/**
 * Shape of FlowCatalyst token claims, and the mapping to a principal.
 *
 * Source of truth: the Go platform's
 * `internal/platform/auth/authservice` — `AccessTokenClaims` and
 * `IDTokenClaims`. Layout note: the tenancy tier lives in `tier`
 * ("ANCHOR" | "PARTNER" | "CLIENT"); `scope` is the OPTIONAL granted OAuth
 * scope — a space-delimited permission list. Legacy tokens from older
 * platform versions carried the tier IN `scope`; the mapper below accepts
 * both layouts.
 *
 * ## The identity/API token split
 *
 * An `authorization_code` login mints an IDENTITY access token by default:
 * it proves who signed in and carries NO authority — no scope, no roles, no
 * applications, no client access. The platform API rejects it, so a user
 * signing in cannot hand the app an API credential. The user's real
 * authority travels on the **ID token**, narrowed to the applications the
 * OAuth client is scoped to.
 *
 * A first-party client flagged `apiAccess` mints an authority-bearing access
 * token on the same flow (also narrowed to the client's applications). Both
 * shapes are handled: {@link mergeIdTokenAuthority} overlays the ID token's
 * authority onto the access token's identity, so the resulting principal is
 * correct either way, and `client_credentials` (which has no ID token) is
 * untouched.
 */
/**
 * Overlay an interactive login's ID-token authority onto its access-token
 * identity, yielding the claims the principal should be built from.
 *
 * The ID token wins on tier and on every authority list, because on the
 * default identity access token those are empty and on an `apiAccess` client
 * both tokens carry the same narrowed set. The access token keeps `name`
 * (always present there, optional on the ID token) and `scope` (an API-plane
 * concept the ID token does not carry).
 *
 * @throws if the two tokens describe different subjects — they are minted
 * from one principal in the same exchange, so a mismatch means they did not
 * come from the same login and neither can be trusted.
 */
export function mergeIdTokenAuthority(access, id) {
    if (access.sub !== id.sub) {
        throw new Error("OIDC token mismatch: id_token subject differs from access_token subject");
    }
    return {
        ...access,
        ...(id.tier ? { tier: id.tier } : {}),
        ...(id.name ? { name: id.name } : {}),
        ...(id.email ? { email: id.email } : {}),
        clients: id.clients ?? access.clients,
        roles: id.roles ?? access.roles,
        applications: id.applications ?? access.applications,
        all_applications: id.all_applications ?? access.all_applications,
        ...(id.portal_client_id ? { portal_client_id: id.portal_client_id } : {}),
        ...(id.portal_app_code ? { portal_app_code: id.portal_app_code } : {}),
        ...(id.portal_app_id ? { portal_app_id: id.portal_app_id } : {}),
    };
}
const TIERS = new Set(["ANCHOR", "PARTNER", "CLIENT"]);
export function claimsToSnapshot(claims, mechanism) {
    // Tier: the platform's `tier` claim; fall back to a legacy
    // `scope`-as-tier value; a "*" clients entry also marks anchor. Default
    // CLIENT (the least authority) when nothing identifies the tier —
    // `scope` on modern tokens holds permission scopes, not the tier, and
    // may be absent entirely.
    const legacyTier = typeof claims.scope === "string" && TIERS.has(claims.scope)
        ? claims.scope
        : undefined;
    const tier = claims.tier ??
        legacyTier ??
        ((claims.clients ?? []).includes("*") ? "ANCHOR" : "CLIENT");
    const scope = tier.toLowerCase();
    return {
        id: claims.sub,
        type: claims.type,
        scope,
        name: claims.name,
        ...(claims.email ? { email: claims.email } : {}),
        clients: claims.clients ?? [],
        ...parseClientsClaim(claims.clients),
        roles: claims.roles ?? [],
        ...parseApplicationsClaim(claims.applications, claims.all_applications),
        ...(claims.portal_client_id
            ? {
                portal: {
                    clientId: claims.portal_client_id,
                    ...(claims.portal_app_code ? { appCode: claims.portal_app_code } : {}),
                    ...(claims.portal_app_id ? { appId: claims.portal_app_id } : {}),
                },
            }
            : {}),
        mechanism,
    };
}
/**
 * Split the `applications` claim into the shape app code actually wants.
 *
 * The claim carries `"{id}:{code}"` pairs — mirroring `clients` — or the
 * single `"*"` sentinel for a principal that reaches every application. Bare
 * ids (the form minted before pairs existed) are still accepted, so a token
 * issued just before a platform upgrade keeps working for its TTL.
 *
 * `deprecatedAllApplications` is the legacy `all_applications` boolean; it is
 * OR-ed with the sentinel so this reads correctly against either a platform
 * that emits `"*"` or one that only sets the boolean.
 */
export function parseApplicationsClaim(entries, deprecatedAllApplications) {
    const applications = [];
    const applicationCodes = [];
    let allApplications = deprecatedAllApplications === true;
    for (const entry of entries ?? []) {
        if (entry === "*") {
            allApplications = true;
            continue;
        }
        // First colon only: an application code containing one stays intact.
        const i = entry.indexOf(":");
        if (i > 0) {
            applications.push(entry.slice(0, i));
            applicationCodes.push(entry.slice(i + 1));
        }
        else if (entry) {
            applications.push(entry);
        }
    }
    return { applications, applicationCodes, allApplications };
}
/**
 * Split the `clients` claim into id/code halves, mirroring
 * {@link parseApplicationsClaim}. `clients` itself is left as the raw claim
 * on the snapshot (anchor detection reads the `"*"` sentinel off it
 * directly), so only the parsed halves are returned here — the `"*"`
 * sentinel is dropped rather than pushed into either list.
 */
export function parseClientsClaim(entries) {
    const clientIds = [];
    const clientCodes = [];
    for (const entry of entries ?? []) {
        if (entry === "*")
            continue;
        // First colon only: a client code containing one stays intact.
        const i = entry.indexOf(":");
        if (i > 0) {
            clientIds.push(entry.slice(0, i));
            clientCodes.push(entry.slice(i + 1));
        }
        else if (entry) {
            clientIds.push(entry);
        }
    }
    return { clientIds, clientCodes };
}
