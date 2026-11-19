/**
 * Fastify plugin that wires FlowCatalyst OIDC + Bearer authentication into
 * an app. See `./index.ts` for the README-grade usage example.
 *
 * Responsibilities:
 *  - Verify Bearer tokens (Authorization header) against FC's JWKS.
 *  - Run the OIDC authorization-code/PKCE flow for browser callers, storing
 *    an encrypted session via the configured {@link SessionStore}.
 *  - Build a {@link Principal} (identical shape regardless of mechanism)
 *    with role/permission helpers backed by the local {@link RbacCatalogue}.
 *  - Expose `app.fc.requireSession() / requireBearer() / requireAuth()`
 *    and a `request.principal` typed extension.
 *
 * Things the plugin deliberately does NOT do:
 *  - Custom per-app post-auth logic. Add a Fastify `preHandler` AFTER
 *    `app.register(flowcatalystAuth)` if you want to enrich the principal
 *    or perform custom checks. Example in the README.
 */
import type { FastifyPluginAsync, FastifyReply, FastifyRequest, preHandlerHookHandler } from "fastify";
import { type Principal } from "./principal.js";
import type { RbacCatalogue } from "./rbac.js";
import type { SessionStore } from "./session/types.js";
/**
 * Plugin options. The only required fields are `baseUrl`, `clientId`,
 * `clientSecret`, and `cookie.secret` — everything else has sensible
 * defaults documented inline below.
 */
export interface FlowcatalystAuthOptions {
    /** FlowCatalyst platform base URL, e.g. `https://platform.example.com`. */
    baseUrl: string;
    /** OAuth client id (confidential web client registered at FC). */
    clientId: string;
    /** OAuth client secret. */
    clientSecret: string;
    /** OIDC scopes requested at authorization. Defaults to `openid profile email`. */
    scope?: string;
    /**
     * Expected `aud` claim on Bearer access tokens. There is NO default: when
     * omitted, the audience is not checked (the issuer and signature always
     * are). Set it (FC's default API audience is `flowcatalyst`) to reject
     * tokens addressed to other audiences.
     */
    expectedAudience?: string;
    /**
     * Accept OIDC ID tokens as Bearer credentials. Default `false`.
     *
     * A token with no `token_use` claim that is ID-token-shaped (it carries
     * `nonce`, `auth_time` or `at_hash`, or its `azp` equals its single `aud`)
     * is refused on the Bearer path: an ID token is addressed to a relying
     * party, and another relying party must not be able to replay a user's ID
     * token against this API. Set `true` only to restore the pre-fix behaviour.
     * Does not affect the login flow, which validates ID tokens separately.
     */
    acceptIdTokenAsBearer?: boolean;
    /**
     * Allow-list of origins (e.g. `["https://app.example.com"]`) that an
     * ABSOLUTE logout `redirectTo` may point at. Default: unset, in which case
     * absolute targets are honoured as before. When set, an absolute target is
     * followed only if its origin is listed; anything else redirects to `/`.
     * Relative targets are always sanitised (single leading `/`, no backslash
     * or control characters).
     */
    allowedLogoutRedirectOrigins?: string[];
    /**
     * Portal mode: this app is a PORTAL for a client's customers, so logins
     * enter through FlowCatalyst's portal identity plane
     * (`{baseUrl}/portal/authorize`) — a separate end-user population from
     * platform users, no platform SSO reuse, and no refresh tokens. Requires
     * the OAuth client's portal owner client to be set. The callback and
     * token exchange are unchanged; the id_token `sub` is the portal
     * identity id (`ptu_…`).
     */
    portal?: boolean;
    /**
     * Branded sign-in: the FlowCatalyst client identifier (URL-safe slug, e.g.
     * `"acme"`) whose login branding the sign-in pages should wear — logo,
     * colours, brand name and footer, as configured under Clients → Login
     * Branding. A per-request `?client=` on the login route overrides this.
     *
     * Purely cosmetic: it does not affect who may sign in or what they may
     * access, and an absent or unrecognised value falls back to the
     * platform-wide theme. Ignored in {@link portal} mode, which has its own
     * login surface.
     */
    client?: string;
    /** Local RBAC catalogue (role → permissions). Omit to skip permission checks. */
    rbac?: RbacCatalogue;
    /** Cookie config — used by the default {@link CookieSessionStore}. */
    cookie: {
        name?: string;
        secret: string | readonly string[];
        path?: string;
        domain?: string;
        httpOnly?: boolean;
        secure?: boolean;
        sameSite?: "lax" | "strict" | "none";
        /** Max-age in seconds. Defaults to 8h. */
        maxAge?: number;
    };
    /**
     * Override the session backend. Defaults to {@link CookieSessionStore}
     * using the `cookie` config above. Pass {@link PgSessionStore} or
     * {@link RedisSessionStore} for server-side storage.
     */
    sessionStore?: SessionStore;
    /** Route paths (override only if they conflict with your routes). */
    routes?: {
        login?: string;
        callback?: string;
        logout?: string;
    };
    /** Query param name used to round-trip the post-login destination. */
    returnToQueryParam?: string;
    /** Public base URL for callbacks. Defaults to deriving from the incoming request. */
    publicBaseUrl?: string;
}
declare module "fastify" {
    interface FastifyRequest {
        principal?: Principal;
    }
    interface FastifyInstance {
        fc: FlowcatalystAuthDecorator;
    }
}
export interface FlowcatalystAuthDecorator {
    requireSession(): preHandlerHookHandler;
    requireBearer(): preHandlerHookHandler;
    requireAuth(): preHandlerHookHandler;
    /** Programmatic logout: clears the session and (optionally) 302s to a URL. */
    logout(req: FastifyRequest, reply: FastifyReply, opts?: {
        redirectTo?: string;
    }): Promise<void>;
}
/**
 * Wrapped with `fastify-plugin` so the `fc` decorator, `request.principal`,
 * and the registered `/auth/*` routes escape the encapsulation boundary
 * and are visible to the parent scope.
 */
export declare const flowcatalystAuth: FastifyPluginAsync<FlowcatalystAuthOptions>;
/**
 * A post-login / post-logout destination is safe only when it stays on this
 * origin: a single leading `/`, no backslash (browsers treat `\` as `/`, so
 * `/\evil.example` is protocol-relative), no ASCII control characters
 * (browsers strip tabs/newlines, so `/<TAB>/evil.example` is `//evil.example`),
 * and a URL parse against a throwaway origin must not leave that origin.
 * `value` must already be decoded.
 */
export declare function isSafeLocalPath(value: unknown): value is string;
export declare function sanitizeReturnTo(raw: string | undefined): string;
/**
 * Logout `redirectTo`. Relative targets must pass {@link isSafeLocalPath}
 * both as given and percent-decoded (the original bytes are kept). Absolute
 * targets are honoured unless an origin allow-list is configured, in which
 * case only listed origins are.
 */
export declare function resolveLogoutRedirect(target: string, allowedOrigins?: readonly string[]): string;
//# sourceMappingURL=plugin.d.ts.map