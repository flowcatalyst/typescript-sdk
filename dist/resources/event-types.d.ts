/**
 * Event Types Resource
 *
 * Manage event type definitions and schemas.
 */
import type { ResultAsync } from "neverthrow";
import type { SdkError } from "../errors.js";
import type { FlowCatalystClient } from "../client.js";
import type { GetApiEventTypesResponse, GetApiEventTypesByIdResponse, PostApiEventTypesData, PutApiEventTypesByIdData, PostApiEventTypesByIdSchemasData, PostApiApplicationsByAppCodeEventTypesSyncData, PostApiApplicationsByAppCodeEventTypesSyncResponse, PaginationParams } from "../generated/types.gen.js";
export type EventTypeListResponse = GetApiEventTypesResponse;
export type EventTypeResponse = GetApiEventTypesByIdResponse;
export type CreateEventTypeRequest = PostApiEventTypesData["body"];
export type UpdateEventTypeRequest = PutApiEventTypesByIdData["body"];
export type SyncEventTypesResponse = PostApiApplicationsByAppCodeEventTypesSyncResponse;
export interface EventTypeFilters {
    status?: string;
    application?: string;
    clientId?: string;
}
/**
 * Event Types resource for managing event type definitions.
 */
export declare class EventTypesResource {
    private readonly client;
    constructor(client: FlowCatalystClient);
    /**
     * List all event types with optional filters.
     */
    list(filters?: EventTypeFilters, pagination?: PaginationParams): ResultAsync<EventTypeListResponse, SdkError>;
    /**
     * Get an event type by ID.
     */
    get(id: string): ResultAsync<EventTypeResponse, SdkError>;
    /**
     * Create a new event type.
     */
    create(data: CreateEventTypeRequest): ResultAsync<EventTypeResponse, SdkError>;
    /**
     * Update an event type.
     */
    update(id: string, data: UpdateEventTypeRequest): ResultAsync<EventTypeResponse, SdkError>;
    /**
     * Add a schema version to an event type.
     */
    addSchemaVersion(id: string, schema: PostApiEventTypesByIdSchemasData["body"]): ResultAsync<EventTypeResponse, SdkError>;
    /**
     * Archive (soft-delete) an event type. The server's DELETE on this
     * resource is a soft archive — the row is retained with status flipped
     * to ARCHIVED. Named `archive` rather than `delete` to make the
     * semantics visible (Rust and Laravel SDKs match).
     */
    archive(id: string): ResultAsync<unknown, SdkError>;
    /**
     * Sync event types for an application.
     *
     * Calls `POST /api/applications/{applicationCode}/event-types/sync`.
     */
    sync(applicationCode: string, eventTypes: PostApiApplicationsByAppCodeEventTypesSyncData["body"]["eventTypes"], removeUnlisted?: boolean): ResultAsync<SyncEventTypesResponse, SdkError>;
}
//# sourceMappingURL=event-types.d.ts.map