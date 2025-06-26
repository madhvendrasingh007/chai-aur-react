// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Creates a root DOM node and renders the <App /> component inside the #root div
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
