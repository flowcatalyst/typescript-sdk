/**
 * Field Workers Resource
 *
 * Admin API for field-worker identities (workers who sign in on enrolled
 * devices with a PIN): ensure/list/get/update/delete, PIN reset, lock and
 * suspend controls, application grants, sign-in history and the optional link
 * to a platform user. Mirrors the Go
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
    /**
     * Issue a badge (replaces the worker's ACTIVE badge). The response's
     * `token` is the secret to print as a QR code; it is shown once.
     */
    issueBadge(id, data = {}) {
        return this.client.request((httpClient, headers) => sdk.issueFieldWorkerBadge({
            client: httpClient,
            headers,
            path: { id },
            body: data,
        }));
    }
    /** The worker's badges, newest first (tokens are never returned). */
    listBadges(id) {
        return this.client.request((httpClient, headers) => sdk.listFieldWorkerBadges({
            client: httpClient,
            headers,
            path: { id },
        }));
    }
    revokeBadge(id, badgeId) {
        return this.client.request((httpClient, headers) => sdk.revokeFieldWorkerBadge({
            client: httpClient,
            headers,
            path: { id, badgeId },
        }));
    }
    /**
     * Issue a badge for each of 1 to 200 workers in one transaction (all or
     * nothing). Each result carries the token, shown once.
     */
    bulkIssueBadges(workerIds) {
        return this.client.request((httpClient, headers) => sdk.issueFieldWorkerBadges({
            client: httpClient,
            headers,
            body: { workerIds },
        }));
    }
    /**
     * Mint a single-use code a console admin redeems at the platform's field
     * sign-in to start an impersonated session as the worker.
     */
    createSignInCode(id, appCode) {
        return this.client.request((httpClient, headers) => sdk.createFieldWorkerSignInCode({
            client: httpClient,
            headers,
            path: { id },
            body: { appCode },
        }));
    }
    /**
     * Link the worker to a platform user, for audit correlation only (the
     * worker's tokens then carry `linked_principal_id`; it grants nothing).
     * 422 INVALID_LINK when the user cannot be linked, 409 LINK_EXISTS when
     * another worker of the client already holds the link. Responses carry
     * `linkedPrincipal`; `list` accepts a `linkedPrincipalId` filter.
     */
    link(id, principalId) {
        return this.client.request((httpClient, headers) => sdk.linkFieldWorker({
            client: httpClient,
            headers,
            path: { id },
            body: { principalId },
        }));
    }
    /** Remove the worker's link to a platform user. Idempotent. */
    unlink(id) {
        return this.client.request((httpClient, headers) => sdk.unlinkFieldWorker({ client: httpClient, headers, path: { id } }));
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
