import type { OutboxDriver } from "./types.js";
import type { CreateEventDto } from "./create-event-dto.js";
import type { CreateDispatchJobDto } from "./create-dispatch-job-dto.js";
import type { CreateAuditLogDto } from "./create-audit-log-dto.js";
import type { CreatePushDto } from "./create-push-dto.js";
export interface OutboxManagerOptions {
    /** The writer's client identifier; the default `clientCode` of a push. */
    clientCode?: string;
}
/**
 * Manages outbox message creation for transactional outbox pattern.
 *
 * @example
 * ```typescript
 * const outbox = new OutboxManager(driver, 'client-tsid-123');
 *
 * // Create a single event
 * const eventId = await outbox.createEvent(
 *   CreateEventDto.create('user.registered', { userId: '123' })
 * );
 *
 * // Create a batch of dispatch jobs
 * const jobIds = await outbox.createDispatchJobs([job1, job2, job3]);
 * ```
 */
export declare class OutboxManager {
    private readonly driver;
    private readonly clientId;
    private readonly clientCode;
    /**
     * @param clientId the outbox row's `client_id` (the platform client id).
     * @param options.clientCode the writer's client identifier: the default
     *   `clientCode` of a PUSH row whose push names none (`_platform` leaves it
     *   out, so the credential decides).
     */
    constructor(driver: OutboxDriver, clientId: string, options?: OutboxManagerOptions);
    /**
     * Create a single event in the outbox. Returns the generated TSID.
     *
     * @param tx Optional transaction handle. If provided, the row joins that
     *   transaction so the outbox write is atomic with the caller's business
     *   writes. Pass the same handle to both your repository and this call.
     */
    createEvent(event: CreateEventDto, tx?: unknown): Promise<string>;
    /** Create multiple events in the outbox (batch). Returns the generated TSIDs. */
    createEvents(events: CreateEventDto[], tx?: unknown): Promise<string[]>;
    /** Create a single dispatch job in the outbox. Returns the generated TSID. */
    createDispatchJob(job: CreateDispatchJobDto, tx?: unknown): Promise<string>;
    /** Create multiple dispatch jobs in the outbox (batch). Returns the generated TSIDs. */
    createDispatchJobs(jobs: CreateDispatchJobDto[], tx?: unknown): Promise<string[]>;
    /** Create a single audit log in the outbox. Returns the generated TSID. */
    createAuditLog(auditLog: CreateAuditLogDto, tx?: unknown): Promise<string>;
    /** Create multiple audit logs in the outbox (batch). Returns the generated TSIDs. */
    createAuditLogs(auditLogs: CreateAuditLogDto[], tx?: unknown): Promise<string[]>;
    /**
     * Create a push in the outbox. Returns the row id, which is also the
     * push's `pushId` (the platform writes a pushId once).
     *
     * The push is validated first (topic, type, data; see {@link PushError}),
     * so one the platform would refuse terminally is never stored. With
     * {@link PgOutboxDriver} on Postgres the insert also NOTIFYs the platform's
     * outbox processor in the same statement; other drivers write the plain
     * row and the processor's poll delivers it.
     *
     * Written in the caller's transaction when `tx` is given, so the push
     * exists only if the change it announces does.
     *
     * @throws {PushError} when the push is invalid.
     */
    createPush(push: CreatePushDto, tx?: unknown): Promise<string>;
    /**
     * Create several pushes in the outbox (batch). Every push is validated
     * before any is written. Returns the row ids in order.
     */
    createPushes(pushes: CreatePushDto[], tx?: unknown): Promise<string[]>;
    /** Get the underlying driver. */
    getDriver(): OutboxDriver;
    private buildMessage;
    private buildPushMessage;
    private ensureClientId;
}
//# sourceMappingURL=outbox-manager.d.ts.map