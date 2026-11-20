/**
 * Applications Resource
 *
 * Manage applications in the platform.
 *
 * Most methods make direct HTTP calls with hand-written types; the paths are
 * the spec's (`tests/wrapper-paths.test.ts` checks every one).
 */
import type { ResultAsync } from "neverthrow";
import type { SdkError } from "../errors.js";
import type { FlowCatalystClient } from "../client.js";
import type { ApplicationProvisionServiceAccountResponse, ServiceAccountResponse } from "../generated/types.gen.js";
export interface ApplicationResponse {
    id: string;
    code: string;
    name: string;
    description: string | null;
    type: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
}
export interface ApplicationListResponse {
    applications: ApplicationResponse[];
    total: number;
}
export interface CreateApplicationRequest {
    code: string;
    name: string;
    description?: string | null;
    type: string;
}
export interface UpdateApplicationRequest {
    name?: string;
    description?: string | null;
}
export interface ApplicationRoleResponse {
    id: string;
    code: string;
    displayName: string;
    description?: string | null;
    applicationCode: string;
    permissions: string[];
    source: string;
    clientManaged: boolean;
}
export interface ClientConfigResponse {
    id: string;
    applicationId: string;
    clientId: string;
    clientName?: string | null;
    clientIdentifier?: string | null;
    enabled: boolean;
    baseUrlOverride?: string | null;
    effectiveBaseUrl?: string | null;
    config?: Record<string, unknown> | null;
}
export interface ClientConfigsResponse {
    clientConfigs: ClientConfigResponse[];
    total?: number;
}
/**
 * Applications resource for managing platform applications.
 */
export declare class ApplicationsResource {
    private readonly client;
    constructor(client: FlowCatalystClient);
    /**
     * List all applications.
     */
    list(): ResultAsync<ApplicationListResponse, SdkError>;
    /**
     * Get an application by ID.
     */
    get(id: string): ResultAsync<ApplicationResponse, SdkError>;
    /**
     * Get an application by code.
     */
    getByCode(code: string): ResultAsync<ApplicationResponse, SdkError>;
    /**
     * Create a new application.
     */
    create(data: CreateApplicationRequest): ResultAsync<ApplicationResponse, SdkError>;
    /**
     * Update an application.
     */
    update(id: string, data: UpdateApplicationRequest): ResultAsync<ApplicationResponse, SdkError>;
    /**
     * Delete an application.
     */
    delete(id: string): ResultAsync<unknown, SdkError>;
    /**
     * Activate an application.
     */
    activate(id: string): ResultAsync<ApplicationResponse, SdkError>;
    /**
     * Deactivate an application.
     */
    deactivate(id: string): ResultAsync<ApplicationResponse, SdkError>;
    /**
     * Provision a service account for an application. The answer carries the
     * OAuth client (`serviceAccount.oauthClient`) and the webhook credentials
     * (`serviceAccount.webhook`: the token the platform sends on its
     * deliveries and the secret it signs them with), every secret in
     * plaintext, once; the platform cannot show them again. An application
     * that already has a service account is refused with 409
     * `ALREADY_PROVISIONED`.
     */
    provisionServiceAccount(id: string): ResultAsync<ApplicationProvisionServiceAccountResponse, SdkError>;
    /**
     * Get the service account attached to an application
     * (`GET /api/applications/{id}/service-account`): the account's own id,
     * `code`, `name`, `principalId` (its SERVICE principal, which is what the
     * application's `serviceAccountId` holds), `oauthClientId` (the public
     * OAuth client id) and the rest of `GET /api/service-accounts/{id}`'s
     * answer; never a secret. An application without one is a `not_found`
     * error. Needs read access to the application and
     * `platform:iam:service-account:view`.
     */
    getServiceAccount(id: string): ResultAsync<ServiceAccountResponse, SdkError>;
    /**
     * List roles defined for an application.
     */
    listRoles(id: string): ResultAsync<ApplicationRoleResponse[], SdkError>;
    /**
     * List per-client configs for an application.
     */
    listClients(id: string): ResultAsync<ClientConfigsResponse, SdkError>;
    /**
     * Enable an application for a specific client.
     */
    enableForClient(id: string, clientId: string): ResultAsync<ClientConfigResponse, SdkError>;
    /**
     * Disable an application for a specific client.
     */
    disableForClient(id: string, clientId: string): ResultAsync<ClientConfigResponse, SdkError>;
}
//# sourceMappingURL=applications.d.ts.map