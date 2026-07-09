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
/**
 * Build a Principal from a token snapshot. Permissions are resolved from
 * `snapshot.roles` against the configured RBAC catalogue (if any).
 *
 * Membership checks are O(1) — we materialise role/permission sets once at
 * construction so per-request guards stay cheap.
 */
export function buildPrincipal(opts) {
    const { snapshot, rbac } = opts;
    const roleSet = new Set(snapshot.roles);
    const clientSet = new Set(snapshot.clients);
    const permissionList = rbac ? rbac.resolve(snapshot.roles) : [];
    const permissionSet = new Set(permissionList);
    const isAnchor = snapshot.scope === "anchor" || clientSet.has("*");
    return {
        ...snapshot,
        hasRole(role) {
            return roleSet.has(role);
        },
        hasRoles(roles) {
            return roles.every((r) => roleSet.has(r));
        },
        hasAnyRole(roles) {
            return roles.some((r) => roleSet.has(r));
        },
        hasPermissionTo(perms) {
            return perms.every((p) => matchesAny(permissionSet, p));
        },
        hasAnyPermissionTo(perms) {
            return perms.some((p) => matchesAny(permissionSet, p));
        },
        isAnchor() {
            return isAnchor;
        },
        canAccessClient(clientId) {
            return isAnchor || clientSet.has(clientId);
        },
    };
}
/**
 * Wildcard-aware membership: `permissionSet` may contain entries like
 * `"ticket:*"` or `"*"`; `needed` is the literal permission a route is
 * asking for. Wildcards are suffix-only on `:` segment boundaries.
 *
 *   matchesAny({"ticket:*"},      "ticket:close")     -> true
 *   matchesAny({"billing:*"},     "billing:invoice:x") -> true
 *   matchesAny({"*"},             "anything")         -> true
 *   matchesAny({"ticket:read"},   "ticket:close")     -> false
 */
function matchesAny(permissionSet, needed) {
    if (permissionSet.has(needed) || permissionSet.has("*"))
        return true;
    const segments = needed.split(":");
    for (let i = segments.length - 1; i > 0; i--) {
        const prefix = segments.slice(0, i).join(":");
        if (permissionSet.has(`${prefix}:*`))
            return true;
    }
    return false;
}
