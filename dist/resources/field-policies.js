/**
 * Field Policies Resource
 *
 * Per-client field-worker policy (PIN length, lock thresholds, idle and shift
 * limits). Mirrors the Go SDK's `FieldPoliciesResource`.
 */
import * as sdk from "../generated/sdk.gen.js";
/**
 * The PUT request that stores `policy` again unchanged: every member the
 * platform returns is carried (the unlock-key settings and `pinReauthDays: 0`
 * included), and the response-only members (`clientId`, `isDefault`,
 * `updatedAt`, `$schema`) are left out.
 */
export function toPutFieldPolicyRequest(policy) {
    const { clientId: _c, isDefault: _d, updatedAt: _u, $schema: _s, ...rest } = policy;
    return rest;
}
export class FieldPoliciesResource {
    constructor(client) {
        this.client = client;
    }
    /** The client's effective policy (`isDefault` when none is stored). */
    get(clientId) {
        return this.client.request((httpClient, headers) => sdk.getFieldPolicy({ client: httpClient, headers, path: { clientId } }));
    }
    /**
     * Set the policy. A PUT REPLACES the policy: a member left out takes the
     * platform default (`photosEnabled` true, `workerMaySetOwnPhoto` false,
     * `pinReauthDays` 0, `unlockKeysEnabled` false, `unlockKeyAttestation`
     * `NONE`), so read the policy with `get` and send every member back to
     * change one: use `update`, or start from `toPutFieldPolicyRequest(policy)`.
     *
     * Leaving `unlockKeysEnabled` out switches unlock keys off for the client,
     * revokes all its keys and signs those workers out.
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
     * Read the policy, let `change` alter the request that would store it
     * unchanged, and write the result: every member `change` does not touch
     * keeps its stored value, members this SDK does not know included (it
     * sends back what the platform returned). The read and the write are two
     * calls: a policy edited by someone else in between is overwritten with
     * what was read.
     */
    update(clientId, change) {
        return this.get(clientId).andThen((policy) => {
            const request = toPutFieldPolicyRequest(policy);
            change(request);
            return this.put(clientId, request);
        });
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
