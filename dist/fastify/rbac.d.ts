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
 *
 * ## Qualified vs bare role names
 *
 * FlowCatalyst names a role canonically as `"{applicationCode}:{role}"`, but
 * the `roles` claim has historically reached apps in either form: qualified
 * from most mint paths, bare from a platform build that stripped the prefix
 * for application-scoped OAuth clients. An app should not have to care which
 * one it got, or declare its roles twice to cover both.
 *
 * So declare each role in whichever form reads best — usually the bare,
 * app-local one — and the catalogue matches the other form too:
 *
 *     defineRbac().role("bidder").grants("rfp:bid:submit")
 *     // resolves a claim of "bidder" AND of "rfp:bidder"
 *
 * A catalogue describes one application, so a bare name is unambiguous inside
 * it. The one exception is a catalogue that declares two roles collapsing to
 * the same bare name (`"admin"` and `"hr:admin"`): those are left to exact
 * matching only, since guessing which was meant could over-grant.
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