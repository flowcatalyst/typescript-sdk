/**
 * Definition types for syncing FlowCatalyst primitives to the platform.
 *
 * These types describe the shape of things an application declares about
 * itself: the roles it needs, the event types it publishes, the
 * subscriptions it consumes, the dispatch pools it expects, and the
 * principals it manages.
 *
 * You build a `DefinitionSet` (one per application) and pass it to
 * `client.definitions().sync(...)`. See `docs/syncing-definitions.md` for
 * a full walkthrough.
 */
/**
 * A structured permission — the 4-part `<application>:<context>:<aggregate>:<action>`
 * identity, defined once and linkable from any number of roles.
 *
 * `application` defaults to the application code of the `DefinitionSet` it's
 * resolved against, so you don't repeat it on every permission:
 *
 * ```ts
 * const ViewPosts = permission({ context: "posts", aggregate: "post", action: "view" });
 * const EditPosts = permission({ context: "posts", aggregate: "post", action: "edit" });
 *
 * defineApplication("blog")
 *   .withPermissions([ViewPosts, EditPosts])
 *   .withRoles([{ name: "editor", permissions: [ViewPosts, EditPosts] }]);
 * // → role "blog:editor" granting "blog:posts:post:view", "blog:posts:post:edit"
 * ```
 *
 * FlowCatalyst has no standalone "create permission" — permissions reach the
 * platform via the roles that grant them. The standalone catalogue is for
 * documentation/reuse on the client side.
 */
export interface PermissionInput {
    /** Application segment; defaults to the set's applicationCode when omitted */
    application?: string;
    context: string;
    aggregate: string;
    action: string;
    description?: string;
}
/** Factory: build a reusable {@link PermissionInput}. */
export declare function permission(input: PermissionInput): PermissionInput;
/**
 * Resolve a {@link PermissionInput} (or an already-formatted string) to its
 * full `application:context:aggregate:action` form, lower-cased.
 *
 * @throws when no application can be determined.
 */
export declare function permissionToString(input: PermissionInput | string, defaultApplication?: string): string;
/**
 * A role declaration.
 *
 * Names are stored with the application code prefix: given `name: "admin"`
 * under application `orders`, the role is persisted as `orders:admin`. Do
 * not include the prefix in `name` yourself — the platform adds it.
 *
 * Permissions may be 4-part strings `<domain>:<area>:<resource>:<action>`
 * (e.g. `orders:admin:shipment:cancel`) or {@link PermissionInput} factories
 * (whose `application` defaults to the set's applicationCode). Wildcards are
 * supported in any position. See `docs/syncing-definitions.md`.
 */
export interface RoleDefinition {
    /** Short name (no `<app>:` prefix — the platform adds it) */
    name: string;
    /** Human-readable label */
    displayName?: string;
    description?: string;
    /** Permission strings (4-part) and/or {@link PermissionInput} factories */
    permissions?: Array<string | PermissionInput>;
    /**
     * When true, client admins can assign this role to their own users.
     * When false, only platform admins can assign it.
     */
    clientManaged?: boolean;
}
/**
 * An event type declaration.
 *
 * `code` is the full 4-part identifier `<app>:<subdomain>:<aggregate>:<event>`.
 * The first segment MUST match the application code being synced.
 *
 * JSON Schema for the event payload is not sync'd via this endpoint — attach
 * schemas through the admin UI or the per-resource `eventTypes.addSchema(...)`
 * API. See `docs/syncing-definitions.md#event-types`.
 */
export interface EventTypeDefinition {
    /** Full code: `<app>:<subdomain>:<aggregate>:<event>` */
    code: string;
    /** Human-readable label */
    name: string;
    description?: string;
}
/**
 * A connection declaration.
 *
 * A connection carries nothing environment-specific — the platform assigns
 * the application's own provisioned service account itself, so one
 * definition serves every environment. It exists purely so a subscription's
 * `connectionCode` has something to resolve; connections are always synced
 * BEFORE subscriptions in the same run so that resolution succeeds without a
 * second sync.
 */
export interface ConnectionDefinition {
    /** Unique connection code — stable across environments; what a subscription's `connectionCode` names */
    code: string;
    name: string;
    description?: string;
    /** Your own system's identifier for this connection */
    externalId?: string;
    /**
     * FlowCatalyst client (identifier slug — never an id; ids differ per
     * environment) this connection is scoped to. Omit for a global
     * connection. For a multi-tenant application, prefer scoping the whole
     * `DefinitionSet` with `.forClient(...)` instead of repeating this on
     * every row.
     */
    client?: string;
}
/** How dispatch job failures interact with this subscription's delivery order. */
export type SubscriptionMode = "IMMEDIATE" | "BLOCK_ON_ERROR";
/** A single event-type binding inside a subscription. */
export interface SubscriptionEventTypeBinding {
    /** Full event type code (must exist at sync time) */
    eventTypeCode: string;
    /** Optional filter expression (matches platform conventions) */
    filter?: string;
}
/**
 * A subscription declaration.
 *
 * The subscription describes a downstream consumer: where to deliver
 * (`target` URL, plus an optional `connectionCode`), which event types trigger it,
 * and how to handle failures.
 */
export interface SubscriptionDefinition {
    /** Short code (unique within the application) */
    code: string;
    name: string;
    description?: string;
    /**
     * Where events are delivered. Either an absolute URL (sent verbatim), or
     * a path (e.g. `/webhooks/orders`) resolved at sync time against, in
     * order: the owning `DefinitionSet`'s `targetBaseUrl` (see
     * `.forClient()`), then the synchronizer's `subscriptionTargetBaseUrl`
     * option. There is no further fallback. A blank target, or a path with
     * no base available, fails that subscription's scope locally (naming
     * the subscription) rather than sending a partial list — under
     * `removeUnlisted` an omitted row would be deleted.
     */
    target: string;
    /**
     * Code of the connection that delivers this subscription. Names a
     * connection owned by THIS application, unless `sharedConnection` is
     * set. Prefer it over `connectionId`: an id is minted per environment, a
     * code is the same everywhere.
     */
    connectionCode?: string;
    /**
     * Connection id. Environment-specific — use `connectionCode` in anything
     * that is synced to more than one environment.
     */
    connectionId?: string;
    /**
     * When true, `connectionCode` names a SHARED (application-less)
     * connection rather than one owned by this application. There is no
     * fallback between the two namespaces — the wrong one 404s rather than
     * silently resolving to the other connection's credentials.
     */
    sharedConnection?: boolean;
    /** Event types this subscription consumes */
    eventTypes: SubscriptionEventTypeBinding[];
    /** Dispatch pool code; falls back to the platform default when omitted */
    dispatchPoolCode?: string;
    /** Delivery mode; default NEXT_ON_ERROR */
    mode?: SubscriptionMode;
    maxRetries?: number;
    timeoutSeconds?: number;
    /** When true, only the event's `data` field is POSTed (no metadata envelope) */
    dataOnly?: boolean;
    /**
     * FlowCatalyst client (identifier slug — never an id) this subscription
     * is scoped to. Omit for a global subscription. For a multi-tenant
     * application, prefer scoping the whole `DefinitionSet` with
     * `.forClient(...)` instead of repeating this on every row.
     */
    client?: string;
}
/**
 * A dispatch pool declaration.
 *
 * Pools control how the platform schedules outbound delivery — concurrency
 * cap and per-minute rate limit. Segregate workloads with different
 * latency profiles into different pools (see the adaptive-concurrency
 * design for why).
 */
export interface DispatchPoolDefinition {
    code: string;
    name: string;
    description?: string;
    /** Rate limit in requests per minute; default 100 */
    rateLimit?: number;
    /** Concurrency cap; default 10 */
    concurrency?: number;
}
/**
 * A principal (user) declaration.
 *
 * Matched by email. `roles` lists role short names WITHOUT the application
 * prefix (the platform adds `<app>:` per role). Principals sync'd this way
 * use the internal identity provider; principals provisioned via OIDC are
 * managed by their IdP's sync flow instead.
 */
export interface PrincipalDefinition {
    email: string;
    name: string;
    /** Role short names (no `<app>:` prefix) */
    roles?: string[];
    /** Default true */
    active?: boolean;
}
/**
 * A process documentation declaration.
 *
 * `code` is the full three-segment identifier `<app>:<subdomain>:<process>`,
 * matching event-type conventions. `body` carries the diagram source
 * verbatim — typically Mermaid; override `diagramType` if you publish a
 * different format.
 */
export interface ProcessDefinition {
    code: string;
    name: string;
    description?: string;
    /** Diagram body. Stored verbatim. */
    body?: string;
    /** Diagram language. Platform applies `mermaid` when omitted. */
    diagramType?: string;
    tags?: string[];
}
/**
 * A scheduled-job declaration.
 *
 * `crons` requires 6-field, seconds-first cron expressions (`sec min hour
 * dom month dow`) — a standard 5-field cron passes validation but never
 * fires. The platform's scheduler evaluates them in `timezone` (defaults
 * to UTC server-side).
 *
 * `concurrent: true` lets the platform fire a new tick while a previous
 * invocation is still running — most apps want false. Use the SDK's
 * `LockProvider` for in-app dedupe if you need single-fire semantics
 * across pods.
 *
 * `tracksCompletion: true` flips the platform from "webhook delivery is
 * the success signal" to "consumer POSTs back to
 * /api/scheduled-jobs/instances/{id}/complete when done", enabling
 * per-instance status tracking.
 *
 * `clientId` scopes the job to a client/tenant rather than the platform —
 * omit it only for platform-wide jobs (anchor-only).
 */
export interface ScheduledJobDefinition {
    code: string;
    name: string;
    description?: string;
    crons: string[];
    timezone?: string;
    payload?: unknown;
    concurrent?: boolean;
    tracksCompletion?: boolean;
    timeoutSeconds?: number;
    deliveryMaxAttempts?: number;
    /** Override the application's default callback URL for this job. */
    targetUrl?: string;
    /** Client/tenant that owns this job. Omit/null = platform-scoped (anchor only). */
    clientId?: string | null;
}
/** Container for all definitions belonging to one application. */
export interface DefinitionSet {
    applicationCode: string;
    roles?: RoleDefinition[];
    /**
     * Standalone permission catalogue. Not pushed to the platform directly
     * (permissions ride up via the roles that grant them); declared for reuse
     * and documentation. `application` defaults to `applicationCode`.
     */
    permissions?: PermissionInput[];
    eventTypes?: EventTypeDefinition[];
    /** Synced BEFORE subscriptions, so a subscription's `connectionCode` resolves in the same run. */
    connections?: ConnectionDefinition[];
    subscriptions?: SubscriptionDefinition[];
    dispatchPools?: DispatchPoolDefinition[];
    principals?: PrincipalDefinition[];
    processes?: ProcessDefinition[];
    scheduledJobs?: ScheduledJobDefinition[];
    /**
     * OpenAPI document (OpenAPI 3.x or Swagger 2.x) for this application,
     * as parsed JSON. Optional — only include if you want the platform to
     * track your REST surface in its catalogue. Each sync replaces the
     * previously published version.
     */
    openapiSpec?: unknown;
    /**
     * The FlowCatalyst client (identifier slug — never an id) this whole set
     * is scoped to. Undefined = global (the default). Set via `.forClient()`
     * for a multi-tenant application's per-client set; a connection or
     * subscription row's own `client` wins over this.
     */
    client?: string;
    /**
     * Overrides the base URL a subscription's path-style target resolves
     * against, for THIS set only — a client-scoped set often has its own
     * host. Undefined falls back to the synchronizer's
     * `subscriptionTargetBaseUrl` option.
     */
    targetBaseUrl?: string;
}
/**
 * Fluent builder for `DefinitionSet`. Mirrors the Laravel SDK's
 * `SyncDefinitionSet` shape so definitions can be described the same way
 * across languages.
 *
 * Example:
 * ```ts
 * const set = defineApplication("orders")
 *   .withRoles([{ name: "admin", displayName: "Administrator" }])
 *   .withEventTypes([
 *     { code: "orders:fulfillment:shipment:shipped", name: "Shipment Shipped" },
 *   ])
 *   .build();
 * ```
 */
export declare class DefinitionSetBuilder {
    private readonly set;
    constructor(applicationCode: string);
    withRoles(roles: RoleDefinition[]): this;
    /**
     * Declare standalone permissions (reusable across roles). Their
     * `application` defaults to this set's applicationCode at build time.
     */
    withPermissions(permissions: PermissionInput[]): this;
    withEventTypes(eventTypes: EventTypeDefinition[]): this;
    /**
     * Add connections to the set. Synced BEFORE subscriptions — a
     * subscription's `connectionCode` must resolve in the same run.
     */
    withConnections(connections: ConnectionDefinition[]): this;
    withSubscriptions(subscriptions: SubscriptionDefinition[]): this;
    /**
     * Scope this whole set to one FlowCatalyst client (identifier slug —
     * never an id, ids differ per environment). Every connection/subscription
     * added to this set that doesn't set its own `client` inherits this one.
     * The optional `targetBaseUrl` overrides the base URL a path-style
     * subscription target resolves against, for this set only — client-scoped
     * sets often have their own host.
     *
     * For a multi-tenant application (one codebase, many clients), build one
     * set per (application, client): `defineApplication(...)` alone for the
     * global set, `.forClient(...)` for each tenant. Sync every set together
     * with `DefinitionSynchronizer.syncGrouped()` so the platform sees
     * exactly one call per (application, client) scope, global first —
     * `sync()`/`syncAll()` do NOT merge multiple sets for the same
     * application, and calling them yourself with two sets for one scope
     * lets the second call delete what the first just created.
     */
    forClient(client: string, targetBaseUrl?: string): this;
    withDispatchPools(pools: DispatchPoolDefinition[]): this;
    withPrincipals(principals: PrincipalDefinition[]): this;
    withProcesses(processes: ProcessDefinition[]): this;
    withScheduledJobs(jobs: ScheduledJobDefinition[]): this;
    /**
     * Attach an OpenAPI document (parsed JSON) to be published alongside
     * the rest of the application's definitions on next sync.
     */
    withOpenapiSpec(spec: unknown): this;
    build(): DefinitionSet;
}
/** Convenience: start building definitions for `applicationCode`. */
export declare function defineApplication(applicationCode: string): DefinitionSetBuilder;
/** Environment variable read by {@link defineApplicationFromEnv}. */
export declare const APP_CODE_ENV = "FLOWCATALYST_APP_CODE";
/**
 * Start building definitions for the application named by
 * `FLOWCATALYST_APP_CODE`, for apps that carry their code in the environment
 * rather than in source.
 *
 * Throws when the variable is unset or empty — a missing application code
 * would otherwise surface much later as a request to
 * `/api/applications/undefined/…`.
 *
 * A codebase that owns several applications should call
 * {@link defineApplication} once per application and pass the sets to
 * `syncMany` — the set a definition belongs to *is* its application.
 */
export declare function defineApplicationFromEnv(): DefinitionSetBuilder;
//# sourceMappingURL=definitions.d.ts.map