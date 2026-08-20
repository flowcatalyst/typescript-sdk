import type { OutboxDriver } from "./types.js";
import type { CreateEventDto } from "./create-event-dto.js";
import type { CreateDispatchJobDto } from "./create-dispatch-job-dto.js";
import type { CreateAuditLogDto } from "./create-audit-log-dto.js";
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
    constructor(driver: OutboxDriver, clientId: string);
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
    /** Get the underlying driver. */
    getDriver(): OutboxDriver;
    private buildMessage;
    private ensureClientId;
}
//# sourceMappingURL=outbox-manager.d.ts.map