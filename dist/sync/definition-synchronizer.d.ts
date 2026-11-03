/**
 * DefinitionSynchronizer — orchestrates syncing a `DefinitionSet` to the
 * platform's application-scoped sync API (`/api/applications/{app}/*\/sync`).
 *
 * One orchestrator per `FlowCatalystClient`; auth/retry/errors are delegated
 * to the client's shared request pipeline.
 */
import { ResultAsync } from "neverthrow";
import type { FlowCatalystClient } from "../client.js";
import type { PartialFailureError, SdkError } from "../errors.js";
import type { DefinitionSet } from "./definitions.js";
import type { SyncResult } from "./result.js";
/**
 * The error `DefinitionSynchronizer.sync()` produces when the call completed
 * but one or more categories/scopes failed — see {@link PartialFailureError}.
 * `syncAll()`/`syncGrouped()` widen `partial` to their own aggregate shape.
 */
export type DefinitionSyncError<T> = PartialFailureError<T>;
/** Options for a sync call. */
export interface SyncOptions {
    /**
     * When true, the platform removes SDK-sourced rows not present in the
     * submitted list (per category, per (application, client) scope for
     * connections/subscriptions). Rows created through the admin UI are
     * preserved regardless. Default: false.
     */
    removeUnlisted?: boolean;
    /**
     * Per-category opt-out. Omitting a category from the `DefinitionSet`
     * already skips it; these flags let you force-skip categories even if
     * they're present (e.g. to stage a rollout).
     */
    skipRoles?: boolean;
    skipEventTypes?: boolean;
    skipConnections?: boolean;
    skipSubscriptions?: boolean;
    skipDispatchPools?: boolean;
    skipPrincipals?: boolean;
    skipProcesses?: boolean;
    skipScheduledJobs?: boolean;
    /** When true, skip publishing the OpenAPI doc even if the set has one. */
    skipOpenapi?: boolean;
}
/** Options for constructing a {@link DefinitionSynchronizer}. */
export interface DefinitionSynchronizerOptions {
    /**
     * Base URL a subscription's path-style target (e.g. `/webhooks/orders`)
     * is resolved against, when neither the subscription's row nor its
     * `DefinitionSet` (via `.forClient(client, targetBaseUrl)`) provides one.
     * There is no further fallback — a path with nothing to resolve against
     * fails that subscription's scope locally.
     */
    subscriptionTargetBaseUrl?: string;
}
/**
 * Sync FlowCatalyst definitions to the platform.
 *
 * Construct via `client.definitions()`; the orchestrator reuses the
 * client's auth, retry, and error handling.
 */
export declare class DefinitionSynchronizer {
    private readonly client;
    private readonly subscriptionTargetBaseUrl;
    constructor(client: FlowCatalystClient, options?: DefinitionSynchronizerOptions);
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
    sync(set: DefinitionSet, options?: SyncOptions): ResultAsync<SyncResult, SdkError | DefinitionSyncError<SyncResult>>;
    /**
     * The last step of `sync()`: turn a clean `SyncResult` into `Ok`, or a
     * `SyncResult` with any embedded category `error` into `Err` — carrying
     * the full result as `error.partial` so nothing successful is lost. Pure
     * success (no category has an `error`) is untouched: same `SyncResult`
     * object, wrapped in `Ok`, as before this check existed.
     */
    private finalizeSyncResult;
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
    syncAll(sets: DefinitionSet[], options?: SyncOptions): ResultAsync<SyncResult[], SdkError | DefinitionSyncError<SyncResult[]>>;
    /**
     * Drives `syncAll`'s run-to-completion loop (see its docs for the two
     * failure kinds). Never rejects: every branch resolves to a `Result`,
     * which `syncAll` flattens back onto its own `ResultAsync`.
     */
    private runSetsToCompletion;
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
    syncGrouped(sets: Iterable<DefinitionSet>, options?: SyncOptions): ResultAsync<Record<string, SyncResult>, SdkError | DefinitionSyncError<Record<string, SyncResult>>>;
    /**
     * Drives `syncGrouped`'s run-to-completion loop (see its docs). Never
     * rejects: every branch resolves to a `Result`, which `syncGrouped`
     * flattens back onto its own `ResultAsync`.
     */
    private runGroupsToCompletion;
    private syncRoles;
    private syncEventTypes;
    private syncDispatchPools;
    private syncPrincipals;
    private syncProcesses;
    private syncScheduledJobs;
    private syncOpenapi;
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
    private syncConnectionsAndSubscriptions;
    /**
     * Local-only validation shared by every per-application category that
     * could receive the same code twice after `syncGrouped()` merges
     * multiple sets — a configuration error, not something to resolve by
     * keeping whichever happened last. Returns a ready-to-use
     * `CategorySyncResult` (zero counts, `error` naming the scope and the
     * codes) when duplicates are found, so the caller can skip the network
     * call entirely; undefined otherwise.
     */
    private duplicateCategoryError;
    private post;
}
//# sourceMappingURL=definition-synchronizer.d.ts.map