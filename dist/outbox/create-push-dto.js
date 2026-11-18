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
export const PUSH_MESSAGE_TYPE = "PUSH";
/**
 * The Postgres notification channel a PUSH row's writer NOTIFYs in the same
 * statement as the insert, so a processor that listens on it delivers the push
 * at once instead of at its next poll.
 */
export const PUSH_NOTIFY_CHANNEL = "fc_outbox_push";
/** Longest topic, in characters. */
export const MAX_PUSH_TOPIC_LENGTH = 255;
/** Longest type, in characters. */
export const MAX_PUSH_TYPE_LENGTH = 100;
/** Default data limit in bytes (`push.max-data-bytes`). */
export const DEFAULT_PUSH_MAX_DATA_BYTES = 16384;
/** The most the data limit may be set to. */
export const MAX_PUSH_DATA_BYTES = 65536;
/** The codes of a refused push. */
export const PushErrorCode = {
    TOPIC_INVALID: "TOPIC_INVALID",
    TYPE_INVALID: "TYPE_INVALID",
    TYPE_RESERVED: "TYPE_RESERVED",
    DATA_INVALID: "DATA_INVALID",
    DATA_NOT_OBJECT: "DATA_NOT_OBJECT",
    DATA_TOO_LARGE: "DATA_TOO_LARGE",
    PUSH_ID_INVALID: "PUSH_ID_INVALID",
    CLIENT_INVALID: "CLIENT_INVALID",
};
/** Thrown when a push is refused at write; `code` is one of {@link PushErrorCode}. */
export class PushError extends Error {
    constructor(code, message) {
        super(`invalid push: ${code}: ${message}`);
        this.name = "PushError";
        this.code = code;
    }
}
const APPLICATION_PATTERN = /^[a-z][a-z0-9-]*$/;
const SEGMENT_PATTERN = /^[0-9A-Za-z_.-]+$/;
const ROW_ID_PATTERN = /^[0-9A-Za-z_-]{1,26}$/;
/** The client code that means "the platform": left out of the payload. */
export const PLATFORM_CLIENT_CODE = "_platform";
const utf8Length = (s) => new TextEncoder().encode(s).byteLength;
/** Whitespace-strip JSON text without re-serialising its values. */
function compactJson(text) {
    let out = "";
    let inString = false;
    let escaped = false;
    for (const ch of text) {
        if (inString) {
            out += ch;
            if (escaped)
                escaped = false;
            else if (ch === "\\")
                escaped = true;
            else if (ch === '"')
                inString = false;
            continue;
        }
        if (ch === '"') {
            inString = true;
            out += ch;
        }
        else if (ch !== " " && ch !== "\t" && ch !== "\n" && ch !== "\r") {
            out += ch;
        }
    }
    return out;
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
export class CreatePushDto {
    constructor(params) {
        this.id = params.id ?? null;
        this.topic = params.topic;
        this.type = params.type;
        this.data = params.data;
        this.clientCode = params.clientCode ?? null;
        this.messageGroup = params.messageGroup ?? null;
        this.ungrouped = params.ungrouped ?? false;
        this.maxDataBytes = params.maxDataBytes ?? null;
    }
    static create(topic, type, data) {
        return new CreatePushDto({ topic, type, data });
    }
    withId(id) {
        return new CreatePushDto({ ...this.toParams(), id });
    }
    withClientCode(clientCode) {
        return new CreatePushDto({ ...this.toParams(), clientCode });
    }
    /** Replace the topic as the message group. Ignored when {@link withUngrouped}. */
    withMessageGroup(messageGroup) {
        return new CreatePushDto({ ...this.toParams(), messageGroup });
    }
    /** Write the row with no message group. */
    withUngrouped() {
        return new CreatePushDto({ ...this.toParams(), ungrouped: true });
    }
    withMaxDataBytes(maxDataBytes) {
        return new CreatePushDto({ ...this.toParams(), maxDataBytes });
    }
    toParams() {
        return {
            topic: this.topic,
            type: this.type,
            data: this.data,
            ...(this.id !== null && { id: this.id }),
            ...(this.clientCode !== null && { clientCode: this.clientCode }),
            ...(this.messageGroup !== null && { messageGroup: this.messageGroup }),
            ungrouped: this.ungrouped,
            ...(this.maxDataBytes !== null && { maxDataBytes: this.maxDataBytes }),
        };
    }
    limit() {
        return this.maxDataBytes !== null && this.maxDataBytes > 0
            ? Math.min(this.maxDataBytes, MAX_PUSH_DATA_BYTES)
            : DEFAULT_PUSH_MAX_DATA_BYTES;
    }
    /**
     * Apply the push contract's section 1 (topic, type, data) and the row's own
     * rules (id, client code, group), in the Go SDK's order.
     *
     * @throws {PushError}
     */
    validate() {
        this.compactData();
    }
    /**
     * Run every rule (topic, type, data, id, client, group) and return the data
     * as compact JSON text. @throws {PushError}
     */
    compactData() {
        const t = this.topic;
        if (t.length > MAX_PUSH_TOPIC_LENGTH) {
            throw new PushError(PushErrorCode.TOPIC_INVALID, `a topic is at most ${MAX_PUSH_TOPIC_LENGTH} characters`);
        }
        const segs = t.split(":");
        if (segs.length < 2 || !APPLICATION_PATTERN.test(segs[0] ?? "")) {
            throw new PushError(PushErrorCode.TOPIC_INVALID, `a topic is {application}:{segment}(:{segment})*: "${t}"`);
        }
        for (const s of segs.slice(1)) {
            if (!SEGMENT_PATTERN.test(s)) {
                throw new PushError(PushErrorCode.TOPIC_INVALID, `a topic segment is [0-9A-Za-z_.-]+: "${t}"`);
            }
        }
        const ty = this.type;
        if (ty.length > MAX_PUSH_TYPE_LENGTH) {
            throw new PushError(PushErrorCode.TYPE_INVALID, `a type is at most ${MAX_PUSH_TYPE_LENGTH} characters`);
        }
        for (const part of ty.split(".")) {
            if (!APPLICATION_PATTERN.test(part)) {
                throw new PushError(PushErrorCode.TYPE_INVALID, `a type is [a-z][a-z0-9-]*(.[a-z][a-z0-9-]*)*: "${ty}"`);
            }
        }
        if (ty === "reset" ||
            ty === "auth-expired" ||
            ty === "subscribed" ||
            ty.startsWith("fw.")) {
            throw new PushError(PushErrorCode.TYPE_RESERVED, `the type "${ty}" is reserved`);
        }
        let text;
        if (typeof this.data === "string") {
            text = this.data.trim();
            if (text === "") {
                throw new PushError(PushErrorCode.DATA_INVALID, "the data is not valid JSON");
            }
            try {
                JSON.parse(text);
            }
            catch {
                throw new PushError(PushErrorCode.DATA_INVALID, "the data is not valid JSON");
            }
            if (!text.startsWith("{")) {
                throw new PushError(PushErrorCode.DATA_NOT_OBJECT, "the data is not a JSON object");
            }
            text = compactJson(text);
        }
        else {
            let s;
            try {
                s = JSON.stringify(this.data);
            }
            catch (e) {
                throw new PushError(PushErrorCode.DATA_INVALID, `the data does not marshal to JSON: ${e instanceof Error ? e.message : String(e)}`);
            }
            if (s === undefined) {
                throw new PushError(PushErrorCode.DATA_INVALID, "the data is not valid JSON");
            }
            if (!s.startsWith("{")) {
                throw new PushError(PushErrorCode.DATA_NOT_OBJECT, "the data is not a JSON object");
            }
            text = s;
        }
        const size = utf8Length(text);
        if (size > this.limit()) {
            throw new PushError(PushErrorCode.DATA_TOO_LARGE, `the data is ${size} bytes, more than ${this.limit()}`);
        }
        if (this.id !== null && this.id !== "" && !ROW_ID_PATTERN.test(this.id)) {
            throw new PushError(PushErrorCode.PUSH_ID_INVALID, "id must match [0-9A-Za-z_-]{1,26}");
        }
        if (this.clientCode !== null &&
            this.clientCode !== "" &&
            (this.clientCode.length > 100 || this.clientCode.trim() === "")) {
            throw new PushError(PushErrorCode.CLIENT_INVALID, "clientCode must be 1 to 100 characters");
        }
        if (this.messageGroup !== null && this.messageGroup.length > 255) {
            throw new PushError(PushErrorCode.TOPIC_INVALID, "messageGroup is at most 255 characters");
        }
        return text;
    }
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
    toPayloadJson(id, defaultClientCode) {
        const data = this.compactData();
        let code = (this.clientCode ?? "").trim();
        if (code === "") {
            const c = (defaultClientCode ?? "").trim();
            if (c !== PLATFORM_CLIENT_CODE)
                code = c;
        }
        return (`{"topic":${JSON.stringify(this.topic)},"type":${JSON.stringify(this.type)},"data":${data}` +
            (code !== "" ? `,"clientCode":${JSON.stringify(code)}` : "") +
            `,"pushId":${JSON.stringify(id)}}`);
    }
    /** The message group the row is written with: none when ungrouped, else the override, else the topic. */
    resolvedMessageGroup() {
        if (this.ungrouped)
            return null;
        return this.messageGroup && this.messageGroup !== ""
            ? this.messageGroup
            : this.topic;
    }
}
