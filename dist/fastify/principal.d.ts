/**
 * Principal — the authenticated identity available on every request after
 * the {@link flowcatalystAuth} plugin runs.
 *
 * Built identically for both session (cookie) and Bearer (API) callers so
 * route code never has to branch on auth mechanism.
 *
 * Roles come from the FlowCatalyst access token; permissions are resolved
 * locally by the {@link defineRbac} catalogue. See `./rbac.ts`.
 */
import type { RbacCatalogue } from "./rbac.js";
export type PrincipalType = "USER" | "SERVICE";
export type PrincipalScope = "anchor" | "partner" | "client";
export type AuthMechanism = "session" | "bearer";
export interface PrincipalSnapshot<TData = Record<string, unknown>> {
    id: string;
    type: PrincipalType;
    scope: PrincipalScope;
    name: string;
    email?: string;
    clients: string[];
    roles: string[];
    applications: string[];
    mechanism: AuthMechanism;
    sessionData: TData;
}
export interface Principal<TData = Record<string, unknown>> extends PrincipalSnapshot<TData> {
    hasRole(role: string): boolean;
    hasRoles(roles: string[]): boolean;
    hasAnyRole(roles: string[]): boolean;
    hasPermissionTo(permissions: string[]): boolean;
    hasAnyPermissionTo(permissions: string[]): boolean;
    isAnchor(): boolean;
    canAccessClient(clientId: string): boolean;
}
interface BuildOpts<TData> {
    snapshot: PrincipalSnapshot<TData>;
    rbac: RbacCatalogue | undefined;
}
/**
 * Build a Principal from a token snapshot. Permissions are resolved from
 * `snapshot.roles` against the configured RBAC catalogue (if any).
 *
 * Membership checks are O(1) — we materialise role/permission sets once at
 * construction so per-request guards stay cheap.
 */
export declare function buildPrincipal<TData>(opts: BuildOpts<TData>): Principal<TData>;
export {};
//# sourceMappingURL=principal.d.ts.map