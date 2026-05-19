/**
 * Principals Resource
 *
 * Manage users and service accounts.
 */
import type { ResultAsync } from "neverthrow";
import type { SdkError } from "../errors";
import type { FlowCatalystClient } from "../client";
import type { GetApiPrincipalsData, GetApiPrincipalsResponse, GetApiPrincipalsByIdResponse, PostApiPrincipalsUsersData, PutApiPrincipalsByIdData, PostApiPrincipalsByIdResetPasswordData, GetApiPrincipalsByIdRolesResponse, GetApiPrincipalsByIdClientAccessResponse, PostApiApplicationsByAppCodePrincipalsSyncData, PostApiApplicationsByAppCodePrincipalsSyncResponse } from "../generated/types.gen";
export type PrincipalListResponse = GetApiPrincipalsResponse;
export type PrincipalDto = GetApiPrincipalsByIdResponse;
export type CreateUserRequest = PostApiPrincipalsUsersData["body"];
export type UpdatePrincipalRequest = PutApiPrincipalsByIdData["body"];
export type ResetPasswordRequest = PostApiPrincipalsByIdResetPasswordData["body"];
export type RoleListResponse = GetApiPrincipalsByIdRolesResponse;
export type ClientAccessListResponse = GetApiPrincipalsByIdClientAccessResponse;
export type SyncPrincipalsResponse = PostApiApplicationsByAppCodePrincipalsSyncResponse;
export type PrincipalFilters = GetApiPrincipalsData["query"];
/**
 * Principals resource for managing users and service accounts.
 */
export declare class PrincipalsResource {
    private readonly client;
    constructor(client: FlowCatalystClient);
    /**
     * List all principals with optional filters.
     */
    list(filters?: PrincipalFilters): ResultAsync<PrincipalListResponse, SdkError>;
    /**
     * Get a principal by ID.
     */
    get(id: string): ResultAsync<PrincipalDto, SdkError>;
    /**
     * Find a user by email.
     *
     * Client-side filters the response to rows whose email matches exactly
     * (case-insensitive). Older platform builds silently ignored unknown
     * query parameters and returned an unfiltered list; we defend against
     * that here so callers don't act on the wrong principal.
     */
    findByEmail(email: string): ResultAsync<PrincipalListResponse, SdkError>;
    /**
     * Create a new user principal.
     */
    createUser(data: CreateUserRequest): ResultAsync<PrincipalDto, SdkError>;
    /**
     * Update a principal.
     */
    update(id: string, data: UpdatePrincipalRequest): ResultAsync<PrincipalDto, SdkError>;
    /**
     * Activate a principal.
     */
    activate(id: string): ResultAsync<PrincipalDto, SdkError>;
    /**
     * Deactivate a principal.
     */
    deactivate(id: string): ResultAsync<PrincipalDto, SdkError>;
    /**
     * Reset a user's password.
     *
     * Set `enforcePasswordComplexity` on `data` to `false` when the caller
     * enforces its own password policy; only the platform's 2-character
     * minimum will apply. Defaults to `true`.
     */
    resetPassword(id: string, data: ResetPasswordRequest): ResultAsync<unknown, SdkError>;
    /**
     * Get roles assigned to a principal.
     */
    getRoles(id: string): ResultAsync<RoleListResponse, SdkError>;
    /**
     * Add a single role to a principal (additive — keeps existing roles).
     *
     * Renamed from `assignRole` to make the additive-vs-replace distinction
     * visible at the call site (paired with `setRoles` for replace-all).
     */
    addRole(id: string, roleName: string): ResultAsync<unknown, SdkError>;
    /**
     * Remove a role from a principal.
     */
    removeRole(id: string, roleName: string): ResultAsync<unknown, SdkError>;
    /**
     * Replace all roles on a principal with the given set (declarative).
     *
     * Renamed from `assignRoles` so the replace semantics are obvious
     * (paired with `addRole` for additive).
     */
    setRoles(id: string, roles: string[]): ResultAsync<unknown, SdkError>;
    /**
     * Get client access grants for a principal.
     */
    getClientAccessGrants(id: string): ResultAsync<ClientAccessListResponse, SdkError>;
    /**
     * Grant client access to a principal.
     */
    grantClientAccess(id: string, clientId: string): ResultAsync<unknown, SdkError>;
    /**
     * Revoke client access from a principal.
     */
    revokeClientAccess(id: string, clientId: string): ResultAsync<unknown, SdkError>;
    /**
     * Sync principals for an application — declarative reconciliation
     * against `POST /api/applications/{applicationCode}/principals/sync`.
     *
     * When `removeUnlisted` is true the platform strips SDK-sourced role
     * assignments from principals not in the list; principals themselves
     * are never deleted by sync.
     */
    sync(applicationCode: string, principals: PostApiApplicationsByAppCodePrincipalsSyncData["body"]["principals"], removeUnlisted?: boolean): ResultAsync<SyncPrincipalsResponse, SdkError>;
}
//# sourceMappingURL=principals.d.ts.map