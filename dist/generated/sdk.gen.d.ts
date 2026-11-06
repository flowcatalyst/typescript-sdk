import type { Client, Options as Options2, TDataShape } from './client/index.js';
import type { ActivateApplicationData, ActivateApplicationErrors, ActivateApplicationResponses, ActivateClientData, ActivateClientErrors, ActivateClientResponses, ActivateConnectionData, ActivateConnectionErrors, ActivateConnectionResponses, ActivateDispatchPoolData, ActivateDispatchPoolErrors, ActivateDispatchPoolResponses, ActivateFieldDeviceData, ActivateFieldDeviceErrors, ActivateFieldDeviceResponses, ActivateFieldWorkerData, ActivateFieldWorkerErrors, ActivateFieldWorkerResponses, ActivateOAuthClientData, ActivateOAuthClientErrors, ActivateOAuthClientResponses, ActivatePortalUserData, ActivatePortalUserErrors, ActivatePortalUserResponses, ActivatePrincipalData, ActivatePrincipalErrors, ActivatePrincipalResponses, AddClientNoteData, AddClientNoteErrors, AddClientNoteResponses, AddCorsOriginData, AddCorsOriginErrors, AddCorsOriginResponses, AddEventTypeSchemaData, AddEventTypeSchemaErrors, AddEventTypeSchemaResponses, AddEventTypeVersionData, AddEventTypeVersionErrors, AddEventTypeVersionResponses, AddPrincipalRoleData, AddPrincipalRoleErrors, AddPrincipalRoleResponses, ApplyIngestionSetData, ApplyIngestionSetErrors, ApplyIngestionSetResponses, ApproveResetApprovalData, ApproveResetApprovalErrors, ApproveResetApprovalResponses, ArchiveDispatchPoolData, ArchiveDispatchPoolErrors, ArchiveDispatchPoolResponses, ArchiveProcessData, ArchiveProcessErrors, ArchiveProcessResponses, ArchiveScheduledJobData, ArchiveScheduledJobErrors, ArchiveScheduledJobResponses, AssignPrincipalApplicationAccessData, AssignPrincipalApplicationAccessErrors, AssignPrincipalApplicationAccessResponses, AssignPrincipalRolesData, AssignPrincipalRolesErrors, AssignPrincipalRolesResponses, AssignServiceAccountRolesData, AssignServiceAccountRolesErrors, AssignServiceAccountRolesResponses, AssignUnassignedPortalUsersData, AssignUnassignedPortalUsersErrors, AssignUnassignedPortalUsersResponses, AttachApplicationServiceAccountData, AttachApplicationServiceAccountErrors, AttachApplicationServiceAccountResponses, AuditLogApplicationIdsData, AuditLogApplicationIdsErrors, AuditLogApplicationIdsResponses, AuditLogClientIdsData, AuditLogClientIdsErrors, AuditLogClientIdsResponses, AuditLogEntityTypesData, AuditLogEntityTypesErrors, AuditLogEntityTypesResponses, AuditLogOperationsData, AuditLogOperationsErrors, AuditLogOperationsResponses, AuditLogsByEntityData, AuditLogsByEntityErrors, AuditLogsByEntityResponses, AuditLogsByPrincipalData, AuditLogsByPrincipalErrors, AuditLogsByPrincipalResponses, BatchIngestEventsData, BatchIngestEventsErrors, BatchIngestEventsResponses, BulkImportUsersData, BulkImportUsersErrors, BulkImportUsersResponses, CancelDispatchJobData, CancelDispatchJobErrors, CancelDispatchJobResponses, CheckPrincipalEmailDomainData, CheckPrincipalEmailDomainErrors, CheckPrincipalEmailDomainResponses, CompleteDispatchJobData, CompleteDispatchJobErrors, CompleteDispatchJobResponses, CompleteScheduledJobInstanceData, CompleteScheduledJobInstanceErrors, CompleteScheduledJobInstanceResponses, CreateAnchorDomainData, CreateAnchorDomainErrors, CreateAnchorDomainResponses, CreateApplicationData, CreateApplicationErrors, CreateApplicationResponses, CreateAuthConfigData, CreateAuthConfigErrors, CreateAuthConfigResponses, CreateClientData, CreateClientErrors, CreateClientResponses, CreateConnectionData, CreateConnectionErrors, CreateConnectionResponses, CreateDispatchPoolData, CreateDispatchPoolErrors, CreateDispatchPoolResponses, CreateEmailDomainMappingData, CreateEmailDomainMappingErrors, CreateEmailDomainMappingResponses, CreateEventData, CreateEventErrors, CreateEventResponses, CreateEventTypeData, CreateEventTypeErrors, CreateEventTypeResponses, CreateFieldEnrolmentCodeData, CreateFieldEnrolmentCodeErrors, CreateFieldEnrolmentCodeResponses, CreateFieldWorkerSignInCodeData, CreateFieldWorkerSignInCodeErrors, CreateFieldWorkerSignInCodeResponses, CreateFunctionData, CreateFunctionDomainData, CreateFunctionDomainErrors, CreateFunctionDomainResponses, CreateFunctionErrors, CreateFunctionResponses, CreateIdentityProviderData, CreateIdentityProviderErrors, CreateIdentityProviderResponses, CreateIdpRoleMappingData, CreateIdpRoleMappingErrors, CreateIdpRoleMappingResponses, CreateIngestionData, CreateIngestionErrors, CreateIngestionResponses, CreateOAuthClientData, CreateOAuthClientErrors, CreateOAuthClientResponses, CreatePortalAppData, CreatePortalAppErrors, CreatePortalAppResponses, CreatePrincipalData, CreatePrincipalErrors, CreatePrincipalResponses, CreateProcessData, CreateProcessErrors, CreateProcessResponses, CreateRoleData, CreateRoleErrors, CreateRoleResponses, CreateScheduledJobData, CreateScheduledJobErrors, CreateScheduledJobResponses, CreateServiceAccountData, CreateServiceAccountErrors, CreateServiceAccountResponses, CreateSubscriptionData, CreateSubscriptionErrors, CreateSubscriptionResponses, CreateUserData, CreateUserErrors, CreateUserResponses, DeactivateApplicationData, DeactivateApplicationErrors, DeactivateApplicationResponses, DeactivateClientData, DeactivateClientErrors, DeactivateClientResponses, DeactivateOAuthClientData, DeactivateOAuthClientErrors, DeactivateOAuthClientResponses, DeactivatePortalUserData, DeactivatePortalUserErrors, DeactivatePortalUserResponses, DeactivatePrincipalData, DeactivatePrincipalErrors, DeactivatePrincipalResponses, DeactivateServiceAccountData, DeactivateServiceAccountErrors, DeactivateServiceAccountResponses, DeleteAnchorDomainData, DeleteAnchorDomainErrors, DeleteAnchorDomainResponses, DeleteApplicationData, DeleteApplicationErrors, DeleteApplicationResponses, DeleteAuthConfigData, DeleteAuthConfigErrors, DeleteAuthConfigResponses, DeleteClientData, DeleteClientErrors, DeleteClientResponses, DeleteConnectionData, DeleteConnectionErrors, DeleteConnectionResponses, DeleteCorsOriginData, DeleteCorsOriginErrors, DeleteCorsOriginResponses, DeleteDispatchPoolData, DeleteDispatchPoolErrors, DeleteDispatchPoolResponses, DeleteEmailDomainMappingData, DeleteEmailDomainMappingErrors, DeleteEmailDomainMappingResponses, DeleteEventTypeData, DeleteEventTypeErrors, DeleteEventTypeResponses, DeleteFieldWorkerData, DeleteFieldWorkerErrors, DeleteFieldWorkerResponses, DeleteFunctionAliasData, DeleteFunctionAliasErrors, DeleteFunctionAliasResponses, DeleteFunctionConfigData, DeleteFunctionConfigErrors, DeleteFunctionConfigResponses, DeleteFunctionData, DeleteFunctionDbData, DeleteFunctionDbErrors, DeleteFunctionDbResponses, DeleteFunctionDomainData, DeleteFunctionDomainErrors, DeleteFunctionDomainResponses, DeleteFunctionErrors, DeleteFunctionResponses, DeleteFunctionRouteData, DeleteFunctionRouteErrors, DeleteFunctionRouteResponses, DeleteFunctionSecretData, DeleteFunctionSecretErrors, DeleteFunctionSecretResponses, DeleteIdentityProviderData, DeleteIdentityProviderErrors, DeleteIdentityProviderResponses, DeleteIdpRoleMappingData, DeleteIdpRoleMappingErrors, DeleteIdpRoleMappingResponses, DeleteIngestionConfigData, DeleteIngestionConfigErrors, DeleteIngestionConfigResponses, DeleteIngestionData, DeleteIngestionErrors, DeleteIngestionResponses, DeleteOAuthClientData, DeleteOAuthClientErrors, DeleteOAuthClientResponses, DeletePermissionData, DeletePermissionErrors, DeletePermissionResponses, DeletePlatformConfigPropertyData, DeletePlatformConfigPropertyErrors, DeletePlatformConfigPropertyResponses, DeletePortalAppData, DeletePortalAppErrors, DeletePortalAppResponses, DeletePortalUserData, DeletePortalUserErrors, DeletePortalUserResponses, DeletePrincipalData, DeletePrincipalErrors, DeletePrincipalResponses, DeleteProcessData, DeleteProcessErrors, DeleteProcessResponses, DeleteRoleData, DeleteRoleErrors, DeleteRoleResponses, DeleteScheduledJobData, DeleteScheduledJobErrors, DeleteScheduledJobResponses, DeleteServiceAccountData, DeleteServiceAccountErrors, DeleteServiceAccountResponses, DeleteSubscriptionData, DeleteSubscriptionErrors, DeleteSubscriptionResponses, DeleteWebauthnCredentialData, DeleteWebauthnCredentialErrors, DeleteWebauthnCredentialResponses, DenyResetApprovalData, DenyResetApprovalErrors, DenyResetApprovalResponses, DisableApplicationForClientData, DisableApplicationForClientErrors, DisableApplicationForClientResponses, DisableClientApplicationData, DisableClientApplicationErrors, DisableClientApplicationResponses, DisableFunctionTraceContextData, DisableFunctionTraceContextErrors, DisableFunctionTraceContextResponses, DisableIngestionTraceData, DisableIngestionTraceErrors, DisableIngestionTraceResponses, DismissIngestionFailureData, DismissIngestionFailureErrors, DismissIngestionFailureResponses, DispatchJobFilterOptionsData, DispatchJobFilterOptionsErrors, DispatchJobFilterOptionsResponses, DispatchJobsByEventAliasData, DispatchJobsByEventAliasErrors, DispatchJobsByEventAliasResponses, DispatchJobsByEventData, DispatchJobsByEventErrors, DispatchJobsByEventResponses, EditDispatchJobPayloadData, EditDispatchJobPayloadErrors, EditDispatchJobPayloadResponses, EnableApplicationForClientData, EnableApplicationForClientErrors, EnableApplicationForClientResponses, EnableClientApplicationData, EnableClientApplicationErrors, EnableClientApplicationResponses, EnableFunctionTraceContextData, EnableFunctionTraceContextErrors, EnableFunctionTraceContextResponses, EnableIngestionTraceData, EnableIngestionTraceErrors, EnableIngestionTraceResponses, EnsureFieldWorkerData, EnsureFieldWorkerErrors, EnsureFieldWorkerResponses, EnsurePortalUserData, EnsurePortalUserErrors, EnsurePortalUserResponses, EventFilterOptionsData, EventFilterOptionsErrors, EventFilterOptionsResponses, FireScheduledJobNowData, FireScheduledJobNowErrors, FireScheduledJobNowResponses, GetApplicationByCodeData, GetApplicationByCodeErrors, GetApplicationByCodeResponses, GetApplicationClientConfigData, GetApplicationClientConfigErrors, GetApplicationClientConfigResponses, GetApplicationData, GetApplicationDocData, GetApplicationDocErrors, GetApplicationDocResponses, GetApplicationErrors, GetApplicationResponses, GetApplicationUserData, GetApplicationUserErrors, GetApplicationUserResponses, GetAuditLogData, GetAuditLogErrors, GetAuditLogResponses, GetClientApplicationsData, GetClientApplicationsErrors, GetClientApplicationsResponses, GetClientByIdentifierData, GetClientByIdentifierErrors, GetClientByIdentifierResponses, GetClientData, GetClientErrors, GetClientResponses, GetConnectionData, GetConnectionErrors, GetConnectionResponses, GetCorsOriginData, GetCorsOriginErrors, GetCorsOriginResponses, GetDispatchJobData, GetDispatchJobErrors, GetDispatchJobRawData, GetDispatchJobRawErrors, GetDispatchJobRawResponses, GetDispatchJobResponses, GetDispatchPoolData, GetDispatchPoolErrors, GetDispatchPoolResponses, GetEmailDomainMappingByDomainData, GetEmailDomainMappingByDomainErrors, GetEmailDomainMappingByDomainResponses, GetEmailDomainMappingData, GetEmailDomainMappingErrors, GetEmailDomainMappingResponses, GetEventData, GetEventErrors, GetEventResponses, GetEventTypeByCodeData, GetEventTypeByCodeErrors, GetEventTypeByCodeResponses, GetEventTypeData, GetEventTypeErrors, GetEventTypeResponses, GetFieldDeviceData, GetFieldDeviceErrors, GetFieldDeviceResponses, GetFieldPolicyData, GetFieldPolicyErrors, GetFieldPolicyResponses, GetFieldWorkerData, GetFieldWorkerErrors, GetFieldWorkerResponses, GetFunctionData, GetFunctionErrors, GetFunctionResponses, GetFunctionRunnerArtifactData, GetFunctionRunnerArtifactErrors, GetFunctionRunnerArtifactResponses, GetFunctionRunnerDesiredData, GetFunctionRunnerDesiredErrors, GetFunctionRunnerDesiredResponses, GetFunctionVersionData, GetFunctionVersionErrors, GetFunctionVersionResponses, GetIdentityProviderData, GetIdentityProviderErrors, GetIdentityProviderResponses, GetIngestionConfigData, GetIngestionConfigErrors, GetIngestionConfigResponses, GetIngestionData, GetIngestionDefinitionData, GetIngestionDefinitionErrors, GetIngestionDefinitionResponses, GetIngestionErrors, GetIngestionResponses, GetIngestionSetApplyData, GetIngestionSetApplyErrors, GetIngestionSetApplyResponses, GetIngestionTestData, GetIngestionTestErrors, GetIngestionTestResponses, GetIngestionTraceData, GetIngestionTraceErrors, GetIngestionTraceResponses, GetOAuthClientByClientIdData, GetOAuthClientByClientIdErrors, GetOAuthClientByClientIdResponses, GetOAuthClientData, GetOAuthClientErrors, GetOAuthClientResponses, GetPermissionData, GetPermissionErrors, GetPermissionResponses, GetPlatformConfigPropertyData, GetPlatformConfigPropertyErrors, GetPlatformConfigPropertyResponses, GetPlatformDocData, GetPlatformDocErrors, GetPlatformDocResponses, GetPrincipalData, GetPrincipalErrors, GetPrincipalResponses, GetPrincipalVersionData, GetPrincipalVersionErrors, GetPrincipalVersionResponses, GetProcessByCodeData, GetProcessByCodeErrors, GetProcessByCodeResponses, GetProcessData, GetProcessErrors, GetProcessResponses, GetRoleApplicationFiltersData, GetRoleApplicationFiltersErrors, GetRoleApplicationFiltersResponses, GetRoleByCodeData, GetRoleByCodeErrors, GetRoleByCodeResponses, GetRoleData, GetRoleErrors, GetRoleResponses, GetRolesByApplicationData, GetRolesByApplicationErrors, GetRolesByApplicationResponses, GetRolesBySourceData, GetRolesBySourceErrors, GetRolesBySourceResponses, GetRouterConfigData, GetRouterConfigErrors, GetRouterConfigResponses, GetScheduledJobByCodeData, GetScheduledJobByCodeErrors, GetScheduledJobByCodeResponses, GetScheduledJobData, GetScheduledJobErrors, GetScheduledJobInstanceData, GetScheduledJobInstanceErrors, GetScheduledJobInstanceResponses, GetScheduledJobResponses, GetServiceAccountByCodeData, GetServiceAccountByCodeErrors, GetServiceAccountByCodeResponses, GetServiceAccountData, GetServiceAccountErrors, GetServiceAccountResponses, GetSubscriptionData, GetSubscriptionErrors, GetSubscriptionResponses, GrantFieldWorkerAppData, GrantFieldWorkerAppErrors, GrantFieldWorkerAppResponses, GrantPlatformConfigAccessData, GrantPlatformConfigAccessErrors, GrantPlatformConfigAccessResponses, GrantPortalUserAppData, GrantPortalUserAppErrors, GrantPortalUserAppResponses, GrantPrincipalClientAccessData, GrantPrincipalClientAccessErrors, GrantPrincipalClientAccessResponses, GrantRolePermissionByBodyData, GrantRolePermissionByBodyErrors, GrantRolePermissionByBodyResponses, GrantRolePermissionData, GrantRolePermissionErrors, GrantRolePermissionResponses, IngestionRuntimeCreateJobsData, IngestionRuntimeCreateJobsErrors, IngestionRuntimeCreateJobsResponses, IngestionRuntimeGetSecretData, IngestionRuntimeGetSecretErrors, IngestionRuntimeGetSecretResponses, IngestionRuntimeGetStateData, IngestionRuntimeGetStateErrors, IngestionRuntimeGetStateResponses, IngestionRuntimePollData, IngestionRuntimePollErrors, IngestionRuntimePollResponses, IngestionRuntimePutStateData, IngestionRuntimePutStateErrors, IngestionRuntimePutStateResponses, IngestionRuntimeReleaseLeasesData, IngestionRuntimeReleaseLeasesErrors, IngestionRuntimeReleaseLeasesResponses, IngestionRuntimeReportData, IngestionRuntimeReportErrors, IngestionRuntimeReportResponses, IngestionRuntimeTracesData, IngestionRuntimeTracesErrors, IngestionRuntimeTracesResponses, IntrospectFieldTokenData, IntrospectFieldTokenErrors, IntrospectFieldTokenResponses, InviteApplicationUserData, InviteApplicationUserErrors, InviteApplicationUserResponses, IssueFieldWorkerBadgeData, IssueFieldWorkerBadgeErrors, IssueFieldWorkerBadgeResponses, IssueFieldWorkerBadgesData, IssueFieldWorkerBadgesErrors, IssueFieldWorkerBadgesResponses, ListAnchorDomainsData, ListAnchorDomainsErrors, ListAnchorDomainsResponses, ListApplicationClientConfigsData, ListApplicationClientConfigsErrors, ListApplicationClientConfigsResponses, ListApplicationInvitationsData, ListApplicationInvitationsErrors, ListApplicationInvitationsResponses, ListApplicationRolesData, ListApplicationRolesErrors, ListApplicationRolesResponses, ListApplicationsData, ListApplicationsErrors, ListApplicationsResponses, ListApplicationUsersData, ListApplicationUsersErrors, ListApplicationUsersResponses, ListAuditLogsData, ListAuditLogsErrors, ListAuditLogsRecentData, ListAuditLogsRecentErrors, ListAuditLogsRecentResponses, ListAuditLogsResponses, ListAuthConfigsData, ListAuthConfigsErrors, ListAuthConfigsResponses, ListClientsData, ListClientsErrors, ListClientsResponses, ListConnectionsData, ListConnectionsErrors, ListConnectionsResponses, ListCorsOriginsData, ListCorsOriginsErrors, ListCorsOriginsResponses, ListDeveloperUsersData, ListDeveloperUsersErrors, ListDeveloperUsersResponses, ListDispatchJobAttemptsData, ListDispatchJobAttemptsErrors, ListDispatchJobAttemptsResponses, ListDispatchJobsData, ListDispatchJobsErrors, ListDispatchJobsRawAliasData, ListDispatchJobsRawAliasErrors, ListDispatchJobsRawAliasResponses, ListDispatchJobsRawData, ListDispatchJobsRawErrors, ListDispatchJobsRawResponses, ListDispatchJobsResponses, ListDispatchPoolsData, ListDispatchPoolsErrors, ListDispatchPoolsResponses, ListDocsData, ListDocsErrors, ListDocsResponses, ListEmailDomainMappingsData, ListEmailDomainMappingsErrors, ListEmailDomainMappingsResponses, ListEventsData, ListEventsErrors, ListEventsRawAliasData, ListEventsRawAliasErrors, ListEventsRawAliasResponses, ListEventsRawData, ListEventsRawErrors, ListEventsRawResponses, ListEventsResponses, ListEventTypesData, ListEventTypesErrors, ListEventTypesResponses, ListFieldDevicesData, ListFieldDevicesErrors, ListFieldDevicesResponses, ListFieldWorkerBadgesData, ListFieldWorkerBadgesErrors, ListFieldWorkerBadgesResponses, ListFieldWorkersData, ListFieldWorkersErrors, ListFieldWorkerSignInsData, ListFieldWorkerSignInsErrors, ListFieldWorkerSignInsResponses, ListFieldWorkersResponses, ListFunctionAliasesData, ListFunctionAliasesErrors, ListFunctionAliasesResponses, ListFunctionDomainsData, ListFunctionDomainsErrors, ListFunctionDomainsResponses, ListFunctionRoutesData, ListFunctionRoutesErrors, ListFunctionRoutesResponses, ListFunctionsData, ListFunctionsErrors, ListFunctionSettingsData, ListFunctionSettingsErrors, ListFunctionSettingsResponses, ListFunctionsResponses, ListFunctionTraceContextsData, ListFunctionTraceContextsErrors, ListFunctionTraceContextsResponses, ListFunctionTraceLogData, ListFunctionTraceLogErrors, ListFunctionTraceLogResponses, ListFunctionVersionsData, ListFunctionVersionsErrors, ListFunctionVersionsResponses, ListIdentityProvidersData, ListIdentityProvidersErrors, ListIdentityProvidersResponses, ListIdpRoleMappingsData, ListIdpRoleMappingsErrors, ListIdpRoleMappingsResponses, ListIngestionFailuresData, ListIngestionFailuresErrors, ListIngestionFailuresResponses, ListIngestionHistoryData, ListIngestionHistoryErrors, ListIngestionHistoryResponses, ListIngestionsData, ListIngestionSecretsData, ListIngestionSecretsErrors, ListIngestionSecretsResponses, ListIngestionsErrors, ListIngestionSetAppliesData, ListIngestionSetAppliesErrors, ListIngestionSetAppliesResponses, ListIngestionSetsData, ListIngestionSetsErrors, ListIngestionSetsResponses, ListIngestionSourceKindsData, ListIngestionSourceKindsErrors, ListIngestionSourceKindsResponses, ListIngestionsResponses, ListIngestionTraceLogData, ListIngestionTraceLogErrors, ListIngestionTraceLogResponses, ListIngestionVersionsData, ListIngestionVersionsErrors, ListIngestionVersionsResponses, ListLoginAttemptsData, ListLoginAttemptsErrors, ListLoginAttemptsResponses, ListOAuthClientsData, ListOAuthClientsErrors, ListOAuthClientsResponses, ListPermissionsData, ListPermissionsErrors, ListPermissionsResponses, ListPlatformConfigAccessData, ListPlatformConfigAccessErrors, ListPlatformConfigAccessResponses, ListPlatformConfigPropertiesData, ListPlatformConfigPropertiesErrors, ListPlatformConfigPropertiesResponses, ListPortalAppsData, ListPortalAppsErrors, ListPortalAppsResponses, ListPortalUsersData, ListPortalUsersErrors, ListPortalUsersResponses, ListPrincipalApplicationAccessData, ListPrincipalApplicationAccessErrors, ListPrincipalApplicationAccessResponses, ListPrincipalAvailableApplicationsData, ListPrincipalAvailableApplicationsErrors, ListPrincipalAvailableApplicationsResponses, ListPrincipalClientAccessData, ListPrincipalClientAccessErrors, ListPrincipalClientAccessResponses, ListPrincipalRolesData, ListPrincipalRolesErrors, ListPrincipalRolesResponses, ListPrincipalsData, ListPrincipalsErrors, ListPrincipalsResponses, ListProcessesData, ListProcessesErrors, ListProcessesResponses, ListResetApprovalsData, ListResetApprovalsErrors, ListResetApprovalsResponses, ListRolePermissionsData, ListRolePermissionsErrors, ListRolePermissionsResponses, ListRolesData, ListRolesErrors, ListRolesResponses, ListScheduledJobInstanceLogsData, ListScheduledJobInstanceLogsErrors, ListScheduledJobInstanceLogsResponses, ListScheduledJobInstancesData, ListScheduledJobInstancesErrors, ListScheduledJobInstancesResponses, ListScheduledJobsData, ListScheduledJobsErrors, ListScheduledJobsResponses, ListServiceAccountRolesData, ListServiceAccountRolesErrors, ListServiceAccountRolesResponses, ListServiceAccountsData, ListServiceAccountsErrors, ListServiceAccountsResponses, ListSubscriptionsData, ListSubscriptionsErrors, ListSubscriptionsResponses, ListWebauthnCredentialsData, ListWebauthnCredentialsErrors, ListWebauthnCredentialsResponses, LookupEmailDomainMappingData, LookupEmailDomainMappingErrors, LookupEmailDomainMappingResponses, MakeIngestionVersionLiveData, MakeIngestionVersionLiveErrors, MakeIngestionVersionLiveResponses, MatchPrincipalEmailsData, MatchPrincipalEmailsErrors, MatchPrincipalEmailsResponses, MintServiceAccountTokenData, MintServiceAccountTokenErrors, MintServiceAccountTokenResponses, MoveEmailDomainMappingProviderData, MoveEmailDomainMappingProviderErrors, MoveEmailDomainMappingProviderResponses, PauseConnectionData, PauseConnectionErrors, PauseConnectionResponses, PauseIngestionData, PauseIngestionErrors, PauseIngestionResponses, PauseScheduledJobData, PauseScheduledJobErrors, PauseScheduledJobResponses, PauseSubscriptionData, PauseSubscriptionErrors, PauseSubscriptionResponses, PostFunctionRunnerDispatchJobData, PostFunctionRunnerDispatchJobErrors, PostFunctionRunnerDispatchJobResponses, PostFunctionRunnerEventData, PostFunctionRunnerEventErrors, PostFunctionRunnerEventResponses, PostFunctionRunnerHeartbeatData, PostFunctionRunnerHeartbeatErrors, PostFunctionRunnerHeartbeatResponses, PostFunctionRunnerTokenData, PostFunctionRunnerTokenErrors, PostFunctionRunnerTokenResponses, PostFunctionRunnerTraceLogData, PostFunctionRunnerTraceLogErrors, PostFunctionRunnerTraceLogResponses, PreviewRequeueDispatchJobsByFilterData, PreviewRequeueDispatchJobsByFilterErrors, PreviewRequeueDispatchJobsByFilterResponses, ProvisionApplicationLoginClientData, ProvisionApplicationLoginClientErrors, ProvisionApplicationLoginClientResponses, ProvisionApplicationServiceAccountData, ProvisionApplicationServiceAccountErrors, ProvisionApplicationServiceAccountResponses, PruneFunctionVersionsData, PruneFunctionVersionsErrors, PruneFunctionVersionsResponses, PublicAllowedOriginsData, PublicAllowedOriginsErrors, PublicAllowedOriginsResponses, PublishFunctionVersionData, PublishFunctionVersionErrors, PublishFunctionVersionResponses, PutFieldPolicyData, PutFieldPolicyErrors, PutFieldPolicyResponses, PutFunctionAliasData, PutFunctionAliasErrors, PutFunctionAliasResponses, PutFunctionArtifactData, PutFunctionArtifactErrors, PutFunctionArtifactResponses, PutFunctionConfigData, PutFunctionConfigErrors, PutFunctionConfigResponses, PutFunctionDbData, PutFunctionDbErrors, PutFunctionDbResponses, PutFunctionRouteData, PutFunctionRouteErrors, PutFunctionRouteResponses, PutFunctionSecretData, PutFunctionSecretErrors, PutFunctionSecretResponses, ReapplyIngestionSetData, ReapplyIngestionSetErrors, ReapplyIngestionSetResponses, RegenerateOAuthClientSecretData, RegenerateOAuthClientSecretErrors, RegenerateOAuthClientSecretResponses, RegenerateServiceAccountAuthTokenRegenerateAuthTokenData, RegenerateServiceAccountAuthTokenRegenerateAuthTokenErrors, RegenerateServiceAccountAuthTokenRegenerateAuthTokenResponses, RegenerateServiceAccountAuthTokenRegenerateTokenData, RegenerateServiceAccountAuthTokenRegenerateTokenErrors, RegenerateServiceAccountAuthTokenRegenerateTokenResponses, RegenerateServiceAccountSigningSecretRegenerateSecretData, RegenerateServiceAccountSigningSecretRegenerateSecretErrors, RegenerateServiceAccountSigningSecretRegenerateSecretResponses, RegenerateServiceAccountSigningSecretRegenerateSigningSecretData, RegenerateServiceAccountSigningSecretRegenerateSigningSecretErrors, RegenerateServiceAccountSigningSecretRegenerateSigningSecretResponses, ReleaseIngestionSetData, ReleaseIngestionSetErrors, ReleaseIngestionSetResponses, RemovePrincipalRoleData, RemovePrincipalRoleErrors, RemovePrincipalRoleResponses, RequeueDispatchJobsByFilterData, RequeueDispatchJobsByFilterErrors, RequeueDispatchJobsByFilterResponses, RequeueDispatchJobsData, RequeueDispatchJobsErrors, RequeueDispatchJobsResponses, ResendApplicationInvitationData, ResendApplicationInvitationErrors, ResendApplicationInvitationResponses, ResetFieldWorkerPinData, ResetFieldWorkerPinErrors, ResetFieldWorkerPinResponses, ResetPrincipalPasswordData, ResetPrincipalPasswordErrors, ResetPrincipalPasswordResponses, ResetPrincipalTwoFactorData, ResetPrincipalTwoFactorErrors, ResetPrincipalTwoFactorResponses, ResumeIngestionData, ResumeIngestionErrors, ResumeIngestionResponses, ResumeScheduledJobData, ResumeScheduledJobErrors, ResumeScheduledJobResponses, ResumeSubscriptionData, ResumeSubscriptionErrors, ResumeSubscriptionResponses, RetireFunctionVersionData, RetireFunctionVersionErrors, RetireFunctionVersionResponses, RevealPlatformConfigSecretData, RevealPlatformConfigSecretErrors, RevealPlatformConfigSecretResponses, RevokeApplicationInvitationData, RevokeApplicationInvitationErrors, RevokeApplicationInvitationResponses, RevokeFieldDeviceData, RevokeFieldDeviceErrors, RevokeFieldDeviceResponses, RevokeFieldWorkerAppData, RevokeFieldWorkerAppErrors, RevokeFieldWorkerAppResponses, RevokeFieldWorkerBadgeData, RevokeFieldWorkerBadgeErrors, RevokeFieldWorkerBadgeResponses, RevokeOAuthClientPreviousSecretData, RevokeOAuthClientPreviousSecretErrors, RevokeOAuthClientPreviousSecretResponses, RevokePlatformConfigAccessData, RevokePlatformConfigAccessErrors, RevokePlatformConfigAccessResponses, RevokePortalUserAppData, RevokePortalUserAppErrors, RevokePortalUserAppResponses, RevokePrincipalClientAccessData, RevokePrincipalClientAccessErrors, RevokePrincipalClientAccessResponses, RevokePrincipalDeveloperCredentialData, RevokePrincipalDeveloperCredentialErrors, RevokePrincipalDeveloperCredentialResponses, RevokeRolePermissionData, RevokeRolePermissionErrors, RevokeRolePermissionResponses, RotateOAuthClientSecretData, RotateOAuthClientSecretErrors, RotateOAuthClientSecretResponses, SaveIngestionVersionData, SaveIngestionVersionErrors, SaveIngestionVersionResponses, SearchClientsByQueryData, SearchClientsByQueryErrors, SearchClientsByQueryResponses, SearchClientsData, SearchClientsErrors, SearchClientsResponses, SendPrincipalPasswordResetData, SendPrincipalPasswordResetErrors, SendPrincipalPasswordResetResponses, SetIngestionConfigData, SetIngestionConfigErrors, SetIngestionConfigResponses, SetPlatformConfigPropertyData, SetPlatformConfigPropertyErrors, SetPlatformConfigPropertyResponses, SetPrincipalClientAssociationData, SetPrincipalClientAssociationErrors, SetPrincipalClientAssociationResponses, SetPrincipalDeveloperCredentialData, SetPrincipalDeveloperCredentialErrors, SetPrincipalDeveloperCredentialResponses, SignDispatchJobData, SignDispatchJobErrors, SignDispatchJobResponses, SuspendClientData, SuspendClientErrors, SuspendClientResponses, SuspendDispatchPoolData, SuspendDispatchPoolErrors, SuspendDispatchPoolResponses, SuspendFieldDeviceData, SuspendFieldDeviceErrors, SuspendFieldDeviceResponses, SuspendFieldWorkerData, SuspendFieldWorkerErrors, SuspendFieldWorkerResponses, SyncAppDocsData, SyncAppDocsErrors, SyncAppDocsResponses, SyncConnectionsData, SyncConnectionsErrors, SyncConnectionsResponses, SyncDispatchPoolsData, SyncDispatchPoolsErrors, SyncDispatchPoolsResponses, SyncEventTypesData, SyncEventTypesErrors, SyncEventTypesResponses, SyncOpenapiData, SyncOpenapiErrors, SyncOpenapiResponses, SyncPrincipalsData, SyncPrincipalsErrors, SyncPrincipalsResponses, SyncProcessesByBodyData, SyncProcessesByBodyErrors, SyncProcessesByBodyResponses, SyncProcessesData, SyncProcessesErrors, SyncProcessesResponses, SyncRolesData, SyncRolesErrors, SyncRolesResponses, SyncScheduledJobsData, SyncScheduledJobsErrors, SyncScheduledJobsResponses, SyncSubscriptionsData, SyncSubscriptionsErrors, SyncSubscriptionsResponses, SyncUsersData, SyncUsersErrors, SyncUsersResponses, TestIngestionConnectionData, TestIngestionConnectionErrors, TestIngestionConnectionResponses, UnlockFieldWorkerData, UnlockFieldWorkerErrors, UnlockFieldWorkerResponses, UpdateAnchorDomainData, UpdateAnchorDomainErrors, UpdateAnchorDomainResponses, UpdateApplicationData, UpdateApplicationErrors, UpdateApplicationResponses, UpdateAuthConfigData, UpdateAuthConfigErrors, UpdateAuthConfigResponses, UpdateClientApplicationsData, UpdateClientApplicationsErrors, UpdateClientApplicationsResponses, UpdateClientData, UpdateClientErrors, UpdateClientResponses, UpdateConnectionData, UpdateConnectionErrors, UpdateConnectionResponses, UpdateDispatchPoolData, UpdateDispatchPoolErrors, UpdateDispatchPoolResponses, UpdateEmailDomainMappingData, UpdateEmailDomainMappingErrors, UpdateEmailDomainMappingResponses, UpdateEventTypeData, UpdateEventTypeErrors, UpdateEventTypeResponses, UpdateFieldWorkerData, UpdateFieldWorkerErrors, UpdateFieldWorkerResponses, UpdateFunctionData, UpdateFunctionErrors, UpdateFunctionResponses, UpdateIdentityProviderData, UpdateIdentityProviderErrors, UpdateIdentityProviderResponses, UpdateIngestionData, UpdateIngestionErrors, UpdateIngestionResponses, UpdateOAuthClientData, UpdateOAuthClientErrors, UpdateOAuthClientResponses, UpdatePortalAppData, UpdatePortalAppErrors, UpdatePortalAppResponses, UpdatePrincipalData, UpdatePrincipalErrors, UpdatePrincipalResponses, UpdateProcessData, UpdateProcessErrors, UpdateProcessResponses, UpdateRoleData, UpdateRoleErrors, UpdateRoleResponses, UpdateScheduledJobData, UpdateScheduledJobErrors, UpdateScheduledJobResponses, UpdateServiceAccountData, UpdateServiceAccountErrors, UpdateServiceAccountResponses, UpdateSubscriptionData, UpdateSubscriptionErrors, UpdateSubscriptionResponses, WebauthnAuthenticateBeginData, WebauthnAuthenticateBeginErrors, WebauthnAuthenticateBeginResponses, WebauthnAuthenticateCompleteData, WebauthnAuthenticateCompleteErrors, WebauthnAuthenticateCompleteResponses, WebauthnRegisterBeginData, WebauthnRegisterBeginErrors, WebauthnRegisterBeginResponses, WebauthnRegisterCompleteData, WebauthnRegisterCompleteErrors, WebauthnRegisterCompleteResponses, WriteScheduledJobInstanceLogData, WriteScheduledJobInstanceLogErrors, WriteScheduledJobInstanceLogResponses } from './types.gen.js';
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
 * List anchor domains
 */
export declare const listAnchorDomains: <ThrowOnError extends boolean = false>(options?: Options<ListAnchorDomainsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ListAnchorDomainsResponses, ListAnchorDomainsErrors, ThrowOnError, "fields">;
/**
 * Create an anchor domain
 */
export declare const createAnchorDomain: <ThrowOnError extends boolean = false>(options: Options<CreateAnchorDomainData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<CreateAnchorDomainResponses, CreateAnchorDomainErrors, ThrowOnError, "fields">;
/**
 * Delete an anchor domain
 */
export declare const deleteAnchorDomain: <ThrowOnError extends boolean = false>(options: Options<DeleteAnchorDomainData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<DeleteAnchorDomainResponses, DeleteAnchorDomainErrors, ThrowOnError, "fields">;
/**
 * Update an anchor domain
 */
export declare const updateAnchorDomain: <ThrowOnError extends boolean = false>(options: Options<UpdateAnchorDomainData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<UpdateAnchorDomainResponses, UpdateAnchorDomainErrors, ThrowOnError, "fields">;
/**
 * List applications
 */
export declare const listApplications: <ThrowOnError extends boolean = false>(options?: Options<ListApplicationsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ListApplicationsResponses, ListApplicationsErrors, ThrowOnError, "fields">;
/**
 * Create an application
 */
export declare const createApplication: <ThrowOnError extends boolean = false>(options: Options<CreateApplicationData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<CreateApplicationResponses, CreateApplicationErrors, ThrowOnError, "fields">;
/**
 * Get an application by code
 */
export declare const getApplicationByCode: <ThrowOnError extends boolean = false>(options: Options<GetApplicationByCodeData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetApplicationByCodeResponses, GetApplicationByCodeErrors, ThrowOnError, "fields">;
/**
 * List roles registered against an application
 */
export declare const listApplicationRoles: <ThrowOnError extends boolean = false>(options: Options<ListApplicationRolesData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ListApplicationRolesResponses, ListApplicationRolesErrors, ThrowOnError, "fields">;
/**
 * Sync an application's connections (SDK self-registration)
 */
export declare const syncConnections: <ThrowOnError extends boolean = false>(options: Options<SyncConnectionsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<SyncConnectionsResponses, SyncConnectionsErrors, ThrowOnError, "fields">;
/**
 * Sync dispatch pools (SDK self-registration)
 */
export declare const syncDispatchPools: <ThrowOnError extends boolean = false>(options: Options<SyncDispatchPoolsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<SyncDispatchPoolsResponses, SyncDispatchPoolsErrors, ThrowOnError, "fields">;
/**
 * Sync an application's documentation pages (SDK self-registration; declarative full replace)
 */
export declare const syncAppDocs: <ThrowOnError extends boolean = false>(options: Options<SyncAppDocsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<SyncAppDocsResponses, SyncAppDocsErrors, ThrowOnError, "fields">;
/**
 * Sync an application's event types (SDK self-registration)
 */
export declare const syncEventTypes: <ThrowOnError extends boolean = false>(options: Options<SyncEventTypesData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<SyncEventTypesResponses, SyncEventTypesErrors, ThrowOnError, "fields">;
/**
 * List an application's outstanding invitations (users who have not set a password)
 */
export declare const listApplicationInvitations: <ThrowOnError extends boolean = false>(options: Options<ListApplicationInvitationsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ListApplicationInvitationsResponses, ListApplicationInvitationsErrors, ThrowOnError, "fields">;
/**
 * Revoke an application user's invitation (removes the link and deactivates the user)
 */
export declare const revokeApplicationInvitation: <ThrowOnError extends boolean = false>(options: Options<RevokeApplicationInvitationData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<RevokeApplicationInvitationResponses, RevokeApplicationInvitationErrors, ThrowOnError, "fields">;
/**
 * Resend an application user's invitation (replaces the earlier link)
 */
export declare const resendApplicationInvitation: <ThrowOnError extends boolean = false>(options: Options<ResendApplicationInvitationData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ResendApplicationInvitationResponses, ResendApplicationInvitationErrors, ThrowOnError, "fields">;
/**
 * Sync an application's OpenAPI document (SDK self-registration)
 */
export declare const syncOpenapi: <ThrowOnError extends boolean = false>(options: Options<SyncOpenapiData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<SyncOpenapiResponses, SyncOpenapiErrors, ThrowOnError, "fields">;
/**
 * Sync an application's principals (SDK self-registration)
 */
export declare const syncPrincipals: <ThrowOnError extends boolean = false>(options: Options<SyncPrincipalsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<SyncPrincipalsResponses, SyncPrincipalsErrors, ThrowOnError, "fields">;
/**
 * Sync an application's processes (SDK self-registration)
 */
export declare const syncProcesses: <ThrowOnError extends boolean = false>(options: Options<SyncProcessesData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<SyncProcessesResponses, SyncProcessesErrors, ThrowOnError, "fields">;
/**
 * Sync an application's roles (SDK self-registration)
 */
export declare const syncRoles: <ThrowOnError extends boolean = false>(options: Options<SyncRolesData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<SyncRolesResponses, SyncRolesErrors, ThrowOnError, "fields">;
/**
 * Sync scheduled jobs (SDK self-registration)
 */
export declare const syncScheduledJobs: <ThrowOnError extends boolean = false>(options: Options<SyncScheduledJobsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<SyncScheduledJobsResponses, SyncScheduledJobsErrors, ThrowOnError, "fields">;
/**
 * Sync an application's subscriptions (SDK self-registration)
 */
export declare const syncSubscriptions: <ThrowOnError extends boolean = false>(options: Options<SyncSubscriptionsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<SyncSubscriptionsResponses, SyncSubscriptionsErrors, ThrowOnError, "fields">;
/**
 * List an application's users (CLIENT users of its enabled clients holding its roles)
 */
export declare const listApplicationUsers: <ThrowOnError extends boolean = false>(options: Options<ListApplicationUsersData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ListApplicationUsersResponses, ListApplicationUsersErrors, ThrowOnError, "fields">;
/**
 * Invite (create) a user holding the application's roles at one of its enabled clients
 */
export declare const inviteApplicationUser: <ThrowOnError extends boolean = false>(options: Options<InviteApplicationUserData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<InviteApplicationUserResponses, InviteApplicationUserErrors, ThrowOnError, "fields">;
/**
 * Get one of an application's users
 */
export declare const getApplicationUser: <ThrowOnError extends boolean = false>(options: Options<GetApplicationUserData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetApplicationUserResponses, GetApplicationUserErrors, ThrowOnError, "fields">;
/**
 * Delete an application
 */
export declare const deleteApplication: <ThrowOnError extends boolean = false>(options: Options<DeleteApplicationData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<DeleteApplicationResponses, DeleteApplicationErrors, ThrowOnError, "fields">;
/**
 * Get an application by id
 */
export declare const getApplication: <ThrowOnError extends boolean = false>(options: Options<GetApplicationData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetApplicationResponses, GetApplicationErrors, ThrowOnError, "fields">;
/**
 * Update an application
 */
export declare const updateApplication: <ThrowOnError extends boolean = false>(options: Options<UpdateApplicationData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<UpdateApplicationResponses, UpdateApplicationErrors, ThrowOnError, "fields">;
/**
 * Activate an application
 */
export declare const activateApplication: <ThrowOnError extends boolean = false>(options: Options<ActivateApplicationData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ActivateApplicationResponses, ActivateApplicationErrors, ThrowOnError, "fields">;
/**
 * List per-client configurations for an application
 */
export declare const listApplicationClientConfigs: <ThrowOnError extends boolean = false>(options: Options<ListApplicationClientConfigsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ListApplicationClientConfigsResponses, ListApplicationClientConfigsErrors, ThrowOnError, "fields">;
/**
 * Get a single application-client config
 */
export declare const getApplicationClientConfig: <ThrowOnError extends boolean = false>(options: Options<GetApplicationClientConfigData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetApplicationClientConfigResponses, GetApplicationClientConfigErrors, ThrowOnError, "fields">;
/**
 * Disable an application for a client
 */
export declare const disableApplicationForClient: <ThrowOnError extends boolean = false>(options: Options<DisableApplicationForClientData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<DisableApplicationForClientResponses, DisableApplicationForClientErrors, ThrowOnError, "fields">;
/**
 * Enable an application for a client
 */
export declare const enableApplicationForClient: <ThrowOnError extends boolean = false>(options: Options<EnableApplicationForClientData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<EnableApplicationForClientResponses, EnableApplicationForClientErrors, ThrowOnError, "fields">;
/**
 * Deactivate an application
 */
export declare const deactivateApplication: <ThrowOnError extends boolean = false>(options: Options<DeactivateApplicationData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<DeactivateApplicationResponses, DeactivateApplicationErrors, ThrowOnError, "fields">;
/**
 * Create a public OAuth login client for the application
 */
export declare const provisionApplicationLoginClient: <ThrowOnError extends boolean = false>(options: Options<ProvisionApplicationLoginClientData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ProvisionApplicationLoginClientResponses, ProvisionApplicationLoginClientErrors, ThrowOnError, "fields">;
/**
 * Create + attach a dedicated service account for the application
 */
export declare const provisionApplicationServiceAccount: <ThrowOnError extends boolean = false>(options: Options<ProvisionApplicationServiceAccountData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ProvisionApplicationServiceAccountResponses, ProvisionApplicationServiceAccountErrors, ThrowOnError, "fields">;
/**
 * Attach a service account to an application
 */
export declare const attachApplicationServiceAccount: <ThrowOnError extends boolean = false>(options: Options<AttachApplicationServiceAccountData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<AttachApplicationServiceAccountResponses, AttachApplicationServiceAccountErrors, ThrowOnError, "fields">;
/**
 * List audit logs with filters
 */
export declare const listAuditLogs: <ThrowOnError extends boolean = false>(options?: Options<ListAuditLogsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ListAuditLogsResponses, ListAuditLogsErrors, ThrowOnError, "fields">;
/**
 * Distinct application ids
 */
export declare const auditLogApplicationIds: <ThrowOnError extends boolean = false>(options?: Options<AuditLogApplicationIdsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<AuditLogApplicationIdsResponses, AuditLogApplicationIdsErrors, ThrowOnError, "fields">;
/**
 * Distinct client ids
 */
export declare const auditLogClientIds: <ThrowOnError extends boolean = false>(options?: Options<AuditLogClientIdsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<AuditLogClientIdsResponses, AuditLogClientIdsErrors, ThrowOnError, "fields">;
/**
 * Distinct entity types
 */
export declare const auditLogEntityTypes: <ThrowOnError extends boolean = false>(options?: Options<AuditLogEntityTypesData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<AuditLogEntityTypesResponses, AuditLogEntityTypesErrors, ThrowOnError, "fields">;
/**
 * Audit logs for a specific entity
 */
export declare const auditLogsByEntity: <ThrowOnError extends boolean = false>(options: Options<AuditLogsByEntityData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<AuditLogsByEntityResponses, AuditLogsByEntityErrors, ThrowOnError, "fields">;
/**
 * Distinct operations
 */
export declare const auditLogOperations: <ThrowOnError extends boolean = false>(options?: Options<AuditLogOperationsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<AuditLogOperationsResponses, AuditLogOperationsErrors, ThrowOnError, "fields">;
/**
 * Audit logs for a specific principal
 */
export declare const auditLogsByPrincipal: <ThrowOnError extends boolean = false>(options: Options<AuditLogsByPrincipalData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<AuditLogsByPrincipalResponses, AuditLogsByPrincipalErrors, ThrowOnError, "fields">;
/**
 * List recent audit logs (alias for list)
 */
export declare const listAuditLogsRecent: <ThrowOnError extends boolean = false>(options?: Options<ListAuditLogsRecentData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ListAuditLogsRecentResponses, ListAuditLogsRecentErrors, ThrowOnError, "fields">;
/**
 * Get an audit log by id
 */
export declare const getAuditLog: <ThrowOnError extends boolean = false>(options: Options<GetAuditLogData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetAuditLogResponses, GetAuditLogErrors, ThrowOnError, "fields">;
/**
 * List client auth configs
 */
export declare const listAuthConfigs: <ThrowOnError extends boolean = false>(options?: Options<ListAuthConfigsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ListAuthConfigsResponses, ListAuthConfigsErrors, ThrowOnError, "fields">;
/**
 * Create a client auth config
 */
export declare const createAuthConfig: <ThrowOnError extends boolean = false>(options: Options<CreateAuthConfigData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<CreateAuthConfigResponses, CreateAuthConfigErrors, ThrowOnError, "fields">;
/**
 * Delete a client auth config
 */
export declare const deleteAuthConfig: <ThrowOnError extends boolean = false>(options: Options<DeleteAuthConfigData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<DeleteAuthConfigResponses, DeleteAuthConfigErrors, ThrowOnError, "fields">;
/**
 * Update a client auth config
 */
export declare const updateAuthConfig: <ThrowOnError extends boolean = false>(options: Options<UpdateAuthConfigData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<UpdateAuthConfigResponses, UpdateAuthConfigErrors, ThrowOnError, "fields">;
/**
 * List clients
 */
export declare const listClients: <ThrowOnError extends boolean = false>(options?: Options<ListClientsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ListClientsResponses, ListClientsErrors, ThrowOnError, "fields">;
/**
 * Create a client
 */
export declare const createClient: <ThrowOnError extends boolean = false>(options: Options<CreateClientData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<CreateClientResponses, CreateClientErrors, ThrowOnError, "fields">;
/**
 * Get a client by identifier
 */
export declare const getClientByIdentifier: <ThrowOnError extends boolean = false>(options: Options<GetClientByIdentifierData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetClientByIdentifierResponses, GetClientByIdentifierErrors, ThrowOnError, "fields">;
/**
 * Search clients (SDK alias; ?q=<term>)
 */
export declare const searchClientsByQuery: <ThrowOnError extends boolean = false>(options?: Options<SearchClientsByQueryData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<SearchClientsByQueryResponses, SearchClientsByQueryErrors, ThrowOnError, "fields">;
/**
 * Search clients
 */
export declare const searchClients: <ThrowOnError extends boolean = false>(options: Options<SearchClientsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<SearchClientsResponses, SearchClientsErrors, ThrowOnError, "fields">;
/**
 * Delete a client
 */
export declare const deleteClient: <ThrowOnError extends boolean = false>(options: Options<DeleteClientData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<DeleteClientResponses, DeleteClientErrors, ThrowOnError, "fields">;
/**
 * Get a client by id
 */
export declare const getClient: <ThrowOnError extends boolean = false>(options: Options<GetClientData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetClientResponses, GetClientErrors, ThrowOnError, "fields">;
/**
 * Update a client
 */
export declare const updateClient: <ThrowOnError extends boolean = false>(options: Options<UpdateClientData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<UpdateClientResponses, UpdateClientErrors, ThrowOnError, "fields">;
/**
 * Activate a client
 */
export declare const activateClient: <ThrowOnError extends boolean = false>(options: Options<ActivateClientData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ActivateClientResponses, ActivateClientErrors, ThrowOnError, "fields">;
/**
 * List applications and their enabled state for the client
 */
export declare const getClientApplications: <ThrowOnError extends boolean = false>(options: Options<GetClientApplicationsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetClientApplicationsResponses, GetClientApplicationsErrors, ThrowOnError, "fields">;
/**
 * Replace the client's enabled applications (bulk)
 */
export declare const updateClientApplications: <ThrowOnError extends boolean = false>(options: Options<UpdateClientApplicationsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<UpdateClientApplicationsResponses, UpdateClientApplicationsErrors, ThrowOnError, "fields">;
/**
 * Disable an application for the client
 */
export declare const disableClientApplication: <ThrowOnError extends boolean = false>(options: Options<DisableClientApplicationData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<DisableClientApplicationResponses, DisableClientApplicationErrors, ThrowOnError, "fields">;
/**
 * Enable an application for the client
 */
export declare const enableClientApplication: <ThrowOnError extends boolean = false>(options: Options<EnableClientApplicationData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<EnableClientApplicationResponses, EnableClientApplicationErrors, ThrowOnError, "fields">;
/**
 * Deactivate a client (soft delete)
 */
export declare const deactivateClient: <ThrowOnError extends boolean = false>(options: Options<DeactivateClientData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<DeactivateClientResponses, DeactivateClientErrors, ThrowOnError, "fields">;
/**
 * Add a note to a client
 */
export declare const addClientNote: <ThrowOnError extends boolean = false>(options: Options<AddClientNoteData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<AddClientNoteResponses, AddClientNoteErrors, ThrowOnError, "fields">;
/**
 * Suspend a client
 */
export declare const suspendClient: <ThrowOnError extends boolean = false>(options: Options<SuspendClientData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<SuspendClientResponses, SuspendClientErrors, ThrowOnError, "fields">;
/**
 * Delete a platform-config property
 */
export declare const deletePlatformConfigProperty: <ThrowOnError extends boolean = false>(options: Options<DeletePlatformConfigPropertyData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<DeletePlatformConfigPropertyResponses, DeletePlatformConfigPropertyErrors, ThrowOnError, "fields">;
/**
 * Get a single platform-config property
 */
export declare const getPlatformConfigProperty: <ThrowOnError extends boolean = false>(options: Options<GetPlatformConfigPropertyData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetPlatformConfigPropertyResponses, GetPlatformConfigPropertyErrors, ThrowOnError, "fields">;
/**
 * Set a platform-config property
 */
export declare const setPlatformConfigProperty: <ThrowOnError extends boolean = false>(options: Options<SetPlatformConfigPropertyData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<SetPlatformConfigPropertyResponses, SetPlatformConfigPropertyErrors, ThrowOnError, "fields">;
/**
 * Read a SECRET platform-config value in plaintext (audited; the only endpoint that returns one)
 */
export declare const revealPlatformConfigSecret: <ThrowOnError extends boolean = false>(options: Options<RevealPlatformConfigSecretData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<RevealPlatformConfigSecretResponses, RevealPlatformConfigSecretErrors, ThrowOnError, "fields">;
/**
 * List connections
 */
export declare const listConnections: <ThrowOnError extends boolean = false>(options?: Options<ListConnectionsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ListConnectionsResponses, ListConnectionsErrors, ThrowOnError, "fields">;
/**
 * Create a connection
 */
export declare const createConnection: <ThrowOnError extends boolean = false>(options: Options<CreateConnectionData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<CreateConnectionResponses, CreateConnectionErrors, ThrowOnError, "fields">;
/**
 * Delete a connection
 */
export declare const deleteConnection: <ThrowOnError extends boolean = false>(options: Options<DeleteConnectionData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<DeleteConnectionResponses, DeleteConnectionErrors, ThrowOnError, "fields">;
/**
 * Get a connection by id
 */
export declare const getConnection: <ThrowOnError extends boolean = false>(options: Options<GetConnectionData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetConnectionResponses, GetConnectionErrors, ThrowOnError, "fields">;
/**
 * Update a connection
 */
export declare const updateConnection: <ThrowOnError extends boolean = false>(options: Options<UpdateConnectionData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<UpdateConnectionResponses, UpdateConnectionErrors, ThrowOnError, "fields">;
/**
 * Activate a connection
 */
export declare const activateConnection: <ThrowOnError extends boolean = false>(options: Options<ActivateConnectionData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ActivateConnectionResponses, ActivateConnectionErrors, ThrowOnError, "fields">;
/**
 * Pause a connection
 */
export declare const pauseConnection: <ThrowOnError extends boolean = false>(options: Options<PauseConnectionData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PauseConnectionResponses, PauseConnectionErrors, ThrowOnError, "fields">;
/**
 * List dispatch jobs with filters
 */
export declare const listDispatchJobs: <ThrowOnError extends boolean = false>(options?: Options<ListDispatchJobsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ListDispatchJobsResponses, ListDispatchJobsErrors, ThrowOnError, "fields">;
/**
 * Dispatch jobs spawned by an event (SDK alias of /event/{eventId})
 */
export declare const dispatchJobsByEventAlias: <ThrowOnError extends boolean = false>(options: Options<DispatchJobsByEventAliasData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<DispatchJobsByEventAliasResponses, DispatchJobsByEventAliasErrors, ThrowOnError, "fields">;
/**
 * Dispatch jobs spawned by a specific event
 */
export declare const dispatchJobsByEvent: <ThrowOnError extends boolean = false>(options: Options<DispatchJobsByEventData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<DispatchJobsByEventResponses, DispatchJobsByEventErrors, ThrowOnError, "fields">;
/**
 * Distinct facet values for dispatch jobs
 */
export declare const dispatchJobFilterOptions: <ThrowOnError extends boolean = false>(options?: Options<DispatchJobFilterOptionsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<DispatchJobFilterOptionsResponses, DispatchJobFilterOptionsErrors, ThrowOnError, "fields">;
/**
 * List dispatch jobs (raw)
 */
export declare const listDispatchJobsRaw: <ThrowOnError extends boolean = false>(options?: Options<ListDispatchJobsRawData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ListDispatchJobsRawResponses, ListDispatchJobsRawErrors, ThrowOnError, "fields">;
/**
 * List dispatch jobs raw (SDK alias of /list-raw)
 */
export declare const listDispatchJobsRawAlias: <ThrowOnError extends boolean = false>(options?: Options<ListDispatchJobsRawAliasData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ListDispatchJobsRawAliasResponses, ListDispatchJobsRawAliasErrors, ThrowOnError, "fields">;
/**
 * Reset dispatch jobs to PENDING for re-dispatch
 */
export declare const requeueDispatchJobs: <ThrowOnError extends boolean = false>(options: Options<RequeueDispatchJobsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<RequeueDispatchJobsResponses, RequeueDispatchJobsErrors, ThrowOnError, "fields">;
/**
 * Reset every dispatch job a filter matches to PENDING (confirmed count, capped)
 */
export declare const requeueDispatchJobsByFilter: <ThrowOnError extends boolean = false>(options: Options<RequeueDispatchJobsByFilterData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<RequeueDispatchJobsByFilterResponses, RequeueDispatchJobsByFilterErrors, ThrowOnError, "fields">;
/**
 * Count the dispatch jobs a filter matches and how many a requeue would reset
 */
export declare const previewRequeueDispatchJobsByFilter: <ThrowOnError extends boolean = false>(options: Options<PreviewRequeueDispatchJobsByFilterData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PreviewRequeueDispatchJobsByFilterResponses, PreviewRequeueDispatchJobsByFilterErrors, ThrowOnError, "fields">;
/**
 * Get a dispatch job by id
 */
export declare const getDispatchJob: <ThrowOnError extends boolean = false>(options: Options<GetDispatchJobData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetDispatchJobResponses, GetDispatchJobErrors, ThrowOnError, "fields">;
/**
 * List a dispatch job's attempt history
 */
export declare const listDispatchJobAttempts: <ThrowOnError extends boolean = false>(options: Options<ListDispatchJobAttemptsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ListDispatchJobAttemptsResponses, ListDispatchJobAttemptsErrors, ThrowOnError, "fields">;
/**
 * Cancel a PENDING or FAILED dispatch job
 */
export declare const cancelDispatchJob: <ThrowOnError extends boolean = false>(options: Options<CancelDispatchJobData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<CancelDispatchJobResponses, CancelDispatchJobErrors, ThrowOnError, "fields">;
/**
 * Mark a FAILED dispatch job COMPLETED (delivered out of band)
 */
export declare const completeDispatchJob: <ThrowOnError extends boolean = false>(options: Options<CompleteDispatchJobData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<CompleteDispatchJobResponses, CompleteDispatchJobErrors, ThrowOnError, "fields">;
/**
 * Replace the payload of a PENDING or FAILED dispatch job (status and attempts are unchanged)
 */
export declare const editDispatchJobPayload: <ThrowOnError extends boolean = false>(options: Options<EditDispatchJobPayloadData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<EditDispatchJobPayloadResponses, EditDispatchJobPayloadErrors, ThrowOnError, "fields">;
/**
 * Get a dispatch job (raw)
 */
export declare const getDispatchJobRaw: <ThrowOnError extends boolean = false>(options: Options<GetDispatchJobRawData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetDispatchJobRawResponses, GetDispatchJobRawErrors, ThrowOnError, "fields">;
/**
 * Build the job's delivery (signing account, headers, signature) without sending it
 */
export declare const signDispatchJob: <ThrowOnError extends boolean = false>(options: Options<SignDispatchJobData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<SignDispatchJobResponses, SignDispatchJobErrors, ThrowOnError, "fields">;
/**
 * List dispatch pools
 */
export declare const listDispatchPools: <ThrowOnError extends boolean = false>(options?: Options<ListDispatchPoolsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ListDispatchPoolsResponses, ListDispatchPoolsErrors, ThrowOnError, "fields">;
/**
 * Create a dispatch pool
 */
export declare const createDispatchPool: <ThrowOnError extends boolean = false>(options: Options<CreateDispatchPoolData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<CreateDispatchPoolResponses, CreateDispatchPoolErrors, ThrowOnError, "fields">;
/**
 * Delete a dispatch pool
 */
export declare const deleteDispatchPool: <ThrowOnError extends boolean = false>(options: Options<DeleteDispatchPoolData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<DeleteDispatchPoolResponses, DeleteDispatchPoolErrors, ThrowOnError, "fields">;
/**
 * Get a dispatch pool by id
 */
export declare const getDispatchPool: <ThrowOnError extends boolean = false>(options: Options<GetDispatchPoolData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetDispatchPoolResponses, GetDispatchPoolErrors, ThrowOnError, "fields">;
/**
 * Update a dispatch pool
 */
export declare const updateDispatchPool: <ThrowOnError extends boolean = false>(options: Options<UpdateDispatchPoolData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<UpdateDispatchPoolResponses, UpdateDispatchPoolErrors, ThrowOnError, "fields">;
/**
 * Resume a suspended dispatch pool
 */
export declare const activateDispatchPool: <ThrowOnError extends boolean = false>(options: Options<ActivateDispatchPoolData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ActivateDispatchPoolResponses, ActivateDispatchPoolErrors, ThrowOnError, "fields">;
/**
 * Archive a dispatch pool
 */
export declare const archiveDispatchPool: <ThrowOnError extends boolean = false>(options: Options<ArchiveDispatchPoolData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ArchiveDispatchPoolResponses, ArchiveDispatchPoolErrors, ThrowOnError, "fields">;
/**
 * Suspend dispatch into a pool
 */
export declare const suspendDispatchPool: <ThrowOnError extends boolean = false>(options: Options<SuspendDispatchPoolData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<SuspendDispatchPoolResponses, SuspendDispatchPoolErrors, ThrowOnError, "fields">;
/**
 * The router's {processingPools, queues} configuration document
 */
export declare const getRouterConfig: <ThrowOnError extends boolean = false>(options?: Options<GetRouterConfigData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetRouterConfigResponses, GetRouterConfigErrors, ThrowOnError, "fields">;
/**
 * List documentation: the platform's published pages plus each application's synced pages
 */
export declare const listDocs: <ThrowOnError extends boolean = false>(options?: Options<ListDocsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ListDocsResponses, ListDocsErrors, ThrowOnError, "fields">;
/**
 * Fetch one application-synced page as Markdown
 */
export declare const getApplicationDoc: <ThrowOnError extends boolean = false>(options: Options<GetApplicationDocData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetApplicationDocResponses, GetApplicationDocErrors, ThrowOnError, "fields">;
/**
 * Fetch one published platform page as Markdown
 */
export declare const getPlatformDoc: <ThrowOnError extends boolean = false>(options: Options<GetPlatformDocData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetPlatformDocResponses, GetPlatformDocErrors, ThrowOnError, "fields">;
/**
 * List email-domain mappings
 */
export declare const listEmailDomainMappings: <ThrowOnError extends boolean = false>(options?: Options<ListEmailDomainMappingsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ListEmailDomainMappingsResponses, ListEmailDomainMappingsErrors, ThrowOnError, "fields">;
/**
 * Create an email-domain mapping
 */
export declare const createEmailDomainMapping: <ThrowOnError extends boolean = false>(options: Options<CreateEmailDomainMappingData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<CreateEmailDomainMappingResponses, CreateEmailDomainMappingErrors, ThrowOnError, "fields">;
/**
 * Resolve an email domain to its mapping (path param)
 */
export declare const getEmailDomainMappingByDomain: <ThrowOnError extends boolean = false>(options: Options<GetEmailDomainMappingByDomainData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetEmailDomainMappingByDomainResponses, GetEmailDomainMappingByDomainErrors, ThrowOnError, "fields">;
/**
 * Resolve an email domain to its mapping
 */
export declare const lookupEmailDomainMapping: <ThrowOnError extends boolean = false>(options?: Options<LookupEmailDomainMappingData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<LookupEmailDomainMappingResponses, LookupEmailDomainMappingErrors, ThrowOnError, "fields">;
/**
 * Delete an email-domain mapping
 */
export declare const deleteEmailDomainMapping: <ThrowOnError extends boolean = false>(options: Options<DeleteEmailDomainMappingData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<DeleteEmailDomainMappingResponses, DeleteEmailDomainMappingErrors, ThrowOnError, "fields">;
/**
 * Get an email-domain mapping by id
 */
export declare const getEmailDomainMapping: <ThrowOnError extends boolean = false>(options: Options<GetEmailDomainMappingData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetEmailDomainMappingResponses, GetEmailDomainMappingErrors, ThrowOnError, "fields">;
/**
 * Update an email-domain mapping
 */
export declare const updateEmailDomainMapping: <ThrowOnError extends boolean = false>(options: Options<UpdateEmailDomainMappingData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<UpdateEmailDomainMappingResponses, UpdateEmailDomainMappingErrors, ThrowOnError, "fields">;
/**
 * Re-point an email domain to a different identity provider
 */
export declare const moveEmailDomainMappingProvider: <ThrowOnError extends boolean = false>(options: Options<MoveEmailDomainMappingProviderData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<MoveEmailDomainMappingProviderResponses, MoveEmailDomainMappingProviderErrors, ThrowOnError, "fields">;
/**
 * List event types
 */
export declare const listEventTypes: <ThrowOnError extends boolean = false>(options?: Options<ListEventTypesData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ListEventTypesResponses, ListEventTypesErrors, ThrowOnError, "fields">;
/**
 * Create an event type
 */
export declare const createEventType: <ThrowOnError extends boolean = false>(options: Options<CreateEventTypeData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<CreateEventTypeResponses, CreateEventTypeErrors, ThrowOnError, "fields">;
/**
 * Get an event type by code
 */
export declare const getEventTypeByCode: <ThrowOnError extends boolean = false>(options: Options<GetEventTypeByCodeData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetEventTypeByCodeResponses, GetEventTypeByCodeErrors, ThrowOnError, "fields">;
/**
 * Archive an event type
 */
export declare const deleteEventType: <ThrowOnError extends boolean = false>(options: Options<DeleteEventTypeData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<DeleteEventTypeResponses, DeleteEventTypeErrors, ThrowOnError, "fields">;
/**
 * Get an event type by id
 */
export declare const getEventType: <ThrowOnError extends boolean = false>(options: Options<GetEventTypeData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetEventTypeResponses, GetEventTypeErrors, ThrowOnError, "fields">;
/**
 * Update an event type
 */
export declare const updateEventType: <ThrowOnError extends boolean = false>(options: Options<UpdateEventTypeData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<UpdateEventTypeResponses, UpdateEventTypeErrors, ThrowOnError, "fields">;
/**
 * Add a schema version to an event type (Go-historical alias)
 */
export declare const addEventTypeSchema: <ThrowOnError extends boolean = false>(options: Options<AddEventTypeSchemaData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<AddEventTypeSchemaResponses, AddEventTypeSchemaErrors, ThrowOnError, "fields">;
/**
 * Add a schema version to an event type
 */
export declare const addEventTypeVersion: <ThrowOnError extends boolean = false>(options: Options<AddEventTypeVersionData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<AddEventTypeVersionResponses, AddEventTypeVersionErrors, ThrowOnError, "fields">;
/**
 * List events with filters
 */
export declare const listEvents: <ThrowOnError extends boolean = false>(options?: Options<ListEventsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ListEventsResponses, ListEventsErrors, ThrowOnError, "fields">;
/**
 * Create a single event (SDK)
 */
export declare const createEvent: <ThrowOnError extends boolean = false>(options: Options<CreateEventData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<CreateEventResponses, CreateEventErrors, ThrowOnError, "fields">;
/**
 * Ingest a batch of events (SDK)
 */
export declare const batchIngestEvents: <ThrowOnError extends boolean = false>(options: Options<BatchIngestEventsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<BatchIngestEventsResponses, BatchIngestEventsErrors, ThrowOnError, "fields">;
/**
 * Distinct event types/sources/clients for filter UI
 */
export declare const eventFilterOptions: <ThrowOnError extends boolean = false>(options?: Options<EventFilterOptionsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<EventFilterOptionsResponses, EventFilterOptionsErrors, ThrowOnError, "fields">;
/**
 * List events with raw JSONB rows
 */
export declare const listEventsRaw: <ThrowOnError extends boolean = false>(options?: Options<ListEventsRawData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ListEventsRawResponses, ListEventsRawErrors, ThrowOnError, "fields">;
/**
 * List events raw (SDK alias of /list-raw)
 */
export declare const listEventsRawAlias: <ThrowOnError extends boolean = false>(options?: Options<ListEventsRawAliasData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ListEventsRawAliasResponses, ListEventsRawAliasErrors, ThrowOnError, "fields">;
/**
 * Get an event by id
 */
export declare const getEvent: <ThrowOnError extends boolean = false>(options: Options<GetEventData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetEventResponses, GetEventErrors, ThrowOnError, "fields">;
/**
 * List a client's enrolled field devices
 */
export declare const listFieldDevices: <ThrowOnError extends boolean = false>(options?: Options<ListFieldDevicesData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ListFieldDevicesResponses, ListFieldDevicesErrors, ThrowOnError, "fields">;
/**
 * Create a single-use device enrolment code
 */
export declare const createFieldEnrolmentCode: <ThrowOnError extends boolean = false>(options: Options<CreateFieldEnrolmentCodeData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<CreateFieldEnrolmentCodeResponses, CreateFieldEnrolmentCodeErrors, ThrowOnError, "fields">;
/**
 * Get a field device with its active session count
 */
export declare const getFieldDevice: <ThrowOnError extends boolean = false>(options: Options<GetFieldDeviceData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetFieldDeviceResponses, GetFieldDeviceErrors, ThrowOnError, "fields">;
/**
 * Reactivate a suspended field device
 */
export declare const activateFieldDevice: <ThrowOnError extends boolean = false>(options: Options<ActivateFieldDeviceData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ActivateFieldDeviceResponses, ActivateFieldDeviceErrors, ThrowOnError, "fields">;
/**
 * Permanently revoke a field device and its sessions
 */
export declare const revokeFieldDevice: <ThrowOnError extends boolean = false>(options: Options<RevokeFieldDeviceData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<RevokeFieldDeviceResponses, RevokeFieldDeviceErrors, ThrowOnError, "fields">;
/**
 * Suspend a field device and revoke its sessions
 */
export declare const suspendFieldDevice: <ThrowOnError extends boolean = false>(options: Options<SuspendFieldDeviceData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<SuspendFieldDeviceResponses, SuspendFieldDeviceErrors, ThrowOnError, "fields">;
/**
 * Get a client's effective field policy
 */
export declare const getFieldPolicy: <ThrowOnError extends boolean = false>(options: Options<GetFieldPolicyData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetFieldPolicyResponses, GetFieldPolicyErrors, ThrowOnError, "fields">;
/**
 * Set a client's field policy
 */
export declare const putFieldPolicy: <ThrowOnError extends boolean = false>(options: Options<PutFieldPolicyData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PutFieldPolicyResponses, PutFieldPolicyErrors, ThrowOnError, "fields">;
/**
 * Online check that a field access token is still usable
 */
export declare const introspectFieldToken: <ThrowOnError extends boolean = false>(options: Options<IntrospectFieldTokenData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<IntrospectFieldTokenResponses, IntrospectFieldTokenErrors, ThrowOnError, "fields">;
/**
 * Search a client's field workers
 */
export declare const listFieldWorkers: <ThrowOnError extends boolean = false>(options?: Options<ListFieldWorkersData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ListFieldWorkersResponses, ListFieldWorkersErrors, ThrowOnError, "fields">;
/**
 * Ensure a field worker exists for (client, workerCode) and grant applications
 */
export declare const ensureFieldWorker: <ThrowOnError extends boolean = false>(options: Options<EnsureFieldWorkerData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<EnsureFieldWorkerResponses, EnsureFieldWorkerErrors, ThrowOnError, "fields">;
/**
 * Issue badges for up to 200 field workers at once (for printing a sheet); all or nothing
 */
export declare const issueFieldWorkerBadges: <ThrowOnError extends boolean = false>(options: Options<IssueFieldWorkerBadgesData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<IssueFieldWorkerBadgesResponses, IssueFieldWorkerBadgesErrors, ThrowOnError, "fields">;
/**
 * Delete a field worker (revokes their sessions first)
 */
export declare const deleteFieldWorker: <ThrowOnError extends boolean = false>(options: Options<DeleteFieldWorkerData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<DeleteFieldWorkerResponses, DeleteFieldWorkerErrors, ThrowOnError, "fields">;
/**
 * Get a field worker
 */
export declare const getFieldWorker: <ThrowOnError extends boolean = false>(options: Options<GetFieldWorkerData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetFieldWorkerResponses, GetFieldWorkerErrors, ThrowOnError, "fields">;
/**
 * Update a field worker's name and email
 */
export declare const updateFieldWorker: <ThrowOnError extends boolean = false>(options: Options<UpdateFieldWorkerData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<UpdateFieldWorkerResponses, UpdateFieldWorkerErrors, ThrowOnError, "fields">;
/**
 * Reactivate a suspended field worker
 */
export declare const activateFieldWorker: <ThrowOnError extends boolean = false>(options: Options<ActivateFieldWorkerData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ActivateFieldWorkerResponses, ActivateFieldWorkerErrors, ThrowOnError, "fields">;
/**
 * Grant a field worker access to an application
 */
export declare const grantFieldWorkerApp: <ThrowOnError extends boolean = false>(options: Options<GrantFieldWorkerAppData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GrantFieldWorkerAppResponses, GrantFieldWorkerAppErrors, ThrowOnError, "fields">;
/**
 * Revoke a field worker's access to an application (and that application's sessions)
 */
export declare const revokeFieldWorkerApp: <ThrowOnError extends boolean = false>(options: Options<RevokeFieldWorkerAppData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<RevokeFieldWorkerAppResponses, RevokeFieldWorkerAppErrors, ThrowOnError, "fields">;
/**
 * A field worker's badges, newest first (never the token)
 */
export declare const listFieldWorkerBadges: <ThrowOnError extends boolean = false>(options: Options<ListFieldWorkerBadgesData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ListFieldWorkerBadgesResponses, ListFieldWorkerBadgesErrors, ThrowOnError, "fields">;
/**
 * Issue a printed QR badge for a field worker (the token is shown once; earlier active badges are revoked)
 */
export declare const issueFieldWorkerBadge: <ThrowOnError extends boolean = false>(options: Options<IssueFieldWorkerBadgeData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<IssueFieldWorkerBadgeResponses, IssueFieldWorkerBadgeErrors, ThrowOnError, "fields">;
/**
 * Revoke a field worker's badge
 */
export declare const revokeFieldWorkerBadge: <ThrowOnError extends boolean = false>(options: Options<RevokeFieldWorkerBadgeData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<RevokeFieldWorkerBadgeResponses, RevokeFieldWorkerBadgeErrors, ThrowOnError, "fields">;
/**
 * Reset a field worker's PIN (a temporary PIN is returned once when none is supplied)
 */
export declare const resetFieldWorkerPin: <ThrowOnError extends boolean = false>(options: Options<ResetFieldWorkerPinData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ResetFieldWorkerPinResponses, ResetFieldWorkerPinErrors, ThrowOnError, "fields">;
/**
 * Create a single-use code that signs the worker in to an application on any device (impersonation)
 */
export declare const createFieldWorkerSignInCode: <ThrowOnError extends boolean = false>(options: Options<CreateFieldWorkerSignInCodeData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<CreateFieldWorkerSignInCodeResponses, CreateFieldWorkerSignInCodeErrors, ThrowOnError, "fields">;
/**
 * A field worker's sign-in attempts, newest first
 */
export declare const listFieldWorkerSignIns: <ThrowOnError extends boolean = false>(options: Options<ListFieldWorkerSignInsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ListFieldWorkerSignInsResponses, ListFieldWorkerSignInsErrors, ThrowOnError, "fields">;
/**
 * Suspend a field worker and revoke their sessions
 */
export declare const suspendFieldWorker: <ThrowOnError extends boolean = false>(options: Options<SuspendFieldWorkerData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<SuspendFieldWorkerResponses, SuspendFieldWorkerErrors, ThrowOnError, "fields">;
/**
 * Clear a field worker's soft and hard locks
 */
export declare const unlockFieldWorker: <ThrowOnError extends boolean = false>(options: Options<UnlockFieldWorkerData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<UnlockFieldWorkerResponses, UnlockFieldWorkerErrors, ThrowOnError, "fields">;
/**
 * List claimed hostname zones
 */
export declare const listFunctionDomains: <ThrowOnError extends boolean = false>(options?: Options<ListFunctionDomainsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ListFunctionDomainsResponses, ListFunctionDomainsErrors, ThrowOnError, "fields">;
/**
 * Claim a hostname zone for a client (or the platform)
 */
export declare const createFunctionDomain: <ThrowOnError extends boolean = false>(options: Options<CreateFunctionDomainData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<CreateFunctionDomainResponses, CreateFunctionDomainErrors, ThrowOnError, "fields">;
/**
 * Release a claimed zone
 */
export declare const deleteFunctionDomain: <ThrowOnError extends boolean = false>(options: Options<DeleteFunctionDomainData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<DeleteFunctionDomainResponses, DeleteFunctionDomainErrors, ThrowOnError, "fields">;
/**
 * List functions
 */
export declare const listFunctions: <ThrowOnError extends boolean = false>(options?: Options<ListFunctionsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ListFunctionsResponses, ListFunctionsErrors, ThrowOnError, "fields">;
/**
 * Create a function
 */
export declare const createFunction: <ThrowOnError extends boolean = false>(options: Options<CreateFunctionData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<CreateFunctionResponses, CreateFunctionErrors, ThrowOnError, "fields">;
/**
 * Delete a function
 */
export declare const deleteFunction: <ThrowOnError extends boolean = false>(options: Options<DeleteFunctionData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<DeleteFunctionResponses, DeleteFunctionErrors, ThrowOnError, "fields">;
/**
 * Get a function by id
 */
export declare const getFunction: <ThrowOnError extends boolean = false>(options: Options<GetFunctionData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetFunctionResponses, GetFunctionErrors, ThrowOnError, "fields">;
/**
 * Update a function's settings
 */
export declare const updateFunction: <ThrowOnError extends boolean = false>(options: Options<UpdateFunctionData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<UpdateFunctionResponses, UpdateFunctionErrors, ThrowOnError, "fields">;
/**
 * List a function's aliases
 */
export declare const listFunctionAliases: <ThrowOnError extends boolean = false>(options: Options<ListFunctionAliasesData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ListFunctionAliasesResponses, ListFunctionAliasesErrors, ThrowOnError, "fields">;
/**
 * Remove an alias
 */
export declare const deleteFunctionAlias: <ThrowOnError extends boolean = false>(options: Options<DeleteFunctionAliasData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<DeleteFunctionAliasResponses, DeleteFunctionAliasErrors, ThrowOnError, "fields">;
/**
 * Point an alias at a version
 */
export declare const putFunctionAlias: <ThrowOnError extends boolean = false>(options: Options<PutFunctionAliasData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PutFunctionAliasResponses, PutFunctionAliasErrors, ThrowOnError, "fields">;
/**
 * Upload a function artifact by its sha256 digest
 */
export declare const putFunctionArtifact: <ThrowOnError extends boolean = false>(options: Options<PutFunctionArtifactData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PutFunctionArtifactResponses, PutFunctionArtifactErrors, ThrowOnError, "fields">;
/**
 * Remove a config value
 */
export declare const deleteFunctionConfig: <ThrowOnError extends boolean = false>(options: Options<DeleteFunctionConfigData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<DeleteFunctionConfigResponses, DeleteFunctionConfigErrors, ThrowOnError, "fields">;
/**
 * Set a config value
 */
export declare const putFunctionConfig: <ThrowOnError extends boolean = false>(options: Options<PutFunctionConfigData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PutFunctionConfigResponses, PutFunctionConfigErrors, ThrowOnError, "fields">;
/**
 * Remove a database DSN
 */
export declare const deleteFunctionDb: <ThrowOnError extends boolean = false>(options: Options<DeleteFunctionDbData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<DeleteFunctionDbResponses, DeleteFunctionDbErrors, ThrowOnError, "fields">;
/**
 * Set a database DSN
 */
export declare const putFunctionDb: <ThrowOnError extends boolean = false>(options: Options<PutFunctionDbData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PutFunctionDbResponses, PutFunctionDbErrors, ThrowOnError, "fields">;
/**
 * List a function's public routes
 */
export declare const listFunctionRoutes: <ThrowOnError extends boolean = false>(options: Options<ListFunctionRoutesData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ListFunctionRoutesResponses, ListFunctionRoutesErrors, ThrowOnError, "fields">;
/**
 * Create or update a public route
 */
export declare const putFunctionRoute: <ThrowOnError extends boolean = false>(options: Options<PutFunctionRouteData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PutFunctionRouteResponses, PutFunctionRouteErrors, ThrowOnError, "fields">;
/**
 * Remove a public route
 */
export declare const deleteFunctionRoute: <ThrowOnError extends boolean = false>(options: Options<DeleteFunctionRouteData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<DeleteFunctionRouteResponses, DeleteFunctionRouteErrors, ThrowOnError, "fields">;
/**
 * Remove a secret value
 */
export declare const deleteFunctionSecret: <ThrowOnError extends boolean = false>(options: Options<DeleteFunctionSecretData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<DeleteFunctionSecretResponses, DeleteFunctionSecretErrors, ThrowOnError, "fields">;
/**
 * Set a secret value
 */
export declare const putFunctionSecret: <ThrowOnError extends boolean = false>(options: Options<PutFunctionSecretData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PutFunctionSecretResponses, PutFunctionSecretErrors, ThrowOnError, "fields">;
/**
 * List a function's settings keys
 */
export declare const listFunctionSettings: <ThrowOnError extends boolean = false>(options: Options<ListFunctionSettingsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ListFunctionSettingsResponses, ListFunctionSettingsErrors, ThrowOnError, "fields">;
/**
 * List a function's trace contexts and their windows
 */
export declare const listFunctionTraceContexts: <ThrowOnError extends boolean = false>(options: Options<ListFunctionTraceContextsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ListFunctionTraceContextsResponses, ListFunctionTraceContextsErrors, ThrowOnError, "fields">;
/**
 * Read a function's trace records, newest first
 */
export declare const listFunctionTraceLog: <ThrowOnError extends boolean = false>(options: Options<ListFunctionTraceLogData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ListFunctionTraceLogResponses, ListFunctionTraceLogErrors, ThrowOnError, "fields">;
/**
 * Switch a trace context off
 */
export declare const disableFunctionTraceContext: <ThrowOnError extends boolean = false>(options: Options<DisableFunctionTraceContextData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<DisableFunctionTraceContextResponses, DisableFunctionTraceContextErrors, ThrowOnError, "fields">;
/**
 * Switch a trace context on for a bounded time
 */
export declare const enableFunctionTraceContext: <ThrowOnError extends boolean = false>(options: Options<EnableFunctionTraceContextData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<EnableFunctionTraceContextResponses, EnableFunctionTraceContextErrors, ThrowOnError, "fields">;
/**
 * List a function's versions
 */
export declare const listFunctionVersions: <ThrowOnError extends boolean = false>(options: Options<ListFunctionVersionsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ListFunctionVersionsResponses, ListFunctionVersionsErrors, ThrowOnError, "fields">;
/**
 * Publish a new function version from a stored artifact
 */
export declare const publishFunctionVersion: <ThrowOnError extends boolean = false>(options: Options<PublishFunctionVersionData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PublishFunctionVersionResponses, PublishFunctionVersionErrors, ThrowOnError, "fields">;
/**
 * Prune a function's oldest untagged versions
 */
export declare const pruneFunctionVersions: <ThrowOnError extends boolean = false>(options: Options<PruneFunctionVersionsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PruneFunctionVersionsResponses, PruneFunctionVersionsErrors, ThrowOnError, "fields">;
/**
 * Get one function version
 */
export declare const getFunctionVersion: <ThrowOnError extends boolean = false>(options: Options<GetFunctionVersionData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetFunctionVersionResponses, GetFunctionVersionErrors, ThrowOnError, "fields">;
/**
 * Retire a function version
 */
export declare const retireFunctionVersion: <ThrowOnError extends boolean = false>(options: Options<RetireFunctionVersionData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<RetireFunctionVersionResponses, RetireFunctionVersionErrors, ThrowOnError, "fields">;
/**
 * List identity providers
 */
export declare const listIdentityProviders: <ThrowOnError extends boolean = false>(options?: Options<ListIdentityProvidersData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ListIdentityProvidersResponses, ListIdentityProvidersErrors, ThrowOnError, "fields">;
/**
 * Create an identity provider
 */
export declare const createIdentityProvider: <ThrowOnError extends boolean = false>(options: Options<CreateIdentityProviderData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<CreateIdentityProviderResponses, CreateIdentityProviderErrors, ThrowOnError, "fields">;
/**
 * Delete an identity provider
 */
export declare const deleteIdentityProvider: <ThrowOnError extends boolean = false>(options: Options<DeleteIdentityProviderData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<DeleteIdentityProviderResponses, DeleteIdentityProviderErrors, ThrowOnError, "fields">;
/**
 * Get an identity provider by id
 */
export declare const getIdentityProvider: <ThrowOnError extends boolean = false>(options: Options<GetIdentityProviderData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetIdentityProviderResponses, GetIdentityProviderErrors, ThrowOnError, "fields">;
/**
 * Update an identity provider
 */
export declare const updateIdentityProvider: <ThrowOnError extends boolean = false>(options: Options<UpdateIdentityProviderData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<UpdateIdentityProviderResponses, UpdateIdentityProviderErrors, ThrowOnError, "fields">;
/**
 * List IDP role mappings
 */
export declare const listIdpRoleMappings: <ThrowOnError extends boolean = false>(options?: Options<ListIdpRoleMappingsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ListIdpRoleMappingsResponses, ListIdpRoleMappingsErrors, ThrowOnError, "fields">;
/**
 * Create an IDP role mapping
 */
export declare const createIdpRoleMapping: <ThrowOnError extends boolean = false>(options: Options<CreateIdpRoleMappingData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<CreateIdpRoleMappingResponses, CreateIdpRoleMappingErrors, ThrowOnError, "fields">;
/**
 * Delete an IDP role mapping
 */
export declare const deleteIdpRoleMapping: <ThrowOnError extends boolean = false>(options: Options<DeleteIdpRoleMappingData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<DeleteIdpRoleMappingResponses, DeleteIdpRoleMappingErrors, ThrowOnError, "fields">;
/**
 * Create dispatch jobs from records, under the ingestion's own target (ingestion runtime only)
 */
export declare const ingestionRuntimeCreateJobs: <ThrowOnError extends boolean = false>(options: Options<IngestionRuntimeCreateJobsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<IngestionRuntimeCreateJobsResponses, IngestionRuntimeCreateJobsErrors, ThrowOnError, "fields">;
/**
 * Fetch a secret the ingestion's live definition binds (ingestion runtime only; security telemetry, not an audited reveal)
 */
export declare const ingestionRuntimeGetSecret: <ThrowOnError extends boolean = false>(options: Options<IngestionRuntimeGetSecretData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<IngestionRuntimeGetSecretResponses, IngestionRuntimeGetSecretErrors, ThrowOnError, "fields">;
/**
 * A runtime hands back the leases of single-owner routes it has stopped, and says goodbye at shutdown (ingestion runtime only)
 */
export declare const ingestionRuntimeReleaseLeases: <ThrowOnError extends boolean = false>(options: Options<IngestionRuntimeReleaseLeasesData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<IngestionRuntimeReleaseLeasesResponses, IngestionRuntimeReleaseLeasesErrors, ThrowOnError, "fields">;
/**
 * A runtime asks what it should run (ingestion runtime only)
 */
export declare const ingestionRuntimePoll: <ThrowOnError extends boolean = false>(options: Options<IngestionRuntimePollData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<IngestionRuntimePollResponses, IngestionRuntimePollErrors, ThrowOnError, "fields">;
/**
 * A runtime reports route states, exchange windows, failures and test answers (ingestion runtime only)
 */
export declare const ingestionRuntimeReport: <ThrowOnError extends boolean = false>(options: Options<IngestionRuntimeReportData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<IngestionRuntimeReportResponses, IngestionRuntimeReportErrors, ThrowOnError, "fields">;
/**
 * Read a value a polled source keeps (lease holder only)
 */
export declare const ingestionRuntimeGetState: <ThrowOnError extends boolean = false>(options: Options<IngestionRuntimeGetStateData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<IngestionRuntimeGetStateResponses, IngestionRuntimeGetStateErrors, ThrowOnError, "fields">;
/**
 * Store a value a polled source keeps (lease holder only)
 */
export declare const ingestionRuntimePutState: <ThrowOnError extends boolean = false>(options: Options<IngestionRuntimePutStateData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<IngestionRuntimePutStateResponses, IngestionRuntimePutStateErrors, ThrowOnError, "fields">;
/**
 * Ship trace records captured inside an ingestion's open trace window (ingestion runtime only)
 */
export declare const ingestionRuntimeTraces: <ThrowOnError extends boolean = false>(options: Options<IngestionRuntimeTracesData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<IngestionRuntimeTracesResponses, IngestionRuntimeTracesErrors, ThrowOnError, "fields">;
/**
 * List the sets that own ingestions
 */
export declare const listIngestionSets: <ThrowOnError extends boolean = false>(options?: Options<ListIngestionSetsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ListIngestionSetsResponses, ListIngestionSetsErrors, ThrowOnError, "fields">;
/**
 * Make a set's ingestions what its items say: create, change, take in ones made by hand, and delete what it no longer lists
 */
export declare const applyIngestionSet: <ThrowOnError extends boolean = false>(options: Options<ApplyIngestionSetData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ApplyIngestionSetResponses, ApplyIngestionSetErrors, ThrowOnError, "fields">;
/**
 * List a set's kept applies, newest first
 */
export declare const listIngestionSetApplies: <ThrowOnError extends boolean = false>(options: Options<ListIngestionSetAppliesData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ListIngestionSetAppliesResponses, ListIngestionSetAppliesErrors, ThrowOnError, "fields">;
/**
 * Get what one apply of a set was given
 */
export declare const getIngestionSetApply: <ThrowOnError extends boolean = false>(options: Options<GetIngestionSetApplyData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetIngestionSetApplyResponses, GetIngestionSetApplyErrors, ThrowOnError, "fields">;
/**
 * Go back to an earlier apply: apply the set again with the items that apply was given, as a new apply
 */
export declare const reapplyIngestionSet: <ThrowOnError extends boolean = false>(options: Options<ReapplyIngestionSetData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ReapplyIngestionSetResponses, ReapplyIngestionSetErrors, ThrowOnError, "fields">;
/**
 * Let go of a set: its ingestions stay as they are and are edited one at a time again
 */
export declare const releaseIngestionSet: <ThrowOnError extends boolean = false>(options: Options<ReleaseIngestionSetData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ReleaseIngestionSetResponses, ReleaseIngestionSetErrors, ThrowOnError, "fields">;
/**
 * List the source kinds a definition can use
 */
export declare const listIngestionSourceKinds: <ThrowOnError extends boolean = false>(options?: Options<ListIngestionSourceKindsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ListIngestionSourceKindsResponses, ListIngestionSourceKindsErrors, ThrowOnError, "fields">;
/**
 * Queue a test of an ingestion's source
 */
export declare const testIngestionConnection: <ThrowOnError extends boolean = false>(options: Options<TestIngestionConnectionData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<TestIngestionConnectionResponses, TestIngestionConnectionErrors, ThrowOnError, "fields">;
/**
 * Get a queued test and, once a runtime has answered, its result
 */
export declare const getIngestionTest: <ThrowOnError extends boolean = false>(options: Options<GetIngestionTestData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetIngestionTestResponses, GetIngestionTestErrors, ThrowOnError, "fields">;
/**
 * List ingestions
 */
export declare const listIngestions: <ThrowOnError extends boolean = false>(options?: Options<ListIngestionsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ListIngestionsResponses, ListIngestionsErrors, ThrowOnError, "fields">;
/**
 * Create an ingestion
 */
export declare const createIngestion: <ThrowOnError extends boolean = false>(options: Options<CreateIngestionData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<CreateIngestionResponses, CreateIngestionErrors, ThrowOnError, "fields">;
/**
 * Delete an ingestion
 */
export declare const deleteIngestion: <ThrowOnError extends boolean = false>(options: Options<DeleteIngestionData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<DeleteIngestionResponses, DeleteIngestionErrors, ThrowOnError, "fields">;
/**
 * Get an ingestion by id
 */
export declare const getIngestion: <ThrowOnError extends boolean = false>(options: Options<GetIngestionData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetIngestionResponses, GetIngestionErrors, ThrowOnError, "fields">;
/**
 * Save a definition as the next version: made live with promote, a draft awaiting promote without it; a definition an existing version says is not saved again
 */
export declare const updateIngestion: <ThrowOnError extends boolean = false>(options: Options<UpdateIngestionData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<UpdateIngestionResponses, UpdateIngestionErrors, ThrowOnError, "fields">;
/**
 * Delete the config entry the ingestion's source names; the ingestions that name it wait for it
 */
export declare const deleteIngestionConfig: <ThrowOnError extends boolean = false>(options: Options<DeleteIngestionConfigData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<DeleteIngestionConfigResponses, DeleteIngestionConfigErrors, ThrowOnError, "fields">;
/**
 * Get the config entry the ingestion's source names (its settings in this environment)
 */
export declare const getIngestionConfig: <ThrowOnError extends boolean = false>(options: Options<GetIngestionConfigData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetIngestionConfigResponses, GetIngestionConfigErrors, ThrowOnError, "fields">;
/**
 * Write the config entry the ingestion's source names, after checking it against every ingestion that names it
 */
export declare const setIngestionConfig: <ThrowOnError extends boolean = false>(options: Options<SetIngestionConfigData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<SetIngestionConfigResponses, SetIngestionConfigErrors, ThrowOnError, "fields">;
/**
 * Get an ingestion as a definition file (YAML)
 */
export declare const getIngestionDefinition: <ThrowOnError extends boolean = false>(options: Options<GetIngestionDefinitionData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetIngestionDefinitionResponses, GetIngestionDefinitionErrors, ThrowOnError, "fields">;
/**
 * List the failures runtimes reported for an ingestion
 */
export declare const listIngestionFailures: <ThrowOnError extends boolean = false>(options: Options<ListIngestionFailuresData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ListIngestionFailuresResponses, ListIngestionFailuresErrors, ThrowOnError, "fields">;
/**
 * Dismiss a failure (a notice stops showing on the ingestion)
 */
export declare const dismissIngestionFailure: <ThrowOnError extends boolean = false>(options: Options<DismissIngestionFailureData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<DismissIngestionFailureResponses, DismissIngestionFailureErrors, ThrowOnError, "fields">;
/**
 * List the audit history of an ingestion
 */
export declare const listIngestionHistory: <ThrowOnError extends boolean = false>(options: Options<ListIngestionHistoryData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ListIngestionHistoryResponses, ListIngestionHistoryErrors, ThrowOnError, "fields">;
/**
 * Pause an ingestion
 */
export declare const pauseIngestion: <ThrowOnError extends boolean = false>(options: Options<PauseIngestionData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PauseIngestionResponses, PauseIngestionErrors, ThrowOnError, "fields">;
/**
 * Resume a paused ingestion
 */
export declare const resumeIngestion: <ThrowOnError extends boolean = false>(options: Options<ResumeIngestionData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ResumeIngestionResponses, ResumeIngestionErrors, ThrowOnError, "fields">;
/**
 * List the secrets the live definition binds and when each runtime last fetched them (names only, never values)
 */
export declare const listIngestionSecrets: <ThrowOnError extends boolean = false>(options: Options<ListIngestionSecretsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ListIngestionSecretsResponses, ListIngestionSecretsErrors, ThrowOnError, "fields">;
/**
 * Switch tracing off now (idempotent)
 */
export declare const disableIngestionTrace: <ThrowOnError extends boolean = false>(options: Options<DisableIngestionTraceData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<DisableIngestionTraceResponses, DisableIngestionTraceErrors, ThrowOnError, "fields">;
/**
 * Read an ingestion's trace window: whether tracing is on and until when
 */
export declare const getIngestionTrace: <ThrowOnError extends boolean = false>(options: Options<GetIngestionTraceData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetIngestionTraceResponses, GetIngestionTraceErrors, ThrowOnError, "fields">;
/**
 * Switch tracing on: a new window every runtime that runs the ingestion captures under
 */
export declare const enableIngestionTrace: <ThrowOnError extends boolean = false>(options: Options<EnableIngestionTraceData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<EnableIngestionTraceResponses, EnableIngestionTraceErrors, ThrowOnError, "fields">;
/**
 * List the trace records runtimes captured for an ingestion, newest first
 */
export declare const listIngestionTraceLog: <ThrowOnError extends boolean = false>(options: Options<ListIngestionTraceLogData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ListIngestionTraceLogResponses, ListIngestionTraceLogErrors, ThrowOnError, "fields">;
/**
 * List an ingestion's saved versions
 */
export declare const listIngestionVersions: <ThrowOnError extends boolean = false>(options: Options<ListIngestionVersionsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ListIngestionVersionsResponses, ListIngestionVersionsErrors, ThrowOnError, "fields">;
/**
 * Save a definition as the next version (a definition an existing version says is not saved again)
 */
export declare const saveIngestionVersion: <ThrowOnError extends boolean = false>(options: Options<SaveIngestionVersionData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<SaveIngestionVersionResponses, SaveIngestionVersionErrors, ThrowOnError, "fields">;
/**
 * Make a saved version the live one
 */
export declare const makeIngestionVersionLive: <ThrowOnError extends boolean = false>(options: Options<MakeIngestionVersionLiveData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<MakeIngestionVersionLiveResponses, MakeIngestionVersionLiveErrors, ThrowOnError, "fields">;
/**
 * List login attempts (cursor-paginated)
 */
export declare const listLoginAttempts: <ThrowOnError extends boolean = false>(options?: Options<ListLoginAttemptsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ListLoginAttemptsResponses, ListLoginAttemptsErrors, ThrowOnError, "fields">;
/**
 * List OAuth clients
 */
export declare const listOAuthClients: <ThrowOnError extends boolean = false>(options?: Options<ListOAuthClientsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ListOAuthClientsResponses, ListOAuthClientsErrors, ThrowOnError, "fields">;
/**
 * Create an OAuth client
 */
export declare const createOAuthClient: <ThrowOnError extends boolean = false>(options: Options<CreateOAuthClientData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<CreateOAuthClientResponses, CreateOAuthClientErrors, ThrowOnError, "fields">;
/**
 * Get an OAuth client by its client_id (SDK lookup)
 */
export declare const getOAuthClientByClientId: <ThrowOnError extends boolean = false>(options: Options<GetOAuthClientByClientIdData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetOAuthClientByClientIdResponses, GetOAuthClientByClientIdErrors, ThrowOnError, "fields">;
/**
 * Delete an OAuth client
 */
export declare const deleteOAuthClient: <ThrowOnError extends boolean = false>(options: Options<DeleteOAuthClientData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<DeleteOAuthClientResponses, DeleteOAuthClientErrors, ThrowOnError, "fields">;
/**
 * Get an OAuth client by id
 */
export declare const getOAuthClient: <ThrowOnError extends boolean = false>(options: Options<GetOAuthClientData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetOAuthClientResponses, GetOAuthClientErrors, ThrowOnError, "fields">;
/**
 * Update an OAuth client
 */
export declare const updateOAuthClient: <ThrowOnError extends boolean = false>(options: Options<UpdateOAuthClientData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<UpdateOAuthClientResponses, UpdateOAuthClientErrors, ThrowOnError, "fields">;
/**
 * Activate an OAuth client
 */
export declare const activateOAuthClient: <ThrowOnError extends boolean = false>(options: Options<ActivateOAuthClientData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ActivateOAuthClientResponses, ActivateOAuthClientErrors, ThrowOnError, "fields">;
/**
 * Deactivate an OAuth client
 */
export declare const deactivateOAuthClient: <ThrowOnError extends boolean = false>(options: Options<DeactivateOAuthClientData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<DeactivateOAuthClientResponses, DeactivateOAuthClientErrors, ThrowOnError, "fields">;
/**
 * Regenerate an OAuth client's secret (SDK alias of rotate-secret)
 */
export declare const regenerateOAuthClientSecret: <ThrowOnError extends boolean = false>(options: Options<RegenerateOAuthClientSecretData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<RegenerateOAuthClientSecretResponses, RegenerateOAuthClientSecretErrors, ThrowOnError, "fields">;
/**
 * End a secret-rotation overlap immediately
 */
export declare const revokeOAuthClientPreviousSecret: <ThrowOnError extends boolean = false>(options: Options<RevokeOAuthClientPreviousSecretData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<RevokeOAuthClientPreviousSecretResponses, RevokeOAuthClientPreviousSecretErrors, ThrowOnError, "fields">;
/**
 * Rotate an OAuth client's secret
 */
export declare const rotateOAuthClientSecret: <ThrowOnError extends boolean = false>(options: Options<RotateOAuthClientSecretData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<RotateOAuthClientSecretResponses, RotateOAuthClientSecretErrors, ThrowOnError, "fields">;
/**
 * Revoke a platform-config access grant
 */
export declare const revokePlatformConfigAccess: <ThrowOnError extends boolean = false>(options: Options<RevokePlatformConfigAccessData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<RevokePlatformConfigAccessResponses, RevokePlatformConfigAccessErrors, ThrowOnError, "fields">;
/**
 * List platform-config properties for an application
 */
export declare const listPlatformConfigProperties: <ThrowOnError extends boolean = false>(options: Options<ListPlatformConfigPropertiesData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ListPlatformConfigPropertiesResponses, ListPlatformConfigPropertiesErrors, ThrowOnError, "fields">;
/**
 * List access grants for an application
 */
export declare const listPlatformConfigAccess: <ThrowOnError extends boolean = false>(options: Options<ListPlatformConfigAccessData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ListPlatformConfigAccessResponses, ListPlatformConfigAccessErrors, ThrowOnError, "fields">;
/**
 * Grant access to platform-config for a role
 */
export declare const grantPlatformConfigAccess: <ThrowOnError extends boolean = false>(options: Options<GrantPlatformConfigAccessData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GrantPlatformConfigAccessResponses, GrantPlatformConfigAccessErrors, ThrowOnError, "fields">;
/**
 * List CORS origins (anchor)
 */
export declare const listCorsOrigins: <ThrowOnError extends boolean = false>(options?: Options<ListCorsOriginsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ListCorsOriginsResponses, ListCorsOriginsErrors, ThrowOnError, "fields">;
/**
 * Add a CORS origin
 */
export declare const addCorsOrigin: <ThrowOnError extends boolean = false>(options: Options<AddCorsOriginData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<AddCorsOriginResponses, AddCorsOriginErrors, ThrowOnError, "fields">;
/**
 * List allowed CORS origins (public)
 */
export declare const publicAllowedOrigins: <ThrowOnError extends boolean = false>(options?: Options<PublicAllowedOriginsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PublicAllowedOriginsResponses, PublicAllowedOriginsErrors, ThrowOnError, "fields">;
/**
 * Remove a CORS origin
 */
export declare const deleteCorsOrigin: <ThrowOnError extends boolean = false>(options: Options<DeleteCorsOriginData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<DeleteCorsOriginResponses, DeleteCorsOriginErrors, ThrowOnError, "fields">;
/**
 * Get a CORS origin by id (anchor)
 */
export declare const getCorsOrigin: <ThrowOnError extends boolean = false>(options: Options<GetCorsOriginData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetCorsOriginResponses, GetCorsOriginErrors, ThrowOnError, "fields">;
/**
 * List portal apps (a client's, or every client's for anchors)
 */
export declare const listPortalApps: <ThrowOnError extends boolean = false>(options?: Options<ListPortalAppsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ListPortalAppsResponses, ListPortalAppsErrors, ThrowOnError, "fields">;
/**
 * Register a portal app for a client and provision its portal OAuth client
 */
export declare const createPortalApp: <ThrowOnError extends boolean = false>(options: Options<CreatePortalAppData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<CreatePortalAppResponses, CreatePortalAppErrors, ThrowOnError, "fields">;
/**
 * Delete a portal app together with its portal OAuth clients
 */
export declare const deletePortalApp: <ThrowOnError extends boolean = false>(options: Options<DeletePortalAppData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<DeletePortalAppResponses, DeletePortalAppErrors, ThrowOnError, "fields">;
/**
 * Update a portal app's name, description, or active flag
 */
export declare const updatePortalApp: <ThrowOnError extends boolean = false>(options: Options<UpdatePortalAppData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<UpdatePortalAppResponses, UpdatePortalAppErrors, ThrowOnError, "fields">;
/**
 * Grant a portal app to every one of the client's portal users that has no portal app
 */
export declare const assignUnassignedPortalUsers: <ThrowOnError extends boolean = false>(options: Options<AssignUnassignedPortalUsersData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<AssignUnassignedPortalUsersResponses, AssignUnassignedPortalUsersErrors, ThrowOnError, "fields">;
/**
 * Search a client's portal identities (prefix match on email and name)
 */
export declare const listPortalUsers: <ThrowOnError extends boolean = false>(options?: Options<ListPortalUsersData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ListPortalUsersResponses, ListPortalUsersErrors, ThrowOnError, "fields">;
/**
 * Ensure a portal identity exists for (client, email), grant a portal app, and deliver a set-password invite
 */
export declare const ensurePortalUser: <ThrowOnError extends boolean = false>(options: Options<EnsurePortalUserData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<EnsurePortalUserResponses, EnsurePortalUserErrors, ThrowOnError, "fields">;
/**
 * Delete a portal identity (offboarding from every portal of the client)
 */
export declare const deletePortalUser: <ThrowOnError extends boolean = false>(options: Options<DeletePortalUserData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<DeletePortalUserResponses, DeletePortalUserErrors, ThrowOnError, "fields">;
/**
 * Reactivate a suspended portal identity
 */
export declare const activatePortalUser: <ThrowOnError extends boolean = false>(options: Options<ActivatePortalUserData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ActivatePortalUserResponses, ActivatePortalUserErrors, ThrowOnError, "fields">;
/**
 * Grant a portal identity access to one of the client's portal apps
 */
export declare const grantPortalUserApp: <ThrowOnError extends boolean = false>(options: Options<GrantPortalUserAppData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GrantPortalUserAppResponses, GrantPortalUserAppErrors, ThrowOnError, "fields">;
/**
 * Revoke a portal identity's access to one portal app (the identity stays)
 */
export declare const revokePortalUserApp: <ThrowOnError extends boolean = false>(options: Options<RevokePortalUserAppData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<RevokePortalUserAppResponses, RevokePortalUserAppErrors, ThrowOnError, "fields">;
/**
 * Suspend a portal identity (blocks portal login, keeps the row)
 */
export declare const deactivatePortalUser: <ThrowOnError extends boolean = false>(options: Options<DeactivatePortalUserData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<DeactivatePortalUserResponses, DeactivatePortalUserErrors, ThrowOnError, "fields">;
/**
 * List principals
 */
export declare const listPrincipals: <ThrowOnError extends boolean = false>(options?: Options<ListPrincipalsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ListPrincipalsResponses, ListPrincipalsErrors, ThrowOnError, "fields">;
/**
 * Create a principal
 */
export declare const createPrincipal: <ThrowOnError extends boolean = false>(options: Options<CreatePrincipalData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<CreatePrincipalResponses, CreatePrincipalErrors, ThrowOnError, "fields">;
/**
 * Bulk-import CLIENT users for a client (CSV onboarding)
 */
export declare const bulkImportUsers: <ThrowOnError extends boolean = false>(options: Options<BulkImportUsersData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<BulkImportUsersResponses, BulkImportUsersErrors, ThrowOnError, "fields">;
/**
 * Resolve auth-method for an email's domain
 */
export declare const checkPrincipalEmailDomain: <ThrowOnError extends boolean = false>(options?: Options<CheckPrincipalEmailDomainData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<CheckPrincipalEmailDomainResponses, CheckPrincipalEmailDomainErrors, ThrowOnError, "fields">;
/**
 * List USER principals holding the developer role
 */
export declare const listDeveloperUsers: <ThrowOnError extends boolean = false>(options?: Options<ListDeveloperUsersData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ListDeveloperUsersResponses, ListDeveloperUsersErrors, ThrowOnError, "fields">;
/**
 * Match a pasted list of email addresses against the users the caller can see
 */
export declare const matchPrincipalEmails: <ThrowOnError extends boolean = false>(options: Options<MatchPrincipalEmailsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<MatchPrincipalEmailsResponses, MatchPrincipalEmailsErrors, ThrowOnError, "fields">;
/**
 * Sync users (declarative upsert by email; no application scope)
 */
export declare const syncUsers: <ThrowOnError extends boolean = false>(options: Options<SyncUsersData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<SyncUsersResponses, SyncUsersErrors, ThrowOnError, "fields">;
/**
 * Create a user principal (scope optional, default CLIENT; ANCHOR/PARTNER must be backed by the email domain's setup)
 */
export declare const createUser: <ThrowOnError extends boolean = false>(options: Options<CreateUserData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<CreateUserResponses, CreateUserErrors, ThrowOnError, "fields">;
/**
 * Delete a principal
 */
export declare const deletePrincipal: <ThrowOnError extends boolean = false>(options: Options<DeletePrincipalData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<DeletePrincipalResponses, DeletePrincipalErrors, ThrowOnError, "fields">;
/**
 * Get a principal by id
 */
export declare const getPrincipal: <ThrowOnError extends boolean = false>(options: Options<GetPrincipalData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetPrincipalResponses, GetPrincipalErrors, ThrowOnError, "fields">;
/**
 * Update a principal
 */
export declare const updatePrincipal: <ThrowOnError extends boolean = false>(options: Options<UpdatePrincipalData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<UpdatePrincipalResponses, UpdatePrincipalErrors, ThrowOnError, "fields">;
/**
 * Activate a principal
 */
export declare const activatePrincipal: <ThrowOnError extends boolean = false>(options: Options<ActivatePrincipalData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ActivatePrincipalResponses, ActivatePrincipalErrors, ThrowOnError, "fields">;
/**
 * List application IDs the principal can access
 */
export declare const listPrincipalApplicationAccess: <ThrowOnError extends boolean = false>(options: Options<ListPrincipalApplicationAccessData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ListPrincipalApplicationAccessResponses, ListPrincipalApplicationAccessErrors, ThrowOnError, "fields">;
/**
 * Assign application access to a principal
 */
export declare const assignPrincipalApplicationAccess: <ThrowOnError extends boolean = false>(options: Options<AssignPrincipalApplicationAccessData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<AssignPrincipalApplicationAccessResponses, AssignPrincipalApplicationAccessErrors, ThrowOnError, "fields">;
/**
 * List applications a principal can be granted access to
 */
export declare const listPrincipalAvailableApplications: <ThrowOnError extends boolean = false>(options: Options<ListPrincipalAvailableApplicationsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ListPrincipalAvailableApplicationsResponses, ListPrincipalAvailableApplicationsErrors, ThrowOnError, "fields">;
/**
 * List client-access grants for a principal
 */
export declare const listPrincipalClientAccess: <ThrowOnError extends boolean = false>(options: Options<ListPrincipalClientAccessData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ListPrincipalClientAccessResponses, ListPrincipalClientAccessErrors, ThrowOnError, "fields">;
/**
 * Grant a client-access for a principal
 */
export declare const grantPrincipalClientAccess: <ThrowOnError extends boolean = false>(options: Options<GrantPrincipalClientAccessData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GrantPrincipalClientAccessResponses, GrantPrincipalClientAccessErrors, ThrowOnError, "fields">;
/**
 * Revoke a client-access grant
 */
export declare const revokePrincipalClientAccess: <ThrowOnError extends boolean = false>(options: Options<RevokePrincipalClientAccessData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<RevokePrincipalClientAccessResponses, RevokePrincipalClientAccessErrors, ThrowOnError, "fields">;
/**
 * Change a principal's scope/client association (anchor-gated)
 */
export declare const setPrincipalClientAssociation: <ThrowOnError extends boolean = false>(options: Options<SetPrincipalClientAssociationData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<SetPrincipalClientAssociationResponses, SetPrincipalClientAssociationErrors, ThrowOnError, "fields">;
/**
 * Deactivate a principal
 */
export declare const deactivatePrincipal: <ThrowOnError extends boolean = false>(options: Options<DeactivatePrincipalData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<DeactivatePrincipalResponses, DeactivatePrincipalErrors, ThrowOnError, "fields">;
/**
 * Revoke a principal's self-service developer API credential
 */
export declare const revokePrincipalDeveloperCredential: <ThrowOnError extends boolean = false>(options: Options<RevokePrincipalDeveloperCredentialData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<RevokePrincipalDeveloperCredentialResponses, RevokePrincipalDeveloperCredentialErrors, ThrowOnError, "fields">;
/**
 * Create or rotate a principal's self-service developer API credential
 */
export declare const setPrincipalDeveloperCredential: <ThrowOnError extends boolean = false>(options: Options<SetPrincipalDeveloperCredentialData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<SetPrincipalDeveloperCredentialResponses, SetPrincipalDeveloperCredentialErrors, ThrowOnError, "fields">;
/**
 * Clear a user's two-factor methods (forces re-enrollment)
 */
export declare const resetPrincipalTwoFactor: <ThrowOnError extends boolean = false>(options: Options<ResetPrincipalTwoFactorData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ResetPrincipalTwoFactorResponses, ResetPrincipalTwoFactorErrors, ThrowOnError, "fields">;
/**
 * Reset a user's password
 */
export declare const resetPrincipalPassword: <ThrowOnError extends boolean = false>(options: Options<ResetPrincipalPasswordData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ResetPrincipalPasswordResponses, ResetPrincipalPasswordErrors, ThrowOnError, "fields">;
/**
 * List a principal's assigned roles
 */
export declare const listPrincipalRoles: <ThrowOnError extends boolean = false>(options: Options<ListPrincipalRolesData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ListPrincipalRolesResponses, ListPrincipalRolesErrors, ThrowOnError, "fields">;
/**
 * Add a single role to a principal
 */
export declare const addPrincipalRole: <ThrowOnError extends boolean = false>(options: Options<AddPrincipalRoleData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<AddPrincipalRoleResponses, AddPrincipalRoleErrors, ThrowOnError, "fields">;
/**
 * Assign roles to a principal (replaces full set)
 */
export declare const assignPrincipalRoles: <ThrowOnError extends boolean = false>(options: Options<AssignPrincipalRolesData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<AssignPrincipalRolesResponses, AssignPrincipalRolesErrors, ThrowOnError, "fields">;
/**
 * Remove a single role from a principal
 */
export declare const removePrincipalRole: <ThrowOnError extends boolean = false>(options: Options<RemovePrincipalRoleData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<RemovePrincipalRoleResponses, RemovePrincipalRoleErrors, ThrowOnError, "fields">;
/**
 * Send a password-reset email to a user
 */
export declare const sendPrincipalPasswordReset: <ThrowOnError extends boolean = false>(options: Options<SendPrincipalPasswordResetData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<SendPrincipalPasswordResetResponses, SendPrincipalPasswordResetErrors, ThrowOnError, "fields">;
/**
 * Get when a principal (or a role it holds) last changed — used by SDKs to detect a revoked/changed session
 */
export declare const getPrincipalVersion: <ThrowOnError extends boolean = false>(options: Options<GetPrincipalVersionData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetPrincipalVersionResponses, GetPrincipalVersionErrors, ThrowOnError, "fields">;
/**
 * List processes
 */
export declare const listProcesses: <ThrowOnError extends boolean = false>(options?: Options<ListProcessesData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ListProcessesResponses, ListProcessesErrors, ThrowOnError, "fields">;
/**
 * Create a process
 */
export declare const createProcess: <ThrowOnError extends boolean = false>(options: Options<CreateProcessData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<CreateProcessResponses, CreateProcessErrors, ThrowOnError, "fields">;
/**
 * Get a process by code
 */
export declare const getProcessByCode: <ThrowOnError extends boolean = false>(options: Options<GetProcessByCodeData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetProcessByCodeResponses, GetProcessByCodeErrors, ThrowOnError, "fields">;
/**
 * Sync processes (SDK alias; applicationCode in the body)
 */
export declare const syncProcessesByBody: <ThrowOnError extends boolean = false>(options: Options<SyncProcessesByBodyData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<SyncProcessesByBodyResponses, SyncProcessesByBodyErrors, ThrowOnError, "fields">;
/**
 * Delete a process
 */
export declare const deleteProcess: <ThrowOnError extends boolean = false>(options: Options<DeleteProcessData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<DeleteProcessResponses, DeleteProcessErrors, ThrowOnError, "fields">;
/**
 * Get a process by id
 */
export declare const getProcess: <ThrowOnError extends boolean = false>(options: Options<GetProcessData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetProcessResponses, GetProcessErrors, ThrowOnError, "fields">;
/**
 * Update a process
 */
export declare const updateProcess: <ThrowOnError extends boolean = false>(options: Options<UpdateProcessData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<UpdateProcessResponses, UpdateProcessErrors, ThrowOnError, "fields">;
/**
 * Archive a process
 */
export declare const archiveProcess: <ThrowOnError extends boolean = false>(options: Options<ArchiveProcessData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ArchiveProcessResponses, ArchiveProcessErrors, ThrowOnError, "fields">;
/**
 * List pending lost-device reset requests for your client(s)
 */
export declare const listResetApprovals: <ThrowOnError extends boolean = false>(options?: Options<ListResetApprovalsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ListResetApprovalsResponses, ListResetApprovalsErrors, ThrowOnError, "fields">;
/**
 * Approve a lost-device reset (emails the user a reset link)
 */
export declare const approveResetApproval: <ThrowOnError extends boolean = false>(options: Options<ApproveResetApprovalData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ApproveResetApprovalResponses, ApproveResetApprovalErrors, ThrowOnError, "fields">;
/**
 * Deny a lost-device reset request
 */
export declare const denyResetApproval: <ThrowOnError extends boolean = false>(options: Options<DenyResetApprovalData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<DenyResetApprovalResponses, DenyResetApprovalErrors, ThrowOnError, "fields">;
/**
 * List roles
 */
export declare const listRoles: <ThrowOnError extends boolean = false>(options?: Options<ListRolesData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ListRolesResponses, ListRolesErrors, ThrowOnError, "fields">;
/**
 * Create a role
 */
export declare const createRole: <ThrowOnError extends boolean = false>(options: Options<CreateRoleData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<CreateRoleResponses, CreateRoleErrors, ThrowOnError, "fields">;
/**
 * List roles for an application
 */
export declare const getRolesByApplication: <ThrowOnError extends boolean = false>(options: Options<GetRolesByApplicationData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetRolesByApplicationResponses, GetRolesByApplicationErrors, ThrowOnError, "fields">;
/**
 * Get a role by name (code)
 */
export declare const getRoleByCode: <ThrowOnError extends boolean = false>(options: Options<GetRoleByCodeData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetRoleByCodeResponses, GetRoleByCodeErrors, ThrowOnError, "fields">;
/**
 * List roles by source (CODE | DATABASE | SDK)
 */
export declare const getRolesBySource: <ThrowOnError extends boolean = false>(options: Options<GetRolesBySourceData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetRolesBySourceResponses, GetRolesBySourceErrors, ThrowOnError, "fields">;
/**
 * List distinct application codes used by roles
 */
export declare const getRoleApplicationFilters: <ThrowOnError extends boolean = false>(options?: Options<GetRoleApplicationFiltersData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetRoleApplicationFiltersResponses, GetRoleApplicationFiltersErrors, ThrowOnError, "fields">;
/**
 * List the platform permission catalog
 */
export declare const listPermissions: <ThrowOnError extends boolean = false>(options?: Options<ListPermissionsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ListPermissionsResponses, ListPermissionsErrors, ThrowOnError, "fields">;
/**
 * Delete a permission from the catalog
 */
export declare const deletePermission: <ThrowOnError extends boolean = false>(options: Options<DeletePermissionData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<DeletePermissionResponses, DeletePermissionErrors, ThrowOnError, "fields">;
/**
 * Get a single permission catalog entry
 */
export declare const getPermission: <ThrowOnError extends boolean = false>(options: Options<GetPermissionData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetPermissionResponses, GetPermissionErrors, ThrowOnError, "fields">;
/**
 * Delete a role
 */
export declare const deleteRole: <ThrowOnError extends boolean = false>(options: Options<DeleteRoleData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<DeleteRoleResponses, DeleteRoleErrors, ThrowOnError, "fields">;
/**
 * Get a role by id
 */
export declare const getRole: <ThrowOnError extends boolean = false>(options: Options<GetRoleData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetRoleResponses, GetRoleErrors, ThrowOnError, "fields">;
/**
 * Update a role
 */
export declare const updateRole: <ThrowOnError extends boolean = false>(options: Options<UpdateRoleData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<UpdateRoleResponses, UpdateRoleErrors, ThrowOnError, "fields">;
/**
 * List permissions granted to a role
 */
export declare const listRolePermissions: <ThrowOnError extends boolean = false>(options: Options<ListRolePermissionsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ListRolePermissionsResponses, ListRolePermissionsErrors, ThrowOnError, "fields">;
/**
 * Grant a permission to a role (SDK; permission in body)
 */
export declare const grantRolePermissionByBody: <ThrowOnError extends boolean = false>(options: Options<GrantRolePermissionByBodyData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GrantRolePermissionByBodyResponses, GrantRolePermissionByBodyErrors, ThrowOnError, "fields">;
/**
 * Revoke a permission from a role
 */
export declare const revokeRolePermission: <ThrowOnError extends boolean = false>(options: Options<RevokeRolePermissionData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<RevokeRolePermissionResponses, RevokeRolePermissionErrors, ThrowOnError, "fields">;
/**
 * Grant a permission to a role
 */
export declare const grantRolePermission: <ThrowOnError extends boolean = false>(options: Options<GrantRolePermissionData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GrantRolePermissionResponses, GrantRolePermissionErrors, ThrowOnError, "fields">;
/**
 * List scheduled jobs
 */
export declare const listScheduledJobs: <ThrowOnError extends boolean = false>(options?: Options<ListScheduledJobsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ListScheduledJobsResponses, ListScheduledJobsErrors, ThrowOnError, "fields">;
/**
 * Create a scheduled job
 */
export declare const createScheduledJob: <ThrowOnError extends boolean = false>(options: Options<CreateScheduledJobData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<CreateScheduledJobResponses, CreateScheduledJobErrors, ThrowOnError, "fields">;
/**
 * Get a scheduled job by code
 */
export declare const getScheduledJobByCode: <ThrowOnError extends boolean = false>(options: Options<GetScheduledJobByCodeData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetScheduledJobByCodeResponses, GetScheduledJobByCodeErrors, ThrowOnError, "fields">;
/**
 * Get a single scheduled-job instance
 */
export declare const getScheduledJobInstance: <ThrowOnError extends boolean = false>(options: Options<GetScheduledJobInstanceData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetScheduledJobInstanceResponses, GetScheduledJobInstanceErrors, ThrowOnError, "fields">;
/**
 * Mark a scheduled-job instance as completed
 */
export declare const completeScheduledJobInstance: <ThrowOnError extends boolean = false>(options: Options<CompleteScheduledJobInstanceData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<CompleteScheduledJobInstanceResponses, CompleteScheduledJobInstanceErrors, ThrowOnError, "fields">;
/**
 * Append a log entry to an instance
 */
export declare const writeScheduledJobInstanceLog: <ThrowOnError extends boolean = false>(options: Options<WriteScheduledJobInstanceLogData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<WriteScheduledJobInstanceLogResponses, WriteScheduledJobInstanceLogErrors, ThrowOnError, "fields">;
/**
 * List log entries for an instance
 */
export declare const listScheduledJobInstanceLogs: <ThrowOnError extends boolean = false>(options: Options<ListScheduledJobInstanceLogsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ListScheduledJobInstanceLogsResponses, ListScheduledJobInstanceLogsErrors, ThrowOnError, "fields">;
/**
 * Delete a scheduled job
 */
export declare const deleteScheduledJob: <ThrowOnError extends boolean = false>(options: Options<DeleteScheduledJobData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<DeleteScheduledJobResponses, DeleteScheduledJobErrors, ThrowOnError, "fields">;
/**
 * Get a scheduled job by id
 */
export declare const getScheduledJob: <ThrowOnError extends boolean = false>(options: Options<GetScheduledJobData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetScheduledJobResponses, GetScheduledJobErrors, ThrowOnError, "fields">;
/**
 * Update a scheduled job
 */
export declare const updateScheduledJob: <ThrowOnError extends boolean = false>(options: Options<UpdateScheduledJobData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<UpdateScheduledJobResponses, UpdateScheduledJobErrors, ThrowOnError, "fields">;
/**
 * Archive a scheduled job
 */
export declare const archiveScheduledJob: <ThrowOnError extends boolean = false>(options: Options<ArchiveScheduledJobData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ArchiveScheduledJobResponses, ArchiveScheduledJobErrors, ThrowOnError, "fields">;
/**
 * Fire a scheduled job immediately
 */
export declare const fireScheduledJobNow: <ThrowOnError extends boolean = false>(options: Options<FireScheduledJobNowData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<FireScheduledJobNowResponses, FireScheduledJobNowErrors, ThrowOnError, "fields">;
/**
 * List firings for a scheduled job
 */
export declare const listScheduledJobInstances: <ThrowOnError extends boolean = false>(options: Options<ListScheduledJobInstancesData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ListScheduledJobInstancesResponses, ListScheduledJobInstancesErrors, ThrowOnError, "fields">;
/**
 * Pause a scheduled job
 */
export declare const pauseScheduledJob: <ThrowOnError extends boolean = false>(options: Options<PauseScheduledJobData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PauseScheduledJobResponses, PauseScheduledJobErrors, ThrowOnError, "fields">;
/**
 * Resume a scheduled job
 */
export declare const resumeScheduledJob: <ThrowOnError extends boolean = false>(options: Options<ResumeScheduledJobData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ResumeScheduledJobResponses, ResumeScheduledJobErrors, ThrowOnError, "fields">;
/**
 * List service accounts
 */
export declare const listServiceAccounts: <ThrowOnError extends boolean = false>(options?: Options<ListServiceAccountsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ListServiceAccountsResponses, ListServiceAccountsErrors, ThrowOnError, "fields">;
/**
 * Create a service account
 */
export declare const createServiceAccount: <ThrowOnError extends boolean = false>(options: Options<CreateServiceAccountData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<CreateServiceAccountResponses, CreateServiceAccountErrors, ThrowOnError, "fields">;
/**
 * Get a service account by code
 */
export declare const getServiceAccountByCode: <ThrowOnError extends boolean = false>(options: Options<GetServiceAccountByCodeData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetServiceAccountByCodeResponses, GetServiceAccountByCodeErrors, ThrowOnError, "fields">;
/**
 * Delete a service account
 */
export declare const deleteServiceAccount: <ThrowOnError extends boolean = false>(options: Options<DeleteServiceAccountData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<DeleteServiceAccountResponses, DeleteServiceAccountErrors, ThrowOnError, "fields">;
/**
 * Get a service account by id
 */
export declare const getServiceAccount: <ThrowOnError extends boolean = false>(options: Options<GetServiceAccountData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetServiceAccountResponses, GetServiceAccountErrors, ThrowOnError, "fields">;
/**
 * Update a service account
 */
export declare const updateServiceAccount: <ThrowOnError extends boolean = false>(options: Options<UpdateServiceAccountData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<UpdateServiceAccountResponses, UpdateServiceAccountErrors, ThrowOnError, "fields">;
/**
 * Deactivate a service account
 */
export declare const deactivateServiceAccount: <ThrowOnError extends boolean = false>(options: Options<DeactivateServiceAccountData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<DeactivateServiceAccountResponses, DeactivateServiceAccountErrors, ThrowOnError, "fields">;
/**
 * Regenerate a service account's auth token
 */
export declare const regenerateServiceAccountAuthTokenRegenerateAuthToken: <ThrowOnError extends boolean = false>(options: Options<RegenerateServiceAccountAuthTokenRegenerateAuthTokenData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<RegenerateServiceAccountAuthTokenRegenerateAuthTokenResponses, RegenerateServiceAccountAuthTokenRegenerateAuthTokenErrors, ThrowOnError, "fields">;
/**
 * Regenerate a service account's signing secret
 */
export declare const regenerateServiceAccountSigningSecretRegenerateSecret: <ThrowOnError extends boolean = false>(options: Options<RegenerateServiceAccountSigningSecretRegenerateSecretData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<RegenerateServiceAccountSigningSecretRegenerateSecretResponses, RegenerateServiceAccountSigningSecretRegenerateSecretErrors, ThrowOnError, "fields">;
/**
 * Regenerate a service account's signing secret
 */
export declare const regenerateServiceAccountSigningSecretRegenerateSigningSecret: <ThrowOnError extends boolean = false>(options: Options<RegenerateServiceAccountSigningSecretRegenerateSigningSecretData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<RegenerateServiceAccountSigningSecretRegenerateSigningSecretResponses, RegenerateServiceAccountSigningSecretRegenerateSigningSecretErrors, ThrowOnError, "fields">;
/**
 * Regenerate a service account's auth token
 */
export declare const regenerateServiceAccountAuthTokenRegenerateToken: <ThrowOnError extends boolean = false>(options: Options<RegenerateServiceAccountAuthTokenRegenerateTokenData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<RegenerateServiceAccountAuthTokenRegenerateTokenResponses, RegenerateServiceAccountAuthTokenRegenerateTokenErrors, ThrowOnError, "fields">;
/**
 * List a service account's roles
 */
export declare const listServiceAccountRoles: <ThrowOnError extends boolean = false>(options: Options<ListServiceAccountRolesData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ListServiceAccountRolesResponses, ListServiceAccountRolesErrors, ThrowOnError, "fields">;
/**
 * Assign roles to a service account
 */
export declare const assignServiceAccountRoles: <ThrowOnError extends boolean = false>(options: Options<AssignServiceAccountRolesData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<AssignServiceAccountRolesResponses, AssignServiceAccountRolesErrors, ThrowOnError, "fields">;
/**
 * Mint a short-lived bearer token for the service account (anchor-only, audited)
 */
export declare const mintServiceAccountToken: <ThrowOnError extends boolean = false>(options: Options<MintServiceAccountTokenData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<MintServiceAccountTokenResponses, MintServiceAccountTokenErrors, ThrowOnError, "fields">;
/**
 * List subscriptions
 */
export declare const listSubscriptions: <ThrowOnError extends boolean = false>(options?: Options<ListSubscriptionsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ListSubscriptionsResponses, ListSubscriptionsErrors, ThrowOnError, "fields">;
/**
 * Create a subscription
 */
export declare const createSubscription: <ThrowOnError extends boolean = false>(options: Options<CreateSubscriptionData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<CreateSubscriptionResponses, CreateSubscriptionErrors, ThrowOnError, "fields">;
/**
 * Delete a subscription
 */
export declare const deleteSubscription: <ThrowOnError extends boolean = false>(options: Options<DeleteSubscriptionData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<DeleteSubscriptionResponses, DeleteSubscriptionErrors, ThrowOnError, "fields">;
/**
 * Get a subscription by id
 */
export declare const getSubscription: <ThrowOnError extends boolean = false>(options: Options<GetSubscriptionData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetSubscriptionResponses, GetSubscriptionErrors, ThrowOnError, "fields">;
/**
 * Update a subscription
 */
export declare const updateSubscription: <ThrowOnError extends boolean = false>(options: Options<UpdateSubscriptionData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<UpdateSubscriptionResponses, UpdateSubscriptionErrors, ThrowOnError, "fields">;
/**
 * Pause a subscription
 */
export declare const pauseSubscription: <ThrowOnError extends boolean = false>(options: Options<PauseSubscriptionData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PauseSubscriptionResponses, PauseSubscriptionErrors, ThrowOnError, "fields">;
/**
 * Resume a subscription
 */
export declare const resumeSubscription: <ThrowOnError extends boolean = false>(options: Options<ResumeSubscriptionData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ResumeSubscriptionResponses, ResumeSubscriptionErrors, ThrowOnError, "fields">;
/**
 * Begin a WebAuthn authentication ceremony
 */
export declare const webauthnAuthenticateBegin: <ThrowOnError extends boolean = false>(options: Options<WebauthnAuthenticateBeginData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<WebauthnAuthenticateBeginResponses, WebauthnAuthenticateBeginErrors, ThrowOnError, "fields">;
/**
 * Complete a WebAuthn authentication ceremony
 */
export declare const webauthnAuthenticateComplete: <ThrowOnError extends boolean = false>(options: Options<WebauthnAuthenticateCompleteData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<WebauthnAuthenticateCompleteResponses, WebauthnAuthenticateCompleteErrors, ThrowOnError, "fields">;
/**
 * List the current user's WebAuthn credentials
 */
export declare const listWebauthnCredentials: <ThrowOnError extends boolean = false>(options?: Options<ListWebauthnCredentialsData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ListWebauthnCredentialsResponses, ListWebauthnCredentialsErrors, ThrowOnError, "fields">;
/**
 * Revoke a WebAuthn credential
 */
export declare const deleteWebauthnCredential: <ThrowOnError extends boolean = false>(options: Options<DeleteWebauthnCredentialData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<DeleteWebauthnCredentialResponses, DeleteWebauthnCredentialErrors, ThrowOnError, "fields">;
/**
 * Begin a WebAuthn registration ceremony
 */
export declare const webauthnRegisterBegin: <ThrowOnError extends boolean = false>(options: Options<WebauthnRegisterBeginData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<WebauthnRegisterBeginResponses, WebauthnRegisterBeginErrors, ThrowOnError, "fields">;
/**
 * Complete a WebAuthn registration ceremony
 */
export declare const webauthnRegisterComplete: <ThrowOnError extends boolean = false>(options: Options<WebauthnRegisterCompleteData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<WebauthnRegisterCompleteResponses, WebauthnRegisterCompleteErrors, ThrowOnError, "fields">;
/**
 * Download a function artifact by digest (function-runner role only)
 */
export declare const getFunctionRunnerArtifact: <ThrowOnError extends boolean = false>(options: Options<GetFunctionRunnerArtifactData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetFunctionRunnerArtifactResponses, GetFunctionRunnerArtifactErrors, ThrowOnError, "fields">;
/**
 * A function pool's desired state (long-poll; function-runner role only)
 */
export declare const getFunctionRunnerDesired: <ThrowOnError extends boolean = false>(options: Options<GetFunctionRunnerDesiredData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetFunctionRunnerDesiredResponses, GetFunctionRunnerDesiredErrors, ThrowOnError, "fields">;
/**
 * Create a dispatch job on a function's behalf (function-runner role only)
 */
export declare const postFunctionRunnerDispatchJob: <ThrowOnError extends boolean = false>(options: Options<PostFunctionRunnerDispatchJobData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PostFunctionRunnerDispatchJobResponses, PostFunctionRunnerDispatchJobErrors, ThrowOnError, "fields">;
/**
 * Emit an event on a function's behalf (function-runner role only)
 */
export declare const postFunctionRunnerEvent: <ThrowOnError extends boolean = false>(options: Options<PostFunctionRunnerEventData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PostFunctionRunnerEventResponses, PostFunctionRunnerEventErrors, ThrowOnError, "fields">;
/**
 * A function runner's heartbeat report (function-runner role only)
 */
export declare const postFunctionRunnerHeartbeat: <ThrowOnError extends boolean = false>(options: Options<PostFunctionRunnerHeartbeatData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PostFunctionRunnerHeartbeatResponses, PostFunctionRunnerHeartbeatErrors, ThrowOnError, "fields">;
/**
 * Mint the application's service account token for a function that declares platformToken (function-runner role only)
 */
export declare const postFunctionRunnerToken: <ThrowOnError extends boolean = false>(options: Options<PostFunctionRunnerTokenData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PostFunctionRunnerTokenResponses, PostFunctionRunnerTokenErrors, ThrowOnError, "fields">;
/**
 * Ship trace records captured by a function runner (function-runner role only)
 */
export declare const postFunctionRunnerTraceLog: <ThrowOnError extends boolean = false>(options: Options<PostFunctionRunnerTraceLogData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<PostFunctionRunnerTraceLogResponses, PostFunctionRunnerTraceLogErrors, ThrowOnError, "fields">;
//# sourceMappingURL=sdk.gen.d.ts.map