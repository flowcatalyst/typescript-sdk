/**
 * Ingestions Resource — definitions, versions, test connection and sets.
 *
 * Hand-typed (does not depend on generated OpenAPI types), like
 * `ScheduledJobsResource`. The runtime operations
 * (`/api/ingestion-runtime/v1/*`) are the runtime's own client and are
 * deliberately not here.
 *
 * Secrets in a definition are NAMES (a secret reference the runtime
 * resolves); nothing here ever carries a secret value.
 */
// ── Resource ────────────────────────────────────────────────────────────────
const PATH = "/api/ingestions";
const SETS_PATH = "/api/ingestion-sets";
const enc = encodeURIComponent;
export class IngestionsResource {
    constructor(client) {
        this.client = client;
    }
    list(filters = {}) {
        return this.json("GET", `${PATH}${qs({ ...filters })}`);
    }
    /**
     * Create an ingestion. Without the promote permission (or with
     * `live: false`) the first version is saved as a draft: `save.outcome` is
     * `DRAFT` and `save.awaitingPromote` is true.
     */
    create(req) {
        return this.json("POST", PATH, req);
    }
    get(id) {
        return this.json("GET", `${PATH}/${enc(id)}`);
    }
    /**
     * Save a new definition. With promote it is made live (`SAVED`); without,
     * it is a draft awaiting promote (`DRAFT`). A definition an existing
     * version already says is not saved again (`UNCHANGED`, `MADE_LIVE`,
     * `DRAFT_EXISTS`); `save` on the answer says which.
     */
    update(id, req) {
        return this.json("PUT", `${PATH}/${enc(id)}`, req);
    }
    delete(id) {
        return this.json("DELETE", `${PATH}/${enc(id)}`);
    }
    pause(id) {
        return this.json("POST", `${PATH}/${enc(id)}/pause`);
    }
    resume(id) {
        return this.json("POST", `${PATH}/${enc(id)}/resume`);
    }
    listVersions(id) {
        return this.json("GET", `${PATH}/${enc(id)}/versions`);
    }
    saveVersion(id, req) {
        return this.json("POST", `${PATH}/${enc(id)}/versions`, req);
    }
    makeVersionLive(id, version) {
        return this.json("POST", `${PATH}/${enc(id)}/versions/${enc(String(version))}/live`);
    }
    /** The definition file `fcdev ingest apply` reads back, as YAML text. */
    getDefinition(id) {
        return this.request("GET", `${PATH}/${enc(id)}/definition`, undefined, true);
    }
    listHistory(id, page = {}) {
        return this.json("GET", `${PATH}/${enc(id)}/history${qs({ ...page })}`);
    }
    /**
     * Failures, newest first. `{ category: "rejected", undismissed: true }`
     * lists the ingestion's open notices (what `notices` counts).
     */
    listFailures(id, filters = {}) {
        const { undismissed, ...rest } = filters;
        return this.json("GET", `${PATH}/${enc(id)}/failures${qs({ ...rest, undismissed: undismissed ? true : undefined })}`);
    }
    /** Dismiss a failure: a notice stops showing on the ingestion; it stays in the list. */
    dismissFailure(id, failureId) {
        return this.json("POST", `${PATH}/${enc(id)}/failures/${enc(failureId)}/dismiss`);
    }
    /**
     * The secret names the live definition binds and when each runtime last
     * fetched them. Names only, never values.
     */
    listSecrets(id) {
        return this.json("GET", `${PATH}/${enc(id)}/secrets`);
    }
    listSourceKinds() {
        return this.json("GET", "/api/ingestion-source-kinds");
    }
    /** Start a pull-based connection test (202); poll it with `getTest`. */
    testConnection(req) {
        return this.json("POST", "/api/ingestion-tests", req);
    }
    getTest(id) {
        return this.json("GET", `/api/ingestion-tests/${enc(id)}`);
    }
    // ── Sets ──
    listSets() {
        return this.json("GET", SETS_PATH);
    }
    /** Apply a set; `dryRun` reports the changes and writes nothing. */
    applySet(name, req, dryRun) {
        return this.json("PUT", `${SETS_PATH}/${enc(name)}${qs({ dryRun })}`, req);
    }
    listSetApplies(name) {
        return this.json("GET", `${SETS_PATH}/${enc(name)}/applies`);
    }
    getSetApply(name, applyId) {
        return this.json("GET", `${SETS_PATH}/${enc(name)}/applies/${enc(applyId)}`);
    }
    /** Apply an archived apply's items again as a new apply. */
    reapplySet(name, applyId, dryRun) {
        return this.json("POST", `${SETS_PATH}/${enc(name)}/applies/${enc(applyId)}/reapply${qs({ dryRun })}`);
    }
    /** End the set's ownership; changes nothing else. */
    releaseSet(name) {
        return this.json("POST", `${SETS_PATH}/${enc(name)}/release`);
    }
    // ── Internal: thin fetch wrapper that reuses the client's auth + retry. ──
    json(method, path, body) {
        return this.request(method, path, body, false);
    }
    request(method, path, body, text) {
        return this.client.request(async (_genClient, headers) => {
            const url = this.client.config.baseUrl + path;
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
            if (response.status === 204) {
                return { data: undefined, response };
            }
            const data = text ? await response.text() : await response.json();
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
