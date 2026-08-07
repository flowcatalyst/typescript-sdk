/**
 * Permissions Resource
 *
 * Query available permissions.
 */
import type { ResultAsync } from "neverthrow";
import type { SdkError } from "../errors.js";
import type { FlowCatalystClient } from "../client.js";
import type { ListPermissionsResponse, GetPermissionResponse } from "../generated/types.gen.js";
export type PermissionListResponse = ListPermissionsResponse;
export type PermissionDto = GetPermissionResponse;
/**
 * Permissions resource for querying available permissions.
 */
export declare class PermissionsResource {
    private readonly client;
    constructor(client: FlowCatalystClient);
    /**
     * List all permissions.
     */
    list(): ResultAsync<PermissionListResponse, SdkError>;
    /**
     * Get a permission by name.
     */
    get(permission: string): ResultAsync<PermissionDto, SdkError>;
}
//# sourceMappingURL=permissions.d.ts.map