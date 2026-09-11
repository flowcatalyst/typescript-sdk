/**
 * AES-256-GCM session-cookie encryption via WebCrypto.
 *
 * No native modules — works on Node 20+, Bun, and Deno. Uses
 * `crypto.subtle` directly, available on `globalThis.crypto`.
 *
 * Envelope (base64url): `v1.<iv>.<ciphertext+tag>`
 *   - `v1`            — version tag, lets us rotate the scheme later
 *   - `iv`            — 12-byte random nonce, base64url-encoded
 *   - `ciphertext+tag`— AES-GCM output (tag appended by WebCrypto), base64url
 *
 * Keys: 32 raw bytes. Pass either a base64/base64url string or a Buffer.
 * Multiple keys are supported for rotation; the first is used to encrypt,
 * any of them can decrypt.
 */
export interface SessionCrypto {
    encrypt(plaintext: string): Promise<string>;
    decrypt(envelope: string): Promise<string | null>;
}
export declare function createSessionCrypto(secrets: string | readonly string[]): SessionCrypto;
/**
 * Generate a fresh 32-byte secret, base64url-encoded. Convenience for
 * scripts/READMEs: `node -e "console.log(require('@flowcatalyst/sdk/fastify').generateSessionSecret())"`.
 */
export declare function generateSessionSecret(): string;
//# sourceMappingURL=crypto.d.ts.map