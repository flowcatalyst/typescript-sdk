/**
 * Event Types Resource
 *
 * Manage event type definitions and schemas.
 */
import * as sdk from "../generated/sdk.gen";
/**
 * Event Types resource for managing event type definitions.
 */
export class EventTypesResource {
    constructor(client) {
        this.client = client;
    }
    /**
     * List all event types with optional filters.
     */
    list(filters, pagination) {
        return this.client.request((httpClient, headers) => sdk.getApiEventTypes({
            client: httpClient,
            headers,
            query: {
                pagination: pagination ?? {},
                ...filters,
            },
        }));
    }
    /**
     * Get an event type by ID.
     */
    get(id) {
        return this.client.request((httpClient, headers) => sdk.getApiEventTypesById({
            client: httpClient,
            headers,
            path: { id },
        }));
    }
    /**
     * Create a new event type.
     */
    create(data) {
        return this.client.request((httpClient, headers) => sdk.postApiEventTypes({
            client: httpClient,
            headers,
            body: data,
        }));
    }
    /**
     * Update an event type.
     */
    update(id, data) {
        return this.client.request((httpClient, headers) => sdk.putApiEventTypesById({
            client: httpClient,
            headers,
            path: { id },
            body: data,
        }));
    }
    /**
     * Add a schema version to an event type.
     */
    addSchemaVersion(id, schema) {
        return this.client.request((httpClient, headers) => sdk.postApiEventTypesByIdSchemas({
            client: httpClient,
            headers,
            path: { id },
            body: schema,
        }));
    }
    /**
     * Archive (soft-delete) an event type. The server's DELETE on this
     * resource is a soft archive — the row is retained with status flipped
     * to ARCHIVED. Named `archive` rather than `delete` to make the
     * semantics visible (Rust and Laravel SDKs match).
     */
    archive(id) {
        return this.client.request((httpClient, headers) => sdk.deleteApiEventTypesById({
            client: httpClient,
            headers,
            path: { id },
        }));
    }
    /**
     * Sync event types for an application.
     *
     * Calls `POST /api/applications/{applicationCode}/event-types/sync`.
     */
    sync(applicationCode, eventTypes, removeUnlisted = false) {
        return this.client.request((httpClient, headers) => sdk.postApiApplicationsByAppCodeEventTypesSync({
            client: httpClient,
            headers,
            path: { appCode: applicationCode },
            body: { eventTypes },
            query: { removeUnlisted },
        }));
    }
}
