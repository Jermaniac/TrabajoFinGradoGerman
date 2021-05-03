import * as ActionTypes from './actionTypes'

export const changeExpressions = (expressions) => ({
    console.log("EY")
    type: ActionTypes.CHANGE_EXPRESSIONS,
    payload: {
        expressions: expressions
    }
})