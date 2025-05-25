import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

const startWorker = async () => {
  if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
    const { worker } = await import('./mocks/browser');
    await worker.start({
      onUnhandledRequest: 'bypass',
    });
  } else if (navigator.serviceWorker) {
    const { worker } = await import('./mocks/browser');
    await worker.start({
      serviceWorker: {
        url: '/mockServiceWorker.js',
      },
      onUnhandledRequest: 'bypass',
    });
  }
};

if (import.meta.env.DEV || import.meta.env.PROD) {
  startWorker();
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
