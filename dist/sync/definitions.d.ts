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
 * (`target` URL or `connectionId` reference), which event types trigger it,
 * and how to handle failures.
 */
export interface SubscriptionDefinition {
    /** Short code (unique within the application) */
    code: string;
    name: string;
    description?: string;
    /** Webhook URL where events are delivered */
    target: string;
    /** Pre-configured connection reference (alternative to `target`) */
    connectionId?: string;
    /** Event types this subscription consumes */
    eventTypes: SubscriptionEventTypeBinding[];
    /** Dispatch pool code; falls back to the platform default when omitted */
    dispatchPoolCode?: string;
    /** Delivery mode; default IMMEDIATE */
    mode?: SubscriptionMode;
    maxRetries?: number;
    timeoutSeconds?: number;
    /** When true, only the event's `data` field is POSTed (no metadata envelope) */
    dataOnly?: boolean;
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
    withSubscriptions(subscriptions: SubscriptionDefinition[]): this;
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
//# sourceMappingURL=definitions.d.ts.map