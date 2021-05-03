import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css'
// Bootstrap support for React
import 'bootstrap/dist/css/bootstrap.min.css'

import { createStore } from 'redux'
import { Provider } from 'react-redux';

const store = createStore();

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
