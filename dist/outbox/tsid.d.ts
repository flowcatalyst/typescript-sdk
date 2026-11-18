/**
 * Lightweight TSID (Time-Sorted ID) generator.
 *
 * Generates 13-character Crockford Base32 strings from a 64-bit value
 * composed of 42 bits of timestamp + 22 bits of randomness.
 */
/**
 * Generate a new TSID as a 13-character Crockford Base32 string.
 */
export declare function generate(): string;
/**
 * Generate a BRANDED (typed) TSID: `${prefix}_${raw}` — matching the
 * FlowCatalyst platform convention (e.g. `aud_…`, `prn_…`). Use a short
 * lowercase prefix for your own entities, e.g. `generateWithPrefix("cmt")`
 * → `cmt_6F7JC2A6JFR7N`.
 *
 * @throws if the prefix is empty or contains an underscore.
 */
export declare function generateWithPrefix(prefix: string): string;
/**
 * Validate that a string is a valid TSID format.
 */
export declare function isValid(tsid: string): boolean;
//# sourceMappingURL=tsid.d.ts.map