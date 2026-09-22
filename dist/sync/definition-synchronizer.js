/**
 * DefinitionSynchronizer — orchestrates syncing a `DefinitionSet` to the
 * platform's application-scoped sync API (`/api/applications/{app}/*\/sync`).
 *
 * One orchestrator per `FlowCatalystClient`; auth/retry/errors are delegated
 * to the client's shared request pipeline.
 */
import { err, ok, okAsync, ResultAsync } from "neverthrow";
import { partialFailureError } from "../errors.js";
import { permissionToString } from "./definitions.js";
import { isSynced, SKIPPED } from "./result.js";
/** Sentinel grouping key for the global (client-less) scope. */
const GLOBAL_SCOPE = "";
/** Human-readable label for a sync scope, used in local error messages. */
function scopeLabel(applicationCode, clientId) {
    return clientId
        ? `application "${applicationCode}", client "${clientId}"`
        : `application "${applicationCode}"`;
}
/**
 * Values that appear more than once in `values` — a configuration error when
 * it happens (two definitions colliding in the same sync scope), most often
 * surfacing after `syncGrouped()` merges two otherwise individually-valid
 * sets for the same application (or application + client) into one call.
 * Blank values are ignored — already invalid on their own terms, reported
 * elsewhere.
 */
function findDuplicateValues(values) {
    const counts = new Map();
    for (const v of values) {
        if (v === "")
            continue;
        counts.set(v, (counts.get(v) ?? 0) + 1);
    }
    return [...counts.entries()].filter(([, count]) => count > 1).map(([v]) => v);
}
/**
 * Resolve the effective client (identifier slug) a row belongs to: the row's
 * own `client` wins; otherwise the whole set's client applies — so a
 * multi-tenant set's rows don't each need to repeat it. Returns
 * `GLOBAL_SCOPE` (not undefined) for the global group, so it can double as a
 * grouping key.
 */
function effectiveClient(row, setClient) {
    if (row.client && row.client !== "")
        return row.client;
    return setClient ?? GLOBAL_SCOPE;
}
/**
 * Group connection/subscription rows by their effective client (see
 * {@link effectiveClient}). The platform's sync endpoints accept one
 * `clientId` per call, so each distinct client (including the global scope)
 * becomes its own request. Map insertion order preserves first-appearance
 * order, which callers rely on for the global-first ordering below.
 */
function groupByClient(rows, setClient) {
    const groups = new Map();
    for (const row of rows) {
        const key = effectiveClient(row, setClient);
        const list = groups.get(key);
        if (list) {
            list.push(row);
        }
        else {
            groups.set(key, [row]);
        }
    }
    return groups;
}
/**
 * The delivery URL for one subscription row, or undefined when it cannot be
 * determined. An absolute target (anything with a URL scheme) is used
 * verbatim; a path is joined onto `baseUrl`.
 */
function resolveSubscriptionTarget(rawTarget, baseUrl) {
    const target = (rawTarget ?? "").trim();
    if (target === "")
        return undefined;
    if (/^[a-z][a-z0-9+.-]*:\/\//i.test(target))
        return target;
    if (!baseUrl || baseUrl.trim() === "")
        return undefined;
    return `${baseUrl.trim().replace(/\/+$/, "")}/${target.replace(/^\/+/, "")}`;
}
/**
 * Stamp `row` with its effective client (its own, else the owning set's) so
 * it keeps resolving to the right platform call once the combined set's own
 * `client` is cleared by {@link mergeDefinitionSets}.
 */
function stampClient(row, setClient) {
    return { ...row, client: effectiveClient(row, setClient) || undefined };
}
/**
 * Drop empty arrays back to `undefined` so a merged set's per-category
 * `!set.xxx` skip checks behave exactly as they do for a hand-built set — an
 * always-present-but-empty array would otherwise still trigger a category
 * sync (and, under `removeUnlisted`, delete everything of that category).
 */
function pruneEmptyCategories(set) {
    const pruned = { applicationCode: set.applicationCode };
    if (set.roles && set.roles.length > 0)
        pruned.roles = set.roles;
    if (set.permissions && set.permissions.length > 0)
        pruned.permissions = set.permissions;
    if (set.eventTypes && set.eventTypes.length > 0)
        pruned.eventTypes = set.eventTypes;
    if (set.connections && set.connections.length > 0)
        pruned.connections = set.connections;
    if (set.subscriptions && set.subscriptions.length > 0)
        pruned.subscriptions = set.subscriptions;
    if (set.dispatchPools && set.dispatchPools.length > 0)
        pruned.dispatchPools = set.dispatchPools;
    if (set.principals && set.principals.length > 0)
        pruned.principals = set.principals;
    if (set.processes && set.processes.length > 0)
        pruned.processes = set.processes;
    if (set.scheduledJobs && set.scheduledJobs.length > 0)
        pruned.scheduledJobs = set.scheduledJobs;
    if (set.openapiSpec !== undefined)
        pruned.openapiSpec = set.openapiSpec;
    return pruned;
}
/**
 * Merge several `DefinitionSet`s for the SAME application into one combined
 * set. See `DefinitionSynchronizer.syncGrouped` for why this must happen
 * before syncing rather than syncing each set separately.
 *
 * - Roles, permissions, event types, dispatch pools, principals and
 *   processes have no per-row client — they're simply concatenated.
 * - Connections and subscriptions ARE client-scoped per row: before
 *   concatenating, each row is stamped with its EFFECTIVE client (its own
 *   `client`, else the OWNING set's client) so the merged rows keep
 *   resolving to the right platform call once the combined set's own
 *   `client` is cleared below. Subscription rows are additionally stamped
 *   with the owning set's `targetBaseUrl` under the internal
 *   `_targetBaseUrl` key so a per-set base URL survives the merge for
 *   target resolution.
 * - Scheduled jobs are concatenated as-is, without stamping a set's client
 *   onto a job row that lacks one — `clientId` on a scheduled job is a
 *   deliberately independent, explicit-only axis, and merging must not
 *   introduce a default that plain `sync()` never applied.
 * - The combined set's own `client`/`targetBaseUrl` are always cleared:
 *   every row now carries what it needs, and leaving the set-level ones set
 *   would double-apply — or wrongly override — a row's own scope.
 * - Duplicate codes ending up in the same (application, client) scope after
 *   merging is a configuration error the SYNCHRONIZER catches (per type,
 *   per scope) while syncing — not this function.
 *
 * Sets are processed global-first (stable — preserves the relative order of
 * the rest), so a client-scoped row's `client` fallback ordering matches
 * what `sync()` would already do for a single, hand-built multi-client set.
 */
function mergeDefinitionSets(sets) {
    const [first, ...restSets] = [...sets].sort((a, b) => (a.client ? 1 : 0) - (b.client ? 1 : 0));
    if (!first) {
        throw new Error("mergeDefinitionSets requires at least one DefinitionSet");
    }
    const ordered = [first, ...restSets];
    const applicationCode = first.applicationCode;
    const roles = [];
    const permissions = [];
    const eventTypes = [];
    const connections = [];
    const subscriptions = [];
    const dispatchPools = [];
    const principals = [];
    const processes = [];
    const scheduledJobs = [];
    let openapiSpec;
    for (const set of ordered) {
        roles.push(...(set.roles ?? []));
        permissions.push(...(set.permissions ?? []));
        eventTypes.push(...(set.eventTypes ?? []));
        dispatchPools.push(...(set.dispatchPools ?? []));
        principals.push(...(set.principals ?? []));
        processes.push(...(set.processes ?? []));
        scheduledJobs.push(...(set.scheduledJobs ?? []));
        for (const connection of set.connections ?? []) {
            connections.push(stampClient(connection, set.client));
        }
        for (const subscription of (set.subscriptions ?? [])) {
            const stamped = stampClient(subscription, set.client);
            subscriptions.push({
                ...stamped,
                _targetBaseUrl: stamped._targetBaseUrl ?? set.targetBaseUrl,
            });
        }
        // Only one OpenAPI document makes sense per application — keep
        // whichever set attaches one first (arbitrary, but deterministic).
        if (openapiSpec === undefined && set.openapiSpec !== undefined) {
            openapiSpec = set.openapiSpec;
        }
    }
    return pruneEmptyCategories({
        applicationCode,
        roles,
        permissions,
        eventTypes,
        connections,
        subscriptions,
        dispatchPools,
        principals,
        processes,
        scheduledJobs,
        openapiSpec,
    });
}
/**
 * Every category key on `SyncResult` that holds a `MaybeCategoryResult` (i.e.
 * everything except `applicationCode`) — used to scan a finished sync for
 * embedded per-category failures without hand-listing them at each call
 * site.
 */
const SYNC_RESULT_CATEGORY_KEYS = [
    "roles",
    "eventTypes",
    "connections",
    "subscriptions",
    "dispatchPools",
    "principals",
    "processes",
    "scheduledJobs",
    "openapi",
];
/**
 * `"<category>: <error text>"` for every category of `result` that carries
 * an embedded `error` (a local configuration failure, a skipped-scope
 * notice, or an HTTP failure caught per scope — see
 * `syncConnectionsAndSubscriptions` and the `duplicateCategoryError` guards).
 * Empty when the sync was a clean, unqualified success.
 */
function collectCategoryFailures(result) {
    const failures = [];
    for (const key of SYNC_RESULT_CATEGORY_KEYS) {
        const category = result[key];
        if (isSynced(category) && category.error) {
            failures.push(`${key}: ${category.error}`);
        }
    }
    return failures;
}
/**
 * Sync FlowCatalyst definitions to the platform.
 *
 * Construct via `client.definitions()`; the orchestrator reuses the
 * client's auth, retry, and error handling.
 */
export class DefinitionSynchronizer {
    constructor(client, options = {}) {
        this.client = client;
        this.subscriptionTargetBaseUrl = options.subscriptionTargetBaseUrl;
    }
    /**
     * Sync one application's definitions.
     *
     * Categories are sync'd in a fixed order — roles, event types,
     * connections, subscriptions, dispatch pools, principals — so that
     * subscriptions can reference the connections, event types and dispatch
     * pools that were just created. Each category sync is an independent
     * HTTP call; a failure in one does NOT roll back earlier successes.
     *
     * Connections and subscriptions are additionally grouped by their
     * effective client (a row's own `client`, else the set's) into one
     * platform call per (application, client) scope — global first,
     * connections before subscriptions within each scope. A scope's local
     * configuration error (e.g. a duplicate code) or HTTP failure is
     * embedded in that category's `error` rather than aborting sibling
     * scopes or categories: a connection-sync failure for one scope skips
     * only that scope's subscription sync (its `connectionCode`s cannot
     * resolve), recorded as an error there.
     *
     * `sync()` never merges: called with a set whose connections/subscriptions
     * mix several clients, each client's rows still land in separate calls —
     * but calling `sync()` (or `syncAll()`) TWICE for the same application
     * scope is two separate calls, and the second deletes what the first
     * just created under `removeUnlisted`. Use `syncGrouped()` when more than
     * one `DefinitionSet` can target the same application.
     *
     * Resolves `Err` if ANY category ended up carrying an `error` — a local
     * configuration failure (duplicate code), an unresolvable subscription
     * target, a skipped-scope notice, or an HTTP failure caught per scope —
     * even though every OTHER category/scope still ran. The full `SyncResult`
     * (successes included) is not discarded: it rides on the error as
     * `error.partial`, so a caller that only checks `isErr()` still fails
     * loud, and one that wants the partial picture can read it straight off
     * the error. A genuine transport/auth failure that happens before all
     * categories even got a chance to run (e.g. token refresh failing) is
     * still a plain `SdkError`, exactly as before.
     */
    sync(set, options = {}) {
        const removeUnlisted = options.removeUnlisted ?? false;
        const rolesStep = () => options.skipRoles || !set.roles
            ? okAsync(SKIPPED)
            : this.syncRoles(set.applicationCode, set.roles, removeUnlisted);
        const eventTypesStep = () => options.skipEventTypes || !set.eventTypes
            ? okAsync(SKIPPED)
            : this.syncEventTypes(set.applicationCode, set.eventTypes, removeUnlisted);
        const connectionsAndSubscriptionsStep = () => ResultAsync.fromSafePromise(this.syncConnectionsAndSubscriptions(set, options));
        const poolsStep = () => options.skipDispatchPools || !set.dispatchPools
            ? okAsync(SKIPPED)
            : this.syncDispatchPools(set.applicationCode, set.dispatchPools, removeUnlisted);
        const principalsStep = () => options.skipPrincipals || !set.principals
            ? okAsync(SKIPPED)
            : this.syncPrincipals(set.applicationCode, set.principals, removeUnlisted);
        const processesStep = () => options.skipProcesses || !set.processes
            ? okAsync(SKIPPED)
            : this.syncProcesses(set.applicationCode, set.processes, removeUnlisted);
        const scheduledJobsStep = () => options.skipScheduledJobs || !set.scheduledJobs
            ? okAsync(SKIPPED)
            : this.syncScheduledJobs(set.applicationCode, set.scheduledJobs, removeUnlisted);
        const openapiStep = () => options.skipOpenapi || set.openapiSpec === undefined
            ? okAsync(SKIPPED)
            : this.syncOpenapi(set.applicationCode, set.openapiSpec);
        return rolesStep()
            .andThen((roles) => eventTypesStep().map((eventTypes) => ({ roles, eventTypes })))
            .andThen((acc) => connectionsAndSubscriptionsStep().map(({ connections, subscriptions }) => ({
            ...acc,
            connections,
            subscriptions,
        })))
            .andThen((acc) => poolsStep().map((dispatchPools) => ({ ...acc, dispatchPools })))
            .andThen((acc) => principalsStep().map((principals) => ({ ...acc, principals })))
            .andThen((acc) => processesStep().map((processes) => ({ ...acc, processes })))
            .andThen((acc) => scheduledJobsStep().map((scheduledJobs) => ({ ...acc, scheduledJobs })))
            .andThen((acc) => openapiStep().andThen((openapi) => this.finalizeSyncResult({
            applicationCode: set.applicationCode,
            ...acc,
            openapi,
        })));
    }
    /**
     * The last step of `sync()`: turn a clean `SyncResult` into `Ok`, or a
     * `SyncResult` with any embedded category `error` into `Err` — carrying
     * the full result as `error.partial` so nothing successful is lost. Pure
     * success (no category has an `error`) is untouched: same `SyncResult`
     * object, wrapped in `Ok`, as before this check existed.
     */
    finalizeSyncResult(syncResult) {
        const failures = collectCategoryFailures(syncResult);
        if (failures.length === 0)
            return ok(syncResult);
        return err(partialFailureError(`Definition sync for application "${syncResult.applicationCode}" had failures — ${failures.join("; ")}`, syncResult));
    }
    /**
     * Sync multiple applications' definitions. Each set is sync'd
     * sequentially; results are returned in the same order as `sets`.
     *
     * Two different failure kinds behave differently, matching this method's
     * behaviour from before `sync()` could embed a partial failure:
     *   - a genuine `SdkError` (auth, network, an early category's HTTP
     *     failure that aborted the rest of that one set's `sync()`) still
     *     **stops at the first failing set**, exactly as always — earlier
     *     successes are lost from the return value (though already
     *     committed on the platform), same as a plain `sync()` call;
     *   - a `DefinitionSyncError` (some category/scope inside an otherwise-
     *     completed `sync()` failed) does NOT stop the loop: every remaining
     *     set is still synced. If any set produced one, `syncAll` resolves
     *     `Err` at the END, carrying every set's result (successful ones as
     *     returned, failed ones as their `error.partial`) as `error.partial`.
     */
    syncAll(sets, options = {}) {
        return ResultAsync.fromSafePromise(this.runSetsToCompletion(sets, options)).andThen((result) => result);
    }
    /**
     * Drives `syncAll`'s run-to-completion loop (see its docs for the two
     * failure kinds). Never rejects: every branch resolves to a `Result`,
     * which `syncAll` flattens back onto its own `ResultAsync`.
     */
    async runSetsToCompletion(sets, options) {
        const results = [];
        const failedApplicationCodes = [];
        for (const set of sets) {
            const outcome = await this.sync(set, options);
            if (outcome.isOk()) {
                results.push(outcome.value);
                continue;
            }
            if (outcome.error.type !== "partial_failure") {
                // A hard failure — preserve syncAll's original
                // stop-at-first-failure behaviour for this failure kind.
                return err(outcome.error);
            }
            results.push(outcome.error.partial);
            failedApplicationCodes.push(outcome.error.partial.applicationCode);
        }
        if (failedApplicationCodes.length > 0) {
            return err(partialFailureError(`Definition sync had category/scope failures for application(s): ${failedApplicationCodes.join(", ")}. See each result's category "error" fields for details.`, results));
        }
        return ok(results);
    }
    /**
     * Sync multiple definition sets, grouping by application code and
     * MERGING every set that shares one into a single combined set — then
     * calling `sync()` exactly ONCE per application.
     *
     * This is not an optimisation: the platform scopes `removeUnlisted` to
     * one (application, client) PER CALL, so two sets for the same
     * application (e.g. the global set plus a multi-tenant per-client set,
     * or two sets each yielding rows for the same client) must never become
     * two separate calls for that scope — the second would delete what the
     * first just created. Merging stamps each connection/subscription row
     * with its effective client so the existing per-row grouping in
     * `sync()` still issues one call per (application, client) scope —
     * global first — no matter how many original sets a client's rows came
     * from.
     *
     * `sync()`/`syncAll()` keep their existing single-set behaviour and do
     * NOT merge: calling them yourself with two sets for the same scope lets
     * the second call delete what the first just created. Use
     * `syncGrouped()` whenever more than one `DefinitionSet` can target an
     * application — most commonly a multi-tenant application's per-tenant
     * sets.
     *
     * Every application is synced to completion before this resolves — one
     * application having a failed category/scope does NOT stop the rest from
     * being synced (see `syncAll`'s docs for the one failure kind that still
     * stops early: a genuine `SdkError` from a set whose `sync()` aborted
     * before finishing). If any application ended up with a category/scope
     * failure, this resolves `Err` carrying every application's `SyncResult`
     * (successful ones as returned, failed ones as their own
     * `error.partial`) as `error.partial` — nothing successful is discarded.
     *
     * @returns One `SyncResult` per application code that appeared in `sets`.
     */
    syncGrouped(sets, options = {}) {
        const byApplication = new Map();
        for (const set of sets) {
            const list = byApplication.get(set.applicationCode);
            if (list) {
                list.push(set);
            }
            else {
                byApplication.set(set.applicationCode, [set]);
            }
        }
        return ResultAsync.fromSafePromise(this.runGroupsToCompletion(byApplication, options)).andThen((result) => result);
    }
    /**
     * Drives `syncGrouped`'s run-to-completion loop (see its docs). Never
     * rejects: every branch resolves to a `Result`, which `syncGrouped`
     * flattens back onto its own `ResultAsync`.
     */
    async runGroupsToCompletion(byApplication, options) {
        const results = {};
        const failedApplicationCodes = [];
        for (const [applicationCode, applicationSets] of byApplication) {
            const outcome = await this.sync(mergeDefinitionSets(applicationSets), options);
            if (outcome.isOk()) {
                results[applicationCode] = outcome.value;
                continue;
            }
            if (outcome.error.type !== "partial_failure") {
                // A hard failure — preserve the run's stop-at-first-failure
                // behaviour for this failure kind (mirrors syncAll).
                return err(outcome.error);
            }
            results[applicationCode] = outcome.error.partial;
            failedApplicationCodes.push(applicationCode);
        }
        if (failedApplicationCodes.length > 0) {
            return err(partialFailureError(`Definition sync had category/scope failures for application(s): ${failedApplicationCodes.join(", ")}. See each result's category "error" fields for details.`, results));
        }
        return ok(results);
    }
    // ── per-category callers ──────────────────────────────────────────
    syncRoles(applicationCode, roles, removeUnlisted) {
        // Resolve any PermissionInput factories to strings (idempotent on
        // strings), so a set posted without build() still sends the wire shape.
        const resolved = roles.map((role) => role.permissions
            ? {
                ...role,
                permissions: role.permissions.map((p) => permissionToString(p, applicationCode)),
            }
            : role);
        // Two sets for the same application (e.g. after syncGrouped() merges
        // them) defining the same role name is a configuration error, not
        // something to silently resolve by keeping whichever happened last —
        // fail locally, naming the names, without touching the platform.
        const duplicateResult = this.duplicateCategoryError(applicationCode, undefined, "role name", resolved.map((r) => r.name));
        if (duplicateResult)
            return okAsync(duplicateResult);
        return this.post(applicationCode, "roles", { roles: resolved }, removeUnlisted);
    }
    syncEventTypes(applicationCode, eventTypes, removeUnlisted) {
        const duplicateResult = this.duplicateCategoryError(applicationCode, undefined, "event type code", eventTypes.map((e) => e.code));
        if (duplicateResult)
            return okAsync(duplicateResult);
        return this.post(applicationCode, "event-types", { eventTypes }, removeUnlisted);
    }
    syncDispatchPools(applicationCode, pools, removeUnlisted) {
        const duplicateResult = this.duplicateCategoryError(applicationCode, undefined, "dispatch pool code", pools.map((p) => p.code));
        if (duplicateResult)
            return okAsync(duplicateResult);
        return this.post(applicationCode, "dispatch-pools", { pools }, removeUnlisted);
    }
    syncPrincipals(applicationCode, principals, removeUnlisted) {
        return this.post(applicationCode, "principals", { principals }, removeUnlisted);
    }
    syncProcesses(applicationCode, processes, removeUnlisted) {
        const duplicateResult = this.duplicateCategoryError(applicationCode, undefined, "process code", processes.map((p) => p.code));
        if (duplicateResult)
            return okAsync(duplicateResult);
        return this.post(applicationCode, "processes", { processes }, removeUnlisted);
    }
    syncScheduledJobs(applicationCode, jobs, removeUnlisted) {
        // Scheduled-jobs sync is the one endpoint that uses `archiveUnlisted`
        // in the body rather than `removeUnlisted` as a query param, and takes
        // one `clientId` per call rather than per job. Group jobs by their
        // resolved clientId and issue one request per distinct group (almost
        // always just one) — `clientId` must NOT ride along inside each job
        // object, since the API rejects unknown per-job fields.
        const groups = new Map();
        for (const job of jobs) {
            const key = job.clientId ?? "";
            const list = groups.get(key);
            if (list) {
                list.push(job);
            }
            else {
                groups.set(key, [job]);
            }
        }
        const requests = [...groups.entries()].map(([clientId, groupJobs]) => {
            const wireJobs = groupJobs.map(({ clientId: _clientId, ...rest }) => rest);
            return this.client.request((httpClient, headers) => httpClient.post({
                url: `/api/applications/${applicationCode}/scheduled-jobs/sync`,
                headers: { ...headers, "Content-Type": "application/json" },
                body: {
                    ...(clientId !== "" ? { clientId } : {}),
                    jobs: wireJobs,
                    archiveUnlisted: removeUnlisted,
                },
            }));
        });
        return ResultAsync.combine(requests).map((results) => {
            const merged = {
                applicationCode,
                created: 0,
                updated: 0,
                deleted: 0,
                syncedCodes: [],
            };
            for (const r of results) {
                merged.created += r.created.length;
                merged.updated += r.updated.length;
                merged.deleted += r.archived.length;
                merged.syncedCodes.push(...r.created, ...r.updated);
            }
            return merged;
        });
    }
    syncOpenapi(applicationCode, spec) {
        // OpenAPI sync is one-shot — body is `{ spec }`, not a list.
        // The platform's response has a different shape; we normalise to
        // CategorySyncResult so callers can iterate uniformly.
        return this.client
            .request((httpClient, headers) => httpClient.post({
            url: `/api/applications/${applicationCode}/openapi/sync`,
            headers: { ...headers, "Content-Type": "application/json" },
            body: { spec },
        }))
            .map((r) => {
            const created = r.unchanged || r.archivedPriorVersion ? 0 : 1;
            const updated = r.archivedPriorVersion ? 1 : 0;
            return {
                applicationCode: r.applicationCode,
                created,
                updated,
                deleted: 0,
                syncedCodes: [r.version],
            };
        });
    }
    // ── connections + subscriptions ──────────────────────────────────
    /**
     * Sync connections, then subscriptions, for one definition set — grouped
     * by effective client (one platform call per distinct client per
     * resource; see {@link groupByClient}).
     *
     * Ordering, per the platform's ownership model:
     *   - the global scope is processed before any client scope, because a
     *     client-scoped subscription may reference a global connection;
     *   - within EACH scope, connections are synced before subscriptions,
     *     because a subscription's `connectionCode` must resolve in the
     *     same run;
     *   - if a scope's connection sync fails (a local duplicate-code error,
     *     or the HTTP call itself), that scope's subscriptions are skipped
     *     entirely — their connection codes may not resolve — recorded as
     *     an error rather than sent as a request that would 404.
     *
     * Always resolves (never rejects): a scope's failure is embedded in the
     * relevant category's `error` so sibling scopes — and the rest of
     * `sync()`'s categories — still proceed.
     */
    async syncConnectionsAndSubscriptions(set, options) {
        const removeUnlisted = options.removeUnlisted ?? false;
        const doConnections = !options.skipConnections && !!set.connections;
        const doSubscriptions = !options.skipSubscriptions && !!set.subscriptions;
        if (!doConnections && !doSubscriptions) {
            return { connections: SKIPPED, subscriptions: SKIPPED };
        }
        const connectionGroups = doConnections
            ? groupByClient(set.connections, set.client)
            : new Map();
        const subscriptionGroups = doSubscriptions
            ? groupByClient(set.subscriptions, set.client)
            : new Map();
        // Global scope first; the rest keep the order they first appeared in
        // (Map iteration order is insertion order, and Array#sort is stable).
        const scopeKeys = [
            ...new Set([...connectionGroups.keys(), ...subscriptionGroups.keys()]),
        ].sort((a, b) => (a === GLOBAL_SCOPE ? -1 : 0) - (b === GLOBAL_SCOPE ? -1 : 0));
        const connectionTotals = {
            created: 0,
            updated: 0,
            deleted: 0,
            syncedCodes: [],
            errors: [],
        };
        const subscriptionTotals = {
            created: 0,
            updated: 0,
            deleted: 0,
            syncedCodes: [],
            errors: [],
        };
        for (const key of scopeKeys) {
            const clientId = key === GLOBAL_SCOPE ? undefined : key;
            let connectionSyncFailed = false;
            const connectionRows = connectionGroups.get(key);
            if (connectionRows) {
                const duplicateResult = this.duplicateCategoryError(set.applicationCode, clientId, "connection code", connectionRows.map((r) => r.code));
                if (duplicateResult) {
                    connectionTotals.errors.push(duplicateResult.error);
                    connectionSyncFailed = true;
                }
                else {
                    const body = {
                        // `client` never rides inside an entry — it only
                        // selected which call this row belongs to.
                        connections: connectionRows.map((row) => ({
                            code: row.code,
                            name: row.name,
                            description: row.description,
                            externalId: row.externalId,
                        })),
                    };
                    if (clientId)
                        body["clientId"] = clientId;
                    const result = await this.post(set.applicationCode, "connections", body, removeUnlisted);
                    if (result.isOk()) {
                        connectionTotals.created += result.value.created;
                        connectionTotals.updated += result.value.updated;
                        connectionTotals.deleted += result.value.deleted;
                        connectionTotals.syncedCodes.push(...result.value.syncedCodes);
                    }
                    else {
                        connectionTotals.errors.push(result.error.message);
                        connectionSyncFailed = true;
                    }
                }
            }
            const subscriptionRows = subscriptionGroups.get(key);
            if (!subscriptionRows)
                continue;
            if (connectionSyncFailed) {
                subscriptionTotals.errors.push(`Skipped subscription sync for ${clientId ? `client "${clientId}"` : "the global scope"}: its connection sync failed first`);
                continue;
            }
            const duplicateResult = this.duplicateCategoryError(set.applicationCode, clientId, "subscription code", subscriptionRows.map((r) => r.code));
            if (duplicateResult) {
                subscriptionTotals.errors.push(duplicateResult.error);
                continue;
            }
            // Resolve every target BEFORE building the payload, and refuse
            // the whole scope if any is missing. Sending only the resolvable
            // ones is not an option: with removeUnlisted the omitted rows
            // would be deleted.
            const targets = [];
            const unresolved = [];
            subscriptionRows.forEach((row, i) => {
                const rowBaseUrl = row._targetBaseUrl ?? set.targetBaseUrl ?? this.subscriptionTargetBaseUrl;
                const target = resolveSubscriptionTarget(row.target, rowBaseUrl);
                if (target === undefined) {
                    unresolved.push(row.code || `#${i}`);
                }
                else {
                    targets[i] = target;
                }
            });
            if (unresolved.length > 0) {
                subscriptionTotals.errors.push(`No delivery target for subscription(s) for ${scopeLabel(set.applicationCode, clientId)}: ${unresolved.join(", ")}. \`target\` must be an absolute URL, or a path — which needs the DefinitionSet's targetBaseUrl (set via .forClient()) or the synchronizer's subscriptionTargetBaseUrl option to resolve against.`);
                continue;
            }
            const body = {
                // `client` never rides inside an entry; `sharedConnection` is
                // sent only when true; `_targetBaseUrl` never leaves this file.
                subscriptions: subscriptionRows.map((row, i) => ({
                    code: row.code,
                    name: row.name,
                    description: row.description,
                    target: targets[i],
                    connectionCode: row.connectionCode,
                    connectionId: row.connectionId,
                    ...(row.sharedConnection ? { sharedConnection: true } : {}),
                    eventTypes: row.eventTypes,
                    dispatchPoolCode: row.dispatchPoolCode,
                    mode: row.mode,
                    maxRetries: row.maxRetries,
                    timeoutSeconds: row.timeoutSeconds,
                    dataOnly: row.dataOnly,
                })),
            };
            if (clientId)
                body["clientId"] = clientId;
            const result = await this.post(set.applicationCode, "subscriptions", body, removeUnlisted);
            if (result.isOk()) {
                subscriptionTotals.created += result.value.created;
                subscriptionTotals.updated += result.value.updated;
                subscriptionTotals.deleted += result.value.deleted;
                subscriptionTotals.syncedCodes.push(...result.value.syncedCodes);
            }
            else {
                subscriptionTotals.errors.push(result.error.message);
            }
        }
        const connections = doConnections
            ? {
                applicationCode: set.applicationCode,
                created: connectionTotals.created,
                updated: connectionTotals.updated,
                deleted: connectionTotals.deleted,
                syncedCodes: connectionTotals.syncedCodes,
                ...(connectionTotals.errors.length > 0
                    ? { error: connectionTotals.errors.join("; ") }
                    : {}),
            }
            : SKIPPED;
        const subscriptions = doSubscriptions
            ? {
                applicationCode: set.applicationCode,
                created: subscriptionTotals.created,
                updated: subscriptionTotals.updated,
                deleted: subscriptionTotals.deleted,
                syncedCodes: subscriptionTotals.syncedCodes,
                ...(subscriptionTotals.errors.length > 0
                    ? { error: subscriptionTotals.errors.join("; ") }
                    : {}),
            }
            : SKIPPED;
        return { connections, subscriptions };
    }
    // ── shared helpers ────────────────────────────────────────────────
    /**
     * Local-only validation shared by every per-application category that
     * could receive the same code twice after `syncGrouped()` merges
     * multiple sets — a configuration error, not something to resolve by
     * keeping whichever happened last. Returns a ready-to-use
     * `CategorySyncResult` (zero counts, `error` naming the scope and the
     * codes) when duplicates are found, so the caller can skip the network
     * call entirely; undefined otherwise.
     */
    duplicateCategoryError(applicationCode, clientId, label, codes) {
        const duplicates = findDuplicateValues(codes);
        if (duplicates.length === 0)
            return undefined;
        return {
            applicationCode,
            created: 0,
            updated: 0,
            deleted: 0,
            syncedCodes: [],
            error: `Duplicate ${label}(s) for ${scopeLabel(applicationCode, clientId)}: ${duplicates.join(", ")}`,
        };
    }
    // ── transport ─────────────────────────────────────────────────────
    post(applicationCode, resource, body, removeUnlisted) {
        return this.client.request((httpClient, headers) => httpClient.post({
            url: `/api/applications/${applicationCode}/${resource}/sync`,
            headers: {
                ...headers,
                "Content-Type": "application/json",
            },
            body,
            query: { removeUnlisted },
        }));
    }
}
