import { PHOTO } from '../shared/photo';
import * as ActionTypes from './actionTypes'

export const photo = ( state = PHOTO, action ) => {
    switch (action.type) {
        case ActionTypes.CHANGE_PHOTO:
            let photo = action.payload;
        
            console.log(photo)
            return photo;
        default:
            return state;
    }
};