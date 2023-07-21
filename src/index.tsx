import React from 'react';
import { createRoot } from 'react-dom/client';
// import dotenv from 'dotenv';
import App from './components/App';

// dotenv.config();
const container = document.getElementById('root');
const root = container && createRoot(container);

root?.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
