import React from 'react';
import ReactDOM from 'react-dom/client';  // Import the new method
import './index.css';
import App from './App.js';  // Include .js extension
import reportWebVitals from './reportWebVitals.js';  // Include .js extension

const root = ReactDOM.createRoot(document.getElementById('root'));  // Create root with createRoot
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
