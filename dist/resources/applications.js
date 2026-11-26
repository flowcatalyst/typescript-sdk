/**
 * Applications Resource
 *
 * Manage applications in the platform.
 *
 * Most methods make direct HTTP calls with hand-written types; the paths are
 * the spec's (`tests/wrapper-paths.test.ts` checks every one).
 */
import * as sdk from "../generated/sdk.gen.js";
/**
 * Applications resource for managing platform applications.
 */
export class ApplicationsResource {
    constructor(client) {
        this.client = client;
    }
    /**
     * List all applications.
     */
    list() {
        return this.client.request((httpClient, headers) => httpClient.get({
            url: "/api/applications",
            headers,
        }));
    }
    /**
     * Get an application by ID.
     */
    get(id) {
        return this.client.request((httpClient, headers) => httpClient.get({
            url: "/api/applications/{id}",
            headers,
            path: { id },
        }));
    }
    /**
     * Get an application by code.
     */
    getByCode(code) {
        return this.client.request((httpClient, headers) => httpClient.get({
            url: "/api/applications/by-code/{code}",
            headers,
            path: { code },
        }));
    }
    /**
     * Create a new application.
     */
    create(data) {
        return this.client.request((httpClient, headers) => httpClient.post({
            url: "/api/applications",
            headers: {
                ...headers,
                "Content-Type": "application/json",
            },
            body: data,
        }));
    }
    /**
     * Update an application.
     */
    update(id, data) {
        return this.client.request((httpClient, headers) => httpClient.put({
            url: "/api/applications/{id}",
            headers: {
                ...headers,
                "Content-Type": "application/json",
            },
            path: { id },
            body: data,
        }));
    }
    /**
     * Delete an application.
     */
    delete(id) {
        return this.client.request((httpClient, headers) => httpClient.delete({
            url: "/api/applications/{id}",
            headers,
            path: { id },
        }));
    }
    /**
     * Activate an application.
     */
    activate(id) {
        return this.client.request((httpClient, headers) => httpClient.post({
            url: "/api/applications/{id}/activate",
            headers,
            path: { id },
        }));
    }
    /**
     * Deactivate an application.
     */
    deactivate(id) {
        return this.client.request((httpClient, headers) => httpClient.post({
            url: "/api/applications/{id}/deactivate",
            headers,
            path: { id },
        }));
    }
    /**
     * Provision a service account for an application. The answer carries the
     * OAuth client (`serviceAccount.oauthClient`) and the webhook credentials
     * (`serviceAccount.webhook`: the token the platform sends on its
     * deliveries and the secret it signs them with), every secret in
     * plaintext, once; the platform cannot show them again. An application
     * that already has a service account is refused with 409
     * `ALREADY_PROVISIONED`.
     */
    provisionServiceAccount(id) {
        return this.client.request((httpClient, headers) => httpClient.post({
            url: "/api/applications/{id}/provision-service-account",
            headers,
            path: { id },
        }));
    }
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
    getServiceAccount(id) {
        return this.client.request((httpClient, headers) => sdk.getApplicationServiceAccount({
            client: httpClient,
            headers,
            path: { id },
        }));
    }
    /**
     * List roles defined for an application.
     */
    listRoles(id) {
        return this.client.request((httpClient, headers) => httpClient.get({
            url: "/api/applications/by-id/{id}/roles",
            headers,
            path: { id },
        }));
    }
    /**
     * List per-client configs for an application.
     */
    listClients(id) {
        return this.client.request((httpClient, headers) => httpClient.get({
            url: "/api/applications/{id}/clients",
            headers,
            path: { id },
        }));
    }
    /**
     * Enable an application for a specific client.
     */
    enableForClient(id, clientId) {
        return this.client.request((httpClient, headers) => httpClient.post({
            url: "/api/applications/{id}/clients/{clientId}/enable",
            headers,
            path: { id, clientId },
        }));
    }
    /**
     * Disable an application for a specific client.
     */
    disableForClient(id, clientId) {
        return this.client.request((httpClient, headers) => httpClient.post({
            url: "/api/applications/{id}/clients/{clientId}/disable",
            headers,
            path: { id, clientId },
        }));
    }
}
