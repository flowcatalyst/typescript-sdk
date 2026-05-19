import type { Client, Options as Options2, TDataShape } from './client/index.js';
import type { DeleteApiClientsByIdData, DeleteApiClientsByIdErrors, DeleteApiClientsByIdResponses, DeleteApiEventTypesByIdData, DeleteApiEventTypesByIdErrors, DeleteApiEventTypesByIdResponses, DeleteApiOauthClientsByIdData, DeleteApiOauthClientsByIdErrors, DeleteApiOauthClientsByIdResponses, DeleteApiPrincipalsByIdClientAccessByClientIdData, DeleteApiPrincipalsByIdClientAccessByClientIdErrors, DeleteApiPrincipalsByIdClientAccessByClientIdResponses, DeleteApiPrincipalsByIdData, DeleteApiPrincipalsByIdErrors, DeleteApiPrincipalsByIdResponses, DeleteApiPrincipalsByIdRolesByRoleNameData, DeleteApiPrincipalsByIdRolesByRoleNameErrors, DeleteApiPrincipalsByIdRolesByRoleNameResponses, DeleteApiProcessesByIdData, DeleteApiProcessesByIdErrors, DeleteApiProcessesByIdResponses, DeleteApiRolesByNameData, DeleteApiRolesByNameErrors, DeleteApiRolesByNamePermissionsByPermissionData, DeleteApiRolesByNamePermissionsByPermissionErrors, DeleteApiRolesByNamePermissionsByPermissionResponses, DeleteApiRolesByNameResponses, DeleteApiScheduledJobsByIdData, DeleteApiScheduledJobsByIdErrors, DeleteApiScheduledJobsByIdResponses, DeleteApiSubscriptionsByIdData, DeleteApiSubscriptionsByIdErrors, DeleteApiSubscriptionsByIdResponses, DeleteWebauthnCredentialData, DeleteWebauthnCredentialErrors, DeleteWebauthnCredentialResponses, GetApiAuditLogsApplicationIdsData, GetApiAuditLogsApplicationIdsResponses, GetApiAuditLogsByIdData, GetApiAuditLogsByIdErrors, GetApiAuditLogsByIdResponses, GetApiAuditLogsClientIdsData, GetApiAuditLogsClientIdsResponses, GetApiAuditLogsData, GetApiAuditLogsEntityByEntityTypeByEntityIdData, GetApiAuditLogsEntityByEntityTypeByEntityIdResponses, GetApiAuditLogsEntityTypesData, GetApiAuditLogsEntityTypesResponses, GetApiAuditLogsOperationsData, GetApiAuditLogsOperationsResponses, GetApiAuditLogsPrincipalByPrincipalIdData, GetApiAuditLogsPrincipalByPrincipalIdResponses, GetApiAuditLogsRecentData, GetApiAuditLogsRecentResponses, GetApiAuditLogsResponses, GetApiClientsByIdApplicationsData, GetApiClientsByIdApplicationsErrors, GetApiClientsByIdApplicationsResponses, GetApiClientsByIdData, GetApiClientsByIdentifierByIdentifierData, GetApiClientsByIdentifierByIdentifierErrors, GetApiClientsByIdentifierByIdentifierResponses, GetApiClientsByIdErrors, GetApiClientsByIdResponses, GetApiClientsData, GetApiClientsResponses, GetApiClientsSearchData, GetApiClientsSearchResponses, GetApiDispatchJobsByEventByEventIdData, GetApiDispatchJobsByEventByEventIdResponses, GetApiDispatchJobsByIdAttemptsData, GetApiDispatchJobsByIdAttemptsErrors, GetApiDispatchJobsByIdAttemptsResponses, GetApiDispatchJobsByIdData, GetApiDispatchJobsByIdErrors, GetApiDispatchJobsByIdRawData, GetApiDispatchJobsByIdRawErrors, GetApiDispatchJobsByIdRawResponses, GetApiDispatchJobsByIdResponses, GetApiDispatchJobsData, GetApiDispatchJobsFilterOptionsData, GetApiDispatchJobsFilterOptionsResponses, GetApiDispatchJobsRawData, GetApiDispatchJobsRawResponses, GetApiDispatchJobsResponses, GetApiEventsByIdData, GetApiEventsByIdErrors, GetApiEventsByIdResponses, GetApiEventsData, GetApiEventsFilterOptionsData, GetApiEventsFilterOptionsResponses, GetApiEventsRawData, GetApiEventsRawResponses, GetApiEventsResponses, GetApiEventTypesByCodeByCodeData, GetApiEventTypesByCodeByCodeErrors, GetApiEventTypesByCodeByCodeResponses, GetApiEventTypesByIdData, GetApiEventTypesByIdErrors, GetApiEventTypesByIdResponses, GetApiEventTypesData, GetApiEventTypesResponses, GetApiMonitoringCircuitBreakersData, GetApiMonitoringCircuitBreakersResponses, GetApiMonitoringDashboardData, GetApiMonitoringDashboardResponses, GetApiMonitoringInFlightMessagesData, GetApiMonitoringInFlightMessagesResponses, GetApiMonitoringPoolStatsData, GetApiMonitoringPoolStatsResponses, GetApiMonitoringStandbyStatusData, GetApiMonitoringStandbyStatusResponses, GetApiOauthClientsByClientIdData, GetApiOauthClientsByClientIdErrors, GetApiOauthClientsByClientIdResponses, GetApiOauthClientsByIdData, GetApiOauthClientsByIdErrors, GetApiOauthClientsByIdResponses, GetApiOauthClientsData, GetApiOauthClientsResponses, GetApiPrincipalsByIdApplicationAccessData, GetApiPrincipalsByIdApplicationAccessErrors, GetApiPrincipalsByIdApplicationAccessResponses, GetApiPrincipalsByIdAvailableApplicationsData, GetApiPrincipalsByIdAvailableApplicationsErrors, GetApiPrincipalsByIdAvailableApplicationsResponses, GetApiPrincipalsByIdClientAccessData, GetApiPrincipalsByIdClientAccessErrors, GetApiPrincipalsByIdClientAccessResponses, GetApiPrincipalsByIdData, GetApiPrincipalsByIdErrors, GetApiPrincipalsByIdResponses, GetApiPrincipalsByIdRolesData, GetApiPrincipalsByIdRolesErrors, GetApiPrincipalsByIdRolesResponses, GetApiPrincipalsCheckEmailDomainData, GetApiPrincipalsCheckEmailDomainResponses, GetApiPrincipalsData, GetApiPrincipalsResponses, GetApiProcessesByCodeData, GetApiProcessesByCodeErrors, GetApiProcessesByCodeResponses, GetApiProcessesByIdData, GetApiProcessesByIdErrors, GetApiProcessesByIdResponses, GetApiProcessesData, GetApiProcessesResponses, GetApiRolesByApplicationByApplicationIdData, GetApiRolesByApplicationByApplicationIdResponses, GetApiRolesByCodeByCodeData, GetApiRolesByCodeByCodeErrors, GetApiRolesByCodeByCodeResponses, GetApiRolesByNameData, GetApiRolesByNameErrors, GetApiRolesByNameResponses, GetApiRolesBySourceBySourceData, GetApiRolesBySourceBySourceErrors, GetApiRolesBySourceBySourceResponses, GetApiRolesData, GetApiRolesFiltersApplicationsData, GetApiRolesFiltersApplicationsResponses, GetApiRolesPermissionsByPermissionData, GetApiRolesPermissionsByPermissionErrors, GetApiRolesPermissionsByPermissionResponses, GetApiRolesPermissionsData, GetApiRolesPermissionsResponses, GetApiRolesResponses, GetApiScheduledJobsByCodeData, GetApiScheduledJobsByCodeErrors, GetApiScheduledJobsByCodeResponses, GetApiScheduledJobsByIdData, GetApiScheduledJobsByIdErrors, GetApiScheduledJobsByIdInstancesData, GetApiScheduledJobsByIdInstancesResponses, GetApiScheduledJobsByIdResponses, GetApiScheduledJobsData, GetApiScheduledJobsInstancesByIdData, GetApiScheduledJobsInstancesByIdErrors, GetApiScheduledJobsInstancesByIdLogsData, GetApiScheduledJobsInstancesByIdLogsErrors, GetApiScheduledJobsInstancesByIdLogsResponses, GetApiScheduledJobsInstancesByIdResponses, GetApiScheduledJobsResponses, GetApiSubscriptionsByIdData, GetApiSubscriptionsByIdErrors, GetApiSubscriptionsByIdResponses, GetApiSubscriptionsData, GetApiSubscriptionsResponses, GetAuthCheckDomainData, GetAuthCheckDomainResponses, GetAuthMeData, GetAuthMeErrors, GetAuthMeResponses, GetWebauthnCredentialsData, GetWebauthnCredentialsErrors, GetWebauthnCredentialsResponses, PostApiApplicationsByAppCodeDispatchPoolsSyncData, PostApiApplicationsByAppCodeDispatchPoolsSyncErrors, PostApiApplicationsByAppCodeDispatchPoolsSyncResponses, PostApiApplicationsByAppCodeEventTypesSyncData, PostApiApplicationsByAppCodeEventTypesSyncErrors, PostApiApplicationsByAppCodeEventTypesSyncResponses, PostApiApplicationsByAppCodeOpenapiSyncData, PostApiApplicationsByAppCodeOpenapiSyncErrors, PostApiApplicationsByAppCodeOpenapiSyncResponses, PostApiApplicationsByAppCodePrincipalsSyncData, PostApiApplicationsByAppCodePrincipalsSyncErrors, PostApiApplicationsByAppCodePrincipalsSyncResponses, PostApiApplicationsByAppCodeProcessesSyncData, PostApiApplicationsByAppCodeProcessesSyncErrors, PostApiApplicationsByAppCodeProcessesSyncResponses, PostApiApplicationsByAppCodeRolesSyncData, PostApiApplicationsByAppCodeRolesSyncErrors, PostApiApplicationsByAppCodeRolesSyncResponses, PostApiApplicationsByAppCodeScheduledJobsSyncData, PostApiApplicationsByAppCodeScheduledJobsSyncErrors, PostApiApplicationsByAppCodeScheduledJobsSyncResponses, PostApiApplicationsByAppCodeSubscriptionsSyncData, PostApiApplicationsByAppCodeSubscriptionsSyncErrors, PostApiApplicationsByAppCodeSubscriptionsSyncResponses, PostApiClientsByIdActivateData, PostApiClientsByIdActivateErrors, PostApiClientsByIdActivateResponses, PostApiClientsByIdApplicationsByAppIdDisableData, PostApiClientsByIdApplicationsByAppIdDisableErrors, PostApiClientsByIdApplicationsByAppIdDisableResponses, PostApiClientsByIdApplicationsByAppIdEnableData, PostApiClientsByIdApplicationsByAppIdEnableErrors, PostApiClientsByIdApplicationsByAppIdEnableResponses, PostApiClientsByIdDeactivateData, PostApiClientsByIdDeactivateErrors, PostApiClientsByIdDeactivateResponses, PostApiClientsByIdNotesData, PostApiClientsByIdNotesErrors, PostApiClientsByIdNotesResponses, PostApiClientsByIdSuspendData, PostApiClientsByIdSuspendErrors, PostApiClientsByIdSuspendResponses, PostApiClientsData, PostApiClientsErrors, PostApiClientsResponses, PostApiDispatchJobsData, PostApiDispatchJobsErrors, PostApiDispatchJobsResponses, PostApiEventsData, PostApiEventsErrors, PostApiEventsResponses, PostApiEventTypesByIdSchemasData, PostApiEventTypesByIdSchemasErrors, PostApiEventTypesByIdSchemasResponses, PostApiEventTypesData, PostApiEventTypesErrors, PostApiEventTypesResponses, PostApiOauthClientsActivateData, PostApiOauthClientsActivateErrors, PostApiOauthClientsActivateResponses, PostApiOauthClientsData, PostApiOauthClientsDeactivateData, PostApiOauthClientsDeactivateErrors, PostApiOauthClientsDeactivateResponses, PostApiOauthClientsErrors, PostApiOauthClientsRegenerateSecretData, PostApiOauthClientsRegenerateSecretErrors, PostApiOauthClientsRegenerateSecretResponses, PostApiOauthClientsResponses, PostApiOauthClientsRotateSecretData, PostApiOauthClientsRotateSecretErrors, PostApiOauthClientsRotateSecretResponses, PostApiPrincipalsByIdActivateData, PostApiPrincipalsByIdActivateErrors, PostApiPrincipalsByIdActivateResponses, PostApiPrincipalsByIdClientAccessData, PostApiPrincipalsByIdClientAccessErrors, PostApiPrincipalsByIdClientAccessResponses, PostApiPrincipalsByIdDeactivateData, PostApiPrincipalsByIdDeactivateErrors, PostApiPrincipalsByIdDeactivateResponses, PostApiPrincipalsByIdResetPasswordData, PostApiPrincipalsByIdResetPasswordErrors, PostApiPrincipalsByIdResetPasswordResponses, PostApiPrincipalsByIdRolesData, PostApiPrincipalsByIdRolesErrors, PostApiPrincipalsByIdRolesResponses, PostApiPrincipalsByIdSendPasswordResetData, PostApiPrincipalsByIdSendPasswordResetErrors, PostApiPrincipalsByIdSendPasswordResetResponses, PostApiPrincipalsUsersData, PostApiPrincipalsUsersErrors, PostApiPrincipalsUsersResponses, PostApiProcessesByIdArchiveData, PostApiProcessesByIdArchiveErrors, PostApiProcessesByIdArchiveResponses, PostApiProcessesData, PostApiProcessesErrors, PostApiProcessesResponses, PostApiRolesByNamePermissionsData, PostApiRolesByNamePermissionsErrors, PostApiRolesByNamePermissionsResponses, PostApiRolesData, PostApiRolesErrors, PostApiRolesResponses, PostApiScheduledJobsByIdArchiveData, PostApiScheduledJobsByIdArchiveErrors, PostApiScheduledJobsByIdArchiveResponses, PostApiScheduledJobsByIdFireData, PostApiScheduledJobsByIdFireErrors, PostApiScheduledJobsByIdFireResponses, PostApiScheduledJobsByIdPauseData, PostApiScheduledJobsByIdPauseErrors, PostApiScheduledJobsByIdPauseResponses, PostApiScheduledJobsByIdResumeData, PostApiScheduledJobsByIdResumeErrors, PostApiScheduledJobsByIdResumeResponses, PostApiScheduledJobsData, PostApiScheduledJobsErrors, PostApiScheduledJobsInstancesByIdCompleteData, PostApiScheduledJobsInstancesByIdCompleteErrors, PostApiScheduledJobsInstancesByIdCompleteResponses, PostApiScheduledJobsInstancesByIdLogData, PostApiScheduledJobsInstancesByIdLogErrors, PostApiScheduledJobsInstancesByIdLogResponses, PostApiScheduledJobsResponses, PostApiSubscriptionsByIdPauseData, PostApiSubscriptionsByIdPauseErrors, PostApiSubscriptionsByIdPauseResponses, PostApiSubscriptionsByIdResumeData, PostApiSubscriptionsByIdResumeErrors, PostApiSubscriptionsByIdResumeResponses, PostApiSubscriptionsData, PostApiSubscriptionsErrors, PostApiSubscriptionsResponses, PostAuthLoginData, PostAuthLoginErrors, PostAuthLoginResponses, PostAuthLogoutData, PostAuthLogoutResponses, PostAuthRefreshData, PostAuthRefreshErrors, PostAuthRefreshResponses, PostWebauthnAuthenticateBeginData, PostWebauthnAuthenticateBeginResponses, PostWebauthnAuthenticateCompleteData, PostWebauthnAuthenticateCompleteErrors, PostWebauthnAuthenticateCompleteResponses, PostWebauthnRegisterBeginData, PostWebauthnRegisterBeginErrors, PostWebauthnRegisterBeginResponses, PostWebauthnRegisterCompleteData, PostWebauthnRegisterCompleteErrors, PostWebauthnRegisterCompleteResponses, PutApiClientsByIdApplicationsData, PutApiClientsByIdApplicationsErrors, PutApiClientsByIdApplicationsResponses, PutApiClientsByIdData, PutApiClientsByIdErrors, PutApiClientsByIdResponses, PutApiEventTypesByIdData, PutApiEventTypesByIdErrors, PutApiEventTypesByIdResponses, PutApiOauthClientsByIdData, PutApiOauthClientsByIdErrors, PutApiOauthClientsByIdResponses, PutApiPrincipalsByIdApplicationAccessData, PutApiPrincipalsByIdApplicationAccessErrors, PutApiPrincipalsByIdApplicationAccessResponses, PutApiPrincipalsByIdData, PutApiPrincipalsByIdErrors, PutApiPrincipalsByIdResponses, PutApiPrincipalsByIdRolesData, PutApiPrincipalsByIdRolesErrors, PutApiPrincipalsByIdRolesResponses, PutApiProcessesByIdData, PutApiProcessesByIdErrors, PutApiProcessesByIdResponses, PutApiRolesByNameData, PutApiRolesByNameErrors, PutApiRolesByNameResponses, PutApiScheduledJobsByIdData, PutApiScheduledJobsByIdErrors, PutApiScheduledJobsByIdResponses, PutApiSubscriptionsByIdData, PutApiSubscriptionsByIdErrors, PutApiSubscriptionsByIdResponses } from './types.gen.js';
export type Options<TData extends TDataShape = TDataShape, ThrowOnError extends boolean = boolean> = Options2<TData, ThrowOnError> & {
    /**
     * You can provide a client instance returned by `createClient()` instead of
     * individual options. This might be also useful if you want to implement a
     * custom client.
     */
    client?: Client;
    /**
     * You can pass arbitrary values through the `meta` object. This can be
     * used to access values that aren't defined as part of the SDK function.
     */
    meta?: Record<string, unknown>;
};
/**
 * Sync dispatch pools for an application
 */
export declare const postApiApplicationsByAppCodeDispatchPoolsSync: <ThrowOnError extends boolean = false>(options: Options<PostApiApplicationsByAppCodeDispatchPoolsSyncData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PostApiApplicationsByAppCodeDispatchPoolsSyncResponses, PostApiApplicationsByAppCodeDispatchPoolsSyncErrors, ThrowOnError, "fields">;
/**
 * Sync event types for an application
 */
export declare const postApiApplicationsByAppCodeEventTypesSync: <ThrowOnError extends boolean = false>(options: Options<PostApiApplicationsByAppCodeEventTypesSyncData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PostApiApplicationsByAppCodeEventTypesSyncResponses, PostApiApplicationsByAppCodeEventTypesSyncErrors, ThrowOnError, "fields">;
/**
 * Sync the OpenAPI document for an application.
 *
 * Versioned: the prior CURRENT (if any) is flipped to ARCHIVED with computed
 * change-notes; the incoming document becomes the new CURRENT. Re-sending an
 * unchanged spec is a no-op (returns `unchanged: true`).
 */
export declare const postApiApplicationsByAppCodeOpenapiSync: <ThrowOnError extends boolean = false>(options: Options<PostApiApplicationsByAppCodeOpenapiSyncData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PostApiApplicationsByAppCodeOpenapiSyncResponses, PostApiApplicationsByAppCodeOpenapiSyncErrors, ThrowOnError, "fields">;
/**
 * Sync principals for an application
 */
export declare const postApiApplicationsByAppCodePrincipalsSync: <ThrowOnError extends boolean = false>(options: Options<PostApiApplicationsByAppCodePrincipalsSyncData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PostApiApplicationsByAppCodePrincipalsSyncResponses, PostApiApplicationsByAppCodePrincipalsSyncErrors, ThrowOnError, "fields">;
/**
 * Sync processes for an application
 */
export declare const postApiApplicationsByAppCodeProcessesSync: <ThrowOnError extends boolean = false>(options: Options<PostApiApplicationsByAppCodeProcessesSyncData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PostApiApplicationsByAppCodeProcessesSyncResponses, PostApiApplicationsByAppCodeProcessesSyncErrors, ThrowOnError, "fields">;
/**
 * Sync roles for an application
 */
export declare const postApiApplicationsByAppCodeRolesSync: <ThrowOnError extends boolean = false>(options: Options<PostApiApplicationsByAppCodeRolesSyncData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PostApiApplicationsByAppCodeRolesSyncResponses, PostApiApplicationsByAppCodeRolesSyncErrors, ThrowOnError, "fields">;
/**
 * Sync scheduled jobs for an application.
 *
 * Body specifies the target client (or null for platform-scoped). Caller
 * must have access to that client (or be anchor for platform-scoped).
 */
export declare const postApiApplicationsByAppCodeScheduledJobsSync: <ThrowOnError extends boolean = false>(options: Options<PostApiApplicationsByAppCodeScheduledJobsSyncData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PostApiApplicationsByAppCodeScheduledJobsSyncResponses, PostApiApplicationsByAppCodeScheduledJobsSyncErrors, ThrowOnError, "fields">;
/**
 * Sync subscriptions for an application
 */
export declare const postApiApplicationsByAppCodeSubscriptionsSync: <ThrowOnError extends boolean = false>(options: Options<PostApiApplicationsByAppCodeSubscriptionsSyncData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PostApiApplicationsByAppCodeSubscriptionsSyncResponses, PostApiApplicationsByAppCodeSubscriptionsSyncErrors, ThrowOnError, "fields">;
/**
 * List audit logs with filters (matches Java AuditLogAdminResource)
 */
export declare const getApiAuditLogs: <ThrowOnError extends boolean = false>(options?: Options<GetApiAuditLogsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetApiAuditLogsResponses, unknown, ThrowOnError, "fields">;
/**
 * Get distinct application IDs
 */
export declare const getApiAuditLogsApplicationIds: <ThrowOnError extends boolean = false>(options?: Options<GetApiAuditLogsApplicationIdsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetApiAuditLogsApplicationIdsResponses, unknown, ThrowOnError, "fields">;
/**
 * Get distinct client IDs
 */
export declare const getApiAuditLogsClientIds: <ThrowOnError extends boolean = false>(options?: Options<GetApiAuditLogsClientIdsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetApiAuditLogsClientIdsResponses, unknown, ThrowOnError, "fields">;
/**
 * Get distinct entity types
 */
export declare const getApiAuditLogsEntityTypes: <ThrowOnError extends boolean = false>(options?: Options<GetApiAuditLogsEntityTypesData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetApiAuditLogsEntityTypesResponses, unknown, ThrowOnError, "fields">;
/**
 * Get audit logs for a specific entity
 */
export declare const getApiAuditLogsEntityByEntityTypeByEntityId: <ThrowOnError extends boolean = false>(options: Options<GetApiAuditLogsEntityByEntityTypeByEntityIdData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetApiAuditLogsEntityByEntityTypeByEntityIdResponses, unknown, ThrowOnError, "fields">;
/**
 * Get distinct operations
 */
export declare const getApiAuditLogsOperations: <ThrowOnError extends boolean = false>(options?: Options<GetApiAuditLogsOperationsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetApiAuditLogsOperationsResponses, unknown, ThrowOnError, "fields">;
/**
 * Get audit logs for a principal
 */
export declare const getApiAuditLogsPrincipalByPrincipalId: <ThrowOnError extends boolean = false>(options: Options<GetApiAuditLogsPrincipalByPrincipalIdData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetApiAuditLogsPrincipalByPrincipalIdResponses, unknown, ThrowOnError, "fields">;
/**
 * Get recent audit logs
 */
export declare const getApiAuditLogsRecent: <ThrowOnError extends boolean = false>(options?: Options<GetApiAuditLogsRecentData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetApiAuditLogsRecentResponses, unknown, ThrowOnError, "fields">;
/**
 * Get audit log by ID
 */
export declare const getApiAuditLogsById: <ThrowOnError extends boolean = false>(options: Options<GetApiAuditLogsByIdData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetApiAuditLogsByIdResponses, GetApiAuditLogsByIdErrors, ThrowOnError, "fields">;
/**
 * List clients
 */
export declare const getApiClients: <ThrowOnError extends boolean = false>(options?: Options<GetApiClientsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetApiClientsResponses, unknown, ThrowOnError, "fields">;
/**
 * Create a new client
 */
export declare const postApiClients: <ThrowOnError extends boolean = false>(options: Options<PostApiClientsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PostApiClientsResponses, PostApiClientsErrors, ThrowOnError, "fields">;
/**
 * Get client by identifier
 */
export declare const getApiClientsByIdentifierByIdentifier: <ThrowOnError extends boolean = false>(options: Options<GetApiClientsByIdentifierByIdentifierData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetApiClientsByIdentifierByIdentifierResponses, GetApiClientsByIdentifierByIdentifierErrors, ThrowOnError, "fields">;
/**
 * Search clients
 */
export declare const getApiClientsSearch: <ThrowOnError extends boolean = false>(options?: Options<GetApiClientsSearchData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetApiClientsSearchResponses, unknown, ThrowOnError, "fields">;
/**
 * Delete client (soft delete)
 */
export declare const deleteApiClientsById: <ThrowOnError extends boolean = false>(options: Options<DeleteApiClientsByIdData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<DeleteApiClientsByIdResponses, DeleteApiClientsByIdErrors, ThrowOnError, "fields">;
/**
 * Get client by ID
 */
export declare const getApiClientsById: <ThrowOnError extends boolean = false>(options: Options<GetApiClientsByIdData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetApiClientsByIdResponses, GetApiClientsByIdErrors, ThrowOnError, "fields">;
/**
 * Update client
 */
export declare const putApiClientsById: <ThrowOnError extends boolean = false>(options: Options<PutApiClientsByIdData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PutApiClientsByIdResponses, PutApiClientsByIdErrors, ThrowOnError, "fields">;
/**
 * Activate a client
 *
 * Transitions a suspended or pending client to active status.
 */
export declare const postApiClientsByIdActivate: <ThrowOnError extends boolean = false>(options: Options<PostApiClientsByIdActivateData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PostApiClientsByIdActivateResponses, PostApiClientsByIdActivateErrors, ThrowOnError, "fields">;
/**
 * Get client applications
 */
export declare const getApiClientsByIdApplications: <ThrowOnError extends boolean = false>(options: Options<GetApiClientsByIdApplicationsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetApiClientsByIdApplicationsResponses, GetApiClientsByIdApplicationsErrors, ThrowOnError, "fields">;
/**
 * Update client applications (bulk)
 */
export declare const putApiClientsByIdApplications: <ThrowOnError extends boolean = false>(options: Options<PutApiClientsByIdApplicationsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PutApiClientsByIdApplicationsResponses, PutApiClientsByIdApplicationsErrors, ThrowOnError, "fields">;
/**
 * Disable application for client
 */
export declare const postApiClientsByIdApplicationsByAppIdDisable: <ThrowOnError extends boolean = false>(options: Options<PostApiClientsByIdApplicationsByAppIdDisableData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PostApiClientsByIdApplicationsByAppIdDisableResponses, PostApiClientsByIdApplicationsByAppIdDisableErrors, ThrowOnError, "fields">;
/**
 * Enable application for client
 */
export declare const postApiClientsByIdApplicationsByAppIdEnable: <ThrowOnError extends boolean = false>(options: Options<PostApiClientsByIdApplicationsByAppIdEnableData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PostApiClientsByIdApplicationsByAppIdEnableResponses, PostApiClientsByIdApplicationsByAppIdEnableErrors, ThrowOnError, "fields">;
/**
 * Deactivate a client (soft delete)
 *
 * Deactivates/soft-deletes a client. Requires a reason.
 */
export declare const postApiClientsByIdDeactivate: <ThrowOnError extends boolean = false>(options: Options<PostApiClientsByIdDeactivateData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PostApiClientsByIdDeactivateResponses, PostApiClientsByIdDeactivateErrors, ThrowOnError, "fields">;
/**
 * Add note to client
 */
export declare const postApiClientsByIdNotes: <ThrowOnError extends boolean = false>(options: Options<PostApiClientsByIdNotesData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PostApiClientsByIdNotesResponses, PostApiClientsByIdNotesErrors, ThrowOnError, "fields">;
/**
 * Suspend a client
 *
 * Suspends a client (e.g., for billing issues). Requires a reason.
 */
export declare const postApiClientsByIdSuspend: <ThrowOnError extends boolean = false>(options: Options<PostApiClientsByIdSuspendData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PostApiClientsByIdSuspendResponses, PostApiClientsByIdSuspendErrors, ThrowOnError, "fields">;
/**
 * List dispatch jobs. Returns the most recent rows matching the filters;
 * no pagination — see `DispatchJobsQuery` for the rationale.
 */
export declare const getApiDispatchJobs: <ThrowOnError extends boolean = false>(options?: Options<GetApiDispatchJobsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetApiDispatchJobsResponses, unknown, ThrowOnError, "fields">;
/**
 * Create a new dispatch job
 *
 * Creates and queues a new dispatch job for webhook delivery.
 */
export declare const postApiDispatchJobs: <ThrowOnError extends boolean = false>(options: Options<PostApiDispatchJobsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PostApiDispatchJobsResponses, PostApiDispatchJobsErrors, ThrowOnError, "fields">;
/**
 * Get dispatch jobs for an event
 */
export declare const getApiDispatchJobsByEventByEventId: <ThrowOnError extends boolean = false>(options: Options<GetApiDispatchJobsByEventByEventIdData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetApiDispatchJobsByEventByEventIdResponses, unknown, ThrowOnError, "fields">;
/**
 * Get filter options for dispatch jobs
 *
 * Returns distinct values from the read projection for cascading filter dropdowns.
 */
export declare const getApiDispatchJobsFilterOptions: <ThrowOnError extends boolean = false>(options?: Options<GetApiDispatchJobsFilterOptionsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetApiDispatchJobsFilterOptionsResponses, unknown, ThrowOnError, "fields">;
/**
 * List raw dispatch jobs (from msg_dispatch_jobs, not the read projection).
 * Returns the most recent rows; no pagination — msg_dispatch_jobs ingests
 * at high rates and page navigation is meaningless.
 */
export declare const getApiDispatchJobsRaw: <ThrowOnError extends boolean = false>(options?: Options<GetApiDispatchJobsRawData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetApiDispatchJobsRawResponses, unknown, ThrowOnError, "fields">;
/**
 * Get dispatch job by ID
 */
export declare const getApiDispatchJobsById: <ThrowOnError extends boolean = false>(options: Options<GetApiDispatchJobsByIdData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetApiDispatchJobsByIdResponses, GetApiDispatchJobsByIdErrors, ThrowOnError, "fields">;
/**
 * Get all attempts for a dispatch job
 *
 * Retrieves the full history of webhook delivery attempts for a job.
 */
export declare const getApiDispatchJobsByIdAttempts: <ThrowOnError extends boolean = false>(options: Options<GetApiDispatchJobsByIdAttemptsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetApiDispatchJobsByIdAttemptsResponses, GetApiDispatchJobsByIdAttemptsErrors, ThrowOnError, "fields">;
/**
 * Get raw dispatch job data by ID
 *
 * Returns the full DispatchJob entity serialized directly as JSON (not the DTO).
 */
export declare const getApiDispatchJobsByIdRaw: <ThrowOnError extends boolean = false>(options: Options<GetApiDispatchJobsByIdRawData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetApiDispatchJobsByIdRawResponses, GetApiDispatchJobsByIdRawErrors, ThrowOnError, "fields">;
/**
 * List event types
 */
export declare const getApiEventTypes: <ThrowOnError extends boolean = false>(options: Options<GetApiEventTypesData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetApiEventTypesResponses, unknown, ThrowOnError, "fields">;
/**
 * Create a new event type
 */
export declare const postApiEventTypes: <ThrowOnError extends boolean = false>(options: Options<PostApiEventTypesData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PostApiEventTypesResponses, PostApiEventTypesErrors, ThrowOnError, "fields">;
/**
 * Get event type by code
 */
export declare const getApiEventTypesByCodeByCode: <ThrowOnError extends boolean = false>(options: Options<GetApiEventTypesByCodeByCodeData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetApiEventTypesByCodeByCodeResponses, GetApiEventTypesByCodeByCodeErrors, ThrowOnError, "fields">;
/**
 * Delete event type (archive)
 */
export declare const deleteApiEventTypesById: <ThrowOnError extends boolean = false>(options: Options<DeleteApiEventTypesByIdData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<DeleteApiEventTypesByIdResponses, DeleteApiEventTypesByIdErrors, ThrowOnError, "fields">;
/**
 * Get event type by ID
 */
export declare const getApiEventTypesById: <ThrowOnError extends boolean = false>(options: Options<GetApiEventTypesByIdData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetApiEventTypesByIdResponses, GetApiEventTypesByIdErrors, ThrowOnError, "fields">;
/**
 * Update event type
 */
export declare const putApiEventTypesById: <ThrowOnError extends boolean = false>(options: Options<PutApiEventTypesByIdData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PutApiEventTypesByIdResponses, PutApiEventTypesByIdErrors, ThrowOnError, "fields">;
/**
 * Add schema version to event type
 */
export declare const postApiEventTypesByIdSchemas: <ThrowOnError extends boolean = false>(options: Options<PostApiEventTypesByIdSchemasData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PostApiEventTypesByIdSchemasResponses, PostApiEventTypesByIdSchemasErrors, ThrowOnError, "fields">;
/**
 * List events. Returns the most recent rows matching the filters; no
 * pagination — see `EventsQuery` for the rationale.
 */
export declare const getApiEvents: <ThrowOnError extends boolean = false>(options?: Options<GetApiEventsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetApiEventsResponses, unknown, ThrowOnError, "fields">;
/**
 * Create a new event
 *
 * Creates a new event in the event store. If a deduplicationId is provided and
 * an event with that ID already exists, the existing event is returned (idempotent operation).
 * Dispatch jobs are automatically created for matching subscriptions.
 */
export declare const postApiEvents: <ThrowOnError extends boolean = false>(options: Options<PostApiEventsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PostApiEventsResponses, PostApiEventsErrors, ThrowOnError, "fields">;
/**
 * Get filter options for the events read model.
 */
export declare const getApiEventsFilterOptions: <ThrowOnError extends boolean = false>(options?: Options<GetApiEventsFilterOptionsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetApiEventsFilterOptionsResponses, unknown, ThrowOnError, "fields">;
/**
 * List raw events (from msg_events, not the read projection). Returns the
 * most recent rows; no pagination — msg_events ingests at high rates and
 * page navigation through the firehose is meaningless.
 */
export declare const getApiEventsRaw: <ThrowOnError extends boolean = false>(options?: Options<GetApiEventsRawData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetApiEventsRawResponses, unknown, ThrowOnError, "fields">;
/**
 * Get event by ID
 */
export declare const getApiEventsById: <ThrowOnError extends boolean = false>(options: Options<GetApiEventsByIdData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetApiEventsByIdResponses, GetApiEventsByIdErrors, ThrowOnError, "fields">;
/**
 * Get circuit breaker states
 */
export declare const getApiMonitoringCircuitBreakers: <ThrowOnError extends boolean = false>(options?: Options<GetApiMonitoringCircuitBreakersData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetApiMonitoringCircuitBreakersResponses, unknown, ThrowOnError, "fields">;
/**
 * Get dashboard metrics
 */
export declare const getApiMonitoringDashboard: <ThrowOnError extends boolean = false>(options?: Options<GetApiMonitoringDashboardData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetApiMonitoringDashboardResponses, unknown, ThrowOnError, "fields">;
/**
 * Get in-flight messages
 */
export declare const getApiMonitoringInFlightMessages: <ThrowOnError extends boolean = false>(options?: Options<GetApiMonitoringInFlightMessagesData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetApiMonitoringInFlightMessagesResponses, unknown, ThrowOnError, "fields">;
/**
 * Get pool statistics with enhanced metrics
 */
export declare const getApiMonitoringPoolStats: <ThrowOnError extends boolean = false>(options?: Options<GetApiMonitoringPoolStatsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetApiMonitoringPoolStatsResponses, unknown, ThrowOnError, "fields">;
/**
 * Get standby status
 */
export declare const getApiMonitoringStandbyStatus: <ThrowOnError extends boolean = false>(options?: Options<GetApiMonitoringStandbyStatusData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetApiMonitoringStandbyStatusResponses, unknown, ThrowOnError, "fields">;
/**
 * List OAuth clients
 */
export declare const getApiOauthClients: <ThrowOnError extends boolean = false>(options: Options<GetApiOauthClientsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetApiOauthClientsResponses, unknown, ThrowOnError, "fields">;
/**
 * Create a new OAuth client
 */
export declare const postApiOauthClients: <ThrowOnError extends boolean = false>(options: Options<PostApiOauthClientsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PostApiOauthClientsResponses, PostApiOauthClientsErrors, ThrowOnError, "fields">;
/**
 * Get OAuth client by client_id (public identifier)
 */
export declare const getApiOauthClientsByClientId: <ThrowOnError extends boolean = false>(options: Options<GetApiOauthClientsByClientIdData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetApiOauthClientsByClientIdResponses, GetApiOauthClientsByClientIdErrors, ThrowOnError, "fields">;
/**
 * Delete OAuth client
 */
export declare const deleteApiOauthClientsById: <ThrowOnError extends boolean = false>(options: Options<DeleteApiOauthClientsByIdData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<DeleteApiOauthClientsByIdResponses, DeleteApiOauthClientsByIdErrors, ThrowOnError, "fields">;
/**
 * Get OAuth client by ID
 */
export declare const getApiOauthClientsById: <ThrowOnError extends boolean = false>(options: Options<GetApiOauthClientsByIdData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetApiOauthClientsByIdResponses, GetApiOauthClientsByIdErrors, ThrowOnError, "fields">;
/**
 * Update OAuth client
 */
export declare const putApiOauthClientsById: <ThrowOnError extends boolean = false>(options: Options<PutApiOauthClientsByIdData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PutApiOauthClientsByIdResponses, PutApiOauthClientsByIdErrors, ThrowOnError, "fields">;
/**
 * Activate OAuth client
 */
export declare const postApiOauthClientsActivate: <ThrowOnError extends boolean = false>(options: Options<PostApiOauthClientsActivateData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PostApiOauthClientsActivateResponses, PostApiOauthClientsActivateErrors, ThrowOnError, "fields">;
/**
 * Deactivate OAuth client
 */
export declare const postApiOauthClientsDeactivate: <ThrowOnError extends boolean = false>(options: Options<PostApiOauthClientsDeactivateData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PostApiOauthClientsDeactivateResponses, PostApiOauthClientsDeactivateErrors, ThrowOnError, "fields">;
/**
 * Regenerate OAuth client secret
 */
export declare const postApiOauthClientsRegenerateSecret: <ThrowOnError extends boolean = false>(options: Options<PostApiOauthClientsRegenerateSecretData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PostApiOauthClientsRegenerateSecretResponses, PostApiOauthClientsRegenerateSecretErrors, ThrowOnError, "fields">;
/**
 * Rotate OAuth client secret (alias for regenerate-secret, matches TS API)
 */
export declare const postApiOauthClientsRotateSecret: <ThrowOnError extends boolean = false>(options: Options<PostApiOauthClientsRotateSecretData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PostApiOauthClientsRotateSecretResponses, PostApiOauthClientsRotateSecretErrors, ThrowOnError, "fields">;
/**
 * List principals
 */
export declare const getApiPrincipals: <ThrowOnError extends boolean = false>(options?: Options<GetApiPrincipalsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetApiPrincipalsResponses, unknown, ThrowOnError, "fields">;
/**
 * Check email domain configuration
 */
export declare const getApiPrincipalsCheckEmailDomain: <ThrowOnError extends boolean = false>(options: Options<GetApiPrincipalsCheckEmailDomainData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetApiPrincipalsCheckEmailDomainResponses, unknown, ThrowOnError, "fields">;
/**
 * Create a new user principal
 */
export declare const postApiPrincipalsUsers: <ThrowOnError extends boolean = false>(options: Options<PostApiPrincipalsUsersData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PostApiPrincipalsUsersResponses, PostApiPrincipalsUsersErrors, ThrowOnError, "fields">;
/**
 * Delete principal (deactivate)
 */
export declare const deleteApiPrincipalsById: <ThrowOnError extends boolean = false>(options: Options<DeleteApiPrincipalsByIdData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<DeleteApiPrincipalsByIdResponses, DeleteApiPrincipalsByIdErrors, ThrowOnError, "fields">;
/**
 * Get principal by ID
 */
export declare const getApiPrincipalsById: <ThrowOnError extends boolean = false>(options: Options<GetApiPrincipalsByIdData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetApiPrincipalsByIdResponses, GetApiPrincipalsByIdErrors, ThrowOnError, "fields">;
/**
 * Update principal
 */
export declare const putApiPrincipalsById: <ThrowOnError extends boolean = false>(options: Options<PutApiPrincipalsByIdData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PutApiPrincipalsByIdResponses, PutApiPrincipalsByIdErrors, ThrowOnError, "fields">;
/**
 * Activate a principal
 *
 * Reactivates a deactivated principal.
 */
export declare const postApiPrincipalsByIdActivate: <ThrowOnError extends boolean = false>(options: Options<PostApiPrincipalsByIdActivateData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PostApiPrincipalsByIdActivateResponses, PostApiPrincipalsByIdActivateErrors, ThrowOnError, "fields">;
/**
 * Get application access for a principal
 *
 * Returns all applications the principal has been granted access to.
 */
export declare const getApiPrincipalsByIdApplicationAccess: <ThrowOnError extends boolean = false>(options: Options<GetApiPrincipalsByIdApplicationAccessData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetApiPrincipalsByIdApplicationAccessResponses, GetApiPrincipalsByIdApplicationAccessErrors, ThrowOnError, "fields">;
/**
 * Set application access for a principal (batch replace)
 *
 * Replaces all application access with the provided list.
 */
export declare const putApiPrincipalsByIdApplicationAccess: <ThrowOnError extends boolean = false>(options: Options<PutApiPrincipalsByIdApplicationAccessData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PutApiPrincipalsByIdApplicationAccessResponses, PutApiPrincipalsByIdApplicationAccessErrors, ThrowOnError, "fields">;
/**
 * Get available applications for a principal
 *
 * ANCHOR users see all active applications.
 * CLIENT users see only applications enabled for their accessible client configs.
 */
export declare const getApiPrincipalsByIdAvailableApplications: <ThrowOnError extends boolean = false>(options: Options<GetApiPrincipalsByIdAvailableApplicationsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetApiPrincipalsByIdAvailableApplicationsResponses, GetApiPrincipalsByIdAvailableApplicationsErrors, ThrowOnError, "fields">;
/**
 * Get client access grants for a principal
 */
export declare const getApiPrincipalsByIdClientAccess: <ThrowOnError extends boolean = false>(options: Options<GetApiPrincipalsByIdClientAccessData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetApiPrincipalsByIdClientAccessResponses, GetApiPrincipalsByIdClientAccessErrors, ThrowOnError, "fields">;
/**
 * Grant client access to principal
 */
export declare const postApiPrincipalsByIdClientAccess: <ThrowOnError extends boolean = false>(options: Options<PostApiPrincipalsByIdClientAccessData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PostApiPrincipalsByIdClientAccessResponses, PostApiPrincipalsByIdClientAccessErrors, ThrowOnError, "fields">;
/**
 * Revoke client access from principal
 */
export declare const deleteApiPrincipalsByIdClientAccessByClientId: <ThrowOnError extends boolean = false>(options: Options<DeleteApiPrincipalsByIdClientAccessByClientIdData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<DeleteApiPrincipalsByIdClientAccessByClientIdResponses, DeleteApiPrincipalsByIdClientAccessByClientIdErrors, ThrowOnError, "fields">;
/**
 * Deactivate a principal
 *
 * Deactivates an active principal.
 */
export declare const postApiPrincipalsByIdDeactivate: <ThrowOnError extends boolean = false>(options: Options<PostApiPrincipalsByIdDeactivateData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PostApiPrincipalsByIdDeactivateResponses, PostApiPrincipalsByIdDeactivateErrors, ThrowOnError, "fields">;
/**
 * Reset a user's password
 *
 * Resets the password for an internal auth user. Does not work for OIDC users.
 */
export declare const postApiPrincipalsByIdResetPassword: <ThrowOnError extends boolean = false>(options: Options<PostApiPrincipalsByIdResetPasswordData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PostApiPrincipalsByIdResetPasswordResponses, PostApiPrincipalsByIdResetPasswordErrors, ThrowOnError, "fields">;
/**
 * Get roles assigned to a principal
 */
export declare const getApiPrincipalsByIdRoles: <ThrowOnError extends boolean = false>(options: Options<GetApiPrincipalsByIdRolesData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetApiPrincipalsByIdRolesResponses, GetApiPrincipalsByIdRolesErrors, ThrowOnError, "fields">;
/**
 * Assign role to principal
 */
export declare const postApiPrincipalsByIdRoles: <ThrowOnError extends boolean = false>(options: Options<PostApiPrincipalsByIdRolesData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PostApiPrincipalsByIdRolesResponses, PostApiPrincipalsByIdRolesErrors, ThrowOnError, "fields">;
/**
 * Batch assign roles to principal (declarative - replaces all roles)
 */
export declare const putApiPrincipalsByIdRoles: <ThrowOnError extends boolean = false>(options: Options<PutApiPrincipalsByIdRolesData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PutApiPrincipalsByIdRolesResponses, PutApiPrincipalsByIdRolesErrors, ThrowOnError, "fields">;
/**
 * Remove role from principal
 */
export declare const deleteApiPrincipalsByIdRolesByRoleName: <ThrowOnError extends boolean = false>(options: Options<DeleteApiPrincipalsByIdRolesByRoleNameData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<DeleteApiPrincipalsByIdRolesByRoleNameResponses, DeleteApiPrincipalsByIdRolesByRoleNameErrors, ThrowOnError, "fields">;
/**
 * Trigger a password reset email for an internal-auth user.
 *
 * Sends the same single-use email as the user-initiated
 * `/auth/password-reset/request` flow. The user clicks the link and sets
 * their own password; the admin never sees or handles the password.
 *
 * Rejects OIDC-federated users (they manage credentials at their IDP) and
 * users without an email address.
 */
export declare const postApiPrincipalsByIdSendPasswordReset: <ThrowOnError extends boolean = false>(options: Options<PostApiPrincipalsByIdSendPasswordResetData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PostApiPrincipalsByIdSendPasswordResetResponses, PostApiPrincipalsByIdSendPasswordResetErrors, ThrowOnError, "fields">;
export declare const getApiProcesses: <ThrowOnError extends boolean = false>(options: Options<GetApiProcessesData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetApiProcessesResponses, unknown, ThrowOnError, "fields">;
export declare const postApiProcesses: <ThrowOnError extends boolean = false>(options: Options<PostApiProcessesData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PostApiProcessesResponses, PostApiProcessesErrors, ThrowOnError, "fields">;
export declare const getApiProcessesByCode: <ThrowOnError extends boolean = false>(options: Options<GetApiProcessesByCodeData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetApiProcessesByCodeResponses, GetApiProcessesByCodeErrors, ThrowOnError, "fields">;
export declare const deleteApiProcessesById: <ThrowOnError extends boolean = false>(options: Options<DeleteApiProcessesByIdData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<DeleteApiProcessesByIdResponses, DeleteApiProcessesByIdErrors, ThrowOnError, "fields">;
export declare const getApiProcessesById: <ThrowOnError extends boolean = false>(options: Options<GetApiProcessesByIdData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetApiProcessesByIdResponses, GetApiProcessesByIdErrors, ThrowOnError, "fields">;
export declare const putApiProcessesById: <ThrowOnError extends boolean = false>(options: Options<PutApiProcessesByIdData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PutApiProcessesByIdResponses, PutApiProcessesByIdErrors, ThrowOnError, "fields">;
export declare const postApiProcessesByIdArchive: <ThrowOnError extends boolean = false>(options: Options<PostApiProcessesByIdArchiveData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PostApiProcessesByIdArchiveResponses, PostApiProcessesByIdArchiveErrors, ThrowOnError, "fields">;
/**
 * List roles
 */
export declare const getApiRoles: <ThrowOnError extends boolean = false>(options: Options<GetApiRolesData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetApiRolesResponses, unknown, ThrowOnError, "fields">;
/**
 * Create a new role
 */
export declare const postApiRoles: <ThrowOnError extends boolean = false>(options: Options<PostApiRolesData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PostApiRolesResponses, PostApiRolesErrors, ThrowOnError, "fields">;
/**
 * Get roles by application ID
 */
export declare const getApiRolesByApplicationByApplicationId: <ThrowOnError extends boolean = false>(options: Options<GetApiRolesByApplicationByApplicationIdData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetApiRolesByApplicationByApplicationIdResponses, unknown, ThrowOnError, "fields">;
/**
 * Get role by code (name)
 */
export declare const getApiRolesByCodeByCode: <ThrowOnError extends boolean = false>(options: Options<GetApiRolesByCodeByCodeData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetApiRolesByCodeByCodeResponses, GetApiRolesByCodeByCodeErrors, ThrowOnError, "fields">;
/**
 * Get roles by source (CODE, DATABASE, SDK)
 */
export declare const getApiRolesBySourceBySource: <ThrowOnError extends boolean = false>(options: Options<GetApiRolesBySourceBySourceData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetApiRolesBySourceBySourceResponses, GetApiRolesBySourceBySourceErrors, ThrowOnError, "fields">;
/**
 * Get applications for role filter dropdown
 */
export declare const getApiRolesFiltersApplications: <ThrowOnError extends boolean = false>(options?: Options<GetApiRolesFiltersApplicationsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetApiRolesFiltersApplicationsResponses, unknown, ThrowOnError, "fields">;
/**
 * List all permissions
 */
export declare const getApiRolesPermissions: <ThrowOnError extends boolean = false>(options?: Options<GetApiRolesPermissionsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetApiRolesPermissionsResponses, unknown, ThrowOnError, "fields">;
/**
 * Get permission by string
 */
export declare const getApiRolesPermissionsByPermission: <ThrowOnError extends boolean = false>(options: Options<GetApiRolesPermissionsByPermissionData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetApiRolesPermissionsByPermissionResponses, GetApiRolesPermissionsByPermissionErrors, ThrowOnError, "fields">;
/**
 * Delete role
 */
export declare const deleteApiRolesByName: <ThrowOnError extends boolean = false>(options: Options<DeleteApiRolesByNameData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<DeleteApiRolesByNameResponses, DeleteApiRolesByNameErrors, ThrowOnError, "fields">;
/**
 * Get role by ID or name (code)
 *
 * The frontend calls this with the role name (e.g., "platform:super-admin"),
 * so we try by code first if it contains ":", otherwise by ID.
 */
export declare const getApiRolesByName: <ThrowOnError extends boolean = false>(options: Options<GetApiRolesByNameData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetApiRolesByNameResponses, GetApiRolesByNameErrors, ThrowOnError, "fields">;
/**
 * Update role
 */
export declare const putApiRolesByName: <ThrowOnError extends boolean = false>(options: Options<PutApiRolesByNameData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PutApiRolesByNameResponses, PutApiRolesByNameErrors, ThrowOnError, "fields">;
/**
 * Grant permission to role
 */
export declare const postApiRolesByNamePermissions: <ThrowOnError extends boolean = false>(options: Options<PostApiRolesByNamePermissionsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PostApiRolesByNamePermissionsResponses, PostApiRolesByNamePermissionsErrors, ThrowOnError, "fields">;
/**
 * Revoke permission from role
 */
export declare const deleteApiRolesByNamePermissionsByPermission: <ThrowOnError extends boolean = false>(options: Options<DeleteApiRolesByNamePermissionsByPermissionData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<DeleteApiRolesByNamePermissionsByPermissionResponses, DeleteApiRolesByNamePermissionsByPermissionErrors, ThrowOnError, "fields">;
export declare const getApiScheduledJobs: <ThrowOnError extends boolean = false>(options: Options<GetApiScheduledJobsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetApiScheduledJobsResponses, unknown, ThrowOnError, "fields">;
export declare const postApiScheduledJobs: <ThrowOnError extends boolean = false>(options: Options<PostApiScheduledJobsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PostApiScheduledJobsResponses, PostApiScheduledJobsErrors, ThrowOnError, "fields">;
export declare const getApiScheduledJobsByCode: <ThrowOnError extends boolean = false>(options: Options<GetApiScheduledJobsByCodeData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetApiScheduledJobsByCodeResponses, GetApiScheduledJobsByCodeErrors, ThrowOnError, "fields">;
export declare const getApiScheduledJobsInstancesById: <ThrowOnError extends boolean = false>(options: Options<GetApiScheduledJobsInstancesByIdData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetApiScheduledJobsInstancesByIdResponses, GetApiScheduledJobsInstancesByIdErrors, ThrowOnError, "fields">;
export declare const postApiScheduledJobsInstancesByIdComplete: <ThrowOnError extends boolean = false>(options: Options<PostApiScheduledJobsInstancesByIdCompleteData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PostApiScheduledJobsInstancesByIdCompleteResponses, PostApiScheduledJobsInstancesByIdCompleteErrors, ThrowOnError, "fields">;
export declare const postApiScheduledJobsInstancesByIdLog: <ThrowOnError extends boolean = false>(options: Options<PostApiScheduledJobsInstancesByIdLogData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PostApiScheduledJobsInstancesByIdLogResponses, PostApiScheduledJobsInstancesByIdLogErrors, ThrowOnError, "fields">;
export declare const getApiScheduledJobsInstancesByIdLogs: <ThrowOnError extends boolean = false>(options: Options<GetApiScheduledJobsInstancesByIdLogsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetApiScheduledJobsInstancesByIdLogsResponses, GetApiScheduledJobsInstancesByIdLogsErrors, ThrowOnError, "fields">;
export declare const deleteApiScheduledJobsById: <ThrowOnError extends boolean = false>(options: Options<DeleteApiScheduledJobsByIdData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<DeleteApiScheduledJobsByIdResponses, DeleteApiScheduledJobsByIdErrors, ThrowOnError, "fields">;
export declare const getApiScheduledJobsById: <ThrowOnError extends boolean = false>(options: Options<GetApiScheduledJobsByIdData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetApiScheduledJobsByIdResponses, GetApiScheduledJobsByIdErrors, ThrowOnError, "fields">;
export declare const putApiScheduledJobsById: <ThrowOnError extends boolean = false>(options: Options<PutApiScheduledJobsByIdData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PutApiScheduledJobsByIdResponses, PutApiScheduledJobsByIdErrors, ThrowOnError, "fields">;
export declare const postApiScheduledJobsByIdArchive: <ThrowOnError extends boolean = false>(options: Options<PostApiScheduledJobsByIdArchiveData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PostApiScheduledJobsByIdArchiveResponses, PostApiScheduledJobsByIdArchiveErrors, ThrowOnError, "fields">;
export declare const postApiScheduledJobsByIdFire: <ThrowOnError extends boolean = false>(options: Options<PostApiScheduledJobsByIdFireData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PostApiScheduledJobsByIdFireResponses, PostApiScheduledJobsByIdFireErrors, ThrowOnError, "fields">;
export declare const getApiScheduledJobsByIdInstances: <ThrowOnError extends boolean = false>(options: Options<GetApiScheduledJobsByIdInstancesData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetApiScheduledJobsByIdInstancesResponses, unknown, ThrowOnError, "fields">;
export declare const postApiScheduledJobsByIdPause: <ThrowOnError extends boolean = false>(options: Options<PostApiScheduledJobsByIdPauseData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PostApiScheduledJobsByIdPauseResponses, PostApiScheduledJobsByIdPauseErrors, ThrowOnError, "fields">;
export declare const postApiScheduledJobsByIdResume: <ThrowOnError extends boolean = false>(options: Options<PostApiScheduledJobsByIdResumeData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PostApiScheduledJobsByIdResumeResponses, PostApiScheduledJobsByIdResumeErrors, ThrowOnError, "fields">;
/**
 * List subscriptions
 */
export declare const getApiSubscriptions: <ThrowOnError extends boolean = false>(options: Options<GetApiSubscriptionsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetApiSubscriptionsResponses, unknown, ThrowOnError, "fields">;
/**
 * Create a new subscription
 */
export declare const postApiSubscriptions: <ThrowOnError extends boolean = false>(options: Options<PostApiSubscriptionsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PostApiSubscriptionsResponses, PostApiSubscriptionsErrors, ThrowOnError, "fields">;
/**
 * Delete subscription (archive)
 */
export declare const deleteApiSubscriptionsById: <ThrowOnError extends boolean = false>(options: Options<DeleteApiSubscriptionsByIdData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<DeleteApiSubscriptionsByIdResponses, DeleteApiSubscriptionsByIdErrors, ThrowOnError, "fields">;
/**
 * Get subscription by ID
 */
export declare const getApiSubscriptionsById: <ThrowOnError extends boolean = false>(options: Options<GetApiSubscriptionsByIdData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetApiSubscriptionsByIdResponses, GetApiSubscriptionsByIdErrors, ThrowOnError, "fields">;
/**
 * Update subscription
 */
export declare const putApiSubscriptionsById: <ThrowOnError extends boolean = false>(options: Options<PutApiSubscriptionsByIdData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PutApiSubscriptionsByIdResponses, PutApiSubscriptionsByIdErrors, ThrowOnError, "fields">;
/**
 * Pause subscription
 */
export declare const postApiSubscriptionsByIdPause: <ThrowOnError extends boolean = false>(options: Options<PostApiSubscriptionsByIdPauseData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PostApiSubscriptionsByIdPauseResponses, PostApiSubscriptionsByIdPauseErrors, ThrowOnError, "fields">;
/**
 * Resume subscription
 */
export declare const postApiSubscriptionsByIdResume: <ThrowOnError extends boolean = false>(options: Options<PostApiSubscriptionsByIdResumeData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PostApiSubscriptionsByIdResumeResponses, PostApiSubscriptionsByIdResumeErrors, ThrowOnError, "fields">;
/**
 * Check email domain authentication method
 *
 * Determines how a user with the given email should authenticate:
 * - Internal: username/password
 * - OIDC: external identity provider
 *
 * This is called before showing the login form to determine
 * if the user should be redirected to an external IDP.
 */
export declare const getAuthCheckDomain: <ThrowOnError extends boolean = false>(options: Options<GetAuthCheckDomainData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetAuthCheckDomainResponses, unknown, ThrowOnError, "fields">;
/**
 * Login with email and password
 *
 * Authenticates a user with email and password credentials.
 * Returns an access token on success and sets a session cookie.
 */
export declare const postAuthLogin: <ThrowOnError extends boolean = false>(options: Options<PostAuthLoginData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PostAuthLoginResponses, PostAuthLoginErrors, ThrowOnError, "fields">;
/**
 * Logout / revoke token
 *
 * Invalidates the current session by clearing the session cookie.
 */
export declare const postAuthLogout: <ThrowOnError extends boolean = false>(options?: Options<PostAuthLogoutData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PostAuthLogoutResponses, unknown, ThrowOnError, "fields">;
/**
 * Get current user info
 *
 * Returns information about the currently authenticated user.
 */
export declare const getAuthMe: <ThrowOnError extends boolean = false>(options?: Options<GetAuthMeData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetAuthMeResponses, GetAuthMeErrors, ThrowOnError, "fields">;
/**
 * Refresh access token
 *
 * Exchange a refresh token for a new access token.
 * The refresh token is rotated (old one invalidated, new one issued).
 */
export declare const postAuthRefresh: <ThrowOnError extends boolean = false>(options: Options<PostAuthRefreshData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PostAuthRefreshResponses, PostAuthRefreshErrors, ThrowOnError, "fields">;
/**
 * Begin passkey authentication
 *
 * Returns a `PublicKeyCredentialRequestOptions` challenge. The response
 * shape is identical for known and unknown emails (deterministic-fake
 * `allowCredentials` is generated for unknown / federated / no-credentials
 * cases) — clients cannot distinguish them.
 */
export declare const postWebauthnAuthenticateBegin: <ThrowOnError extends boolean = false>(options: Options<PostWebauthnAuthenticateBeginData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PostWebauthnAuthenticateBeginResponses, unknown, ThrowOnError, "fields">;
/**
 * Complete passkey authentication
 *
 * Validates the assertion, applies counter / backup-state updates,
 * re-checks the federation gate (hard cutover), and on success issues a
 * session cookie. All failure modes return 401 `INVALID_CREDENTIALS` with
 * an identical shape to defeat enumeration.
 */
export declare const postWebauthnAuthenticateComplete: <ThrowOnError extends boolean = false>(options: Options<PostWebauthnAuthenticateCompleteData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PostWebauthnAuthenticateCompleteResponses, PostWebauthnAuthenticateCompleteErrors, ThrowOnError, "fields">;
/**
 * List the caller's registered passkeys
 */
export declare const getWebauthnCredentials: <ThrowOnError extends boolean = false>(options?: Options<GetWebauthnCredentialsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetWebauthnCredentialsResponses, GetWebauthnCredentialsErrors, ThrowOnError, "fields">;
/**
 * Revoke one of the caller's passkeys
 */
export declare const deleteWebauthnCredential: <ThrowOnError extends boolean = false>(options: Options<DeleteWebauthnCredentialData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<DeleteWebauthnCredentialResponses, DeleteWebauthnCredentialErrors, ThrowOnError, "fields">;
/**
 * Begin passkey registration
 *
 * Returns a WebAuthn `PublicKeyCredentialCreationOptions` challenge. The
 * browser passes this to `navigator.credentials.create()` and posts the
 * result to `/auth/webauthn/register/complete`.
 */
export declare const postWebauthnRegisterBegin: <ThrowOnError extends boolean = false>(options: Options<PostWebauthnRegisterBeginData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PostWebauthnRegisterBeginResponses, PostWebauthnRegisterBeginErrors, ThrowOnError, "fields">;
/**
 * Complete passkey registration
 *
 * Validates the browser's attestation response and stores the credential.
 */
export declare const postWebauthnRegisterComplete: <ThrowOnError extends boolean = false>(options: Options<PostWebauthnRegisterCompleteData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PostWebauthnRegisterCompleteResponses, PostWebauthnRegisterCompleteErrors, ThrowOnError, "fields">;
//# sourceMappingURL=sdk.gen.d.ts.map