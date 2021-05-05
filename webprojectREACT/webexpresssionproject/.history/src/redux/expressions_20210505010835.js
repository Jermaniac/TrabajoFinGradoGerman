import { EXPRESSIONS } from '../shared/expressions';
import * as ActionTypes from './actionTypes'

export const expressions = ( state = null, action ) => {
    switch (action.type) {
        case ActionTypes.CHANGE_EXPRESSIONS:
            let expressions = action.payload;
            return expressions;
        default:
            return state;
    }
};