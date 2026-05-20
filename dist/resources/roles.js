/**
 * Roles Resource
 *
 * Manage roles and permissions.
 */
import * as sdk from "../generated/sdk.gen.js";
/**
 * Roles resource for managing role-based access control.
 */
export class RolesResource {
    constructor(client) {
        this.client = client;
    }
    /**
     * List all roles.
     */
    list(pagination) {
        return this.client.request((httpClient, headers) => sdk.getApiRoles({
            client: httpClient,
            headers,
            query: { pagination: pagination ?? {} },
        }));
    }
    /**
     * Get a role by name.
     */
    get(roleName) {
        return this.client.request((httpClient, headers) => sdk.getApiRolesByName({
            client: httpClient,
            headers,
            path: { roleName },
        }));
    }
    /**
     * Get a role by code (`application:role-name`).
     */
    getByCode(code) {
        return this.client.request((httpClient, headers) => sdk.getApiRolesByCodeByCode({
            client: httpClient,
            headers,
            path: { code },
        }));
    }
    /**
     * Create a new role.
     */
    create(data) {
        return this.client.request((httpClient, headers) => sdk.postApiRoles({
            client: httpClient,
            headers,
            body: data,
        }));
    }
    /**
     * Update a role.
     */
    update(roleName, data) {
        return this.client.request((httpClient, headers) => sdk.putApiRolesByName({
            client: httpClient,
            headers,
            path: { roleName },
            body: data,
        }));
    }
    /**
     * Delete a role.
     */
    delete(roleName) {
        return this.client.request((httpClient, headers) => sdk.deleteApiRolesByName({
            client: httpClient,
            headers,
            path: { roleName },
        }));
    }
    /**
     * List roles for an application.
     */
    listForApplication(applicationId) {
        return this.client.request((httpClient, headers) => sdk.getApiRolesByApplicationByApplicationId({
            client: httpClient,
            headers,
            path: { applicationId },
        }));
    }
    /**
     * Grant a permission to a role. Returns the updated role.
     */
    grantPermission(roleName, permission) {
        return this.client.request((httpClient, headers) => sdk.postApiRolesByNamePermissions({
            client: httpClient,
            headers,
            path: { roleName },
            body: { permission },
        }));
    }
    /**
     * Revoke a permission from a role. Returns the updated role.
     */
    revokePermission(roleName, permission) {
        return this.client.request((httpClient, headers) => sdk.deleteApiRolesByNamePermissionsByPermission({
            client: httpClient,
            headers,
            path: { roleName, permission },
        }));
    }
    /**
     * Sync roles for an application — declarative reconciliation against
     * `POST /api/applications/{applicationCode}/roles/sync`.
     */
    sync(applicationCode, roles, removeUnlisted = false) {
        return this.client.request((httpClient, headers) => sdk.postApiApplicationsByAppCodeRolesSync({
            client: httpClient,
            headers,
            path: { appCode: applicationCode },
            body: { roles },
            query: { removeUnlisted },
        }));
    }
}
