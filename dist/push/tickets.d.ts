/**
 * Push tickets: short-lived grants to listen on topics, minted by the
 * application after its own access check (push contract section 6.4,
 * amendment 17.16; docs/push-gateway-spec.md section 9).
 *
 * A ticket is a JWS compact token, `alg` `EdDSA` (Ed25519), header `kid`.
 * The gateway verifies it with the public key the application synced
 * (`TicketMinter.jwks()` through `client.definitions().syncPush(...)`).
 *
 * ```ts
 * const minter = TicketMinter.fromConfig("shop", process.env.PUSH_TICKET_KEY!);
 * const ticket = minter.mint({ client: "acme", topics: ["shop:orders:{id}"], sub: "prn_1" });
 * ```
 */
/** The audience every ticket carries. */
export declare const TICKET_AUDIENCE = "fw-push";
/** A ticket's `exp` is at most this many seconds after its `iat`. */
export declare const MAX_TICKET_TTL_SECONDS = 300;
/** The default lifetime of a minted ticket. */
export declare const DEFAULT_TICKET_TTL_SECONDS = 60;
/** A ticket names at most this many topic patterns. */
export declare const MAX_TICKET_TOPICS = 100;
/** An Ed25519 public key as a JWK, the shape the gateway stores and `/push/keys` serves. */
export interface TicketPublicJwk {
    kty: "OKP";
    crv: "Ed25519";
    x: string;
    kid: string;
    use: "sig";
    alg: "EdDSA";
}
/** A JWKS of ticket keys: what sync sends and `GET /push/keys` answers. */
export interface TicketJwks {
    keys: TicketPublicJwk[];
}
export declare class TicketError extends Error {
    constructor(message: string);
}
/**
 * An Ed25519 ticket signing key: `kid` plus the 32-byte seed. Configure it as
 * `kid:base64url-seed` ({@link TicketKey.parse}); the seed is a secret, the
 * derived public JWK is what the gateway needs.
 */
export declare class TicketKey {
    readonly kid: string;
    private readonly privateKey;
    private readonly publicJwk;
    private constructor();
    /** From a `kid:base64url-seed` string (the seed is the 32 raw bytes, base64url without padding). */
    static parse(config: string): TicketKey;
    static fromSeed(kid: string, seedBase64Url: string): TicketKey;
    /** The public key as a JWK (no private member). */
    toPublicJwk(): TicketPublicJwk;
    /** @internal Ed25519 signature (64 bytes) of `data`. */
    signBytes(data: Buffer): Buffer;
}
/** What a ticket grants. */
export interface MintTicketOptions {
    /** The stream's client (the platform client's value, `_platform`, for platform-wide). */
    client: string;
    /** Topic patterns of the application (placeholders `{x}` match one segment), at most 100. */
    topics: string[];
    /** The principal, recorded in the stream token for logs. */
    sub?: string;
    /** Bind the ticket to a DPoP key: the subscribe must prove it (`cnf.jkt`). */
    jkt?: string;
    /** Lifetime in seconds: 1 to 300 (default 60). The time to subscribe with it. */
    ttlSeconds?: number;
    /** The latest the stream may live, as a Date or epoch seconds. Default: `exp` + the gateway's max lifetime. */
    streamExp?: Date | number;
    /** Issued-at (default now), as a Date or epoch seconds. For tests. */
    now?: Date | number;
}
/**
 * Mints tickets for one application with its current key, and exports the
 * JWKS (the current key then the previous ones during a rotation) that sync
 * sends to the gateway.
 */
export declare class TicketMinter {
    readonly applicationCode: string;
    private readonly current;
    private readonly previous;
    /**
     * @param applicationCode the `iss` of every ticket; each topic's first segment must equal it.
     * @param current the key tickets are signed with.
     * @param previous the keys of a rotation in progress: published in the JWKS so
     *   tickets signed with them keep verifying, never used to sign. A public JWK is enough.
     */
    constructor(applicationCode: string, current: TicketKey, previous?: Array<TicketKey | TicketPublicJwk>);
    /**
     * From configuration: the current key as `kid:base64url-seed`, and the
     * previous ones (during a rotation) as `kid:base64url-seed` strings, for
     * example split from a comma-separated setting.
     */
    static fromConfig(applicationCode: string, current: string, previous?: string[]): TicketMinter;
    /** The JWKS to sync: the current key, then the previous ones. */
    jwks(): TicketJwks;
    /**
     * Mint a ticket. Claims, in order: `iss`, `aud`, `client`, `topics`, `sub`,
     * `cnf`, `iat`, `exp`, `stream-exp`.
     *
     * @throws {TicketError} when the request cannot be a valid ticket.
     */
    mint(options: MintTicketOptions): string;
}
//# sourceMappingURL=tickets.d.ts.map