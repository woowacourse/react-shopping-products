import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ToastProvider } from './context/ToastContext';
import { DataProvider } from './context/DataContext';

async function enableMocking() {
  if (import.meta.env.VITE_USE_MSW !== 'true') {
    return;
  }

  const { worker } = await import('./mocks/browser');

  return worker.start({
    serviceWorker: {
      url: '/react-shopping-products/mockServiceWorker.js',
    },
    onUnhandledRequest: 'bypass',
  });
}

enableMocking()
  .then(() => {
    ReactDOM.createRoot(document.getElementById('root')!).render(
      <React.StrictMode>
        <DataProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </DataProvider>
      </React.StrictMode>,
    );
  })
  .catch((error) => {
    console.error('Failed to start MSW:', error);
    // MSW 실패 시에도 앱을 렌더링
    ReactDOM.createRoot(document.getElementById('root')!).render(
      <React.StrictMode>
        <DataProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </DataProvider>
      </React.StrictMode>,
    );
  });
