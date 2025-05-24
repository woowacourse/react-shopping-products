import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ModalProvider } from "./app/providers/ModalContext.tsx";
import { ToastProvider } from "./app/providers/ToastContext.tsx";

async function enableMocking() {
  const { worker } = await import("./mocks/browser");

  const baseUrl = import.meta.env.BASE_URL;

  return worker.start({
    serviceWorker: {
      url: `${window.location.origin}${baseUrl}mockServiceWorker.js`,
      options: { scope: baseUrl },
    },
    onUnhandledRequest: "bypass",
  });
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <ToastProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </ToastProvider>
    </React.StrictMode>
  );
});
