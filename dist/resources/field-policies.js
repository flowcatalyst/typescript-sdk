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
    /** Set the policy; omitted members take the platform default. */
    put(clientId, data) {
        return this.client.request((httpClient, headers) => sdk.putFieldPolicy({
            client: httpClient,
            headers,
            path: { clientId },
            body: data,
        }));
    }
}
