/**
 * Field Policies Resource
 *
 * Per-client field-worker policy (PIN length, lock thresholds, idle and shift
 * limits). Mirrors the Go SDK's `FieldPoliciesResource`.
 */
import type { ResultAsync } from "neverthrow";
import type { SdkError } from "../errors.js";
import type { FlowCatalystClient } from "../client.js";
import type { GetFieldPolicyResponse, PutFieldPolicyData, PutFieldPolicyResponse } from "../generated/types.gen.js";
export type PutFieldPolicyRequest = PutFieldPolicyData["body"];
export type FieldPolicyDto = GetFieldPolicyResponse;
export declare class FieldPoliciesResource {
    private readonly client;
    constructor(client: FlowCatalystClient);
    /** The client's effective policy (`isDefault` when none is stored). */
    get(clientId: string): ResultAsync<FieldPolicyDto, SdkError>;
    /** Set the policy; omitted members take the platform default. */
    put(clientId: string, data: PutFieldPolicyRequest): ResultAsync<PutFieldPolicyResponse, SdkError>;
}
//# sourceMappingURL=field-policies.d.ts.map