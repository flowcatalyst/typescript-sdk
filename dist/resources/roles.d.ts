/**
 * Roles Resource
 *
 * Manage roles and permissions.
 */
import type { ResultAsync } from "neverthrow";
import type { SdkError } from "../errors.js";
import type { FlowCatalystClient } from "../client.js";
import type { ListRolesResponse, GetRoleResponse, GetRoleByCodeResponse, CreateRoleData, UpdateRoleData, GetRolesByApplicationResponse, SyncRolesData, SyncRolesResponse as SyncRolesResponseType } from "../generated/types.gen.js";
/** Pagination params (page/size). Mirrors the previous generated shape. */
export type PaginationParams = {
    page?: number;
    size?: number;
};
export type RoleListResponse = ListRolesResponse;
export type RoleDto = GetRoleResponse;
export type RoleByCodeResponse = GetRoleByCodeResponse;
export type CreateRoleRequest = CreateRoleData["body"];
export type UpdateRoleRequest = UpdateRoleData["body"];
export type RoleListByApplicationResponse = GetRolesByApplicationResponse;
export type SyncRolesResponse = SyncRolesResponseType;
/**
 * Roles resource for managing role-based access control.
 */
export declare class RolesResource {
    private readonly client;
    constructor(client: FlowCatalystClient);
    /**
     * List all roles.
     */
    list(_pagination?: PaginationParams): ResultAsync<RoleListResponse, SdkError>;
    /**
     * Get a role by name (code) or ID.
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
    sync(applicationCode: string, roles: SyncRolesData["body"]["roles"], removeUnlisted?: boolean): ResultAsync<SyncRolesResponse, SdkError>;
}
//# sourceMappingURL=roles.d.ts.map