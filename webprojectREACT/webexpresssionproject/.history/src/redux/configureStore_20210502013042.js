
import { createStore } from 'redux';
import { expressions } from './expressions'

const configureStore = () => {

    const store = createStore(
        expressions,
        // activate redux dev tools in browser
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

    );

    return store;
}

export default configureStore;