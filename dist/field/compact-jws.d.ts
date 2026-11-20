/**
 * The one spelling of a compact JWS that verifies (docs/wire-contract.md,
 * Authentication, "Token spelling"): three segments of RFC 7515 base64url,
 * the URL-safe alphabet with no `=` padding, no `+` or `/`, no whitespace or
 * line break, and (RFC 4648 §3.5) the spare low bits of each segment's last
 * character zero. A standard encoder writes exactly that, so every token the
 * platform issues and every proof the field libraries sign is canonical.
 *
 * Neither `Buffer.from(s, "base64url")` nor jose's decoder is enough on its
 * own: both ignore the spare bits, and Node's also accepts `=`, `+`, `/` and
 * skips whitespace, so one signature would have many spellings that verify.
 * A segment is accepted only when it is of the URL-safe alphabet and the
 * encoder writes it back exactly from the bytes it decodes to.
 */
/** Whether `segment` is one segment of canonical base64url. */
export declare function isCanonicalSegment(segment: string): boolean;
/** Whether `token` is three dot-separated segments, each canonical. */
export declare function isCanonicalCompact(token: string): boolean;
/** The bytes of a canonical segment, or `undefined` when it is not one. */
export declare function decodeCanonicalSegment(segment: string): Buffer | undefined;
//# sourceMappingURL=compact-jws.d.ts.map