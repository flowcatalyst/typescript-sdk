/**
 * UseCase contract.
 *
 * A use case encapsulates one business operation: validation → business rules
 * → build domain event → `unitOfWork.commit(...)`. The only way to return a
 * success is via UnitOfWork, so events are always dispatched.
 */
import { Result } from "./result.js";
import type { DomainEvent } from "./domain-event.js";
import type { ExecutionContext } from "./execution-context.js";
export interface Command {
}
/**
 * @deprecated Author operations with the envelope instead: define an
 * `Operation` (`validate` / `authorize` / `execute → Plan`) and run it with
 * `run(uow, op, cmd, ctx)`. The single-method `UseCase` collapses all three
 * phases into `execute` and routes success through the raw
 * `UnitOfWork.commit(...)`; the envelope splits the phases and seals the Plan
 * so an operation cannot reach the DB except through `run`. Kept for one major
 * version for back-compat.
 */
export interface UseCase<TCommand extends Command, TEvent extends DomainEvent> {
    execute(command: TCommand, context: ExecutionContext): Promise<Result<TEvent>>;
}
/**
 * Base class for use cases that need resource-level authorization.
 *
 * Deny-by-default: subclasses MUST override `authorizeResource` to grant
 * access — either unconditionally (no resource scope) or by checking the
 * command against the caller's scope.
 *
 * @deprecated Use the envelope: an `Operation`'s `authorize` phase is the
 * direct replacement for `authorizeResource` (return a UseCaseError to deny,
 * `null` / `publicAuthorize` to allow). See `run`.
 */
export declare abstract class SecuredUseCase<TCommand extends Command, TEvent extends DomainEvent> implements UseCase<TCommand, TEvent> {
    execute(command: TCommand, context: ExecutionContext): Promise<Result<TEvent>>;
    authorizeResource(_command: TCommand, _context: ExecutionContext): boolean;
    abstract doExecute(command: TCommand, context: ExecutionContext): Promise<Result<TEvent>>;
}
//# sourceMappingURL=use-case.d.ts.map