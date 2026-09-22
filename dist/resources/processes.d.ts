/**
 * Processes Resource
 *
 * Manage process documentation — free-form workflow diagrams (typically
 * Mermaid source) describing how events, reactive aggregates, and dispatch
 * jobs compose into business processes inside an application.
 *
 * Codes follow the pattern `{application}:{subdomain}:{process-name}`, mirroring
 * EventType. The `body` field is stored verbatim and rendered client-side.
 */
import type { ResultAsync } from "neverthrow";
import type { SdkError } from "../errors.js";
import type { FlowCatalystClient } from "../client.js";
import type { ListProcessesResponse, GetProcessResponse, CreateProcessData, UpdateProcessData, SyncProcessesData, SyncProcessesResponse as SyncProcessesResponseType } from "../generated/types.gen.js";
/** Pagination params (page/size). Mirrors the previous generated shape. */
export type PaginationParams = {
    page?: number;
    size?: number;
};
export type ProcessListResponse = ListProcessesResponse;
export type ProcessResponse = GetProcessResponse;
export type CreateProcessRequest = CreateProcessData["body"];
export type UpdateProcessRequest = UpdateProcessData["body"];
export type SyncProcessesResponse = SyncProcessesResponseType;
export interface ProcessFilters {
    status?: string;
    application?: string;
    subdomain?: string;
    search?: string;
}
/**
 * Processes resource for managing workflow / process documentation.
 */
export declare class ProcessesResource {
    private readonly client;
    constructor(client: FlowCatalystClient);
    /** List processes with optional filters. */
    list(filters?: ProcessFilters, pagination?: PaginationParams): ResultAsync<ProcessListResponse, SdkError>;
    /** Get a process by ID. */
    get(id: string): ResultAsync<ProcessResponse, SdkError>;
    /** Get a process by code (`{app}:{subdomain}:{process}`). */
    getByCode(code: string): ResultAsync<ProcessResponse, SdkError>;
    /** Create a new process. */
    create(data: CreateProcessRequest): ResultAsync<ProcessResponse, SdkError>;
    /** Update a process. */
    update(id: string, data: UpdateProcessRequest): ResultAsync<ProcessResponse, SdkError>;
    /** Archive a process (soft-delete). */
    archive(id: string): ResultAsync<unknown, SdkError>;
    /** Hard-delete a process. Only allowed once archived. */
    delete(id: string): ResultAsync<unknown, SdkError>;
    /**
     * Sync processes for an application. The platform reconciles the
     * provided list against existing API/CODE-sourced processes; UI-sourced
     * processes are never touched.
     *
     * Calls `POST /api/applications/{applicationCode}/processes/sync`.
     */
    sync(applicationCode: string, processes: SyncProcessesData["body"]["processes"], removeUnlisted?: boolean): ResultAsync<SyncProcessesResponse, SdkError>;
}
//# sourceMappingURL=processes.d.ts.map