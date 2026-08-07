/**
 * Subscriptions Resource
 *
 * Manage event subscriptions for webhook delivery.
 */
import * as sdk from "../generated/sdk.gen.js";
/**
 * Subscriptions resource for managing event subscriptions.
 */
export class SubscriptionsResource {
    constructor(client) {
        this.client = client;
    }
    /**
     * List all subscriptions with optional filters.
     */
    list(filters, pagination) {
        return this.client.request((httpClient, headers) => sdk.listSubscriptions({
            client: httpClient,
            headers,
            query: {
                ...pagination,
                ...filters,
            },
        }));
    }
    /**
     * Get a subscription by ID.
     */
    get(id) {
        return this.client.request((httpClient, headers) => sdk.getSubscription({
            client: httpClient,
            headers,
            path: { id },
        }));
    }
    /**
     * Create a new subscription.
     */
    create(data) {
        return this.client.request((httpClient, headers) => sdk.createSubscription({
            client: httpClient,
            headers,
            body: data,
        }));
    }
    /**
     * Update a subscription.
     */
    update(id, data) {
        return this.client.request((httpClient, headers) => sdk.updateSubscription({
            client: httpClient,
            headers,
            path: { id },
            body: data,
        }));
    }
    /**
     * Delete a subscription.
     */
    delete(id) {
        return this.client.request((httpClient, headers) => sdk.deleteSubscription({
            client: httpClient,
            headers,
            path: { id },
        }));
    }
    /**
     * Pause a subscription.
     */
    pause(id) {
        return this.client.request((httpClient, headers) => sdk.pauseSubscription({
            client: httpClient,
            headers,
            path: { id },
        }));
    }
    /**
     * Resume a paused subscription.
     */
    resume(id) {
        return this.client.request((httpClient, headers) => sdk.resumeSubscription({
            client: httpClient,
            headers,
            path: { id },
        }));
    }
    /**
     * Sync subscriptions for an application.
     *
     * Calls `POST /api/applications/{applicationCode}/subscriptions/sync`.
     */
    sync(applicationCode, subscriptions, removeUnlisted = false) {
        return this.client.request((httpClient, headers) => sdk.syncSubscriptions({
            client: httpClient,
            headers,
            path: { appCode: applicationCode },
            body: { subscriptions },
            query: { removeUnlisted },
        }));
    }
}
