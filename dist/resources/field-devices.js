/**
 * Field Devices Resource
 *
 * Admin API for enrolled field devices and their single-use enrolment codes.
 * Mirrors the Go SDK's `FieldDevicesResource`.
 */
import * as sdk from "../generated/sdk.gen.js";
export class FieldDevicesResource {
    constructor(client) {
        this.client = client;
    }
    /** Mint a single-use enrolment code (render `qrPayload` as a QR code). */
    createEnrolmentCode(data) {
        return this.client.request((httpClient, headers) => sdk.createFieldEnrolmentCode({
            client: httpClient,
            headers,
            body: data,
        }));
    }
    /** List one client's devices, with optional filters. */
    list(clientId, filters) {
        return this.client.request((httpClient, headers) => sdk.listFieldDevices({
            client: httpClient,
            headers,
            query: { ...filters, clientId },
        }));
    }
    get(id) {
        return this.client.request((httpClient, headers) => sdk.getFieldDevice({ client: httpClient, headers, path: { id } }));
    }
    /** Revokes the device's sessions. */
    suspend(id) {
        return this.client.request((httpClient, headers) => sdk.suspendFieldDevice({ client: httpClient, headers, path: { id } }));
    }
    activate(id) {
        return this.client.request((httpClient, headers) => sdk.activateFieldDevice({ client: httpClient, headers, path: { id } }));
    }
    /** Permanent; revokes the device's sessions. */
    revoke(id) {
        return this.client.request((httpClient, headers) => sdk.revokeFieldDevice({ client: httpClient, headers, path: { id } }));
    }
}
