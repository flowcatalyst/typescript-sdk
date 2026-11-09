/**
 * SessionStore — pluggable session backend.
 *
 * Two shapes ship in-box:
 *   - {@link CookieSessionStore} (default) — the encrypted cookie IS the session.
 *     No server-side storage; payload round-trips on every request.
 *   - {@link PgSessionStore} / {@link RedisSessionStore} — cookie holds an
 *     opaque session id; the payload lives in Postgres or Redis. Cookie size
 *     stays small even with large `sessionData`, and sessions can be revoked
 *     server-side.
 *
 * The cookie name + encryption are managed by the store; the plugin just
 * calls `read`/`write`/`clear` with the Fastify request/reply.
 */
export {};
