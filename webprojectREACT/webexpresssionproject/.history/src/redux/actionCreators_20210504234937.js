import * as ActionTypes from './actionTypes'

export const changeExpressions = (expressions) => ({
    type: ActionTypes.CHANGE_EXPRESSIONS,
    payload: {
        expressions: expressions
    }
});

export const changePhoto = (event) => ({
    type: ActionTypes.CHANGE_PHOTO,
    payload: {
        photo: event.target.files[0]

    }
})