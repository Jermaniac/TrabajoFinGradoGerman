import { PHOTO } from '../shared/photo';
import * as ActionTypes from './actionTypes'

export const photo = ( state = PHOTO, action ) => {
    switch (action.type) {
        case ActionTypes.CHANGE_PHOTO:
            let photoC = action.payload;
            photoC.photoUrl=  URL.createObjectURL(photoC.photoFile)
            console.log(photoC)
            return photoC;
        default:
            return state;
    }
};