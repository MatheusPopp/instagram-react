import {ALERT} from '../actionsType/headerActionsType';

export function headerReducer(state = '', action) {

    if(action.type === ALERT) {
        const newState = action.payload;
        return newState;
    }

    return '';
}