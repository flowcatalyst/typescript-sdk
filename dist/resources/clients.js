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
        return this.client.request((httpClient, headers) => sdk.listClients({
            client: httpClient,
            headers,
        }));
    }
    /**
     * Get a client by ID.
     */
    get(id) {
        return this.client.request((httpClient, headers) => sdk.getClient({
            client: httpClient,
            headers,
            path: { id },
        }));
    }
    /**
     * Get a client by identifier.
     */
    getByIdentifier(identifier) {
        return this.client.request((httpClient, headers) => sdk.getClientByIdentifier({
            client: httpClient,
            headers,
            path: { identifier },
        }));
    }
    /**
     * Create a new client.
     */
    create(data) {
        return this.client.request((httpClient, headers) => sdk.createClient({
            client: httpClient,
            headers,
            body: data,
        }));
    }
    /**
     * Update a client.
     */
    update(id, data) {
        return this.client.request((httpClient, headers) => sdk.updateClient({
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
        return this.client.request((httpClient, headers) => sdk.activateClient({
            client: httpClient,
            headers,
            path: { id },
        }));
    }
    /**
     * Deactivate a client.
     */
    deactivate(id, reason) {
        return this.client.request((httpClient, headers) => sdk.deactivateClient({
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
        return this.client.request((httpClient, headers) => sdk.suspendClient({
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
        return this.client.request((httpClient, headers) => sdk.getClientApplications({
            client: httpClient,
            headers,
            path: { id },
        }));
    }
    /**
     * Update the applications configured for a client.
     */
    updateApplications(id, data) {
        return this.client.request((httpClient, headers) => sdk.updateClientApplications({
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
        return this.client.request((httpClient, headers) => sdk.enableClientApplication({
            client: httpClient,
            headers,
            path: { id: clientId, applicationId },
        }));
    }
    /**
     * Disable an application for a client.
     */
    disableApplication(clientId, applicationId) {
        return this.client.request((httpClient, headers) => sdk.disableClientApplication({
            client: httpClient,
            headers,
            path: { id: clientId, applicationId },
        }));
    }
    /**
     * Search clients by name or identifier.
     */
    search(query) {
        return this.client.request((httpClient, headers) => sdk.searchClientsByQuery({
            client: httpClient,
            headers,
            query: { q: query },
        }));
    }
    /**
     * Add a note to a client's audit history.
     */
    addNote(id, category, text) {
        return this.client.request((httpClient, headers) => sdk.addClientNote({
            client: httpClient,
            headers,
            path: { id },
            body: { category, text },
        }));
    }
}
