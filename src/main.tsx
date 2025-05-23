import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { worker } from './mocks/browser.ts';
import React from 'react';

if (process.env.NODE_ENV === 'development') {
  worker.start().then(() => {
    createRoot(document.getElementById('root')!).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );
  });
} else {
  createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}
