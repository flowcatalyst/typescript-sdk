/**
 * `UnitOfWork` and `ExecutionContext` Tags.
 *
 * `UnitOfWork` is the only thing that produces a `Sealed<E>`. A use case's
 * return type is `Effect<Sealed<E>, UseCaseError, UnitOfWork | ExecutionContext>`,
 * which means at the type level it MUST `yield*` the UoW service —
 * `Effect.succeed(rawEvent)` does not type-check.
 */
import { Context } from "effect";
export class ExecutionContext extends Context.Service()("@flowcatalyst/ExecutionContext") {
}
export class UnitOfWork extends Context.Service()("@flowcatalyst/UnitOfWork") {
}
