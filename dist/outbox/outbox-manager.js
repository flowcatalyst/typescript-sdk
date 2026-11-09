import { OutboxStatus } from "./types.js";
import { generate } from "./tsid.js";
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
export class OutboxManager {
    /**
     * @param clientId the outbox row's `client_id` (the platform client id).
     * @param options.clientCode the writer's client identifier: the default
     *   `clientCode` of a PUSH row whose push names none (`_platform` leaves it
     *   out, so the credential decides).
     */
    constructor(driver, clientId, options = {}) {
        this.driver = driver;
        this.clientId = clientId;
        this.clientCode = options.clientCode;
    }
    /**
     * Create a single event in the outbox. Returns the generated TSID.
     *
     * @param tx Optional transaction handle. If provided, the row joins that
     *   transaction so the outbox write is atomic with the caller's business
     *   writes. Pass the same handle to both your repository and this call.
     */
    async createEvent(event, tx) {
        this.ensureClientId();
        const id = generate();
        const payload = JSON.stringify(event.toPayload(id));
        const message = this.buildMessage(id, "EVENT", payload, event.messageGroup, Object.keys(event.headers).length > 0 ? event.headers : null);
        await this.driver.insert(message, tx);
        return id;
    }
    /** Create multiple events in the outbox (batch). Returns the generated TSIDs. */
    async createEvents(events, tx) {
        if (events.length === 0)
            return [];
        this.ensureClientId();
        const ids = [];
        const messages = [];
        for (const event of events) {
            const id = generate();
            ids.push(id);
            const payload = JSON.stringify(event.toPayload(id));
            messages.push(this.buildMessage(id, "EVENT", payload, event.messageGroup, Object.keys(event.headers).length > 0 ? event.headers : null));
        }
        await this.driver.insertBatch(messages, tx);
        return ids;
    }
    /** Create a single dispatch job in the outbox. Returns the generated TSID. */
    async createDispatchJob(job, tx) {
        this.ensureClientId();
        const id = generate();
        const payload = JSON.stringify(job.toPayload());
        const message = this.buildMessage(id, "DISPATCH_JOB", payload, job.messageGroup, null);
        await this.driver.insert(message, tx);
        return id;
    }
    /** Create multiple dispatch jobs in the outbox (batch). Returns the generated TSIDs. */
    async createDispatchJobs(jobs, tx) {
        if (jobs.length === 0)
            return [];
        this.ensureClientId();
        const ids = [];
        const messages = [];
        for (const job of jobs) {
            const id = generate();
            ids.push(id);
            const payload = JSON.stringify(job.toPayload());
            messages.push(this.buildMessage(id, "DISPATCH_JOB", payload, job.messageGroup, null));
        }
        await this.driver.insertBatch(messages, tx);
        return ids;
    }
    /** Create a single audit log in the outbox. Returns the generated TSID. */
    async createAuditLog(auditLog, tx) {
        this.ensureClientId();
        const id = generate();
        const payload = JSON.stringify(auditLog.toPayload());
        const message = this.buildMessage(id, "AUDIT_LOG", payload, null, Object.keys(auditLog.headers).length > 0 ? auditLog.headers : null);
        await this.driver.insert(message, tx);
        return id;
    }
    /** Create multiple audit logs in the outbox (batch). Returns the generated TSIDs. */
    async createAuditLogs(auditLogs, tx) {
        if (auditLogs.length === 0)
            return [];
        this.ensureClientId();
        const ids = [];
        const messages = [];
        for (const auditLog of auditLogs) {
            const id = generate();
            ids.push(id);
            const payload = JSON.stringify(auditLog.toPayload());
            messages.push(this.buildMessage(id, "AUDIT_LOG", payload, null, Object.keys(auditLog.headers).length > 0 ? auditLog.headers : null));
        }
        await this.driver.insertBatch(messages, tx);
        return ids;
    }
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
    async createPush(push, tx) {
        this.ensureClientId();
        const message = this.buildPushMessage(push);
        await this.driver.insert(message, tx);
        return message.id;
    }
    /**
     * Create several pushes in the outbox (batch). Every push is validated
     * before any is written. Returns the row ids in order.
     */
    async createPushes(pushes, tx) {
        if (pushes.length === 0)
            return [];
        this.ensureClientId();
        const messages = pushes.map((p) => this.buildPushMessage(p));
        await this.driver.insertBatch(messages, tx);
        return messages.map((m) => m.id);
    }
    /** Get the underlying driver. */
    getDriver() {
        return this.driver;
    }
    buildMessage(id, type, payload, messageGroup, headers) {
        const now = new Date().toISOString();
        return {
            id,
            type,
            message_group: messageGroup,
            payload,
            status: OutboxStatus.PENDING,
            created_at: now,
            updated_at: now,
            client_id: this.clientId,
            payload_size: new TextEncoder().encode(payload).byteLength,
            headers,
        };
    }
    buildPushMessage(push) {
        const id = push.id && push.id !== "" ? push.id : generate();
        const payload = push.toPayloadJson(id, this.clientCode);
        return this.buildMessage(id, "PUSH", payload, push.resolvedMessageGroup(), null);
    }
    ensureClientId() {
        if (!this.clientId) {
            throw new Error("OutboxManager: clientId is required. Provide a valid client ID when constructing the OutboxManager.");
        }
    }
}
