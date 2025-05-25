import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { APIProvider } from "./app/providers/ApiContext.tsx";
import { ModalProvider } from "./app/providers/ModalContext.tsx";
import { ToastProvider } from "./app/providers/ToastContext.tsx";
import { BASE_URL } from "./shared/config/base.ts";

async function enableMocking() {
  const { worker } = await import("./mocks/browser");

  return worker.start({
    serviceWorker: {
      url: `${window.location.origin}${BASE_URL}mockServiceWorker.js`,
      options: { scope: BASE_URL },
    },
    onUnhandledRequest: "bypass",
  });
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <ToastProvider>
        <APIProvider>
          <ModalProvider>
            <App />
          </ModalProvider>
        </APIProvider>
      </ToastProvider>
    </React.StrictMode>
  );
});
