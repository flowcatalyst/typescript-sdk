/**
 * Field Devices Resource
 *
 * Admin API for enrolled field devices and their single-use enrolment codes.
 * Mirrors the Go SDK's `FieldDevicesResource`.
 */
import type { ResultAsync } from "neverthrow";
import type { SdkError } from "../errors.js";
import type { FlowCatalystClient } from "../client.js";
import type { CreateFieldEnrolmentCodeData, CreateFieldEnrolmentCodeResponse, ListFieldDevicesData, ListFieldDevicesResponse, GetFieldDeviceResponse, SuspendFieldDeviceResponse, ActivateFieldDeviceResponse, RevokeFieldDeviceResponse } from "../generated/types.gen.js";
export type CreateEnrolmentCodeRequest = CreateFieldEnrolmentCodeData["body"];
export type FieldDeviceFilters = NonNullable<ListFieldDevicesData["query"]>;
export type FieldEnrolmentCode = CreateFieldEnrolmentCodeResponse;
export type FieldDeviceDto = GetFieldDeviceResponse;
export type FieldDeviceListResponse = ListFieldDevicesResponse;
export declare class FieldDevicesResource {
    private readonly client;
    constructor(client: FlowCatalystClient);
    /** Mint a single-use enrolment code (render `qrPayload` as a QR code). */
    createEnrolmentCode(data: CreateEnrolmentCodeRequest): ResultAsync<FieldEnrolmentCode, SdkError>;
    /** List one client's devices, with optional filters. */
    list(clientId: string, filters?: Omit<FieldDeviceFilters, "clientId">): ResultAsync<FieldDeviceListResponse, SdkError>;
    get(id: string): ResultAsync<FieldDeviceDto, SdkError>;
    /** Revokes the device's sessions. */
    suspend(id: string): ResultAsync<SuspendFieldDeviceResponse, SdkError>;
    activate(id: string): ResultAsync<ActivateFieldDeviceResponse, SdkError>;
    /** Permanent; revokes the device's sessions. */
    revoke(id: string): ResultAsync<RevokeFieldDeviceResponse, SdkError>;
}
//# sourceMappingURL=field-devices.d.ts.map