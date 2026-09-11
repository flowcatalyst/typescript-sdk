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
    list(_pagination) {
        return this.client.request((httpClient, headers) => sdk.listRoles({
            client: httpClient,
            headers,
        }));
    }
    /**
     * Get a role by name (code) or ID.
     */
    get(roleName) {
        return this.client.request((httpClient, headers) => sdk.getRole({
            client: httpClient,
            headers,
            path: { id: roleName },
        }));
    }
    /**
     * Get a role by code (`application:role-name`).
     */
    getByCode(code) {
        return this.client.request((httpClient, headers) => sdk.getRoleByCode({
            client: httpClient,
            headers,
            path: { code },
        }));
    }
    /**
     * Create a new role.
     */
    create(data) {
        return this.client.request((httpClient, headers) => sdk.createRole({
            client: httpClient,
            headers,
            body: data,
        }));
    }
    /**
     * Update a role.
     */
    update(roleName, data) {
        return this.client.request((httpClient, headers) => sdk.updateRole({
            client: httpClient,
            headers,
            path: { id: roleName },
            body: data,
        }));
    }
    /**
     * Delete a role.
     */
    delete(roleName) {
        return this.client.request((httpClient, headers) => sdk.deleteRole({
            client: httpClient,
            headers,
            path: { id: roleName },
        }));
    }
    /**
     * List roles for an application.
     */
    listForApplication(applicationId) {
        return this.client.request((httpClient, headers) => sdk.getRolesByApplication({
            client: httpClient,
            headers,
            path: { applicationId },
        }));
    }
    /**
     * Grant a permission to a role. Returns the updated role.
     */
    grantPermission(roleName, permission) {
        return this.client.request((httpClient, headers) => sdk.grantRolePermissionByBody({
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
        return this.client.request((httpClient, headers) => sdk.revokeRolePermission({
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
        return this.client.request((httpClient, headers) => sdk.syncRoles({
            client: httpClient,
            headers,
            path: { appCode: applicationCode },
            body: { roles },
            query: { removeUnlisted },
        }));
    }
}
