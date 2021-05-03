
import { createStore } from 'redux';
import { Expressions } from './expressions'

const variable =         ( state = EXPRESSIONS, action ) => {
    switch (action.type) {
        default:
          return state;
}
}
export const configureStore = () => {

    const store = createStore(
        variable,
        // activate redux dev tools in browser
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

    );

    return store;
}