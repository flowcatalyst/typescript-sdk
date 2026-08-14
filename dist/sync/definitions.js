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
/** Factory: build a reusable {@link PermissionInput}. */
export function permission(input) {
    return input;
}
/**
 * Resolve a {@link PermissionInput} (or an already-formatted string) to its
 * full `application:context:aggregate:action` form, lower-cased.
 *
 * @throws when no application can be determined.
 */
export function permissionToString(input, defaultApplication) {
    if (typeof input === "string") {
        return input.toLowerCase();
    }
    const application = input.application ?? defaultApplication;
    if (!application) {
        throw new Error("permission requires an application: set `application` on the permission or build it against a DefinitionSet/application code.");
    }
    return `${application}:${input.context}:${input.aggregate}:${input.action}`.toLowerCase();
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
export class DefinitionSetBuilder {
    constructor(applicationCode) {
        this.set = { applicationCode };
    }
    withRoles(roles) {
        this.set.roles = [...(this.set.roles ?? []), ...roles];
        return this;
    }
    /**
     * Declare standalone permissions (reusable across roles). Their
     * `application` defaults to this set's applicationCode at build time.
     */
    withPermissions(permissions) {
        this.set.permissions = [...(this.set.permissions ?? []), ...permissions];
        return this;
    }
    withEventTypes(eventTypes) {
        this.set.eventTypes = [...(this.set.eventTypes ?? []), ...eventTypes];
        return this;
    }
    withSubscriptions(subscriptions) {
        this.set.subscriptions = [
            ...(this.set.subscriptions ?? []),
            ...subscriptions,
        ];
        return this;
    }
    withDispatchPools(pools) {
        this.set.dispatchPools = [...(this.set.dispatchPools ?? []), ...pools];
        return this;
    }
    withPrincipals(principals) {
        this.set.principals = [...(this.set.principals ?? []), ...principals];
        return this;
    }
    withProcesses(processes) {
        this.set.processes = [...(this.set.processes ?? []), ...processes];
        return this;
    }
    withScheduledJobs(jobs) {
        this.set.scheduledJobs = [...(this.set.scheduledJobs ?? []), ...jobs];
        return this;
    }
    /**
     * Attach an OpenAPI document (parsed JSON) to be published alongside
     * the rest of the application's definitions on next sync.
     */
    withOpenapiSpec(spec) {
        this.set.openapiSpec = spec;
        return this;
    }
    build() {
        const app = this.set.applicationCode;
        const resolved = { ...this.set };
        // Resolve role permissions (PermissionInput | string) to full strings.
        if (this.set.roles) {
            resolved.roles = this.set.roles.map((role) => role.permissions
                ? {
                    ...role,
                    permissions: role.permissions.map((p) => permissionToString(p, app)),
                }
                : { ...role });
        }
        // Default the standalone catalogue's application segment.
        if (this.set.permissions) {
            resolved.permissions = this.set.permissions.map((p) => ({
                ...p,
                application: p.application ?? app,
            }));
        }
        return resolved;
    }
}
/** Convenience: start building definitions for `applicationCode`. */
export function defineApplication(applicationCode) {
    return new DefinitionSetBuilder(applicationCode);
}
