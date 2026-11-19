/**
 * Scheduled Jobs Resource — CRUD + state transitions + history reads.
 *
 * Hand-typed (does not depend on generated OpenAPI types) so it works
 * without regenerating the SDK after server-side endpoint changes. Mirrors
 * the shape of `EventTypesResource` for callers.
 *
 * SDK callbacks (`logForInstance`, `completeInstance`) live here too so
 * consumers don't need a second resource accessor.
 */
import { ResultAsync, errAsync, okAsync } from "neverthrow";
import type { SdkError } from "../errors.js";
import { httpError, mapHttpStatusToError } from "../errors.js";
import type { FlowCatalystClient } from "../client.js";
export type ScheduledJobStatus = "ACTIVE" | "PAUSED" | "ARCHIVED";
export type TriggerKind = "CRON" | "MANUAL";
export type InstanceStatus = "QUEUED" | "IN_FLIGHT" | "DELIVERED" | "COMPLETED" | "FAILED" | "DELIVERY_FAILED";
export type CompletionStatus = "SUCCESS" | "FAILURE";
export type LogLevel = "DEBUG" | "INFO" | "WARN" | "ERROR";
export interface ScheduledJob {
    id: string;
    clientId?: string | null;
    code: string;
    name: string;
    description?: string;
    status: ScheduledJobStatus;
    crons: string[];
    timezone: string;
    payload?: unknown;
    concurrent: boolean;
    tracksCompletion: boolean;
    timeoutSeconds?: number;
    deliveryMaxAttempts: number;
    targetUrl?: string;
    lastFiredAt?: string;
    createdAt: string;
    updatedAt: string;
    createdBy?: string;
    updatedBy?: string;
    version: number;
    hasActiveInstance: boolean;
}
export interface ScheduledJobInstance {
    id: string;
    scheduledJobId: string;
    clientId?: string | null;
    jobCode: string;
    triggerKind: TriggerKind;
    scheduledFor?: string;
    firedAt: string;
    deliveredAt?: string;
    completedAt?: string;
    status: InstanceStatus;
    deliveryAttempts: number;
    deliveryError?: string;
    completionStatus?: CompletionStatus;
    completionResult?: unknown;
    correlationId?: string;
    createdAt: string;
}
export interface ScheduledJobInstanceLog {
    id: string;
    instanceId: string;
    level: LogLevel;
    message: string;
    metadata?: unknown;
    createdAt: string;
}
export interface PaginatedJobs {
    data: ScheduledJob[];
    page: number;
    size: number;
    total: number;
    totalPages: number;
}
export interface PaginatedInstances {
    data: ScheduledJobInstance[];
    page: number;
    size: number;
    total: number;
    totalPages: number;
}
export interface CreateScheduledJobRequest {
    code: string;
    name: string;
    description?: string;
    clientId?: string | null;
    /** The registered Application that owns this job — a separate axis from clientId (tenant vs. registered app). */
    applicationId?: string | null;
    crons: string[];
    timezone?: string;
    payload?: unknown;
    concurrent?: boolean;
    tracksCompletion?: boolean;
    timeoutSeconds?: number;
    deliveryMaxAttempts?: number;
    targetUrl?: string;
}
export interface UpdateScheduledJobRequest {
    name?: string;
    description?: string;
    crons?: string[];
    timezone?: string;
    payload?: unknown;
    concurrent?: boolean;
    tracksCompletion?: boolean;
    timeoutSeconds?: number;
    deliveryMaxAttempts?: number;
    targetUrl?: string;
}
export interface ListJobsFilters {
    clientId?: string | "platform";
    status?: ScheduledJobStatus;
    search?: string;
    page?: number;
    size?: number;
}
export interface ListInstancesFilters {
    status?: InstanceStatus;
    triggerKind?: TriggerKind;
    from?: string;
    to?: string;
    page?: number;
    size?: number;
}
export interface FireRequest {
    correlationId?: string;
}
export interface InstanceLogRequest {
    message: string;
    level?: LogLevel;
    metadata?: unknown;
}
export interface InstanceCompleteRequest {
    status: CompletionStatus;
    result?: unknown;
}
export declare class ScheduledJobsResource {
    private readonly client;
    constructor(client: FlowCatalystClient);
    /** Create a new scheduled job. Returns the new job's id. */
    create(req: CreateScheduledJobRequest): ResultAsync<{
        id: string;
    }, SdkError>;
    list(filters?: ListJobsFilters): ResultAsync<PaginatedJobs, SdkError>;
    get(id: string): ResultAsync<ScheduledJob, SdkError>;
    getByCode(code: string, clientId?: string): ResultAsync<ScheduledJob, SdkError>;
    update(id: string, req: UpdateScheduledJobRequest): ResultAsync<void, SdkError>;
    pause(id: string): ResultAsync<void, SdkError>;
    resume(id: string): ResultAsync<void, SdkError>;
    archive(id: string): ResultAsync<void, SdkError>;
    delete(id: string): ResultAsync<void, SdkError>;
    /** Manually fire a scheduled job. Returns the new instance's id. */
    fire(id: string, req?: FireRequest): ResultAsync<{
        id: string;
    }, SdkError>;
    listInstances(jobId: string, filters?: ListInstancesFilters): ResultAsync<PaginatedInstances, SdkError>;
    getInstance(instanceId: string): ResultAsync<ScheduledJobInstance, SdkError>;
    listInstanceLogs(instanceId: string): ResultAsync<ScheduledJobInstanceLog[], SdkError>;
    logForInstance(instanceId: string, req: InstanceLogRequest): ResultAsync<void, SdkError>;
    completeInstance(instanceId: string, req: InstanceCompleteRequest): ResultAsync<void, SdkError>;
    private fetch;
}
export { mapHttpStatusToError, httpError, ResultAsync, errAsync, okAsync };
//# sourceMappingURL=scheduled-jobs.d.ts.map