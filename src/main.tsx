import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { worker } from './mocks/browser.ts';

async function prepare() {
  if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development') {
    await worker.start();
  }
}

prepare().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
