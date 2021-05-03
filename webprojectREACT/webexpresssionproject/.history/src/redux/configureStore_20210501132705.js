
import {createStore, combineReducers} from 'redux';
import { Expressions } from './expressions'

export const configureStore = () => {

    const store = createStore(
        Expressions,
        // activate redsux dev tools in browser
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

    );

    return store;
}