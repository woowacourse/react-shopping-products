import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

const startWorker = async () => {
  const { worker } = await import('./mocks/browser');
  await worker.start({
    onUnhandledRequest: 'bypass',
  });
};

if (import.meta.env.DEV || import.meta.env.PROD) {
  startWorker();
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
