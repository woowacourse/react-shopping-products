import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

async function enableMocking() {
  const shouldEnableMocking = import.meta.env.VITE_ENABLE_MSW === 'true';

  if (!shouldEnableMocking) {
    return;
  }

  const { worker } = await import('./mocks/browser');

  const isGitHubPages = window.location.hostname.includes('github.io');
  const serviceWorkerUrl = isGitHubPages
    ? '/react-shopping-products/mockServiceWorker.js'
    : '/mockServiceWorker.js';

  return worker.start({
    serviceWorker: {
      url: serviceWorkerUrl,
    },
    onUnhandledRequest: 'bypass',
  });
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
});
