/**
 * Tagged errors for the Effect-flavored use-case surface.
 *
 * Mirrors the variants of `src/usecase/errors.ts`, expressed as
 * `Data.TaggedError` classes so they compose with `Effect.catchTag` /
 * `Effect.catchTags`. HTTP-status mapping kept identical to the neverthrow
 * surface (`UseCaseError.httpStatus`).
 */
declare const ValidationError_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "ValidationError";
} & Readonly<A>;
export declare class ValidationError extends ValidationError_base<{
    readonly code: string;
    readonly message: string;
    readonly details?: Record<string, unknown>;
}> {
}
declare const NotFoundError_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "NotFoundError";
} & Readonly<A>;
export declare class NotFoundError extends NotFoundError_base<{
    readonly code: string;
    readonly message: string;
    readonly details?: Record<string, unknown>;
}> {
}
declare const BusinessRuleViolation_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "BusinessRuleViolation";
} & Readonly<A>;
export declare class BusinessRuleViolation extends BusinessRuleViolation_base<{
    readonly code: string;
    readonly message: string;
    readonly details?: Record<string, unknown>;
}> {
}
declare const ConcurrencyError_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "ConcurrencyError";
} & Readonly<A>;
export declare class ConcurrencyError extends ConcurrencyError_base<{
    readonly code: string;
    readonly message: string;
    readonly details?: Record<string, unknown>;
}> {
}
declare const AuthorizationError_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "AuthorizationError";
} & Readonly<A>;
export declare class AuthorizationError extends AuthorizationError_base<{
    readonly code: string;
    readonly message: string;
    readonly details?: Record<string, unknown>;
}> {
}
declare const InfrastructureError_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "InfrastructureError";
} & Readonly<A>;
export declare class InfrastructureError extends InfrastructureError_base<{
    readonly code: string;
    readonly message: string;
    readonly details?: Record<string, unknown>;
}> {
}
export type UseCaseError = ValidationError | NotFoundError | BusinessRuleViolation | ConcurrencyError | AuthorizationError | InfrastructureError;
export declare const httpStatus: (error: UseCaseError) => number;
export {};
//# sourceMappingURL=errors.d.ts.map