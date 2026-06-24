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
    /** Expected `aud` claim. Defaults to `flowcatalyst` (FC's default audience). */
    expectedAudience?: string;
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
//# sourceMappingURL=plugin.d.ts.map