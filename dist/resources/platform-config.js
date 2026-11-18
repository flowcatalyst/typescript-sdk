/**
 * Platform Config Resource
 *
 * Read and manage per-application platform configuration properties, and
 * reveal SECRET properties in plaintext.
 *
 * SECRET values: `list()` and `get()` ALWAYS return the literal `"***"` as the
 * `value` of a property whose `valueType` is `SECRET`, for every caller. The
 * only way to read a secret's plaintext is {@link PlatformConfigResource.revealSecret}.
 */
function actorHeaders(options) {
    const who = options?.onBehalfOf?.trim();
    return who ? { "X-On-Behalf-Of": who } : {};
}
const REDACTED = "[REDACTED]";
const INSPECT = Symbol.for("nodejs.util.inspect.custom");
/** Wrap the wire response so the plaintext does not leak via logging/serialisation. */
function toRevealedSecret(raw) {
    const meta = {
        applicationCode: raw.applicationCode,
        section: raw.section,
        property: raw.property,
        ...(raw.clientId !== undefined ? { clientId: raw.clientId } : {}),
        updatedAt: raw.updatedAt,
    };
    const out = { ...meta };
    Object.defineProperty(out, "value", {
        value: raw.value,
        enumerable: false,
        writable: false,
        configurable: false,
    });
    const redacted = () => ({ ...meta, value: REDACTED });
    const hidden = (fn) => ({
        value: fn,
        enumerable: false,
        writable: false,
        configurable: false,
    });
    Object.defineProperty(out, "toJSON", hidden(redacted));
    Object.defineProperty(out, "toString", hidden(() => JSON.stringify(redacted())));
    Object.defineProperty(out, INSPECT, hidden(() => `RevealedSecret ${JSON.stringify(redacted())}`));
    return out;
}
function query(scope) {
    return scope?.clientId ? { clientId: scope.clientId } : undefined;
}
export class PlatformConfigResource {
    constructor(client) {
        this.client = client;
    }
    /**
     * List the properties of an application.
     *
     * SECRET properties have `value === "***"`; use {@link revealSecret} for the plaintext.
     */
    list(app) {
        return this.client.request((httpClient, headers) => httpClient.get({
            url: "/api/platform-config/{app}",
            headers,
            path: { app },
        }));
    }
    /**
     * Get a property.
     *
     * For a SECRET property `value` is always `"***"`; use {@link revealSecret} for the plaintext.
     */
    get(app, section, property, scope) {
        return this.client.request((httpClient, headers) => httpClient.get({
            url: "/api/config/{app}/{section}/{property}",
            headers,
            path: { app, section, property },
            query: query(scope),
        }));
    }
    /**
     * Create or replace a property (`valueType: "SECRET"` stores it encrypted).
     *
     * A SECRET's value is required and the mask is not a value: setting a
     * secret to `"***"` is refused (`400 SECRET_VALUE_MASKED`), as is an empty
     * secret (`400 SECRET_VALUE_REQUIRED`). To leave a secret unchanged, do not
     * set it.
     */
    set(app, section, property, data, options) {
        const { clientId, ...body } = data;
        return this.client.request((httpClient, headers) => httpClient.put({
            url: "/api/config/{app}/{section}/{property}",
            headers: { ...headers, ...actorHeaders(options), "Content-Type": "application/json" },
            path: { app, section, property },
            query: query({ clientId }),
            body: { ...body, ...(clientId ? { clientId } : {}) },
        }));
    }
    /** Delete a property (audited; deleting one that is not there is not an error). */
    delete(app, section, property, scope) {
        return this.client.request((httpClient, headers) => httpClient.delete({
            url: "/api/config/{app}/{section}/{property}",
            headers: { ...headers, ...actorHeaders(scope) },
            path: { app, section, property },
            query: query(scope),
        }));
    }
    /**
     * Reveal a SECRET property's plaintext. This is the ONLY way to read one.
     *
     * `GET /api/config/{app}/{section}/{property}/secret[?clientId=]`
     *
     * Always a permission: `platform:admin:config:reveal` (a platform
     * administrator), or `platform:application-service:config:reveal` (an
     * application's service account; the `platform:application-service` role
     * carries it). The platform confines a service account to its own
     * applications and to the clients it is linked to (its explicit clients,
     * else the clients its application is enabled for), plus the
     * application-wide value. Every call is audited server-side (with
     * `options.onBehalfOf` when a service account says who it acts for).
     *
     * Errors: `forbidden` (403), `not_found` (404), and `http_error` with
     * `status: 400` and `body.error === "NOT_A_SECRET"` when the property is
     * PLAIN (use {@link get}).
     *
     * The call is NOT cached by the SDK and sends no caching headers; the
     * response carries `Cache-Control: no-store`. Add your own TTL cache if you
     * need one. Never log the returned `value`.
     */
    revealSecret(app, section, property, clientId, options) {
        return this.client
            .request((httpClient, headers) => httpClient.get({
            url: "/api/config/{app}/{section}/{property}/secret",
            headers: { ...headers, ...actorHeaders(options) },
            path: { app, section, property },
            query: query({ clientId }),
        }))
            .map(toRevealedSecret);
    }
}
