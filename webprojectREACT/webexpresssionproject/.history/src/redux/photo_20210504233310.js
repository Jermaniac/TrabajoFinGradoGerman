import { PHOTO } from '../shared/photo';
import * as ActionTypes from './actionTypes'

export const expressions = ( state = PHOTO, action ) => {
    switch (action.type) {
        case ActionTypes.CHANGE_EXPRESSIONS:
            let expressions = action.payload;
            return expressions;
        default:
            return state;
    }
};