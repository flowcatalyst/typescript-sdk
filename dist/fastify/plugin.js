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
import fp from "fastify-plugin";
import fastifyCookie from "@fastify/cookie";
import { buildAuthorizeUrl, exchangeCode, generateAuthCodeBag, refreshAccessToken, } from "./oidc/flow.js";
import { createOidcClient } from "./oidc/discovery.js";
import { claimsToSnapshot } from "./oidc/claims.js";
import { buildPrincipal } from "./principal.js";
import { CookieSessionStore, } from "./session/cookie-store.js";
import { makeGuard } from "./guards.js";
const DEFAULT_LOGIN = "/auth/login";
const DEFAULT_CALLBACK = "/auth/callback";
const DEFAULT_LOGOUT = "/auth/logout";
const DEFAULT_COOKIE_NAME = "fc_session";
const STATE_COOKIE_NAME = "fc_oauth_state";
const DEFAULT_RETURN_TO_PARAM = "returnTo";
const DEFAULT_SCOPE = "openid profile email";
const DEFAULT_MAX_AGE = 60 * 60 * 8; // 8h
const REFRESH_LEEWAY_MS = 60000;
const flowcatalystAuthImpl = async (fastify, opts) => {
    await ensureCookiePlugin(fastify);
    const cookieAttrs = resolveCookieAttrs(opts.cookie);
    const sessionStore = opts.sessionStore ??
        new CookieSessionStore({
            cookieName: opts.cookie.name ?? DEFAULT_COOKIE_NAME,
            secret: opts.cookie.secret,
            cookieOptions: cookieAttrs,
        });
    const routes = {
        login: opts.routes?.login ?? DEFAULT_LOGIN,
        callback: opts.routes?.callback ?? DEFAULT_CALLBACK,
        logout: opts.routes?.logout ?? DEFAULT_LOGOUT,
    };
    const returnToParam = opts.returnToQueryParam ?? DEFAULT_RETURN_TO_PARAM;
    const scope = opts.scope ?? DEFAULT_SCOPE;
    const oidc = createOidcClient({
        baseUrl: opts.baseUrl,
        ...(opts.expectedAudience !== undefined
            ? { expectedAudience: opts.expectedAudience }
            : {}),
        ...(opts.portal
            ? {
                authorizationEndpoint: `${opts.baseUrl.replace(/\/$/, "")}/portal/authorize`,
            }
            : {}),
    });
    // State cookie attrs — same security posture, scoped to /auth + short-lived.
    const stateCookieAttrs = {
        ...cookieAttrs,
        path: routes.callback,
        maxAge: 600,
    };
    const stateCrypto = new CookieSessionStore({
        cookieName: STATE_COOKIE_NAME,
        secret: opts.cookie.secret,
        cookieOptions: stateCookieAttrs,
    });
    // ─── Request decoration & auth resolution ────────────────────────
    fastify.decorateRequest("principal", undefined);
    fastify.addHook("onRequest", async (req, reply) => {
        // First plane to authenticate the request wins. One app may register
        // flowcatalystAuth twice (a root-context management plane plus an
        // encapsulated portal plane); root-context hooks run on EVERY route,
        // so without this guard the later-running instance clobbers a
        // principal the route's own plane already resolved — e.g. an admin's
        // management session overwriting the ptu_ portal principal on portal
        // routes, which the app's membership gate then rejects as
        // no_portal_access even though the portal login just succeeded.
        if (req.principal)
            return;
        // Bearer wins if present — APIs explicitly identifying themselves should
        // never be silently downgraded to whatever session cookie the browser sent.
        const bearer = readBearer(req);
        if (bearer) {
            const principal = await verifyBearer({
                token: bearer,
                oidc,
                rbac: opts.rbac,
            });
            if (principal) {
                req.principal = principal;
            }
            return;
        }
        const session = await sessionStore.read(req);
        if (!session)
            return;
        // Refresh access token if we're inside the leeway window.
        let working = session;
        if (session.tokens.refreshToken &&
            session.tokens.accessTokenExpiresAt - Date.now() < REFRESH_LEEWAY_MS) {
            const refreshed = await tryRefresh({
                session,
                oidc,
                clientId: opts.clientId,
                clientSecret: opts.clientSecret,
            });
            if (refreshed) {
                working = refreshed;
                await sessionStore.write(reply, refreshed);
            }
            else {
                await sessionStore.clear(req, reply);
                return;
            }
        }
        req.principal = buildPrincipal({
            snapshot: {
                ...working.principal,
                sessionData: working.sessionData,
                mechanism: "session",
            },
            rbac: opts.rbac,
        });
    });
    // ─── Routes ─────────────────────────────────────────────────────
    fastify.get(routes.login, async (req, reply) => {
        const query = req.query;
        const returnTo = sanitizeReturnTo(query[returnToParam]);
        const bag = generateAuthCodeBag(returnTo);
        const endpoints = await oidc.endpoints();
        // Per-request ?client= wins over the configured default. Omitted in
        // portal mode: login branding covers the platform sign-in pages
        // only, never the portal identity plane.
        const client = opts.portal ? undefined : (query["client"] ?? opts.client);
        const url = await buildAuthorizeUrl({
            endpoints,
            clientId: opts.clientId,
            redirectUri: resolveCallbackUrl(req, opts.publicBaseUrl, routes.callback),
            scope,
            bag,
            ...(client ? { client } : {}),
        });
        await stateCrypto.write(reply, bagToSession(bag));
        return reply.redirect(url);
    });
    fastify.get(routes.callback, async (req, reply) => {
        const query = req.query;
        const code = query["code"];
        const state = query["state"];
        const stateSession = await stateCrypto.read(req);
        await stateCrypto.clear(req, reply);
        if (!code || !state || !stateSession || stateSession.principal.id !== "_oauth_state") {
            return reply.code(400).send({ error: "invalid_oauth_state" });
        }
        const bag = stateSession.sessionData.bag;
        if (bag.state !== state) {
            return reply.code(400).send({ error: "invalid_oauth_state" });
        }
        const endpoints = await oidc.endpoints();
        const result = await exchangeCode({
            endpoints,
            clientId: opts.clientId,
            clientSecret: opts.clientSecret,
            redirectUri: resolveCallbackUrl(req, opts.publicBaseUrl, routes.callback),
            code,
            codeVerifier: bag.codeVerifier,
        });
        const sessionMaxAgeMs = (opts.cookie.maxAge ?? DEFAULT_MAX_AGE) * 1000;
        const session = {
            principal: claimsToSnapshot(result.claims, "session"),
            tokens: {
                accessToken: result.accessToken,
                accessTokenExpiresAt: result.accessTokenExpiresAt,
                ...(result.refreshToken ? { refreshToken: result.refreshToken } : {}),
            },
            sessionData: {},
            expiresAt: Date.now() + sessionMaxAgeMs,
        };
        await sessionStore.write(reply, session);
        return reply.redirect(bag.returnTo || "/");
    });
    const logout = async (req, reply, logoutOpts) => {
        await sessionStore.clear(req, reply);
        if (logoutOpts?.redirectTo) {
            await reply.redirect(logoutOpts.redirectTo);
        }
    };
    fastify.post(routes.logout, async (req, reply) => {
        const body = req.body ?? {};
        await logout(req, reply, body.redirectTo ? { redirectTo: body.redirectTo } : {});
        if (!reply.sent)
            await reply.code(204).send();
    });
    // ─── Decorator ──────────────────────────────────────────────────
    const guardCtx = {
        loginPath: routes.login,
        returnToQueryParam: returnToParam,
    };
    const decorator = {
        requireSession: () => makeGuard("session", guardCtx),
        requireBearer: () => makeGuard("bearer", guardCtx),
        requireAuth: () => makeGuard("any", guardCtx),
        logout,
    };
    fastify.decorate("fc", decorator);
};
/**
 * Wrapped with `fastify-plugin` so the `fc` decorator, `request.principal`,
 * and the registered `/auth/*` routes escape the encapsulation boundary
 * and are visible to the parent scope.
 */
export const flowcatalystAuth = fp(flowcatalystAuthImpl, {
    fastify: "5.x",
    name: "@flowcatalyst/sdk/fastify",
});
// ───────────────────────── helpers ─────────────────────────
async function ensureCookiePlugin(fastify) {
    // `@fastify/cookie` is idempotent-friendly: registering twice throws.
    // Apps that already have it registered should be detected via the decorator.
    if (fastify.hasReplyDecorator("setCookie") &&
        fastify.hasRequestDecorator("cookies")) {
        return;
    }
    await fastify.register(fastifyCookie);
}
function readBearer(req) {
    const raw = req.headers["authorization"];
    if (typeof raw !== "string")
        return null;
    const m = /^Bearer\s+(.+)$/i.exec(raw.trim());
    return m ? m[1] : null;
}
async function verifyBearer(opts) {
    try {
        const endpoints = await opts.oidc.endpoints();
        const claims = (await endpoints.verify(opts.token));
        return buildPrincipal({
            snapshot: {
                ...claimsToSnapshot(claims, "bearer"),
                sessionData: {},
            },
            rbac: opts.rbac,
        });
    }
    catch {
        return null;
    }
}
async function tryRefresh(opts) {
    if (!opts.session.tokens.refreshToken)
        return null;
    try {
        const endpoints = await opts.oidc.endpoints();
        const result = await refreshAccessToken({
            endpoints,
            clientId: opts.clientId,
            clientSecret: opts.clientSecret,
            refreshToken: opts.session.tokens.refreshToken,
        });
        return {
            principal: claimsToSnapshot(result.claims, "session"),
            tokens: {
                accessToken: result.accessToken,
                accessTokenExpiresAt: result.accessTokenExpiresAt,
                ...(result.refreshToken
                    ? { refreshToken: result.refreshToken }
                    : opts.session.tokens.refreshToken
                        ? { refreshToken: opts.session.tokens.refreshToken }
                        : {}),
            },
            sessionData: opts.session.sessionData,
            expiresAt: opts.session.expiresAt,
        };
    }
    catch {
        return null;
    }
}
function resolveCookieAttrs(c) {
    return {
        path: c.path ?? "/",
        ...(c.domain ? { domain: c.domain } : {}),
        httpOnly: c.httpOnly ?? true,
        secure: c.secure ?? true,
        sameSite: c.sameSite ?? "lax",
        maxAge: c.maxAge ?? DEFAULT_MAX_AGE,
    };
}
function resolveCallbackUrl(req, publicBaseUrl, callbackPath) {
    if (publicBaseUrl) {
        return `${publicBaseUrl.replace(/\/$/, "")}${callbackPath}`;
    }
    const proto = req.headers["x-forwarded-proto"] ?? req.protocol;
    const host = req.headers["x-forwarded-host"] ??
        req.headers["host"];
    return `${proto}://${host}${callbackPath}`;
}
function sanitizeReturnTo(raw) {
    if (!raw)
        return "/";
    try {
        const decoded = decodeURIComponent(raw);
        // Only allow same-origin paths (start with `/`, not `//` which is protocol-relative).
        if (decoded.startsWith("/") && !decoded.startsWith("//")) {
            return decoded;
        }
    }
    catch {
        // fall through
    }
    return "/";
}
/**
 * State stash uses CookieSessionStore by abusing the `principal.id` field
 * as a discriminator. Cheap and avoids a second crypto helper.
 */
function bagToSession(bag) {
    return {
        principal: {
            id: "_oauth_state",
            type: "USER",
            scope: "client",
            name: "",
            clients: [],
            roles: [],
            applications: [],
        },
        tokens: { accessToken: "", accessTokenExpiresAt: 0 },
        sessionData: { bag },
        expiresAt: Date.now() + 600000,
    };
}
