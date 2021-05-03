import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css'
// Bootstrap support for React
import 'bootstrap/dist/css/bootstrap.min.css'

const rootElement = document.getElementById('root');

const Root = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

ReactDOM.render(
  Root,
  rootElement
);
