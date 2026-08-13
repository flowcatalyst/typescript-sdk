/**
 * Compile-time seal for use-case results.
 *
 * `Sealed<E>` is a brand whose key is a module-private `unique symbol`.
 * Only the `UnitOfWork` implementations in this directory call `seal(...)`;
 * everything else can speak the *type* `Sealed<E>` but cannot construct one
 * without an explicit `as` cast.
 *
 * This is the type-level upgrade over the runtime token in
 * `src/usecase/result.ts`: a use case that tries to return a raw event
 * fails to compile, instead of throwing at runtime.
 */
const SealedSymbol = Symbol("flowcatalyst.uow.sealed");
/**
 * @internal — called only by the UnitOfWork implementations shipped with this
 * package. The package's `exports` map does not expose this path, so external
 * code cannot import it.
 */
export const seal = (event) => ({
    [SealedSymbol]: true,
    event,
});
/** Unwrap a sealed event back to its raw `DomainEvent`. */
export const unseal = (sealed) => sealed.event;
