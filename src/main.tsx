import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import './index.css';

// 1. Grab the element
const rootElement = document.getElementById('root');

// 2. Prove to TypeScript that it actually exists
if (!rootElement) {
  throw new Error('Failed to find the root element. Check your index.html.');
}

// 3. Render the app safely
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode> 
      <App /> 
  </React.StrictMode>
);