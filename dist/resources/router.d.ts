/**
 * Router monitoring resource — talks to the message router (a separate
 * process from the platform) at `routerBaseUrl`.
 *
 * Designed for an external recovery / replay process that maintains its
 * own list of "messages that look stuck" and wants to confirm whether the
 * router is still actively processing each one before re-enqueueing.
 */
import { ResultAsync } from "neverthrow";
import type { SdkError } from "../errors";
import type { FlowCatalystClient } from "../client";
export interface InPipelineDetail {
    messageId: string;
    brokerMessageId: string | null;
    queueId: string;
    poolCode: string;
    elapsedTimeMs: number;
    addedToInPipelineAt: string;
}
export interface InPipelineCheckResponse {
    messageId: string;
    inPipeline: boolean;
    /** Populated only when `inPipeline === true`. */
    detail?: InPipelineDetail;
}
/** Map of `messageId → inPipeline` (true = router has it, do not resend). */
export type InPipelineBatchResponse = Record<string, boolean>;
/**
 * Hard cap on batch size, mirrors the server-side limit. Larger arrays
 * will be rejected with HTTP 400 by the router.
 */
export declare const IN_PIPELINE_CHECK_BATCH_LIMIT = 5000;
export declare class RouterResource {
    private readonly client;
    constructor(client: FlowCatalystClient);
    private routerUrl;
    /**
     * Check whether a single application message ID is currently held in
     * the router's in-pipeline map. O(1) on the server side. Always
     * returns 200 — `inPipeline=false` is a normal answer.
     *
     * Renamed from `isInPipeline` to `inPipeline` so the response field
     * (`inPipeline`) and method name line up.
     */
    inPipeline(messageId: string): ResultAsync<InPipelineCheckResponse, SdkError>;
    /**
     * Batch-check whether each given application message ID is currently
     * held in the router's in-pipeline map. Returns `messageId → bool`.
     * The server caps the batch at `IN_PIPELINE_CHECK_BATCH_LIMIT` ids;
     * split larger batches client-side before calling.
     *
     * Renamed from `areInPipeline`.
     */
    inPipelineBatch(messageIds: readonly string[]): ResultAsync<InPipelineBatchResponse, SdkError>;
}
//# sourceMappingURL=router.d.ts.map