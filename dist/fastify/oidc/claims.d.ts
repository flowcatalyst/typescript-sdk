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
 * from permission-less interactive logins). Legacy Rust-era tokens carried
 * the tier IN `scope`; the mapper below accepts both layouts.
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
    /** Tenancy tier (Go platform). Legacy Rust tokens carried this in `scope`. */
    tier?: "ANCHOR" | "PARTNER" | "CLIENT";
    /** Granted OAuth scope: space-delimited permission codes. Often absent. */
    scope?: string;
    name: string;
    email?: string;
    clients: string[];
    roles: string[];
    applications: string[];
}
export declare function claimsToSnapshot(claims: FcAccessTokenClaims, mechanism: "session" | "bearer"): Omit<PrincipalSnapshot, "sessionData">;
//# sourceMappingURL=claims.d.ts.map