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
// Main client
export { FlowCatalystClient, } from "./client.js";
// Authentication
export { OidcTokenManager } from "./auth.js";
export { authError, httpError, validationError, notFoundError, forbiddenError, conflictError, rateLimitError, mapHttpStatusToError, } from "./errors.js";
// Resource classes
export { EventTypesResource, SubscriptionsResource, DispatchPoolsResource, ConnectionsResource, RolesResource, PermissionsResource, ApplicationsResource, ClientsResource, PrincipalsResource, ScheduledJobsResource, AuditLogsResource, } from "./resources/index.js";
// Scheduled-job runner (handler registration + lock + completion callback).
export { ScheduledJobRunner, } from "./runner/scheduled-job-runner.js";
export { NoOpLockProvider, InMemoryLockProvider, } from "./runner/lock-provider.js";
export { PgLockProvider, } from "./runner/pg-lock-provider.js";
export { RedisLockProvider, } from "./runner/redis-lock-provider.js";
export { CREATE_LOCK_TABLE_SQL, initLockSchema, initLockSchemaWithTable, } from "./runner/lock-schema.js";
// Cache — pluggable key-value cache with required TTL. Three backends:
// MemoryCacheStore (default for tests/dev), PgCacheStore (node-postgres-
// compatible), RedisCacheStore (ioredis-compatible).
export { CacheError, MemoryCacheStore, PgCacheStore, RedisCacheStore, CREATE_CACHE_TABLE_SQL, initCacheSchema, initCacheSchemaWithTable, } from "./cache/index.js";
// Outbox - transactional outbox pattern
export { OutboxManager, OutboxStatus } from "./outbox/index.js";
export { CreateEventDto } from "./outbox/index.js";
export { CreateDispatchJobDto } from "./outbox/index.js";
export { CreateAuditLogDto } from "./outbox/index.js";
export { generateTsid, isValidTsid } from "./outbox/index.js";
export { PgOutboxDriver } from "./outbox/index.js";
// Use-case envelope — domain-driven write pattern with outbox dispatch.
// Exported as a namespace to avoid clashing with neverthrow's `Result` and the
// HTTP `ValidationError`/`NotFoundError` types. Typical usage:
//
//   import { usecase } from "@flowcatalyst/sdk";
//   const shipOrder: usecase.Operation<ShipOrderCommand, OrderShipped> = {
//     authorize: usecase.publicAuthorize,
//     async execute(cmd, ctx) { ...; return usecase.Plan.save(order, orderRepo, event); },
//   };
//   const uow = new usecase.OutboxUnitOfWork({ outboxManager });
//   const result = await usecase.run(uow, shipOrder, cmd, ctx);
//
export * as usecase from "./usecase/index.js";
// Sync — declarative definitions (roles, event types, subscriptions,
// dispatch pools, principals) pushed to the platform per application.
// See `docs/syncing-definitions.md` for structure conventions.
//
//   import { sync, FlowCatalystClient } from "@flowcatalyst/sdk";
//   const set = sync.defineApplication("orders").withRoles([...]).build();
//   await client.definitions().sync(set);
//
export * as sync from "./sync/index.js";
// Re-export neverthrow utilities for convenience
export { ok, err, Result, ResultAsync } from "neverthrow";
// Delivery-signature verification (scheduled-job firings + dispatch webhooks).
export { verifyDeliverySignature, WebhookSignatureError, } from "./webhook/signature.js";
