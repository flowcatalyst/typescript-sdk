/**
 * Router monitoring resource — talks to the message router (a separate
 * process from the platform) at `routerBaseUrl`.
 *
 * Designed for an external recovery / replay process that maintains its
 * own list of "messages that look stuck" and wants to confirm whether the
 * router is still actively processing each one before re-enqueueing.
 */
import { ResultAsync, errAsync, okAsync } from "neverthrow";
import { mapHttpStatusToError, httpError } from "../errors.js";
/**
 * Hard cap on batch size, mirrors the server-side limit. Larger arrays
 * will be rejected with HTTP 400 by the router.
 */
export const IN_PIPELINE_CHECK_BATCH_LIMIT = 5000;
export class RouterResource {
    constructor(client) {
        this.client = client;
    }
    routerUrl(path) {
        return `${this.client.getRouterBaseUrl()}${path}`;
    }
    /**
     * Check whether a single application message ID is currently held in
     * the router's in-pipeline map. O(1) on the server side. Always
     * returns 200 — `inPipeline=false` is a normal answer.
     *
     * Renamed from `isInPipeline` to `inPipeline` so the response field
     * (`inPipeline`) and method name line up.
     */
    inPipeline(messageId) {
        const url = this.routerUrl(`/monitoring/in-flight-messages/check?messageId=${encodeURIComponent(messageId)}`);
        return doFetchJson(url, { method: "GET" });
    }
    /**
     * Batch-check whether each given application message ID is currently
     * held in the router's in-pipeline map. Returns `messageId → bool`.
     * The server caps the batch at `IN_PIPELINE_CHECK_BATCH_LIMIT` ids;
     * split larger batches client-side before calling.
     *
     * Renamed from `areInPipeline`.
     */
    inPipelineBatch(messageIds) {
        const url = this.routerUrl("/monitoring/in-flight-messages/check-batch");
        return doFetchJson(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ messageIds }),
        });
    }
}
/** GET/POST helper that returns `ResultAsync<T, SdkError>`. */
function doFetchJson(url, init) {
    return ResultAsync.fromPromise(fetch(url, init), (e) => httpError.network(e instanceof Error ? e.message : "Network error", e instanceof Error ? e : undefined)).andThen((response) => ResultAsync.fromPromise(response.json(), (e) => httpError.network(e instanceof Error ? e.message : "Failed to parse response")).andThen((body) => response.ok
        ? okAsync(body)
        : errAsync(mapHttpStatusToError(response.status, body))));
}
