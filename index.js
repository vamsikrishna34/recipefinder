import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css'; // ← your external CSS
import App from './app';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);