import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css'
// Bootstrap support for React
import 'bootstrap/dist/css/bootstrap.min.css'

import configureStore from '/home/jermaniac/projectGerman/webprojectREACT/webexpresssionproject/node_modules/redux'

const { store, persistor } = configureStore();
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
