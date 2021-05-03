import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css'
// Bootstrap support for React
import 'bootstrap/dist/css/bootstrap.min.css'

import { configureStore } from './redux/configureStore'
import { Provider } from 'react-redux';
import { createStore } from 'redux';

function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}
const { store } = createStore( counter);

const Root = (
  <Provider store={store}>
    <App />
  </Provider>
);

const rootElement = document.getElementById('root');

ReactDOM.render(
  Root,
  rootElement
);
