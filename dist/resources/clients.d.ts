/**
 * Clients Resource
 *
 * Manage clients (tenants) in the platform.
 */
import type { ResultAsync } from "neverthrow";
import type { SdkError } from "../errors.js";
import type { FlowCatalystClient } from "../client.js";
import type { ListClientsResponse, GetClientResponse, GetClientApplicationsResponse, SearchClientsByQueryResponse, UpdateClientApplicationsData, CreateClientData, AddClientNoteData, AddClientNoteResponse, UpdateClientData } from "../generated/types.gen.js";
export type ClientListResponse = ListClientsResponse;
export type ClientDto = GetClientResponse;
export type ClientApplicationsResponse = GetClientApplicationsResponse;
export type ClientSearchResponse = SearchClientsByQueryResponse;
export type AddNoteRequest = AddClientNoteData["body"];
export type AddNoteResponse = AddClientNoteResponse;
export type CreateClientRequest = CreateClientData["body"];
export type UpdateClientRequest = UpdateClientData["body"];
export type UpdateClientApplicationsRequest = UpdateClientApplicationsData["body"];
/**
 * Response for status change operations (enable/disable).
 */
export interface StatusResponse {
    message: string;
}
/**
 * Clients resource for managing platform clients (tenants).
 */
export declare class ClientsResource {
    private readonly client;
    constructor(client: FlowCatalystClient);
    /**
     * List all clients.
     */
    list(): ResultAsync<ClientListResponse, SdkError>;
    /**
     * Get a client by ID.
     */
    get(id: string): ResultAsync<ClientDto, SdkError>;
    /**
     * Get a client by identifier.
     */
    getByIdentifier(identifier: string): ResultAsync<ClientDto, SdkError>;
    /**
     * Create a new client.
     */
    create(data: CreateClientRequest): ResultAsync<ClientDto, SdkError>;
    /**
     * Update a client.
     */
    update(id: string, data: UpdateClientRequest): ResultAsync<ClientDto, SdkError>;
    /**
     * Activate a client.
     */
    activate(id: string): ResultAsync<ClientDto, SdkError>;
    /**
     * Deactivate a client.
     */
    deactivate(id: string, reason: string): ResultAsync<ClientDto, SdkError>;
    /**
     * Suspend a client with a reason.
     */
    suspend(id: string, reason: string): ResultAsync<ClientDto, SdkError>;
    /**
     * Get applications configured for a client.
     */
    getApplications(id: string): ResultAsync<ClientApplicationsResponse, SdkError>;
    /**
     * Update the applications configured for a client.
     */
    updateApplications(id: string, data: UpdateClientApplicationsRequest): ResultAsync<ClientApplicationsResponse, SdkError>;
    /**
     * Enable an application for a client.
     */
    enableApplication(clientId: string, applicationId: string): ResultAsync<StatusResponse, SdkError>;
    /**
     * Disable an application for a client.
     */
    disableApplication(clientId: string, applicationId: string): ResultAsync<StatusResponse, SdkError>;
    /**
     * Search clients by name or identifier.
     */
    search(query: string): ResultAsync<ClientSearchResponse, SdkError>;
    /**
     * Add a note to a client's audit history.
     */
    addNote(id: string, category: string, text: string): ResultAsync<AddNoteResponse, SdkError>;
}
//# sourceMappingURL=clients.d.ts.map