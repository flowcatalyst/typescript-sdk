/**
 * Principals Resource
 *
 * Manage users and service accounts.
 */
import * as sdk from "../generated/sdk.gen.js";
/**
 * Principals resource for managing users and service accounts.
 */
export class PrincipalsResource {
    constructor(client) {
        this.client = client;
    }
    /**
     * List all principals with optional filters.
     */
    list(filters) {
        return this.client.request((httpClient, headers) => sdk.listPrincipals({
            client: httpClient,
            headers,
            query: filters,
        }));
    }
    /**
     * Get a principal by ID.
     */
    get(id) {
        return this.client.request((httpClient, headers) => sdk.getPrincipal({
            client: httpClient,
            headers,
            path: { id },
        }));
    }
    /**
     * Find a user by email.
     *
     * Client-side filters the response to rows whose email matches exactly
     * (case-insensitive). Older platform builds silently ignored unknown
     * query parameters and returned an unfiltered list; we defend against
     * that here so callers don't act on the wrong principal.
     */
    findByEmail(email) {
        const needle = email.toLowerCase();
        return this.list({ q: email }).map((response) => {
            const principals = response.principals.filter((p) => (p.email ?? "").toLowerCase() === needle);
            return { principals, total: principals.length };
        });
    }
    /**
     * Create a new user principal.
     *
     * `sendInvitation` (default true) controls whether the platform emails
     * the new user at all: a passwordless user gets the "set your password"
     * invite, a user created with a password gets the "account created"
     * welcome. Set to `false` when the calling application is taking over
     * the invitation itself — this suppresses BOTH emails.
     *
     * `returnInviteLink` (default false), when true, mints the 72-hour
     * "set your password" link and returns it as `inviteLink` on the
     * response instead of emailing it — only for a passwordless INTERNAL
     * user (a no-op, field absent, otherwise). `returnInviteLink: true`
     * ALWAYS suppresses the platform's own invite email, even when
     * `sendInvitation` is true or unset — the token can only be minted
     * once, so asking for the link back implies you're sending your own
     * email with it.
     *
     * `inviteLink` is a live 72-hour bearer credential — treat it exactly
     * like a password and never log it.
     *
     * `inviteRedirectUri` sends the invitee to your application once they
     * have set their password (and enrolled 2FA, if their domain requires
     * it); their platform session is already established, so your
     * `/oauth/authorize` sign-in goes straight through. It applies to both
     * the platform-sent invite email and `returnInviteLink`. It must match a
     * redirect URI registered on a login OAuth client of an application the
     * caller can access (the `/oauth/authorize` matching rule, wildcards
     * included) — otherwise the request fails with
     * `INVITE_REDIRECT_URI_INVALID` and no user is created.
     */
    createUser(data) {
        return this.client.request((httpClient, headers) => sdk.createUser({
            client: httpClient,
            headers,
            body: data,
        }));
    }
    /**
     * Update a principal.
     */
    update(id, data) {
        return this.client.request((httpClient, headers) => sdk.updatePrincipal({
            client: httpClient,
            headers,
            path: { id },
            body: data,
        }));
    }
    /**
     * Activate a principal.
     */
    activate(id) {
        return this.client.request((httpClient, headers) => sdk.activatePrincipal({
            client: httpClient,
            headers,
            path: { id },
        }));
    }
    /**
     * Deactivate a principal.
     */
    deactivate(id) {
        return this.client.request((httpClient, headers) => sdk.deactivatePrincipal({
            client: httpClient,
            headers,
            path: { id },
        }));
    }
    /**
     * Reset a user's password.
     *
     * Set `enforcePasswordComplexity` on `data` to `false` when the caller
     * enforces its own password policy; only the platform's 2-character
     * minimum will apply. Defaults to `true`.
     */
    resetPassword(id, data) {
        return this.client.request((httpClient, headers) => sdk.resetPrincipalPassword({
            client: httpClient,
            headers,
            path: { id },
            body: data,
        }));
    }
    /**
     * Get roles assigned to a principal.
     */
    getRoles(id) {
        return this.client.request((httpClient, headers) => sdk.listPrincipalRoles({
            client: httpClient,
            headers,
            path: { id },
        }));
    }
    /**
     * Add a single role to a principal (additive — keeps existing roles).
     *
     * Renamed from `assignRole` to make the additive-vs-replace distinction
     * visible at the call site (paired with `setRoles` for replace-all).
     */
    addRole(id, roleName) {
        return this.client.request((httpClient, headers) => sdk.addPrincipalRole({
            client: httpClient,
            headers,
            path: { id },
            body: { role: roleName },
        }));
    }
    /**
     * Remove a role from a principal.
     */
    removeRole(id, roleName) {
        return this.client.request((httpClient, headers) => sdk.removePrincipalRole({
            client: httpClient,
            headers,
            path: { id, role: roleName },
        }));
    }
    /**
     * Replace all roles on a principal with the given set (declarative).
     *
     * Renamed from `assignRoles` so the replace semantics are obvious
     * (paired with `addRole` for additive).
     */
    setRoles(id, roles) {
        return this.client.request((httpClient, headers) => sdk.assignPrincipalRoles({
            client: httpClient,
            headers,
            path: { id },
            body: { roles },
        }));
    }
    /**
     * Get client access grants for a principal.
     */
    getClientAccessGrants(id) {
        return this.client.request((httpClient, headers) => sdk.listPrincipalClientAccess({
            client: httpClient,
            headers,
            path: { id },
        }));
    }
    /**
     * Grant client access to a principal.
     */
    grantClientAccess(id, clientId) {
        return this.client.request((httpClient, headers) => sdk.grantPrincipalClientAccess({
            client: httpClient,
            headers,
            path: { id },
            body: { clientId },
        }));
    }
    /**
     * Revoke client access from a principal.
     */
    revokeClientAccess(id, clientId) {
        return this.client.request((httpClient, headers) => sdk.revokePrincipalClientAccess({
            client: httpClient,
            headers,
            path: { id, clientId },
        }));
    }
    /**
     * Sync principals for an application — declarative reconciliation
     * against `POST /api/applications/{applicationCode}/principals/sync`.
     *
     * When `removeUnlisted` is true the platform strips SDK-sourced role
     * assignments from principals not in the list; principals themselves
     * are never deleted by sync.
     */
    sync(applicationCode, principals, removeUnlisted = false) {
        return this.client.request((httpClient, headers) => sdk.syncPrincipals({
            client: httpClient,
            headers,
            path: { appCode: applicationCode },
            body: { principals },
            query: { removeUnlisted },
        }));
    }
    /**
     * Sync users platform-wide — declarative upsert keyed on email, with NO
     * application scope (`POST /api/principals/sync`).
     *
     * The application-less twin of {@link sync}: use it to "just sync users" —
     * migrating accounts and (via each entry's `passwordHash`) their existing
     * password hashes — without nesting the call under an application. Users are
     * global, matched by email, so an application code adds nothing here.
     *
     * Pure upsert: roles are never stripped from unlisted users.
     */
    syncUsers(principals) {
        return this.client.request((httpClient, headers) => sdk.syncUsers({
            client: httpClient,
            headers,
            body: { principals },
        }));
    }
}
