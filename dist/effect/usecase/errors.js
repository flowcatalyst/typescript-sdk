/**
 * Tagged errors for the Effect-flavored use-case surface.
 *
 * Mirrors the variants of `src/usecase/errors.ts`, expressed as
 * `Data.TaggedError` classes so they compose with `Effect.catchTag` /
 * `Effect.catchTags`. HTTP-status mapping kept identical to the neverthrow
 * surface (`UseCaseError.httpStatus`).
 */
import { Data } from "effect";
export class ValidationError extends Data.TaggedError("ValidationError") {
}
export class NotFoundError extends Data.TaggedError("NotFoundError") {
}
export class BusinessRuleViolation extends Data.TaggedError("BusinessRuleViolation") {
}
export class ConcurrencyError extends Data.TaggedError("ConcurrencyError") {
}
export class AuthorizationError extends Data.TaggedError("AuthorizationError") {
}
export class InfrastructureError extends Data.TaggedError("InfrastructureError") {
}
export const httpStatus = (error) => {
    switch (error._tag) {
        case "ValidationError":
            return 400;
        case "AuthorizationError":
            return 403;
        case "NotFoundError":
            return 404;
        case "BusinessRuleViolation":
        case "ConcurrencyError":
            return 409;
        case "InfrastructureError":
            return 500;
    }
};
