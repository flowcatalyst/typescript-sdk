/**
 * Roles Resource
 *
 * Manage roles and permissions.
 */
import type { ResultAsync } from "neverthrow";
import type { SdkError } from "../errors.js";
import type { FlowCatalystClient } from "../client.js";
import type { GetApiRolesResponse, GetApiRolesByNameResponse, GetApiRolesByCodeByCodeResponse, PostApiRolesData, PutApiRolesByNameData, GetApiRolesByApplicationByApplicationIdResponse, PostApiApplicationsByAppCodeRolesSyncData, PostApiApplicationsByAppCodeRolesSyncResponse, PaginationParams } from "../generated/types.gen.js";
export type RoleListResponse = GetApiRolesResponse;
export type RoleDto = GetApiRolesByNameResponse;
export type RoleByCodeResponse = GetApiRolesByCodeByCodeResponse;
export type CreateRoleRequest = PostApiRolesData["body"];
export type UpdateRoleRequest = PutApiRolesByNameData["body"];
export type RoleListByApplicationResponse = GetApiRolesByApplicationByApplicationIdResponse;
export type SyncRolesResponse = PostApiApplicationsByAppCodeRolesSyncResponse;
/**
 * Roles resource for managing role-based access control.
 */
export declare class RolesResource {
    private readonly client;
    constructor(client: FlowCatalystClient);
    /**
     * List all roles.
     */
    list(pagination?: PaginationParams): ResultAsync<RoleListResponse, SdkError>;
    /**
     * Get a role by name.
     */
    get(roleName: string): ResultAsync<RoleDto, SdkError>;
    /**
     * Get a role by code (`application:role-name`).
     */
    getByCode(code: string): ResultAsync<RoleByCodeResponse, SdkError>;
    /**
     * Create a new role.
     */
    create(data: CreateRoleRequest): ResultAsync<RoleDto, SdkError>;
    /**
     * Update a role.
     */
    update(roleName: string, data: UpdateRoleRequest): ResultAsync<RoleDto, SdkError>;
    /**
     * Delete a role.
     */
    delete(roleName: string): ResultAsync<unknown, SdkError>;
    /**
     * List roles for an application.
     */
    listForApplication(applicationId: string): ResultAsync<RoleListByApplicationResponse, SdkError>;
    /**
     * Grant a permission to a role. Returns the updated role.
     */
    grantPermission(roleName: string, permission: string): ResultAsync<RoleDto, SdkError>;
    /**
     * Revoke a permission from a role. Returns the updated role.
     */
    revokePermission(roleName: string, permission: string): ResultAsync<RoleDto, SdkError>;
    /**
     * Sync roles for an application — declarative reconciliation against
     * `POST /api/applications/{applicationCode}/roles/sync`.
     */
    sync(applicationCode: string, roles: PostApiApplicationsByAppCodeRolesSyncData["body"]["roles"], removeUnlisted?: boolean): ResultAsync<SyncRolesResponse, SdkError>;
}
//# sourceMappingURL=roles.d.ts.map