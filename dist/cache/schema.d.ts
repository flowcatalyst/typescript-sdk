/**
 * Migration helper for {@link PgCacheStore}.
 *
 * Run {@link initCacheSchema} once at startup (or fold the SQL into your
 * existing migration tool) before the first `PgCacheStore.get` /
 * `PgCacheStore.set`. Idempotent — `CREATE TABLE IF NOT EXISTS` and
 * `CREATE INDEX IF NOT EXISTS`.
 */
import type { PgQueryable } from "./types.js";
/**
 * SQL to create the cache table + supporting index. Default table name is
 * `fc_cache`; use {@link initCacheSchemaWithTable} to override.
 */
export declare const CREATE_CACHE_TABLE_SQL = "\nCREATE TABLE IF NOT EXISTS {table} (\n    key TEXT PRIMARY KEY,\n    value BYTEA NOT NULL,\n    expires_at TIMESTAMPTZ NOT NULL\n);\n\nCREATE INDEX IF NOT EXISTS {table}_expires_at_idx ON {table} (expires_at);\n";
/** Create the `fc_cache` table. Safe to run repeatedly. */
export declare function initCacheSchema(client: PgQueryable): Promise<void>;
/** Create the cache table with a custom name. */
export declare function initCacheSchemaWithTable(client: PgQueryable, table: string): Promise<void>;
//# sourceMappingURL=schema.d.ts.map