// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; 
import { Provider } from 'react-redux';
import store from './app/store'; // default export를 import
import App from './App';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
