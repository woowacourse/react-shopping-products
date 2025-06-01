import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import { App } from './App.tsx';

async function enableMocking() {
  const { worker } = await import('./mocks/browser'); //Dynamic import
  await worker.start({
    serviceWorker: {
      url: '/react-shopping-products/mockServiceWorker.js',
    },
  });
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
