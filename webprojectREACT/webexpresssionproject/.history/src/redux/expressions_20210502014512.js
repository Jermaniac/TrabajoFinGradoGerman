import { EXPRESSIONS } from '../shared/expressions';
import * as ActionTypes from './actionTypes'
export const expressions = ( state = EXPRESSIONS, action ) => {
    switch (action.type) {
        case CHANGE_EXPRESSIONS:
            return state;
        default:
            return state;
    }
};