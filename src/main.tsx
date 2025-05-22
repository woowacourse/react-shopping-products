import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/reset.css';

async function enableMocking() {
  const { worker } = await import('./mock/browser');

  await worker.start({
    serviceWorker: { url: `${import.meta.env.BASE_URL}mockServiceWorker.js` },
    findWorker(scriptUrl) {
      return scriptUrl.endsWith('mockServiceWorker.js');
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
