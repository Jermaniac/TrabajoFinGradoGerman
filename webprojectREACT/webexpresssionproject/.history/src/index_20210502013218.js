import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css'
// Bootstrap support for React
import 'bootstrap/dist/css/bootstrap.min.css'

import { configureStore } from './redux/configureStore'
import { Provider } from 'react-redux';

const { store } = configureStore();
console.log(store.getState()) // undefined
const Root = (
    <App />
);

const rootElement = document.getElementById('root');

ReactDOM.render(
  Root,
  rootElement
);
