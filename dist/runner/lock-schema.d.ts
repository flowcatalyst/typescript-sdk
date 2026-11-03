/**
 * Migration helper for {@link PgLockProvider}.
 *
 * Run {@link initLockSchema} once at startup (or fold the SQL into your
 * existing migration tool) before the first `PgLockProvider.acquire`.
 * Idempotent — `CREATE TABLE IF NOT EXISTS` and `CREATE INDEX IF NOT EXISTS`.
 */
import type { PgQueryable } from "../cache/types.js";
/**
 * SQL to create the lock table + supporting index. Default table name is
 * `fc_locks`; use {@link initLockSchemaWithTable} to override.
 */
export declare const CREATE_LOCK_TABLE_SQL = "\nCREATE TABLE IF NOT EXISTS {table} (\n    key TEXT PRIMARY KEY,\n    holder TEXT NOT NULL,\n    expires_at TIMESTAMPTZ NOT NULL\n);\n\nCREATE INDEX IF NOT EXISTS {table}_expires_at_idx ON {table} (expires_at);\n";
/** Create the `fc_locks` table. Safe to run repeatedly. */
export declare function initLockSchema(client: PgQueryable): Promise<void>;
/** Create the lock table with a custom name. */
export declare function initLockSchemaWithTable(client: PgQueryable, table: string): Promise<void>;
//# sourceMappingURL=lock-schema.d.ts.map