import { PHOTO } from '../shared/photo';
import * as ActionTypes from './actionTypes'

export const photo = ( state = PHOTO, action ) => {
    console.log("PHOTO")
    switch (action.type) {
        case ActionTypes.CHANGE_PHOTO:
            let photo = action.payload;
            return photo;
        default:
            return state;
    }
};