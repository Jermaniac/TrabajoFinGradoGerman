
import {createStore, combineReducers} from 'redux';

export const ConfigureStore = () => {

    const store = createStore(
        combineReducers({

        }),
        // activate redux dev tools in browser
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

    );

    return store;
}