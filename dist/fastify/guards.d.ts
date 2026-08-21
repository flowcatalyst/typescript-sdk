/**
 * Route guards installed on the Fastify instance as `app.fc.requireSession`,
 * `app.fc.requireBearer`, `app.fc.requireAuth`.
 *
 * Each returns a `preHandler` you attach per-route. The guards differ only
 * in what they accept and how they respond to missing/invalid credentials:
 *
 *   requireSession  — cookie only; redirects iff the request looks like a
 *                     browser navigation (Accept: text/html), else 401 JSON
 *   requireBearer   — Bearer token only, 401 JSON on miss
 *   requireAuth     — either; same content negotiation as requireSession
 */
import type { preHandlerHookHandler } from "fastify";
export type GuardKind = "session" | "bearer" | "any";
export interface GuardContext {
    loginPath: string;
    returnToQueryParam: string;
}
export declare function makeGuard(kind: GuardKind, ctx: GuardContext): preHandlerHookHandler;
//# sourceMappingURL=guards.d.ts.map