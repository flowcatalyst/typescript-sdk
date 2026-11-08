/**
 * Scheduled Jobs Resource — CRUD + state transitions + history reads.
 *
 * Hand-typed (does not depend on generated OpenAPI types) so it works
 * without regenerating the SDK after server-side endpoint changes. Mirrors
 * the shape of `EventTypesResource` for callers.
 *
 * SDK callbacks (`logForInstance`, `completeInstance`) live here too so
 * consumers don't need a second resource accessor.
 */
import { ResultAsync, errAsync, okAsync } from "neverthrow";
import { httpError, mapHttpStatusToError } from "../errors.js";
// ── Resource ────────────────────────────────────────────────────────────────
const PATH = "/api/scheduled-jobs";
export class ScheduledJobsResource {
    constructor(client) {
        this.client = client;
    }
    /** Create a new scheduled job. Returns the new job's id. */
    create(req) {
        return this.fetch("POST", PATH, req);
    }
    list(filters = {}) {
        return this.fetch("GET", `${PATH}${qs(filters)}`);
    }
    get(id) {
        return this.fetch("GET", `${PATH}/${encodeURIComponent(id)}`);
    }
    getByCode(code, clientId) {
        const q = clientId ? qs({ clientId }) : "";
        return this.fetch("GET", `${PATH}/by-code/${encodeURIComponent(code)}${q}`);
    }
    update(id, req) {
        return this.fetch("PUT", `${PATH}/${encodeURIComponent(id)}`, req);
    }
    pause(id) {
        return this.fetch("POST", `${PATH}/${encodeURIComponent(id)}/pause`);
    }
    resume(id) {
        return this.fetch("POST", `${PATH}/${encodeURIComponent(id)}/resume`);
    }
    archive(id) {
        return this.fetch("POST", `${PATH}/${encodeURIComponent(id)}/archive`);
    }
    delete(id) {
        return this.fetch("DELETE", `${PATH}/${encodeURIComponent(id)}`);
    }
    /** Manually fire a scheduled job. Returns the new instance's id. */
    fire(id, req = {}) {
        return this.fetch("POST", `${PATH}/${encodeURIComponent(id)}/fire`, req);
    }
    listInstances(jobId, filters = {}) {
        return this.fetch("GET", `${PATH}/${encodeURIComponent(jobId)}/instances${qs(filters)}`);
    }
    getInstance(instanceId) {
        return this.fetch("GET", `${PATH}/instances/${encodeURIComponent(instanceId)}`);
    }
    listInstanceLogs(instanceId) {
        return this.fetch("GET", `${PATH}/instances/${encodeURIComponent(instanceId)}/logs`);
    }
    // ── SDK callback paths (used by the runner; safe to call directly too) ──
    logForInstance(instanceId, req) {
        return this.fetch("POST", `${PATH}/instances/${encodeURIComponent(instanceId)}/log`, req);
    }
    completeInstance(instanceId, req) {
        return this.fetch("POST", `${PATH}/instances/${encodeURIComponent(instanceId)}/complete`, req);
    }
    // ── Internal: thin fetch wrapper that reuses the client's auth + retry. ──
    fetch(method, path, body) {
        // Reuse the client's `request()` retry/auth machinery by passing a
        // fn that ignores the generated `Client` arg and does its own fetch.
        return this.client.request(async (_genClient, headers) => {
            const url = this.client
                .config.baseUrl + path;
            const init = {
                method,
                headers: {
                    ...headers,
                    ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
                },
                body: body !== undefined ? JSON.stringify(body) : undefined,
            };
            const response = await fetch(url, init);
            if (!response.ok) {
                let errorBody = undefined;
                try {
                    errorBody = await response.json();
                }
                catch {
                    /* response had no JSON body */
                }
                return { error: errorBody, response };
            }
            // 204 No Content → resolve to undefined
            if (response.status === 204) {
                return { data: undefined, response };
            }
            const data = await response.json();
            return { data, response };
        });
    }
}
/** Build a `?key=value&...` querystring from a flat object. Skips nullish. */
function qs(obj) {
    const entries = Object.entries(obj).filter(([, v]) => v !== undefined && v !== null && v !== "");
    if (entries.length === 0)
        return "";
    const sp = new URLSearchParams();
    for (const [k, v] of entries)
        sp.append(k, String(v));
    return `?${sp.toString()}`;
}
// Export a tiny helper for users who want to build URL-aware error helpers.
export { mapHttpStatusToError, httpError, ResultAsync, errAsync, okAsync };
