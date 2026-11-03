/**
 * Every code the platform facets on — event `type`s and dispatch-job `code`s —
 * must be a fully qualified `application:subdomain:aggregate:action` string.
 * The platform projects the first three segments out as application/subdomain/
 * aggregate facets; a bare one-word code both renders as `name:::` in the UI
 * and facets under the WRONG application (segment 1), and it denies the
 * delivery pipeline the application linkage it uses to resolve signing
 * credentials. The SDK therefore refuses to emit unqualified codes.
 */
export declare function assertQualifiedCode(value: string, field: string): void;
//# sourceMappingURL=qualified-code.d.ts.map