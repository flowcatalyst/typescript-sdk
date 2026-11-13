/**
 * What an application declares about its push topics: who may listen without
 * a ticket (rules) and the public keys its tickets are signed with. Synced to
 * the push gateway (docs/push-gateway-spec.md section 8) as a declarative
 * full replace: the payload IS the set, so send both halves every time.
 */
import { TicketMinter } from "./tickets.js";
/** The JWKS of a {@link PushDefinition}'s keys. */
export function pushKeysJwks(def) {
    return def.keys instanceof TicketMinter ? def.keys.jwks() : def.keys;
}
