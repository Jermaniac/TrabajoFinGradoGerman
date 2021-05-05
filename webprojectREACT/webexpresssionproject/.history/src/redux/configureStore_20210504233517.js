
import { createStore, combineReducers} from 'redux';
import { expressions } from './expressions'
import { photo } from './photo'
export const configureStore = () => {

    const store = createStore(
        combineReducers(
            expressions,
            photo
        ),
        // activate redux dev tools in browser
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

    );

    return store;
}
