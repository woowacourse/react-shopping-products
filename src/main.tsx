import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ToastProvider } from './context/ToastContext.tsx';
import { APIProvider } from './context/APIContext.tsx';

async function enableMocking() {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === 'production'
  ) {
    const { worker } = await import('./mocks/browser');
    return worker.start({ onUnhandledRequest: 'bypass' });
  }
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <ToastProvider>
        <APIProvider>
          <App />
        </APIProvider>
      </ToastProvider>
    </React.StrictMode>
  );
});
