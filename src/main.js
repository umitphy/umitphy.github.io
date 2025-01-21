import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// root element'i alıyoruz
const rootElement = document.getElementById('root');
// createRoot ile React'i başlatıyoruz
ReactDOM.createRoot(rootElement).render(_jsx(React.StrictMode, { children: _jsx(App, {}) }));
