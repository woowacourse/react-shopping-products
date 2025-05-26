import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Global } from '@emotion/react';
import { resetCss } from './styles/reset.ts';

async function enableMocking() {
  const { worker } = await import('./api/mock/browser.ts'); //Dynamic import
  await worker.start({
    serviceWorker: {
      url: '/react-shopping-products/mockServiceWorker.js',
    },
  });
}
enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <Global styles={resetCss} />
      <App />
    </React.StrictMode>
  );
});
