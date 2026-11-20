/**
 * Field Policies Resource
 *
 * Per-client field-worker policy (PIN length, lock thresholds, idle and shift
 * limits). Mirrors the Go SDK's `FieldPoliciesResource`.
 */
import * as sdk from "../generated/sdk.gen.js";
export class FieldPoliciesResource {
    constructor(client) {
        this.client = client;
    }
    /** The client's effective policy (`isDefault` when none is stored). */
    get(clientId) {
        return this.client.request((httpClient, headers) => sdk.getFieldPolicy({ client: httpClient, headers, path: { clientId } }));
    }
    /**
     * Set the policy. A PUT replaces the policy: a member left out takes the
     * platform default (`photosEnabled` true, `workerMaySetOwnPhoto` false), so
     * read the policy with `get` and send every member back to change one.
     */
    put(clientId, data) {
        return this.client.request((httpClient, headers) => sdk.putFieldPolicy({
            client: httpClient,
            headers,
            path: { clientId },
            body: data,
        }));
    }
    /**
     * Delete every stored photo of the client's field workers, whatever the
     * policy's `photosEnabled` says (switching photos off only hides them).
     * Answers `{ removed }`; repeating it removes none. Needs
     * `platform:iam:field-worker:manage` for the client; an application-confined
     * service account is refused (403 `APPLICATION_FORBIDDEN`): it removes its own
     * workers' photos one at a time. It cannot be undone.
     */
    deletePhotos(clientId) {
        return this.client.request((httpClient, headers) => sdk.deleteClientFieldWorkerPhotos({
            client: httpClient,
            headers,
            path: { clientId },
        }));
    }
}
