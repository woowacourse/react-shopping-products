import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

//fasdkfjasldkfjasldfkj
async function enableMocking() {
  const { worker } = await import('./mocks/browser'); //Dynamic import하는 것이 눈에 띄였다.

  const isLocalhost = location.hostname === 'localhost';
  return worker.start({
    serviceWorker: {
      url: isLocalhost
        ? '/mockServiceWorker.js'
        : '/react-shopping-products/mockServiceWorker.js',
    },
    onUnhandledRequest: 'bypass',
  });
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
