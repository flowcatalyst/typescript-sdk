/**
 * Subscriptions Resource
 *
 * Manage event subscriptions for webhook delivery.
 */
import type { ResultAsync } from "neverthrow";
import type { SdkError } from "../errors.js";
import type { FlowCatalystClient } from "../client.js";
import type { ListSubscriptionsResponse, GetSubscriptionResponse, CreateSubscriptionData, UpdateSubscriptionData, SyncSubscriptionsData, SyncSubscriptionsResponse as SyncSubscriptionsResponseType } from "../generated/types.gen.js";
export type SubscriptionListResponse = ListSubscriptionsResponse;
export type SubscriptionDto = GetSubscriptionResponse;
export type CreateSubscriptionRequest = CreateSubscriptionData["body"];
export type UpdateSubscriptionRequest = UpdateSubscriptionData["body"];
export type SyncSubscriptionsResponse = SyncSubscriptionsResponseType;
export interface SubscriptionFilters {
    clientId?: string;
    status?: string;
}
/** Pagination params (page/size). Mirrors the previous generated shape. */
export type PaginationParams = {
    page?: number;
    size?: number;
};
/**
 * Subscriptions resource for managing event subscriptions.
 */
export declare class SubscriptionsResource {
    private readonly client;
    constructor(client: FlowCatalystClient);
    /**
     * List all subscriptions with optional filters.
     */
    list(filters?: SubscriptionFilters, pagination?: PaginationParams): ResultAsync<SubscriptionListResponse, SdkError>;
    /**
     * Get a subscription by ID.
     */
    get(id: string): ResultAsync<SubscriptionDto, SdkError>;
    /**
     * Create a new subscription.
     */
    create(data: CreateSubscriptionRequest): ResultAsync<SubscriptionDto, SdkError>;
    /**
     * Update a subscription.
     */
    update(id: string, data: UpdateSubscriptionRequest): ResultAsync<SubscriptionDto, SdkError>;
    /**
     * Delete a subscription.
     */
    delete(id: string): ResultAsync<unknown, SdkError>;
    /**
     * Pause a subscription.
     */
    pause(id: string): ResultAsync<SubscriptionDto, SdkError>;
    /**
     * Resume a paused subscription.
     */
    resume(id: string): ResultAsync<SubscriptionDto, SdkError>;
    /**
     * Sync subscriptions for an application.
     *
     * Calls `POST /api/applications/{applicationCode}/subscriptions/sync`.
     */
    sync(applicationCode: string, subscriptions: SyncSubscriptionsData["body"]["subscriptions"], removeUnlisted?: boolean): ResultAsync<SyncSubscriptionsResponse, SdkError>;
}
//# sourceMappingURL=subscriptions.d.ts.map