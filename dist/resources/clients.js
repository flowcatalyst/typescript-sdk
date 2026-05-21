/**
 * Clients Resource
 *
 * Manage clients (tenants) in the platform.
 */
import * as sdk from "../generated/sdk.gen.js";
/**
 * Clients resource for managing platform clients (tenants).
 */
export class ClientsResource {
    constructor(client) {
        this.client = client;
    }
    /**
     * List all clients.
     */
    list() {
        return this.client.request((httpClient, headers) => sdk.getApiClients({
            client: httpClient,
            headers,
        }));
    }
    /**
     * Get a client by ID.
     */
    get(id) {
        return this.client.request((httpClient, headers) => sdk.getApiClientsById({
            client: httpClient,
            headers,
            path: { id },
        }));
    }
    /**
     * Get a client by identifier.
     */
    getByIdentifier(identifier) {
        return this.client.request((httpClient, headers) => sdk.getApiClientsByIdentifierByIdentifier({
            client: httpClient,
            headers,
            path: { identifier },
        }));
    }
    /**
     * Create a new client.
     */
    create(data) {
        return this.client.request((httpClient, headers) => sdk.postApiClients({
            client: httpClient,
            headers,
            body: data,
        }));
    }
    /**
     * Update a client.
     */
    update(id, data) {
        return this.client.request((httpClient, headers) => sdk.putApiClientsById({
            client: httpClient,
            headers,
            path: { id },
            body: data,
        }));
    }
    /**
     * Activate a client.
     */
    activate(id) {
        return this.client.request((httpClient, headers) => sdk.postApiClientsByIdActivate({
            client: httpClient,
            headers,
            path: { id },
        }));
    }
    /**
     * Deactivate a client.
     */
    deactivate(id, reason) {
        return this.client.request((httpClient, headers) => sdk.postApiClientsByIdDeactivate({
            client: httpClient,
            headers,
            path: { id },
            body: { reason },
        }));
    }
    /**
     * Suspend a client with a reason.
     */
    suspend(id, reason) {
        return this.client.request((httpClient, headers) => sdk.postApiClientsByIdSuspend({
            client: httpClient,
            headers,
            path: { id },
            body: { reason },
        }));
    }
    /**
     * Get applications configured for a client.
     */
    getApplications(id) {
        return this.client.request((httpClient, headers) => sdk.getApiClientsByIdApplications({
            client: httpClient,
            headers,
            path: { id },
        }));
    }
    /**
     * Update the applications configured for a client.
     */
    updateApplications(id, data) {
        return this.client.request((httpClient, headers) => sdk.putApiClientsByIdApplications({
            client: httpClient,
            headers,
            path: { id },
            body: data,
        }));
    }
    /**
     * Enable an application for a client.
     */
    enableApplication(clientId, applicationId) {
        return this.client.request((httpClient, headers) => sdk.postApiClientsByIdApplicationsByAppIdEnable({
            client: httpClient,
            headers,
            path: { id: clientId, applicationId },
        }));
    }
    /**
     * Disable an application for a client.
     */
    disableApplication(clientId, applicationId) {
        return this.client.request((httpClient, headers) => sdk.postApiClientsByIdApplicationsByAppIdDisable({
            client: httpClient,
            headers,
            path: { id: clientId, applicationId },
        }));
    }
    /**
     * Search clients by name or identifier.
     */
    search(query) {
        return this.client.request((httpClient, headers) => sdk.getApiClientsSearch({
            client: httpClient,
            headers,
            query: { q: query },
        }));
    }
    /**
     * Add a note to a client's audit history.
     */
    addNote(id, category, text) {
        return this.client.request((httpClient, headers) => sdk.postApiClientsByIdNotes({
            client: httpClient,
            headers,
            path: { id },
            body: { category, text },
        }));
    }
}
