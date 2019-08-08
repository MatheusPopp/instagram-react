import { LIST, LIKE, COMMENT, SEARCH } from '../actionsType/timelineActionsType';


export function list(payload) {
    return { type: LIST, payload };
}

export function like(payload) {
    return { type: LIKE, payload };
}

export function comment(payload) {
    return { type: COMMENT, payload };
}

export function search(payload) {
    return { type: SEARCH, payload };
}
