import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { APIProvider } from './hook/APIContext.tsx';
import ErrorBoundary from './ErrorBoundary.tsx';

if (import.meta.env.DEV) {
  const { worker } = await import('./mocks/browser');
  await worker.start();
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <APIProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </APIProvider>
  </React.StrictMode>
);
