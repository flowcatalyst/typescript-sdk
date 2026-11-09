/**
 * Fastify glue for field-worker tokens.
 *
 * Register {@link fieldAuth} once, then opt routes in:
 *
 *   await app.register(fieldAuth, {
 *     issuer: "https://auth.example.com",
 *     appCode: "my-app",
 *     publicBaseUrl: "https://api.my-app.example.com",
 *   });
 *   app.post("/orders", { preHandler: app.fcField.require() }, (req) => {
 *     req.fieldPrincipal!.workerId; // verified worker + device
 *   });
 *
 * Deliberately NOT a global hook: it adds no onRequest/preHandler of its own,
 * only runs on routes that use `app.fcField.require()`, and never touches
 * `request.principal` (the OIDC/bearer plane's principal). It is safe next to
 * (and inside the same app as) `flowcatalystAuth`, including a root-context
 * (fp()-wrapped) registration of it.
 *
 * The signed URL is `publicBaseUrl` + the request path. The Host header is
 * never consulted.
 */
import type { FastifyPluginAsync, preHandlerAsyncHookHandler } from "fastify";
import { FieldTokenVerifier, type FieldPrincipal, type FieldTokenVerifierConfig } from "../field/verifier.js";
export interface FieldAuthOptions extends FieldTokenVerifierConfig {
    /**
     * This service's public base URL (scheme + host, plus any proxy path
     * prefix). The request URL used for the proof's `htu` check is
     * `publicBaseUrl` + the request path.
     */
    publicBaseUrl: string;
}
export interface FieldAuthDecorator {
    /** The underlying verifier. */
    readonly verifier: FieldTokenVerifier;
    /** A preHandler that requires a valid field credential and sets `request.fieldPrincipal`. */
    require(): preHandlerAsyncHookHandler;
}
declare module "fastify" {
    interface FastifyRequest {
        fieldPrincipal?: FieldPrincipal;
    }
    interface FastifyInstance {
        fcField: FieldAuthDecorator;
    }
}
export declare const fieldAuth: FastifyPluginAsync<FieldAuthOptions>;
//# sourceMappingURL=field.d.ts.map