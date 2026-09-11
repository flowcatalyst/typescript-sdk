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
import * as sdk from "../generated/sdk.gen.js";
/**
 * Processes resource for managing workflow / process documentation.
 */
export class ProcessesResource {
    constructor(client) {
        this.client = client;
    }
    /** List processes with optional filters. */
    list(filters, pagination) {
        return this.client.request((httpClient, headers) => sdk.listProcesses({
            client: httpClient,
            headers,
            query: {
                ...pagination,
                ...filters,
            },
        }));
    }
    /** Get a process by ID. */
    get(id) {
        return this.client.request((httpClient, headers) => sdk.getProcess({
            client: httpClient,
            headers,
            path: { id },
        }));
    }
    /** Get a process by code (`{app}:{subdomain}:{process}`). */
    getByCode(code) {
        return this.client.request((httpClient, headers) => sdk.getProcessByCode({
            client: httpClient,
            headers,
            path: { code },
        }));
    }
    /** Create a new process. */
    create(data) {
        return this.client.request((httpClient, headers) => sdk.createProcess({
            client: httpClient,
            headers,
            body: data,
        }));
    }
    /** Update a process. */
    update(id, data) {
        return this.client.request((httpClient, headers) => sdk.updateProcess({
            client: httpClient,
            headers,
            path: { id },
            body: data,
        }));
    }
    /** Archive a process (soft-delete). */
    archive(id) {
        return this.client.request((httpClient, headers) => sdk.archiveProcess({
            client: httpClient,
            headers,
            path: { id },
        }));
    }
    /** Hard-delete a process. Only allowed once archived. */
    delete(id) {
        return this.client.request((httpClient, headers) => sdk.deleteProcess({
            client: httpClient,
            headers,
            path: { id },
        }));
    }
    /**
     * Sync processes for an application. The platform reconciles the
     * provided list against existing API/CODE-sourced processes; UI-sourced
     * processes are never touched.
     *
     * Calls `POST /api/applications/{applicationCode}/processes/sync`.
     */
    sync(applicationCode, processes, removeUnlisted = false) {
        return this.client.request((httpClient, headers) => sdk.syncProcesses({
            client: httpClient,
            headers,
            path: { appCode: applicationCode },
            body: { processes },
            query: { removeUnlisted },
        }));
    }
}
