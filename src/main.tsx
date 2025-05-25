import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ToastProvider } from './context/ToastContext';
import { DataProvider } from './context/DataContext';

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development' && !import.meta.env.VITE_ENABLE_MSW) {
    return;
  }

  const { worker } = await import('./mocks/browser');

  return worker.start({
    onUnhandledRequest: 'bypass',
  });
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <DataProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </DataProvider>
    </React.StrictMode>
  );
});
