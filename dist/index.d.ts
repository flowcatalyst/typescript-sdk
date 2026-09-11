/**
 * FlowCatalyst SDK for TypeScript/JavaScript
 *
 * A typed client library for the FlowCatalyst platform with neverthrow
 * for explicit error handling.
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
 * // All methods return ResultAsync for typed error handling
 * const result = await client.eventTypes().list();
 *
 * // Pattern matching on results
 * result.match(
 *   (eventTypes) => console.log('Success:', eventTypes),
 *   (error) => {
 *     switch (error.type) {
 *       case 'validation':
 *         console.error('Validation error:', error.errors);
 *         break;
 *       case 'not_found':
 *         console.error('Not found:', error.message);
 *         break;
 *       default:
 *         console.error('Error:', error.message);
 *     }
 *   }
 * );
 *
 * // Or use isOk/isErr guards
 * if (result.isOk()) {
 *   console.log('Event types:', result.value);
 * }
 * ```
 *
 * @packageDocumentation
 */
export { FlowCatalystClient, type FlowCatalystConfig, type ClientCredentialsConfig, type UserTokenConfig, } from "./client.js";
export { OidcTokenManager, type TokenManagerConfig } from "./auth.js";
export type { SdkError, AuthenticationError, HttpError, ValidationError, NotFoundError, ForbiddenError, ConflictError, RateLimitError, } from "./errors.js";
export { authError, httpError, validationError, notFoundError, forbiddenError, conflictError, rateLimitError, mapHttpStatusToError, } from "./errors.js";
export { EventTypesResource, SubscriptionsResource, DispatchPoolsResource, ConnectionsResource, RolesResource, PermissionsResource, ApplicationsResource, ClientsResource, PrincipalsResource, ScheduledJobsResource, AuditLogsResource, } from "./resources/index.js";
export { ScheduledJobRunner, type ScheduledJobEnvelope, type Handler as ScheduledJobHandler, type HandlerContext as ScheduledJobHandlerContext, type RunnerOptions as ScheduledJobRunnerOptions, type RunResult as ScheduledJobRunResult, } from "./runner/scheduled-job-runner.js";
export { type LockProvider, type LockHandle, NoOpLockProvider, InMemoryLockProvider, } from "./runner/lock-provider.js";
export { PgLockProvider, type PgLockProviderOptions, } from "./runner/pg-lock-provider.js";
export { RedisLockProvider, type RedisLockCommandable, type RedisLockProviderOptions, } from "./runner/redis-lock-provider.js";
export { CREATE_LOCK_TABLE_SQL, initLockSchema, initLockSchemaWithTable, } from "./runner/lock-schema.js";
export { CacheError, type CacheStore, MemoryCacheStore, PgCacheStore, RedisCacheStore, type RedisCommandable, type RedisCacheStoreOptions, CREATE_CACHE_TABLE_SQL, initCacheSchema, initCacheSchemaWithTable, } from "./cache/index.js";
export type { ScheduledJob, ScheduledJobInstance, ScheduledJobInstanceLog, ScheduledJobStatus, TriggerKind, InstanceStatus, CompletionStatus, LogLevel, CreateScheduledJobRequest, UpdateScheduledJobRequest, ListJobsFilters, ListInstancesFilters, FireRequest, InstanceLogRequest, InstanceCompleteRequest, PaginatedJobs, PaginatedInstances, } from "./resources/scheduled-jobs.js";
export type * from "./generated/types.gen.js";
export { ensurePortalUser, listPortalUsers, activatePortalUser, deactivatePortalUser, deletePortalUser, } from "./generated/sdk.gen.js";
export * as api from "./generated/sdk.gen.js";
export { OutboxManager, OutboxStatus } from "./outbox/index.js";
export type { OutboxDriver, OutboxMessage, OutboxStatusCode, MessageType, } from "./outbox/index.js";
export { CreateEventDto } from "./outbox/index.js";
export { CreateDispatchJobDto, type DispatchMode } from "./outbox/index.js";
export { CreateAuditLogDto } from "./outbox/index.js";
export { generateTsid, isValidTsid } from "./outbox/index.js";
export { PgOutboxDriver } from "./outbox/index.js";
export type { PgQueryable, PgPoolLike, PgPoolClientLike, } from "./outbox/index.js";
export * as usecase from "./usecase/index.js";
export * as sync from "./sync/index.js";
export { ok, err, Result, ResultAsync } from "neverthrow";
export { verifyDeliverySignature, WebhookSignatureError, type WebhookSignatureErrorCode, type VerifyDeliverySignatureParams, } from "./webhook/signature.js";
//# sourceMappingURL=index.d.ts.map