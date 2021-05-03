import * as ActionTypes from './actionTypes'
export const changeExpressions = (expressions) => ({
    type: ActionTypes.CHANGE_EXPRESSIONS,
    payload: {
        expressions: expressions
    }
})