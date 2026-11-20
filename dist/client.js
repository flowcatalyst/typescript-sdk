/**
 * FlowCatalyst SDK Client
 *
 * Main client for interacting with the FlowCatalyst platform.
 * Uses neverthrow for typed error handling.
 */
import { ResultAsync, ok, err, errAsync } from "neverthrow";
import { createClient, createConfig } from "./generated/client/index.js";
import { OidcTokenManager } from "./auth.js";
import { mapHttpStatusToError, httpError, authError, outcomeUnknownError, } from "./errors.js";
// Re-export resource classes
import { AuditLogsResource } from "./resources/audit-logs.js";
import { EventTypesResource } from "./resources/event-types.js";
import { ProcessesResource } from "./resources/processes.js";
import { SubscriptionsResource } from "./resources/subscriptions.js";
import { DispatchPoolsResource } from "./resources/dispatch-pools.js";
import { RolesResource } from "./resources/roles.js";
import { PermissionsResource } from "./resources/permissions.js";
import { ApplicationsResource } from "./resources/applications.js";
import { ClientsResource } from "./resources/clients.js";
import { PrincipalsResource } from "./resources/principals.js";
import { MeResource } from "./resources/me.js";
import { ConnectionsResource } from "./resources/connections.js";
import { PlatformConfigResource } from "./resources/platform-config.js";
import { DefinitionSynchronizer, } from "./sync/definition-synchronizer.js";
import { RouterResource } from "./resources/router.js";
import { IngestionsResource } from "./resources/ingestions.js";
import { FieldWorkersResource } from "./resources/field-workers.js";
import { FieldDevicesResource } from "./resources/field-devices.js";
import { FieldPoliciesResource } from "./resources/field-policies.js";
import { FieldTokensResource } from "./resources/field-tokens.js";
import { ScheduledJobsResource } from "./resources/scheduled-jobs.js";
import { ScheduledJobRunner, } from "./runner/scheduled-job-runner.js";
function isUserTokenConfig(config) {
    return "accessToken" in config;
}
/** Statuses that say the request was not processed: retried for every request. */
const REFUSED_UNPROCESSED = [408, 429];
/** Gateway statuses after which nobody can say whether the request was applied. */
const GATEWAY_UNKNOWN = [502, 503, 504];
const REPEATABLE_METHODS = ["GET", "HEAD", "OPTIONS", "PUT", "DELETE"];
function isRepeatable(method, options) {
    return options.repeatable === true || REPEATABLE_METHODS.includes(method);
}
/**
 * Codes of a connection that was never made, so no byte of the request was
 * written (Node's fetch puts them on the error's `cause`, or on each of an
 * `AggregateError`'s errors when several addresses were tried).
 */
const CONNECTION_NOT_MADE = new Set([
    "ECONNREFUSED",
    "ENOTFOUND",
    "EAI_AGAIN",
    "EHOSTUNREACH",
    "ENETUNREACH",
    "UND_ERR_CONNECT_TIMEOUT",
]);
function connectionNotMade(e) {
    const codes = [];
    const collect = (x, depth) => {
        if (typeof x !== "object" || x === null || depth > 4)
            return;
        const code = x.code;
        if (typeof code === "string")
            codes.push(code);
        const errors = x.errors;
        if (Array.isArray(errors))
            for (const inner of errors)
                collect(inner, depth + 1);
        collect(x.cause, depth + 1);
    };
    collect(e, 0);
    return codes.length > 0 && codes.every((c) => CONNECTION_NOT_MADE.has(c));
}
/**
 * Main FlowCatalyst SDK client.
 *
 * @example
 * ```typescript
 * import { FlowCatalystClient } from '@flowcatalyst/sdk';
 *
 * const client = new FlowCatalystClient({
 *   baseUrl: 'https://your-instance.flowcatalyst.io',
 *   clientId: 'your_client_id',
 *   clientSecret: 'your_client_secret',
 * });
 *
 * // Using neverthrow Result pattern
 * const result = await client.eventTypes().list();
 * result.match(
 *   (eventTypes) => console.log('Event types:', eventTypes),
 *   (error) => console.error('Error:', error.type, error.message)
 * );
 * ```
 */
export class FlowCatalystClient {
    constructor(config) {
        this.config = {
            timeout: config.timeout ?? 30000,
            retryAttempts: config.retryAttempts ?? 3,
            retryDelay: config.retryDelay ?? 100,
            baseUrl: config.baseUrl.replace(/\/$/, ""),
            routerBaseUrl: (config.routerBaseUrl ?? config.baseUrl).replace(/\/$/, ""),
        };
        if (isUserTokenConfig(config)) {
            // User token mode - use provided token or token provider
            this.tokenManager = null;
            const tokenOrFn = config.accessToken;
            if (typeof tokenOrFn === "string") {
                // Static token
                this.tokenProvider = () => Promise.resolve(tokenOrFn);
            }
            else {
                // Function that returns token (sync or async)
                this.tokenProvider = async () => tokenOrFn();
            }
        }
        else {
            // Client credentials mode - use token manager
            this.tokenManager = new OidcTokenManager({
                baseUrl: this.config.baseUrl,
                clientId: config.clientId,
                clientSecret: config.clientSecret,
                tokenUrl: config.tokenUrl,
            });
            this.tokenProvider = null;
        }
        this.httpClient = createClient(createConfig({
            baseUrl: this.config.baseUrl,
        }));
    }
    // ============ Resource Accessors ============
    /** Event Types resource */
    eventTypes() {
        return (this._eventTypes ?? (this._eventTypes = new EventTypesResource(this)));
    }
    /** Processes resource (workflow documentation / Mermaid diagrams) */
    processes() {
        return (this._processes ?? (this._processes = new ProcessesResource(this)));
    }
    /** Subscriptions resource */
    subscriptions() {
        return (this._subscriptions ?? (this._subscriptions = new SubscriptionsResource(this)));
    }
    /** Dispatch Pools resource */
    dispatchPools() {
        return (this._dispatchPools ?? (this._dispatchPools = new DispatchPoolsResource(this)));
    }
    /** Roles resource */
    roles() {
        return (this._roles ?? (this._roles = new RolesResource(this)));
    }
    /** Permissions resource */
    permissions() {
        return (this._permissions ?? (this._permissions = new PermissionsResource(this)));
    }
    /** Applications resource */
    applications() {
        return (this._applications ?? (this._applications = new ApplicationsResource(this)));
    }
    /** Clients resource */
    clients() {
        return (this._clients ?? (this._clients = new ClientsResource(this)));
    }
    /** Principals resource */
    principals() {
        return (this._principals ?? (this._principals = new PrincipalsResource(this)));
    }
    /** Me resource (user-scoped access to clients and applications) */
    me() {
        return (this._me ?? (this._me = new MeResource(this)));
    }
    /** Connections resource */
    connections() {
        return (this._connections ?? (this._connections = new ConnectionsResource(this)));
    }
    /** Platform config resource (properties and SECRET reveal) */
    platformConfig() {
        return (this._platformConfig ?? (this._platformConfig = new PlatformConfigResource(this)));
    }
    /**
     * Message router monitoring resource. Provides presence checks
     * against the router's in-pipeline map (single id and batch).
     * Talks to `routerBaseUrl` if configured, otherwise falls back to
     * `baseUrl`.
     */
    router() {
        return (this._router ?? (this._router = new RouterResource(this)));
    }
    /** Scheduled Jobs resource (CRUD + state transitions + history reads). */
    scheduledJobs() {
        return (this._scheduledJobs ?? (this._scheduledJobs = new ScheduledJobsResource(this)));
    }
    /** Audit Logs resource (read-only queries against `iam_audit_logs`). */
    auditLogs() {
        return (this._auditLogs ?? (this._auditLogs = new AuditLogsResource(this)));
    }
    /** Ingestions resource (definitions, versions, test connection, sets). */
    ingestions() {
        return (this._ingestions ?? (this._ingestions = new IngestionsResource(this)));
    }
    /** Field workers resource (admin API for PIN-based field identities). */
    fieldWorkers() {
        return (this._fieldWorkers ?? (this._fieldWorkers = new FieldWorkersResource(this)));
    }
    /** Field devices resource (enrolment codes and enrolled devices). */
    fieldDevices() {
        return (this._fieldDevices ?? (this._fieldDevices = new FieldDevicesResource(this)));
    }
    /** Field policies resource (per-client PIN, lock and session policy). */
    fieldPolicies() {
        return (this._fieldPolicies ?? (this._fieldPolicies = new FieldPoliciesResource(this)));
    }
    /** Field tokens resource (online introspection). */
    fieldTokens() {
        return (this._fieldTokens ?? (this._fieldTokens = new FieldTokensResource(this)));
    }
    /**
     * Online check of a field access token (`POST /api/field-tokens/introspect`).
     * Use when the offline `FieldTokenVerifier` is not enough and the session
     * must still be live.
     */
    introspectFieldToken(token) {
        return this.fieldTokens().introspect(token);
    }
    /**
     * Build a `ScheduledJobRunner` you can mount on your HTTP framework.
     * Register handlers per job code, then call
     * `.processSigned(rawBody, headers)` from your route handler (pass
     * `signingSecret` in `options` so firings are signature-verified;
     * `.process(envelope)` is the unverified path). The runner enforces single-instance concurrency
     * via the injected `LockProvider` (default: NoOp — provide a real one
     * for production).
     */
    scheduledJobRunner(options) {
        return new ScheduledJobRunner(this, this.scheduledJobs(), options);
    }
    /** Base URL of the message router (used by `router()`). */
    getRouterBaseUrl() {
        return this.config.routerBaseUrl;
    }
    /**
     * Definition synchronizer — bulk-sync roles, event types, connections,
     * subscriptions, dispatch pools, and principals per application.
     *
     * `options` (e.g. `subscriptionTargetBaseUrl`) only take effect on the
     * FIRST call — the synchronizer is created once and cached.
     *
     * See `docs/syncing-definitions.md` for structure and conventions.
     */
    definitions(options) {
        return (this._definitions ?? (this._definitions = new DefinitionSynchronizer(this, options)));
    }
    // ============ Internal Methods ============
    /**
     * Get the underlying HTTP client (for advanced usage).
     */
    getHttpClient() {
        return this.httpClient;
    }
    /**
     * Get the token manager (for advanced usage).
     * Returns null if using user token mode.
     */
    getTokenManager() {
        return this.tokenManager;
    }
    /**
     * Execute an authenticated request with retry logic.
     *
     * Wraps the generated SDK functions with:
     * - Automatic token injection
     * - Retry with exponential backoff, of what is safe to repeat only
     * - Typed error handling via neverthrow
     *
     * A request is repeatable when its method is GET, HEAD, OPTIONS, PUT or
     * DELETE, or when `options.repeatable` marks it (a POST the platform
     * applies once however often it is sent: the declarative syncs, read-only
     * POSTs). Then, up to `retryAttempts` retries:
     *
     * - 408 and 429 (refused before it was processed) are retried for every
     *   request; so is a connection that could not be made (DNS failure,
     *   refused, connect timeout), since nothing was sent.
     * - 502, 503 and 504, and a connection failure or timeout after the
     *   request was sent, are retried for a repeatable request. For any other
     *   request they end the call with an `outcome_unknown` error at once: the
     *   platform may have applied it, and sending it again could apply it twice
     *   (or, for a provisioning, be refused with the one-time secrets lost).
     * - A DELETE that answers 404 on a retry after an attempt whose outcome was
     *   unknown succeeds: the earlier attempt most likely deleted it.
     *
     * `options.method` names the method for a `fn` that calls `fetch` itself
     * rather than through the client it is given; without either, a request
     * counts as not repeatable.
     */
    request(fn, options = {}) {
        if (this.tokenProvider) {
            // User token mode
            return ResultAsync.fromPromise(this.tokenProvider(), (e) => authError.tokenExpired(e instanceof Error ? e.message : "Failed to get access token")).andThen((token) => this.executeWithRetry(fn, token, false, options));
        }
        else if (this.tokenManager) {
            // Client credentials mode
            return this.tokenManager
                .getAccessToken()
                .mapErr((e) => e)
                .andThen((token) => this.executeWithRetry(fn, token, true, options));
        }
        else {
            return errAsync(authError.tokenExpired("No authentication configured"));
        }
    }
    executeWithRetry(fn, token, canRefreshToken, options) {
        return new ResultAsync(this.runWithRetry(fn, token, canRefreshToken, options));
    }
    async runWithRetry(fn, initialToken, canRefreshToken, options) {
        let token = initialToken;
        let refreshed = false;
        let retries = 0;
        // An earlier attempt may have been applied by the platform.
        let uncertain = false;
        const retry = async () => {
            if (retries >= this.config.retryAttempts)
                return false;
            await this.delay(this.config.retryDelay * Math.pow(2, retries));
            retries++;
            return true;
        };
        for (;;) {
            const sent = {};
            let result;
            try {
                result = await this.executeWithTimeout(fn, { Authorization: `Bearer ${token}` }, sent);
            }
            catch (e) {
                const timedOut = e instanceof Error && e.name === "AbortError";
                const failure = timedOut
                    ? httpError.timeout(this.config.timeout)
                    : httpError.network(e instanceof Error ? e.message : "Network error", e instanceof Error ? e : undefined);
                if (!timedOut && connectionNotMade(e)) {
                    // Nothing was sent: safe to try again whatever it is.
                    if (await retry())
                        continue;
                    return err(failure);
                }
                const { method, url } = this.describe(sent, options);
                if (!isRepeatable(method, options)) {
                    return err(outcomeUnknownError(method, url, {
                        cause: e instanceof Error ? e : new Error(failure.message),
                    }));
                }
                uncertain = true;
                if (await retry())
                    continue;
                return err(failure);
            }
            if (result.error === undefined && result.response.ok) {
                return ok(result.data);
            }
            const status = result.response.status;
            // Handle 401 with token refresh (only for client credentials mode)
            if (status === 401 &&
                !refreshed &&
                retries === 0 &&
                canRefreshToken &&
                this.tokenManager) {
                refreshed = true;
                const fresh = await this.tokenManager.refreshToken();
                if (fresh.isErr())
                    return err(fresh.error);
                token = fresh.value;
                continue;
            }
            const { method, url } = this.describe(sent, options);
            if (uncertain && method === "DELETE" && status === 404) {
                // The attempt whose answer was lost most likely deleted it.
                return ok(undefined);
            }
            if (REFUSED_UNPROCESSED.includes(status)) {
                if (await retry())
                    continue;
            }
            else if (GATEWAY_UNKNOWN.includes(status)) {
                if (!isRepeatable(method, options)) {
                    return err(outcomeUnknownError(method, url, { status, body: result.error }));
                }
                uncertain = true;
                if (await retry())
                    continue;
            }
            return err(mapHttpStatusToError(status, result.error));
        }
    }
    /** The method and URL of the attempt, as sent or as the caller named them. */
    describe(sent, options) {
        return {
            method: (sent.method ?? options.method ?? "UNKNOWN").toUpperCase(),
            url: sent.url ?? options.path ?? this.config.baseUrl,
        };
    }
    async executeWithTimeout(fn, headers, sent) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);
        // A per-request client whose fetch carries the timeout signal, so the
        // timer actually aborts the in-flight request (the shared client has
        // no per-call signal hook), and records what was sent (the retry rule
        // needs the method).
        const signal = controller.signal;
        const httpClient = createClient(createConfig({
            baseUrl: this.config.baseUrl,
            fetch: (input, init) => {
                if (typeof input === "object" && "method" in input) {
                    sent.method = input.method;
                    sent.url = input.url;
                }
                else {
                    sent.method = init?.method ?? "GET";
                    sent.url = String(input);
                }
                return globalThis.fetch(input, { ...init, signal });
            },
        }));
        try {
            const result = await fn(httpClient, headers);
            // The generated client reports fetch exceptions (abort, network
            // failure) as `{ error, response: undefined }` instead of
            // throwing; rethrow so the caller maps them to timeout/network
            // errors rather than dereferencing a missing response.
            if (result.response === undefined) {
                if (signal.aborted) {
                    const abort = new Error("The operation was aborted");
                    abort.name = "AbortError";
                    throw abort;
                }
                throw result.error instanceof Error
                    ? result.error
                    : new Error("Network error");
            }
            return result;
        }
        finally {
            clearTimeout(timeoutId);
        }
    }
    delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}
