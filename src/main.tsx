import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { worker } from './mocks/browser.ts';

const startServer = async () => {
  if (import.meta.env.DEV) {
    return await worker.start({
      onUnhandledRequest: 'bypass',
    });
  }
};

startServer().then(() =>
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />,
    </React.StrictMode>,
  ),
);
