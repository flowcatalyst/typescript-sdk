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
class RoleScope {
    constructor(builder, roleName) {
        this.builder = builder;
        this.roleName = roleName;
    }
    grants(...permissions) {
        this.builder._grant(this.roleName, permissions);
        return this.builder;
    }
}
export class RbacBuilder {
    constructor() {
        this.map = new Map();
    }
    role(name) {
        if (!name)
            throw new Error("RBAC role name cannot be empty");
        if (!this.map.has(name))
            this.map.set(name, new Set());
        return new RoleScope(this, name);
    }
    /** @internal */
    _grant(role, permissions) {
        const bucket = this.map.get(role);
        if (!bucket)
            throw new Error(`RBAC role "${role}" not declared`);
        for (const p of permissions) {
            if (!p)
                throw new Error(`RBAC permission for role "${role}" is empty`);
            bucket.add(p);
        }
    }
    build() {
        const frozen = new Map(Array.from(this.map.entries()).map(([k, v]) => [k, new Set(v)]));
        return {
            roles: frozen,
            resolve(roleNames) {
                const out = new Set();
                for (const role of roleNames) {
                    const perms = frozen.get(role);
                    if (!perms)
                        continue;
                    for (const p of perms)
                        out.add(p);
                }
                return [...out];
            },
        };
    }
}
export function defineRbac() {
    return new RbacBuilder();
}
