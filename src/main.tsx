import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/index.css';

if (import.meta.env.DEV) {
  const { worker } = await import('./mocks/browser.ts');
  await worker.start({ onUnhandledRequest: 'bypass' });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
