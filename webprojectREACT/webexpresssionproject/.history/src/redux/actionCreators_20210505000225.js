import * as ActionTypes from './actionTypes'

export const changeExpressions = (expressions) => ({
    type: ActionTypes.CHANGE_EXPRESSIONS,
    payload: {
        expressions: expressions
    }
});

export const changePhoto = (photo) => ({
    type: ActionTypes.CHANGE_PHOTO,
    payload: {
        photoFile: photo,
        photoUrl: URL.createObjectURL(photo)

    }
})