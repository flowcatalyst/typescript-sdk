/**
 * Shape of FlowCatalyst access-token claims (both `authorization_code` and
 * `client_credentials` grants — they share the same claim envelope, so the
 * Fastify plugin treats both flows identically).
 *
 * Source of truth: the Go platform's
 * `internal/platform/auth/authservice.AccessTokenClaims`. Layout note: the
 * tenancy tier lives in `tier` ("ANCHOR" | "PARTNER" | "CLIENT"); `scope`
 * is the OPTIONAL granted OAuth scope — a space-delimited permission list —
 * and is absent on tokens that carry no scope claim (e.g. identity tokens
 * from permission-less interactive logins). Legacy tokens from older
 * platform versions carried the tier IN `scope`; the mapper below accepts
 * both layouts.
 */
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
        roles: claims.roles ?? [],
        applications: claims.applications ?? [],
        mechanism,
    };
}
