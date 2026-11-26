/**
 * A push to the clients of an application, written to the outbox in the same
 * transaction as the change it announces (docs/push-gateway-spec.md section
 * 6.1). The platform's outbox processor sends the row to the push gateway
 * (`POST /api/push/batch`), which fans it out to the clients listening on the
 * topic over server-sent events.
 *
 * Pushes are signals: the clients read the change again. Durable work is
 * events and dispatch jobs.
 *
 * The rules are the push contract's section 1, the refusal codes those of
 * `conformance/push/topics.json`, and the payload / row shape that of the Go
 * SDK (`pkg/fcsdk/outbox/push.go`); the shared vector `outbox-push.json` pins
 * all three.
 */
/** The row type of a push. */
export declare const PUSH_MESSAGE_TYPE: "PUSH";
/**
 * The Postgres notification channel a PUSH row's writer NOTIFYs in the same
 * statement as the insert, so a processor that listens on it delivers the push
 * at once instead of at its next poll.
 */
export declare const PUSH_NOTIFY_CHANNEL = "fc_outbox_push";
/** Longest topic, in characters. */
export declare const MAX_PUSH_TOPIC_LENGTH = 255;
/** Longest type, in characters. */
export declare const MAX_PUSH_TYPE_LENGTH = 100;
/** Default data limit in bytes (`push.max-data-bytes`). */
export declare const DEFAULT_PUSH_MAX_DATA_BYTES = 16384;
/** The most the data limit may be set to. */
export declare const MAX_PUSH_DATA_BYTES = 65536;
/** The codes of a refused push. */
export declare const PushErrorCode: {
    readonly TOPIC_INVALID: "TOPIC_INVALID";
    readonly TYPE_INVALID: "TYPE_INVALID";
    readonly TYPE_RESERVED: "TYPE_RESERVED";
    readonly DATA_INVALID: "DATA_INVALID";
    readonly DATA_NOT_OBJECT: "DATA_NOT_OBJECT";
    readonly DATA_TOO_LARGE: "DATA_TOO_LARGE";
    readonly PUSH_ID_INVALID: "PUSH_ID_INVALID";
    readonly CLIENT_INVALID: "CLIENT_INVALID";
};
export type PushErrorCodeValue = (typeof PushErrorCode)[keyof typeof PushErrorCode];
/** Thrown when a push is refused at write; `code` is one of {@link PushErrorCode}. */
export declare class PushError extends Error {
    readonly code: PushErrorCodeValue;
    constructor(code: PushErrorCodeValue, message: string);
}
/** The client code that means "the platform": left out of the payload. */
export declare const PLATFORM_CLIENT_CODE = "_platform";
/** The payload of a PUSH row and `POST /api/push/batch`'s item. */
export interface PushPayload {
    topic: string;
    type: string;
    data: Record<string, unknown>;
    clientCode?: string;
    pushId: string;
}
export interface CreatePushParams {
    topic: string;
    type: string;
    data: unknown;
    id?: string;
    clientCode?: string;
    messageGroup?: string;
    ungrouped?: boolean;
    maxDataBytes?: number;
}
/**
 * Build with {@link CreatePushDto.create} and the `with*` methods; the outbox
 * manager validates before writing, so a push the platform would refuse
 * terminally is never stored.
 *
 * ```ts
 * await outbox.createPush(
 *   CreatePushDto.create("shop:orders:ord_2", "order.updated", { status: "shipped" }),
 *   tx,
 * );
 * ```
 */
export declare class CreatePushDto {
    /** The row id and the payload's `pushId`; a TSID is generated when unset. At most 26 characters `[0-9A-Za-z_-]`. */
    readonly id: string | null;
    /** `{application}:{segment}(:{segment})*`; the first segment is the application. */
    readonly topic: string;
    /** `[a-z][a-z0-9-]*(.[a-z][a-z0-9-]*)*`; `reset`, `auth-expired`, `subscribed` and `fw.*` are reserved. */
    readonly type: string;
    /**
     * What the listeners receive. A JSON object, or JSON text (a string) that
     * holds one; anything else is refused with `DATA_NOT_OBJECT`.
     */
    readonly data: unknown;
    /** The client the push is for, by identifier. Unset: the writer's configured client code. */
    readonly clientCode: string | null;
    /** The outbox message group. Unset: the topic (order within a topic). */
    readonly messageGroup: string | null;
    /** No message group: batched, concurrent, unordered. For signal-only topics. */
    readonly ungrouped: boolean;
    /** The data limit (default 16 KiB, at most 64 KiB): the application's `push.max-data-bytes`. */
    readonly maxDataBytes: number | null;
    private constructor();
    static create(topic: string, type: string, data: unknown): CreatePushDto;
    withId(id: string): CreatePushDto;
    withClientCode(clientCode: string): CreatePushDto;
    /** Replace the topic as the message group. Ignored when {@link withUngrouped}. */
    withMessageGroup(messageGroup: string): CreatePushDto;
    /** Write the row with no message group. */
    withUngrouped(): CreatePushDto;
    withMaxDataBytes(maxDataBytes: number): CreatePushDto;
    private toParams;
    private limit;
    /**
     * Apply the push contract's section 1 (topic, type, data) and the row's own
     * rules (id, client code, group), in the Go SDK's order.
     *
     * @throws {PushError}
     */
    validate(): void;
    /**
     * Run every rule (topic, type, data, id, client, group) and return the data
     * as compact JSON text. @throws {PushError}
     */
    private compactData;
    /**
     * Validate and serialise as the PUSH row's payload JSON text, members in the
     * framework's order: `topic`, `type`, `data`, `clientCode`, `pushId`.
     * `data` is the object itself, never encoded JSON in a string.
     *
     * @param id the row id (also the `pushId`).
     * @param defaultClientCode the writer's client code, used when the push
     *   names none; `_platform` leaves `clientCode` out.
     * @throws {PushError}
     */
    toPayloadJson(id: string, defaultClientCode?: string | null): string;
    /** The message group the row is written with: none when ungrouped, else the override, else the topic. */
    resolvedMessageGroup(): string | null;
}
//# sourceMappingURL=create-push-dto.d.ts.map