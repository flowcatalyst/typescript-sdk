/**
 * Field Tokens Resource
 *
 * Online introspection of a field access token (the offline signature check
 * is `FieldTokenVerifier`). Mirrors the Go SDK's `FieldTokensResource`.
 */
import type { ResultAsync } from "neverthrow";
import type { SdkError } from "../errors.js";
import type { FlowCatalystClient } from "../client.js";
import type { IntrospectFieldTokenResponse } from "../generated/types.gen.js";
/**
 * Only `active` is set when the token is unusable (bad signature, expired,
 * revoked session, suspended worker or device, or outside the caller's reach).
 */
export type FieldTokenIntrospection = IntrospectFieldTokenResponse;
export declare class FieldTokensResource {
    private readonly client;
    constructor(client: FlowCatalystClient);
    /** Use when an offline check is not enough and the session must still be live. */
    introspect(token: string): ResultAsync<FieldTokenIntrospection, SdkError>;
}
//# sourceMappingURL=field-tokens.d.ts.map