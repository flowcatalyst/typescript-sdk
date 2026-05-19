/**
 * Audit Logs Resource
 *
 * Query the platform's `iam_audit_logs` table — every UoW commit emits a
 * row here in addition to its domain event. Read-only by design.
 */
import type { ResultAsync } from "neverthrow";
import type { SdkError } from "../errors";
import type { FlowCatalystClient } from "../client";
import type { GetApiAuditLogsData, GetApiAuditLogsResponse, GetApiAuditLogsByIdResponse, GetApiAuditLogsRecentResponse, GetApiAuditLogsEntityByEntityTypeByEntityIdResponse, GetApiAuditLogsPrincipalByPrincipalIdResponse } from "../generated/types.gen";
export type AuditLogFilters = GetApiAuditLogsData["query"];
export type AuditLogListResponse = GetApiAuditLogsResponse;
export type AuditLogDto = GetApiAuditLogsByIdResponse;
export type RecentAuditLogsResponse = GetApiAuditLogsRecentResponse;
export type AuditLogsForEntityResponse = GetApiAuditLogsEntityByEntityTypeByEntityIdResponse;
export type AuditLogsForPrincipalResponse = GetApiAuditLogsPrincipalByPrincipalIdResponse;
/**
 * Audit logs resource for querying audit history.
 */
export declare class AuditLogsResource {
    private readonly client;
    constructor(client: FlowCatalystClient);
    /**
     * List audit logs with optional filters and pagination.
     */
    list(filters?: AuditLogFilters): ResultAsync<AuditLogListResponse, SdkError>;
    /**
     * Get a single audit log entry by ID.
     */
    get(id: string): ResultAsync<AuditLogDto, SdkError>;
    /**
     * Fetch recent audit log entries (typically last 100, server-defined).
     */
    recent(): ResultAsync<RecentAuditLogsResponse, SdkError>;
    /**
     * Fetch audit log entries for a specific entity.
     */
    forEntity(entityType: string, entityId: string): ResultAsync<AuditLogsForEntityResponse, SdkError>;
    /**
     * Fetch audit log entries for actions performed by a specific principal.
     */
    forPrincipal(principalId: string): ResultAsync<AuditLogsForPrincipalResponse, SdkError>;
}
//# sourceMappingURL=audit-logs.d.ts.map