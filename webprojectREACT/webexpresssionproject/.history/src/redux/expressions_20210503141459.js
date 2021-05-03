import { EXPRESSIONS } from '../shared/expressions';
import * as ActionTypes from './actionTypes'

export const expressions = ( state = EXPRESSIONS, action ) => {
    switch (action.type) {
        // case ActionTypes.CHANGE_EXPRESSIONS:
        //     console.log("EN EXPRESSIONS.JS")
        //     let expressions = action.payload;
        //     console.log(expressions)
        //     return expressions;
        default:
            return state;
    }
};