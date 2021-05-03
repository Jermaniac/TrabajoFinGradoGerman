import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css'
// Bootstrap support for React
import 'bootstrap/dist/css/bootstrap.min.css'

import { createStore } from 'redux'

const { store, persistor } = createStore();

const Root = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const rootElement = document.getElementById('root');

ReactDOM.render(
  Root,
  rootElement
);
