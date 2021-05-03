import { EXPRESSIONS } from '../shared/expressions';

export const expressions = ( state = EXPRESSIONS, action ) => {
    switch (action.type) {
        case CAMBIAR_ESTADO:
            return state;
        default:
            return state;
    }
};