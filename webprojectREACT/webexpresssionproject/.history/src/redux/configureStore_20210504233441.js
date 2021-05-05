
import { createStore, combineReducers} from 'redux';
import { expressions } from './expressions'

export const configureStore = () => {

    const store = createStore(
        expressions,
        // activate redux dev tools in browser
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

    );

    return store;
}
