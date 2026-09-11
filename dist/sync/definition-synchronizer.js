/**
 * DefinitionSynchronizer — orchestrates syncing a `DefinitionSet` to the
 * platform's application-scoped sync API (`/api/applications/{app}/*\/sync`).
 *
 * One orchestrator per `FlowCatalystClient`; auth/retry/errors are delegated
 * to the client's shared request pipeline.
 */
import { okAsync, ResultAsync } from "neverthrow";
import { permissionToString } from "./definitions.js";
import { SKIPPED } from "./result.js";
/**
 * Sync FlowCatalyst definitions to the platform.
 *
 * Construct via `client.definitions()`; the orchestrator reuses the
 * client's auth, retry, and error handling.
 */
export class DefinitionSynchronizer {
    constructor(client) {
        this.client = client;
    }
    /**
     * Sync one application's definitions.
     *
     * Categories are sync'd in a fixed order — roles, event types,
     * subscriptions, dispatch pools, principals — so that subscriptions
     * can reference the event types and dispatch pools that were just
     * created. Each category sync is an independent HTTP call; a failure
     * in one does NOT roll back earlier successes.
     */
    sync(set, options = {}) {
        const removeUnlisted = options.removeUnlisted ?? false;
        const rolesStep = () => options.skipRoles || !set.roles
            ? okAsync(SKIPPED)
            : this.syncRoles(set.applicationCode, set.roles, removeUnlisted);
        const eventTypesStep = () => options.skipEventTypes || !set.eventTypes
            ? okAsync(SKIPPED)
            : this.syncEventTypes(set.applicationCode, set.eventTypes, removeUnlisted);
        const subsStep = () => options.skipSubscriptions || !set.subscriptions
            ? okAsync(SKIPPED)
            : this.syncSubscriptions(set.applicationCode, set.subscriptions, removeUnlisted);
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
            .andThen((acc) => subsStep().map((subscriptions) => ({ ...acc, subscriptions })))
            .andThen((acc) => poolsStep().map((dispatchPools) => ({ ...acc, dispatchPools })))
            .andThen((acc) => principalsStep().map((principals) => ({ ...acc, principals })))
            .andThen((acc) => processesStep().map((processes) => ({ ...acc, processes })))
            .andThen((acc) => scheduledJobsStep().map((scheduledJobs) => ({ ...acc, scheduledJobs })))
            .andThen((acc) => openapiStep().map((openapi) => ({
            applicationCode: set.applicationCode,
            ...acc,
            openapi,
        })));
    }
    /**
     * Sync multiple applications' definitions. Each set is sync'd
     * sequentially; results are returned in the same order as `sets`.
     * A failure in one set short-circuits the rest.
     */
    syncAll(sets, options = {}) {
        return sets.reduce((chain, set) => chain.andThen((acc) => this.sync(set, options).map((result) => [...acc, result])), okAsync([]));
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
        return this.post(applicationCode, "roles", { roles: resolved }, removeUnlisted);
    }
    syncEventTypes(applicationCode, eventTypes, removeUnlisted) {
        return this.post(applicationCode, "event-types", { eventTypes }, removeUnlisted);
    }
    syncSubscriptions(applicationCode, subscriptions, removeUnlisted) {
        return this.post(applicationCode, "subscriptions", { subscriptions }, removeUnlisted);
    }
    syncDispatchPools(applicationCode, pools, removeUnlisted) {
        return this.post(applicationCode, "dispatch-pools", { pools }, removeUnlisted);
    }
    syncPrincipals(applicationCode, principals, removeUnlisted) {
        return this.post(applicationCode, "principals", { principals }, removeUnlisted);
    }
    syncProcesses(applicationCode, processes, removeUnlisted) {
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
