/**
 * Operation<C, E> — one business operation expressed as named phases, and
 * `run`, the driver that executes them and atomically applies the resulting
 * {@link Plan}. The TypeScript port of the Go SDK's `usecaseop.Operation` /
 * `usecaseop.Run`.
 *
 *   validate  → command shape (pure, no I/O)
 *   authorize → resource-level access (use `publicAuthorize` to declare open)
 *   execute   → load + invariants → return a Plan (or a UseCaseError)
 *   ───────── run then applies the Plan in one transaction (aggregate + event + audit)
 *
 * An operation cannot reach the database except by returning a Plan; `run` is
 * the only thing that applies one, and it does so through a {@link TxRunner}
 * that owns the transaction. So "aggregate written ⇒ event written, atomically"
 * holds by construction.
 */
import { Result } from "./result.js";
import { UseCaseError } from "./errors.js";
import { applyPlan, isPlan } from "./plan.js";
/**
 * The explicit `authorize` value for operations that are intentionally open —
 * no resource-level check beyond whatever the transport already enforced.
 * Prefer this over an `authorize` that just returns null: "deliberately open"
 * should be a visible decision.
 */
export function publicAuthorize() {
    return null;
}
/**
 * Run op's phases in order — validate → authorize → execute — short-circuiting
 * on the first error, then apply the returned {@link Plan} in one transaction
 * (aggregate change + domain event + audit log) and return the committed event.
 *
 * `uow` is the transaction owner (e.g. `OutboxUnitOfWork`); `run` never reaches
 * the database itself — it only drives the phases and hands the Plan to
 * `uow.run`, which owns commit/rollback.
 */
export async function run(uow, op, command, context) {
    if (op.validate) {
        const err = op.validate(command);
        if (err)
            return Result.failure(err);
    }
    const authErr = op.authorize(command, context);
    if (authErr)
        return Result.failure(authErr);
    let outcome;
    try {
        outcome = await op.execute(command, context);
    }
    catch (err) {
        if (UseCaseError.isUseCaseError(err))
            return Result.failure(err);
        const message = err instanceof Error ? err.message : String(err);
        return Result.failure(UseCaseError.infrastructure("EXECUTE_FAILED", message, { cause: message }));
    }
    if (!isPlan(outcome)) {
        // execute returned a UseCaseError (the invariant-failure path).
        return Result.failure(outcome);
    }
    return uow.run((session) => applyPlan(session, outcome, command));
}
