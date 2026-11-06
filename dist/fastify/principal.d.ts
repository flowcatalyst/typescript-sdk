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
export interface PortalContext {
    clientId: string;
    /** The portal app's code (`portal_app_code`); absent for legacy client-wide portals. */
    appCode?: string;
    appId?: string;
}
export interface PrincipalSnapshot<TData = Record<string, unknown>> {
    id: string;
    type: PrincipalType;
    scope: PrincipalScope;
    name: string;
    email?: string;
    /** Raw `clients` claim: `"{id}:{code}"` pairs, or `["*"]` for anchor. */
    clients: string[];
    /**
     * Client ids the principal may access, parsed from {@link clients}. Never
     * itself contains `"*"` — anchor access is a separate check on the raw
     * {@link clients} claim (`Principal.isAnchor`).
     */
    clientIds: string[];
    /** Client codes, positionally aligned with {@link clientIds}. */
    clientCodes: string[];
    roles: string[];
    /** Application ids the principal may reach (parsed from the claim). */
    applications: string[];
    /**
     * Application codes, positionally aligned with {@link applications}. Empty
     * for an id whose code the platform could not resolve, and empty overall
     * when {@link allApplications} is set.
     */
    applicationCodes: string[];
    /**
     * True when the principal reaches every application, present and future —
     * the `"*"` entry in the claim. {@link applications} is then not a
     * restriction and is empty.
     */
    allApplications: boolean;
    /**
     * Present only for portal-plane logins (`id` is then a `ptu_…` portal
     * identity): the tenant client, and — for an app-linked portal OAuth
     * client — which of its portal apps the user signed in to.
     */
    portal?: PortalContext;
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