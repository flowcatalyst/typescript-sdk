/**
 * Field Workers Resource
 *
 * Admin API for field-worker identities (workers who sign in on enrolled
 * devices with a PIN): ensure/list/get/update/delete, PIN reset, lock and
 * suspend controls, application grants and sign-in history. Mirrors the Go
 * SDK's `FieldWorkersResource`.
 */
import * as sdk from "../generated/sdk.gen.js";
export class FieldWorkersResource {
    constructor(client) {
        this.client = client;
    }
    /**
     * Create the worker for (clientId, workerCode) if absent and grant the
     * listed applications; the response's `created` says which happened.
     */
    ensure(data) {
        return this.client.request((httpClient, headers) => sdk.ensureFieldWorker({ client: httpClient, headers, body: data }));
    }
    /** List one client's workers, with optional filters. */
    list(clientId, filters) {
        return this.client.request((httpClient, headers) => sdk.listFieldWorkers({
            client: httpClient,
            headers,
            query: { ...filters, clientId },
        }));
    }
    get(id) {
        return this.client.request((httpClient, headers) => sdk.getFieldWorker({ client: httpClient, headers, path: { id } }));
    }
    update(id, data) {
        return this.client.request((httpClient, headers) => sdk.updateFieldWorker({
            client: httpClient,
            headers,
            path: { id },
            body: data,
        }));
    }
    /** Revokes the worker's sessions first. */
    delete(id) {
        return this.client.request((httpClient, headers) => sdk.deleteFieldWorker({ client: httpClient, headers, path: { id } }));
    }
    /**
     * Omit `pin` for a random temporary PIN, returned once in
     * `temporaryPin`.
     */
    resetPin(id, data = {}) {
        return this.client.request((httpClient, headers) => sdk.resetFieldWorkerPin({
            client: httpClient,
            headers,
            path: { id },
            body: data,
        }));
    }
    /** Clears soft and hard locks. */
    unlock(id) {
        return this.client.request((httpClient, headers) => sdk.unlockFieldWorker({ client: httpClient, headers, path: { id } }));
    }
    /** Revokes the worker's sessions. */
    suspend(id) {
        return this.client.request((httpClient, headers) => sdk.suspendFieldWorker({ client: httpClient, headers, path: { id } }));
    }
    activate(id) {
        return this.client.request((httpClient, headers) => sdk.activateFieldWorker({ client: httpClient, headers, path: { id } }));
    }
    grantApp(id, appCode) {
        return this.client.request((httpClient, headers) => sdk.grantFieldWorkerApp({
            client: httpClient,
            headers,
            path: { id },
            body: { appCode },
        }));
    }
    /** Also revokes that application's sessions. */
    revokeApp(id, appCode) {
        return this.client.request((httpClient, headers) => sdk.revokeFieldWorkerApp({
            client: httpClient,
            headers,
            path: { id, appCode },
        }));
    }
    /** Sign-in attempts, newest first. */
    signIns(id, page) {
        return this.client.request((httpClient, headers) => sdk.listFieldWorkerSignIns({
            client: httpClient,
            headers,
            path: { id },
            ...(page ? { query: page } : {}),
        }));
    }
}
