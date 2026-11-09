/**
 * `UseCase` contract for the Effect surface.
 *
 * `execute` produces `Sealed<TEvent>` — and the only thing that can produce
 * one is `UnitOfWork`. At the type level a use case is forced to route
 * success through the UoW; bypassing it is a compile error.
 */
export {};
