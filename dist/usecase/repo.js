/**
 * Repo<A> — the persistence port a {@link Plan} writes through.
 *
 * Aggregates don't persist themselves; a Repo owns the SQL (or other I/O) for
 * one aggregate type. Both methods receive the transaction handle opened by
 * the unit of work's orchestrated `run`, so the aggregate write and the
 * outbox event commit (or roll back) together. This is the TypeScript analogue
 * of the Go SDK's `usecasepgx.Persist[A]`.
 */
export {};
