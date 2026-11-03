/**
 * Field Tokens Resource
 *
 * Online introspection of a field access token (the offline signature check
 * is `FieldTokenVerifier`). Mirrors the Go SDK's `FieldTokensResource`.
 */
import * as sdk from "../generated/sdk.gen.js";
export class FieldTokensResource {
    constructor(client) {
        this.client = client;
    }
    /** Use when an offline check is not enough and the session must still be live. */
    introspect(token) {
        return this.client.request((httpClient, headers) => sdk.introspectFieldToken({
            client: httpClient,
            headers,
            body: { token },
        }));
    }
}
