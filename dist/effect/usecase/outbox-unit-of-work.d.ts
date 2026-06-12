/**
 * `OutboxUnitOfWork.layer` — Effect Layer for the `UnitOfWork` Tag, backed by
 * the existing `OutboxManager`. Same semantics as the neverthrow
 * `OutboxUnitOfWork` in `src/usecase/outbox-unit-of-work.ts`; the difference
 * is that success is produced as a `Sealed<E>`.
 */
import { Layer } from "effect";
import { OutboxManager } from "../../outbox/outbox-manager.js";
import type { OutboxDriver } from "../../outbox/types.js";
import { UnitOfWork } from "./unit-of-work.js";
export interface OutboxUnitOfWorkOptions {
    /** Emit an audit log alongside every event. Default: false. */
    readonly auditEnabled?: boolean;
    /** Principal ID used in audit logs when the event doesn't carry one. */
    readonly fallbackPrincipalId?: string;
}
/**
 * Build a `UnitOfWork` Layer backed by an existing `OutboxManager`.
 *
 * @example
 * ```ts
 * import { OutboxManager } from "@flowcatalyst/sdk";
 * import { OutboxUnitOfWork } from "@flowcatalyst/sdk/effect/usecase";
 *
 * const outboxManager = new OutboxManager(driver, clientId);
 * const Live = OutboxUnitOfWork.layer(outboxManager, { auditEnabled: true });
 * ```
 */
export declare const layer: (outboxManager: OutboxManager, options?: OutboxUnitOfWorkOptions) => Layer.Layer<UnitOfWork>;
/** Build a Layer from a raw driver + `clientId`. */
export declare const layerFromDriver: (driver: OutboxDriver, clientId: string, options?: OutboxUnitOfWorkOptions) => Layer.Layer<UnitOfWork>;
//# sourceMappingURL=outbox-unit-of-work.d.ts.map