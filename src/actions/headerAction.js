import { ALERT } from "../actionsType/headerActionsType";

export function alert(payload) {
    return { type: ALERT, payload };
}