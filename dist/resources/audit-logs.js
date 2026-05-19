/**
 * Audit Logs Resource
 *
 * Query the platform's `iam_audit_logs` table — every UoW commit emits a
 * row here in addition to its domain event. Read-only by design.
 */
import * as sdk from "../generated/sdk.gen";
/**
 * Audit logs resource for querying audit history.
 */
export class AuditLogsResource {
    constructor(client) {
        this.client = client;
    }
    /**
     * List audit logs with optional filters and pagination.
     */
    list(filters) {
        return this.client.request((httpClient, headers) => sdk.getApiAuditLogs({
            client: httpClient,
            headers,
            query: filters,
        }));
    }
    /**
     * Get a single audit log entry by ID.
     */
    get(id) {
        return this.client.request((httpClient, headers) => sdk.getApiAuditLogsById({
            client: httpClient,
            headers,
            path: { id },
        }));
    }
    /**
     * Fetch recent audit log entries (typically last 100, server-defined).
     */
    recent() {
        return this.client.request((httpClient, headers) => sdk.getApiAuditLogsRecent({
            client: httpClient,
            headers,
        }));
    }
    /**
     * Fetch audit log entries for a specific entity.
     */
    forEntity(entityType, entityId) {
        return this.client.request((httpClient, headers) => sdk.getApiAuditLogsEntityByEntityTypeByEntityId({
            client: httpClient,
            headers,
            path: { entityType, entityId },
        }));
    }
    /**
     * Fetch audit log entries for actions performed by a specific principal.
     */
    forPrincipal(principalId) {
        return this.client.request((httpClient, headers) => sdk.getApiAuditLogsPrincipalByPrincipalId({
            client: httpClient,
            headers,
            path: { principalId },
        }));
    }
}
