/**
 * RBAC catalogue — declarative role → permission map evaluated locally
 * inside the app process.
 *
 * Why local: FlowCatalyst tokens carry **roles only**. Permissions belong
 * to the consumer app (what an "invoice:void" capability even means is
 * app-specific). Defining them in code keeps them version-controlled,
 * testable, and avoids round-tripping to the platform on every guard.
 *
 *     const rbac = defineRbac()
 *       .role("billing-admin").grants("invoice:create", "invoice:read")
 *       .role("billing-viewer").grants("invoice:read")
 *       .role("support").grants("ticket:*")
 *       .build();
 *
 * Wildcards are suffix-only on `:` boundaries:
 *   "ticket:*"  matches  "ticket:read", "ticket:close"
 *   "*"         matches  everything
 *   "ticket:r*" does NOT match anything — mid-segment globs are not supported.
 *
 * Resolution: union of all permissions across the principal's roles.
 * Unknown roles are silently ignored (the catalogue is the source of truth
 * for what an app cares about; foreign roles from other apps just don't
 * grant anything here).
 */
export interface RbacCatalogue {
    readonly roles: ReadonlyMap<string, ReadonlySet<string>>;
    resolve(roleNames: readonly string[]): string[];
}
declare class RoleScope {
    private readonly builder;
    private readonly roleName;
    constructor(builder: RbacBuilder, roleName: string);
    grants(...permissions: string[]): RbacBuilder;
}
export declare class RbacBuilder {
    private readonly map;
    role(name: string): RoleScope;
    /** @internal */
    _grant(role: string, permissions: string[]): void;
    build(): RbacCatalogue;
}
export declare function defineRbac(): RbacBuilder;
export {};
//# sourceMappingURL=rbac.d.ts.map