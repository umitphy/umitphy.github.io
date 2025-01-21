import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// root element'i alıyoruz
const rootElement = document.getElementById('root') as HTMLElement;

// createRoot ile React'i başlatıyoruz
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
