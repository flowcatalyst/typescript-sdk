/**
 * FlowCatalyst SDK Client
 *
 * Main client for interacting with the FlowCatalyst platform.
 * Uses neverthrow for typed error handling.
 */
import { ResultAsync } from "neverthrow";
import type { Client } from "./generated/client/index.js";
import { OidcTokenManager, type TokenManagerConfig } from "./auth.js";
import type { SdkError } from "./errors.js";
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
import { DefinitionSynchronizer, type DefinitionSynchronizerOptions } from "./sync/definition-synchronizer.js";
import { RouterResource } from "./resources/router.js";
import { IngestionsResource } from "./resources/ingestions.js";
import { FieldWorkersResource } from "./resources/field-workers.js";
import { FieldDevicesResource } from "./resources/field-devices.js";
import { FieldPoliciesResource } from "./resources/field-policies.js";
import { FieldTokensResource } from "./resources/field-tokens.js";
import { ScheduledJobsResource } from "./resources/scheduled-jobs.js";
import { ScheduledJobRunner, type RunnerOptions } from "./runner/scheduled-job-runner.js";
/**
 * Configuration for client credentials authentication.
 */
export interface ClientCredentialsConfig extends TokenManagerConfig {
    /** Request timeout in milliseconds (default: 30000) */
    timeout?: number;
    /** Number of retry attempts for transient errors (default: 3) */
    retryAttempts?: number;
    /** Base delay between retries in ms (default: 100) */
    retryDelay?: number;
    /**
     * Base URL of the message router for monitoring endpoints
     * (`/monitoring/in-flight-messages/...`). The router runs at a
     * different host than the platform; if not set, router calls fall
     * back to `baseUrl` (correct only when router and platform share a
     * host, e.g. `fcdev`).
     */
    routerBaseUrl?: string;
}
/**
 * Configuration for user token authentication.
 * Use this when you already have a user access token (e.g., from login).
 */
export interface UserTokenConfig {
    /** Base URL of the FlowCatalyst API */
    baseUrl: string;
    /**
     * Access token or a function that returns the current access token.
     * Use a function if the token may change (e.g., refreshed by your app).
     */
    accessToken: string | (() => string) | (() => Promise<string>);
    /** Request timeout in milliseconds (default: 30000) */
    timeout?: number;
    /** Number of retry attempts for transient errors (default: 3) */
    retryAttempts?: number;
    /** Base delay between retries in ms (default: 100) */
    retryDelay?: number;
    /**
     * Base URL of the message router for monitoring endpoints. See
     * `ClientCredentialsConfig.routerBaseUrl`.
     */
    routerBaseUrl?: string;
}
export type FlowCatalystConfig = ClientCredentialsConfig | UserTokenConfig;
/**
 * Per-call options of {@link FlowCatalystClient.request}.
 */
export interface RequestOptions {
    /**
     * The request may be sent again after its answer was lost (a 502/503/504,
     * or a connection failure or timeout after it was sent): the platform
     * applies it once however often it arrives. Only for a POST that is: a
     * declarative sync, a read-only POST, a batch whose every item carries
     * the key the platform de-duplicates by. GET, HEAD, OPTIONS, PUT and
     * DELETE are repeatable without it.
     */
    repeatable?: boolean;
    /** The method, for a `fn` that calls `fetch` itself. */
    method?: string;
    /** The path, for a `fn` that calls `fetch` itself (used in errors). */
    path?: string;
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
export declare class FlowCatalystClient {
    private readonly httpClient;
    private readonly tokenManager;
    private readonly tokenProvider;
    private readonly config;
    private _eventTypes?;
    private _processes?;
    private _subscriptions?;
    private _dispatchPools?;
    private _roles?;
    private _permissions?;
    private _applications?;
    private _clients?;
    private _principals?;
    private _me?;
    private _connections?;
    private _platformConfig?;
    private _definitions?;
    private _router?;
    private _scheduledJobs?;
    private _auditLogs?;
    private _ingestions?;
    private _fieldWorkers?;
    private _fieldDevices?;
    private _fieldPolicies?;
    private _fieldTokens?;
    constructor(config: FlowCatalystConfig);
    /** Event Types resource */
    eventTypes(): EventTypesResource;
    /** Processes resource (workflow documentation / Mermaid diagrams) */
    processes(): ProcessesResource;
    /** Subscriptions resource */
    subscriptions(): SubscriptionsResource;
    /** Dispatch Pools resource */
    dispatchPools(): DispatchPoolsResource;
    /** Roles resource */
    roles(): RolesResource;
    /** Permissions resource */
    permissions(): PermissionsResource;
    /** Applications resource */
    applications(): ApplicationsResource;
    /** Clients resource */
    clients(): ClientsResource;
    /** Principals resource */
    principals(): PrincipalsResource;
    /** Me resource (user-scoped access to clients and applications) */
    me(): MeResource;
    /** Connections resource */
    connections(): ConnectionsResource;
    /** Platform config resource (properties and SECRET reveal) */
    platformConfig(): PlatformConfigResource;
    /**
     * Message router monitoring resource. Provides presence checks
     * against the router's in-pipeline map (single id and batch).
     * Talks to `routerBaseUrl` if configured, otherwise falls back to
     * `baseUrl`.
     */
    router(): RouterResource;
    /** Scheduled Jobs resource (CRUD + state transitions + history reads). */
    scheduledJobs(): ScheduledJobsResource;
    /** Audit Logs resource (read-only queries against `iam_audit_logs`). */
    auditLogs(): AuditLogsResource;
    /** Ingestions resource (definitions, versions, test connection, sets). */
    ingestions(): IngestionsResource;
    /** Field workers resource (admin API for PIN-based field identities). */
    fieldWorkers(): FieldWorkersResource;
    /** Field devices resource (enrolment codes and enrolled devices). */
    fieldDevices(): FieldDevicesResource;
    /** Field policies resource (per-client PIN, lock and session policy). */
    fieldPolicies(): FieldPoliciesResource;
    /** Field tokens resource (online introspection). */
    fieldTokens(): FieldTokensResource;
    /**
     * Online check of a field access token (`POST /api/field-tokens/introspect`).
     * Use when the offline `FieldTokenVerifier` is not enough and the session
     * must still be live.
     */
    introspectFieldToken(token: string): ResultAsync<import("./index.js").FieldTokenIntrospectResponse, SdkError>;
    /**
     * Build a `ScheduledJobRunner` you can mount on your HTTP framework.
     * Register handlers per job code, then call
     * `.processSigned(rawBody, headers)` from your route handler (pass
     * `signingSecret` in `options` so firings are signature-verified;
     * `.process(envelope)` is the unverified path). The runner enforces single-instance concurrency
     * via the injected `LockProvider` (default: NoOp — provide a real one
     * for production).
     */
    scheduledJobRunner(options?: RunnerOptions): ScheduledJobRunner;
    /** Base URL of the message router (used by `router()`). */
    getRouterBaseUrl(): string;
    /**
     * Definition synchronizer — bulk-sync roles, event types, connections,
     * subscriptions, dispatch pools, and principals per application.
     *
     * `options` (e.g. `subscriptionTargetBaseUrl`) only take effect on the
     * FIRST call — the synchronizer is created once and cached.
     *
     * See `docs/syncing-definitions.md` for structure and conventions.
     */
    definitions(options?: DefinitionSynchronizerOptions): DefinitionSynchronizer;
    /**
     * Get the underlying HTTP client (for advanced usage).
     */
    getHttpClient(): Client;
    /**
     * Get the token manager (for advanced usage).
     * Returns null if using user token mode.
     */
    getTokenManager(): OidcTokenManager | null;
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
    request<T>(fn: (client: Client, headers: Record<string, string>) => Promise<{
        data?: unknown;
        error?: unknown;
        response: Response;
    }>, options?: RequestOptions): ResultAsync<T, SdkError>;
    private executeWithRetry;
    private runWithRetry;
    /** The method and URL of the attempt, as sent or as the caller named them. */
    private describe;
    private executeWithTimeout;
    private delay;
}
//# sourceMappingURL=client.d.ts.map