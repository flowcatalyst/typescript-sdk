/**
 * Field Policies Resource
 *
 * Per-client field-worker policy (PIN length, lock thresholds, idle and shift
 * limits). Mirrors the Go SDK's `FieldPoliciesResource`.
 */
import type { ResultAsync } from "neverthrow";
import type { SdkError } from "../errors.js";
import type { FlowCatalystClient } from "../client.js";
import type { GetFieldPolicyResponse, PutFieldPolicyData, PutFieldPolicyResponse, DeleteClientFieldWorkerPhotosResponse } from "../generated/types.gen.js";
export type PutFieldPolicyRequest = PutFieldPolicyData["body"];
export type FieldPolicyDto = GetFieldPolicyResponse;
export declare class FieldPoliciesResource {
    private readonly client;
    constructor(client: FlowCatalystClient);
    /** The client's effective policy (`isDefault` when none is stored). */
    get(clientId: string): ResultAsync<FieldPolicyDto, SdkError>;
    /**
     * Set the policy. A PUT replaces the policy: a member left out takes the
     * platform default (`photosEnabled` true, `workerMaySetOwnPhoto` false), so
     * read the policy with `get` and send every member back to change one.
     */
    put(clientId: string, data: PutFieldPolicyRequest): ResultAsync<PutFieldPolicyResponse, SdkError>;
    /**
     * Delete every stored photo of the client's field workers, whatever the
     * policy's `photosEnabled` says (switching photos off only hides them).
     * Answers `{ removed }`; repeating it removes none. Needs
     * `platform:iam:field-worker:manage` for the client; an application-confined
     * service account is refused (403 `APPLICATION_FORBIDDEN`): it removes its own
     * workers' photos one at a time. It cannot be undone.
     */
    deletePhotos(clientId: string): ResultAsync<DeleteClientFieldWorkerPhotosResponse, SdkError>;
}
//# sourceMappingURL=field-policies.d.ts.map