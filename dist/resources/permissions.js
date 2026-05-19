/**
 * Permissions Resource
 *
 * Query available permissions.
 */
import * as sdk from "../generated/sdk.gen.js";
/**
 * Permissions resource for querying available permissions.
 */
export class PermissionsResource {
    constructor(client) {
        this.client = client;
    }
    /**
     * List all permissions.
     */
    list() {
        return this.client.request((httpClient, headers) => sdk.getApiRolesPermissions({
            client: httpClient,
            headers,
        }));
    }
    /**
     * Get a permission by name.
     */
    get(permission) {
        return this.client.request((httpClient, headers) => sdk.getApiRolesPermissionsByPermission({
            client: httpClient,
            headers,
            path: { permission },
        }));
    }
}
