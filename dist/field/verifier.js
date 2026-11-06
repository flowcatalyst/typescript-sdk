/**
 * Field-worker token verification.
 *
 * A field worker signs in from an enrolled device with a PIN at the
 * platform's `/field/*`; the platform issues a short RS256 access token
 * (JOSE `typ: fc-field+jwt`, `token_use: "field"`, `aud` = app code) bound to
 * the device key (`cnf.jkt`). The app backend verifies, per request, the token
 * AND a DPoP proof (ES256 JWS) signed by the same device key:
 *
 *   Authorization: DPoP <token>
 *   DPoP: <proof>
 *
 * PINs never reach app backends; this module only verifies. Mirrors the Go
 * SDK's `auth.FieldTokenVerifier` (same checks, same refusal reasons). Nonce
 * checking is not done here; the proof's iat window is the replay bound.
 */
import { createHash, createPublicKey, verify as cryptoVerify, } from "node:crypto";
import { createRemoteJWKSet, decodeProtectedHeader, errors as joseErrors, jwtVerify, } from "jose";
/** Stable refusal reasons; the shared fixtures (api/field-fixtures) expect these strings. */
export const FieldReason = {
    Malformed: "malformed",
    WrongTyp: "wrong_typ",
    WrongTokenUse: "wrong_token_use",
    WrongAud: "wrong_aud",
    Expired: "expired",
    InvalidToken: "invalid_token",
    PCR: "pcr",
    MissingProof: "missing_proof",
    InvalidProof: "invalid_proof",
    JKTMismatch: "jkt_mismatch",
    HTMMismatch: "htm_mismatch",
    HTUMismatch: "htu_mismatch",
    ATHMismatch: "ath_mismatch",
    StaleProof: "stale_proof",
};
/** A refused field credential. `reason` is one of {@link FieldReason}. */
export class FieldError extends Error {
    constructor(reason, detail = "") {
        super(detail
            ? `field credential refused: ${reason}: ${detail}`
            : `field credential refused: ${reason}`);
        this.name = "FieldError";
        this.reason = reason;
        this.detail = detail;
    }
}
/**
 * Discovery or key fetch failed: not a verdict on the credential. Callers
 * should answer 503, not 401.
 */
export class FieldVerifierUnavailableError extends Error {
    constructor(message, options) {
        super(message);
        this.name = "FieldVerifierUnavailableError";
        if (options?.cause !== undefined) {
            this.cause = options.cause;
        }
    }
}
const FIELD_TYP = "fc-field+jwt";
export class FieldTokenVerifier {
    constructor(config) {
        this.cfg = {
            issuer: config.issuer.replace(/\/+$/, ""),
            appCode: config.appCode,
            clockSkewSeconds: config.clockSkewSeconds ?? 60,
            proofMaxAgeSeconds: config.proofMaxAgeSeconds ?? 300,
            now: config.now ?? (() => new Date()),
        };
        this.fetchFn = config.fetch ?? fetch;
        this.explicitJwksUrl = config.jwksUrl;
        this.keys = config.keys;
    }
    async resolveKeys() {
        if (this.keys)
            return this.keys;
        if (!this.pendingKeys) {
            const p = (async () => {
                let url = this.explicitJwksUrl;
                if (!url) {
                    const disco = `${this.cfg.issuer}/.well-known/openid-configuration`;
                    try {
                        const res = await this.fetchFn(disco, {
                            headers: { Accept: "application/json" },
                        });
                        if (!res.ok)
                            throw new Error(`HTTP ${res.status}`);
                        const doc = (await res.json());
                        if (!doc.jwks_uri)
                            throw new Error("no jwks_uri");
                        url = doc.jwks_uri;
                    }
                    catch (e) {
                        throw new FieldVerifierUnavailableError(`OIDC discovery failed (${disco}): ${e instanceof Error ? e.message : String(e)}`, { cause: e });
                    }
                }
                // jose's remote set caches keys and refreshes on kid miss.
                return createRemoteJWKSet(new URL(url));
            })();
            // A failed discovery must not stay memoized.
            p.catch(() => {
                if (this.pendingKeys === p)
                    this.pendingKeys = undefined;
            });
            this.pendingKeys = p;
        }
        this.keys = await this.pendingKeys;
        return this.keys;
    }
    /**
     * Check a request's credentials: the `Authorization` header (`DPoP
     * <token>`), the `DPoP` proof header, and the request's method and full
     * URL (scheme, host and path; any query is ignored). Resolves with the
     * verified principal, or rejects with a {@link FieldError} naming the
     * reason. Discovery/key-fetch failures reject with
     * {@link FieldVerifierUnavailableError}.
     */
    async verify(authorizationHeader, dpopHeader, method, requestUrl) {
        const m = /^\s*(\S+)\s+(\S+)\s*$/.exec(authorizationHeader ?? "");
        if (!m || m[1].toLowerCase() !== "dpop") {
            throw new FieldError(FieldReason.Malformed, 'Authorization must be "DPoP <token>"');
        }
        const token = m[2];
        let header;
        try {
            header = decodeProtectedHeader(token);
        }
        catch {
            throw new FieldError(FieldReason.Malformed, "not a compact JWS");
        }
        if (token.split(".").length !== 3) {
            throw new FieldError(FieldReason.Malformed, "not a compact JWS");
        }
        if (header.typ !== FIELD_TYP) {
            throw new FieldError(FieldReason.WrongTyp, `typ is ${header.typ ?? ""}`);
        }
        // RS256 only; refuse HS256, none, ES256, ... before touching the keys.
        if (header.alg !== "RS256") {
            throw new FieldError(FieldReason.InvalidToken, `alg must be RS256, got ${header.alg}`);
        }
        const keys = await this.resolveKeys();
        const now = this.cfg.now();
        let payload;
        try {
            ({ payload } = await jwtVerify(token, keys, {
                issuer: this.cfg.issuer,
                algorithms: ["RS256"],
                requiredClaims: ["exp"],
                clockTolerance: this.cfg.clockSkewSeconds,
                currentDate: now,
            }));
        }
        catch (e) {
            if (e instanceof joseErrors.JWTExpired) {
                throw new FieldError(FieldReason.Expired);
            }
            // Key-fetch trouble (timeout, network) is not a verdict on the token.
            if (e instanceof joseErrors.JWKSTimeout ||
                (e instanceof Error && e.name === "TypeError")) {
                throw new FieldVerifierUnavailableError(`fetch JWKS: ${e.message}`, { cause: e });
            }
            throw new FieldError(FieldReason.InvalidToken, e instanceof Error ? e.message : String(e));
        }
        const claims = payload;
        if (claims["token_use"] !== "field") {
            throw new FieldError(FieldReason.WrongTokenUse, `token_use is ${String(claims["token_use"] ?? "")}`);
        }
        const aud = Array.isArray(claims.aud)
            ? claims.aud.length === 1
                ? claims.aud[0]
                : undefined
            : claims.aud;
        if (aud !== this.cfg.appCode) {
            throw new FieldError(FieldReason.WrongAud, `aud is ${String(aud ?? "")}`);
        }
        if (claims["pcr"] === true) {
            throw new FieldError(FieldReason.PCR, "the token may only change the PIN");
        }
        const cnf = claims["cnf"];
        const cnfJkt = typeof cnf?.jkt === "string" ? cnf.jkt : "";
        if (!cnfJkt) {
            throw new FieldError(FieldReason.JKTMismatch, "the token carries no cnf.jkt");
        }
        if (!dpopHeader || dpopHeader.trim() === "") {
            throw new FieldError(FieldReason.MissingProof);
        }
        const proof = parseProof(dpopHeader);
        if (proof.jkt !== cnfJkt)
            throw new FieldError(FieldReason.JKTMismatch);
        if (proof.htm !== method)
            throw new FieldError(FieldReason.HTMMismatch);
        if (!sameUrl(proof.htu, requestUrl)) {
            throw new FieldError(FieldReason.HTUMismatch);
        }
        const ath = createHash("sha256").update(token).digest("base64url");
        if (proof.ath !== ath)
            throw new FieldError(FieldReason.ATHMismatch);
        const driftMs = Math.abs(now.getTime() - proof.iat * 1000);
        if (driftMs > this.cfg.proofMaxAgeSeconds * 1000) {
            throw new FieldError(FieldReason.StaleProof);
        }
        const str = (k) => typeof claims[k] === "string" ? claims[k] : "";
        const num = (k) => typeof claims[k] === "number" ? claims[k] : 0;
        const act = claims["act"];
        const actor = act && typeof act.sub === "string" && act.sub !== ""
            ? {
                id: act.sub,
                type: typeof act.typ === "string" ? act.typ : "",
                name: typeof act.name === "string" ? act.name : "",
            }
            : null;
        return {
            workerId: claims.sub ?? "",
            clientId: str("client_id"),
            clientIdentifier: str("client_identifier"),
            workerCode: str("worker_code"),
            name: str("name"),
            appCode: this.cfg.appCode,
            deviceId: str("device_id"),
            deviceMode: str("device_mode"),
            sessionId: str("sid"),
            amr: Array.isArray(claims["amr"])
                ? claims["amr"].filter((x) => typeof x === "string")
                : [],
            authTime: new Date(num("auth_time") * 1000),
            expiresAt: new Date(num("exp") * 1000),
            jkt: proof.jkt,
            tokenId: claims.jti ?? "",
            actor,
            test: claims["test"] === true,
        };
    }
}
/** Convenience: build a verifier and verify once. */
export function verifyFieldToken(config, authorizationHeader, dpopHeader, method, requestUrl) {
    return new FieldTokenVerifier(config).verify(authorizationHeader, dpopHeader, method, requestUrl);
}
/** scheme + host (case-insensitive) + path; query and fragment ignored. */
function sameUrl(a, b) {
    let ua, ub;
    try {
        ua = new URL(a);
        ub = new URL(b);
    }
    catch {
        return false;
    }
    return (ua.protocol === ub.protocol && ua.host === ub.host && ua.pathname === ub.pathname);
}
function parseProof(compact) {
    const bad = (detail) => new FieldError(FieldReason.InvalidProof, detail);
    const parts = compact.trim().split(".");
    if (parts.length !== 3)
        throw bad("not a compact JWS");
    let hdr;
    try {
        hdr = JSON.parse(Buffer.from(parts[0], "base64url").toString("utf8"));
    }
    catch {
        throw bad("header is not JSON");
    }
    if (!hdr || typeof hdr !== "object")
        throw bad("header is not JSON");
    if (hdr.typ !== "dpop+jwt" || hdr.alg !== "ES256") {
        throw bad("typ must be dpop+jwt and alg ES256");
    }
    const jwk = hdr.jwk;
    if (!jwk || jwk.kty !== "EC" || jwk.crv !== "P-256" || jwk.d) {
        throw bad("jwk must be a public EC P-256 key");
    }
    const x = Buffer.from(jwk.x ?? "", "base64url");
    const y = Buffer.from(jwk.y ?? "", "base64url");
    if (x.length !== 32 || y.length !== 32) {
        throw bad("jwk coordinates are malformed");
    }
    const xs = x.toString("base64url");
    const ys = y.toString("base64url");
    let pub;
    try {
        pub = createPublicKey({
            key: { kty: "EC", crv: "P-256", x: xs, y: ys },
            format: "jwk",
        });
    }
    catch {
        throw bad("jwk point is not on the curve");
    }
    const sig = Buffer.from(parts[2], "base64url");
    if (sig.length !== 64)
        throw bad("signature is malformed");
    const ok = cryptoVerify("sha256", Buffer.from(`${parts[0]}.${parts[1]}`), { key: pub, dsaEncoding: "ieee-p1363" }, sig);
    if (!ok)
        throw bad("signature does not verify");
    let c;
    try {
        c = JSON.parse(Buffer.from(parts[1], "base64url").toString("utf8"));
    }
    catch {
        throw bad("claims are not JSON");
    }
    if (!c ||
        typeof c !== "object" ||
        typeof c.iat !== "number" ||
        typeof c.jti !== "string" ||
        c.jti === "") {
        throw bad("claims need iat and jti");
    }
    // RFC 7638 thumbprint: required members, lexicographic order, no whitespace.
    const canonical = `{"crv":"P-256","kty":"EC","x":"${xs}","y":"${ys}"}`;
    return {
        jkt: createHash("sha256").update(canonical).digest("base64url"),
        htm: typeof c.htm === "string" ? c.htm : "",
        htu: typeof c.htu === "string" ? c.htu : "",
        ath: typeof c.ath === "string" ? c.ath : "",
        iat: c.iat,
    };
}
