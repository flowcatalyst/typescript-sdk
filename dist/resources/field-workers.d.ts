/**
 * Field Workers Resource
 *
 * Admin API for field-worker identities (workers who sign in on enrolled
 * devices with a PIN): ensure/list/get/update/delete, PIN reset, lock and
 * suspend controls, application grants and sign-in history. Mirrors the Go
 * SDK's `FieldWorkersResource`.
 */
import type { ResultAsync } from "neverthrow";
import type { SdkError } from "../errors.js";
import type { FlowCatalystClient } from "../client.js";
import type { EnsureFieldWorkerData, EnsureFieldWorkerResponse, ListFieldWorkersData, ListFieldWorkersResponse, GetFieldWorkerResponse, UpdateFieldWorkerData, UpdateFieldWorkerResponse, DeleteFieldWorkerResponse, ResetFieldWorkerPinData, ResetFieldWorkerPinResponse, UnlockFieldWorkerResponse, SuspendFieldWorkerResponse, ActivateFieldWorkerResponse, GrantFieldWorkerAppResponse, RevokeFieldWorkerAppResponse, ListFieldWorkerSignInsData, ListFieldWorkerSignInsResponse, ListFieldWorkerBadgesResponse, IssueFieldWorkerBadgeData, IssueFieldWorkerBadgeResponse, RevokeFieldWorkerBadgeResponse, IssueFieldWorkerBadgesResponse, CreateFieldWorkerSignInCodeResponse } from "../generated/types.gen.js";
export type EnsureFieldWorkerRequest = EnsureFieldWorkerData["body"];
export type UpdateFieldWorkerRequest = UpdateFieldWorkerData["body"];
export type ResetFieldWorkerPinRequest = ResetFieldWorkerPinData["body"];
export type FieldWorkerFilters = NonNullable<ListFieldWorkersData["query"]>;
export type FieldWorkerSignInPage = NonNullable<ListFieldWorkerSignInsData["query"]>;
export type FieldWorkerDto = EnsureFieldWorkerResponse;
export type FieldWorkerListResponse = ListFieldWorkersResponse;
export type FieldWorkerSignInListResponse = ListFieldWorkerSignInsResponse;
export type ResetFieldWorkerPinResult = ResetFieldWorkerPinResponse;
export type IssueFieldBadgeRequest = NonNullable<IssueFieldWorkerBadgeData["body"]>;
/** A freshly issued badge: `token` is the secret to print, shown once. */
export type FieldBadgeIssued = IssueFieldWorkerBadgeResponse;
export type FieldBadgeListResponse = ListFieldWorkerBadgesResponse;
export type BulkIssueFieldBadgesResult = IssueFieldWorkerBadgesResponse;
/** A single-use code a console admin redeems to sign in as the worker. */
export type FieldSignInCode = CreateFieldWorkerSignInCodeResponse;
export declare class FieldWorkersResource {
    private readonly client;
    constructor(client: FlowCatalystClient);
    /**
     * Create the worker for (clientId, workerCode) if absent and grant the
     * listed applications; the response's `created` says which happened.
     */
    ensure(data: EnsureFieldWorkerRequest): ResultAsync<FieldWorkerDto, SdkError>;
    /** List one client's workers, with optional filters. */
    list(clientId: string, filters?: Omit<FieldWorkerFilters, "clientId">): ResultAsync<FieldWorkerListResponse, SdkError>;
    get(id: string): ResultAsync<GetFieldWorkerResponse, SdkError>;
    update(id: string, data: UpdateFieldWorkerRequest): ResultAsync<UpdateFieldWorkerResponse, SdkError>;
    /** Revokes the worker's sessions first. */
    delete(id: string): ResultAsync<DeleteFieldWorkerResponse, SdkError>;
    /**
     * Omit `pin` for a random temporary PIN, returned once in
     * `temporaryPin`.
     */
    resetPin(id: string, data?: ResetFieldWorkerPinRequest): ResultAsync<ResetFieldWorkerPinResult, SdkError>;
    /** Clears soft and hard locks. */
    unlock(id: string): ResultAsync<UnlockFieldWorkerResponse, SdkError>;
    /** Revokes the worker's sessions. */
    suspend(id: string): ResultAsync<SuspendFieldWorkerResponse, SdkError>;
    activate(id: string): ResultAsync<ActivateFieldWorkerResponse, SdkError>;
    grantApp(id: string, appCode: string): ResultAsync<GrantFieldWorkerAppResponse, SdkError>;
    /** Also revokes that application's sessions. */
    revokeApp(id: string, appCode: string): ResultAsync<RevokeFieldWorkerAppResponse, SdkError>;
    /**
     * Issue a badge (replaces the worker's ACTIVE badge). The response's
     * `token` is the secret to print as a QR code; it is shown once.
     */
    issueBadge(id: string, data?: IssueFieldBadgeRequest): ResultAsync<FieldBadgeIssued, SdkError>;
    /** The worker's badges, newest first (tokens are never returned). */
    listBadges(id: string): ResultAsync<FieldBadgeListResponse, SdkError>;
    revokeBadge(id: string, badgeId: string): ResultAsync<RevokeFieldWorkerBadgeResponse, SdkError>;
    /**
     * Issue a badge for each of 1 to 200 workers in one transaction (all or
     * nothing). Each result carries the token, shown once.
     */
    bulkIssueBadges(workerIds: string[]): ResultAsync<BulkIssueFieldBadgesResult, SdkError>;
    /**
     * Mint a single-use code a console admin redeems at the platform's field
     * sign-in to start an impersonated session as the worker.
     */
    createSignInCode(id: string, appCode: string): ResultAsync<FieldSignInCode, SdkError>;
    /** Sign-in attempts, newest first. */
    signIns(id: string, page?: FieldWorkerSignInPage): ResultAsync<FieldWorkerSignInListResponse, SdkError>;
}
//# sourceMappingURL=field-workers.d.ts.map