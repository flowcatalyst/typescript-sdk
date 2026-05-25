/**
 * Principals Resource
 *
 * Manage users and service accounts.
 */
import * as sdk from "../generated/sdk.gen.js";
/**
 * Principals resource for managing users and service accounts.
 */
export class PrincipalsResource {
    constructor(client) {
        this.client = client;
    }
    /**
     * List all principals with optional filters.
     */
    list(filters) {
        return this.client.request((httpClient, headers) => sdk.getApiPrincipals({
            client: httpClient,
            headers,
            query: filters,
        }));
    }
    /**
     * Get a principal by ID.
     */
    get(id) {
        return this.client.request((httpClient, headers) => sdk.getApiPrincipalsById({
            client: httpClient,
            headers,
            path: { id },
        }));
    }
    /**
     * Find a user by email.
     *
     * Client-side filters the response to rows whose email matches exactly
     * (case-insensitive). Older platform builds silently ignored unknown
     * query parameters and returned an unfiltered list; we defend against
     * that here so callers don't act on the wrong principal.
     */
    findByEmail(email) {
        const needle = email.toLowerCase();
        return this.list({ email }).map((response) => {
            const principals = response.principals.filter((p) => (p.email ?? "").toLowerCase() === needle);
            return { principals, total: principals.length };
        });
    }
    /**
     * Create a new user principal.
     */
    createUser(data) {
        return this.client.request((httpClient, headers) => sdk.postApiPrincipalsUsers({
            client: httpClient,
            headers,
            body: data,
        }));
    }
    /**
     * Update a principal.
     */
    update(id, data) {
        return this.client.request((httpClient, headers) => sdk.putApiPrincipalsById({
            client: httpClient,
            headers,
            path: { id },
            body: data,
        }));
    }
    /**
     * Activate a principal.
     */
    activate(id) {
        return this.client.request((httpClient, headers) => sdk.postApiPrincipalsByIdActivate({
            client: httpClient,
            headers,
            path: { id },
        }));
    }
    /**
     * Deactivate a principal.
     */
    deactivate(id) {
        return this.client.request((httpClient, headers) => sdk.postApiPrincipalsByIdDeactivate({
            client: httpClient,
            headers,
            path: { id },
        }));
    }
    /**
     * Reset a user's password.
     *
     * Set `enforcePasswordComplexity` on `data` to `false` when the caller
     * enforces its own password policy; only the platform's 2-character
     * minimum will apply. Defaults to `true`.
     */
    resetPassword(id, data) {
        return this.client.request((httpClient, headers) => sdk.postApiPrincipalsByIdResetPassword({
            client: httpClient,
            headers,
            path: { id },
            body: data,
        }));
    }
    /**
     * Get roles assigned to a principal.
     */
    getRoles(id) {
        return this.client.request((httpClient, headers) => sdk.getApiPrincipalsByIdRoles({
            client: httpClient,
            headers,
            path: { id },
        }));
    }
    /**
     * Add a single role to a principal (additive — keeps existing roles).
     *
     * Renamed from `assignRole` to make the additive-vs-replace distinction
     * visible at the call site (paired with `setRoles` for replace-all).
     */
    addRole(id, roleName) {
        return this.client.request((httpClient, headers) => sdk.postApiPrincipalsByIdRoles({
            client: httpClient,
            headers,
            path: { id },
            body: { role: roleName },
        }));
    }
    /**
     * Remove a role from a principal.
     */
    removeRole(id, roleName) {
        return this.client.request((httpClient, headers) => sdk.deleteApiPrincipalsByIdRolesByRoleName({
            client: httpClient,
            headers,
            path: { id, role: roleName },
        }));
    }
    /**
     * Replace all roles on a principal with the given set (declarative).
     *
     * Renamed from `assignRoles` so the replace semantics are obvious
     * (paired with `addRole` for additive).
     */
    setRoles(id, roles) {
        return this.client.request((httpClient, headers) => sdk.putApiPrincipalsByIdRoles({
            client: httpClient,
            headers,
            path: { id },
            body: { roles },
        }));
    }
    /**
     * Get client access grants for a principal.
     */
    getClientAccessGrants(id) {
        return this.client.request((httpClient, headers) => sdk.getApiPrincipalsByIdClientAccess({
            client: httpClient,
            headers,
            path: { id },
        }));
    }
    /**
     * Grant client access to a principal.
     */
    grantClientAccess(id, clientId) {
        return this.client.request((httpClient, headers) => sdk.postApiPrincipalsByIdClientAccess({
            client: httpClient,
            headers,
            path: { id },
            body: { clientId },
        }));
    }
    /**
     * Revoke client access from a principal.
     */
    revokeClientAccess(id, clientId) {
        return this.client.request((httpClient, headers) => sdk.deleteApiPrincipalsByIdClientAccessByClientId({
            client: httpClient,
            headers,
            path: { id, clientId },
        }));
    }
    /**
     * Sync principals for an application — declarative reconciliation
     * against `POST /api/applications/{applicationCode}/principals/sync`.
     *
     * When `removeUnlisted` is true the platform strips SDK-sourced role
     * assignments from principals not in the list; principals themselves
     * are never deleted by sync.
     */
    sync(applicationCode, principals, removeUnlisted = false) {
        return this.client.request((httpClient, headers) => sdk.postApiApplicationsByAppCodePrincipalsSync({
            client: httpClient,
            headers,
            path: { appCode: applicationCode },
            body: { principals },
            query: { removeUnlisted },
        }));
    }
}
