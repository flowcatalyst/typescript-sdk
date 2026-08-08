/**
 * Shape of FlowCatalyst access-token claims (both `authorization_code` and
 * `client_credentials` grants — they share the same claim envelope, so the
 * Fastify plugin treats both flows identically).
 *
 * Source of truth: `crates/fc-platform/src/auth/auth_service.rs::AccessTokenClaims`.
 */
import type { JWTPayload } from "jose";
import type { PrincipalSnapshot, PrincipalType } from "../principal.js";
export interface FcAccessTokenClaims extends JWTPayload {
    sub: string;
    iss: string;
    aud: string | string[];
    exp: number;
    iat: number;
    type: PrincipalType;
    scope: "ANCHOR" | "PARTNER" | "CLIENT";
    name: string;
    email?: string;
    clients: string[];
    roles: string[];
    applications: string[];
}
export declare function claimsToSnapshot(claims: FcAccessTokenClaims, mechanism: "session" | "bearer"): Omit<PrincipalSnapshot, "sessionData">;
//# sourceMappingURL=claims.d.ts.map