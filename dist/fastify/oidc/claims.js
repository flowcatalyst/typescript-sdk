/**
 * Shape of FlowCatalyst access-token claims (both `authorization_code` and
 * `client_credentials` grants — they share the same claim envelope, so the
 * Fastify plugin treats both flows identically).
 *
 * Source of truth: `crates/fc-platform/src/auth/auth_service.rs::AccessTokenClaims`.
 */
export function claimsToSnapshot(claims, mechanism) {
    const scope = claims.scope.toLowerCase();
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
