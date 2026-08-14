/**
 * Plan<E> — a pending change + the domain event it produces, built by an
 * {@link Operation}'s `execute` phase but NOT yet committed. `run` is the only
 * thing that applies a Plan, and it does so inside one transaction (aggregate
 * write + event + optional audit, atomically).
 *
 * Plan is sealed: its discriminant key is a module-private `unique symbol`
 * (the same airtight technique as `src/effect/usecase/seal.ts`), and the only
 * constructors are {@link Plan.save} / {@link Plan.delete} / {@link Plan.emit}.
 * External code can speak the *type* `Plan<E>` but cannot construct one — so an
 * operation cannot reach the database except by returning a Plan and letting
 * `run` apply it. The TypeScript analogue of the Go SDK's sealed `Plan[E]`.
 */
const PlanKind = Symbol("flowcatalyst.usecase.plan");
export const Plan = {
    /** Plan an aggregate upsert with its domain event (create / update). */
    save(aggregate, repo, event) {
        return {
            [PlanKind]: "save",
            aggregate,
            repo: repo,
            event,
        };
    },
    /** Plan an aggregate deletion with its domain event. */
    delete(aggregate, repo, event) {
        return {
            [PlanKind]: "delete",
            aggregate,
            repo: repo,
            event,
        };
    },
    /** Plan a domain event with no aggregate change (e.g. UserLoggedIn). */
    emit(event) {
        return { [PlanKind]: "emit", event };
    },
};
/** True when `x` is a Plan (used by `run` to tell a Plan from a returned error). */
export function isPlan(x) {
    return typeof x === "object" && x !== null && PlanKind in x;
}
/**
 * @internal — apply a Plan against the transaction-bound session. Only `run`
 * calls this, inside the transaction the TxRunner owns. Lives here so the
 * `PlanKind` discriminant never has to be exported.
 */
export async function applyPlan(session, plan, command) {
    switch (plan[PlanKind]) {
        case "save":
            return session.commit(plan.event, command, () => session.withTx((tx) => plan.repo.persist(plan.aggregate, tx)));
        case "delete":
            return session.commit(plan.event, command, () => session.withTx((tx) => plan.repo.delete(plan.aggregate, tx)));
        case "emit":
            return session.emitEvent(plan.event, command);
    }
}
