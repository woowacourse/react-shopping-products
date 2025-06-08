import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { APIProvider } from "./apis/contexts/APIContext.tsx";
import App from "./App.tsx";
import { BASE_URL } from "./app/config/base.ts";
import { ModalProvider } from "./shared/contexts/ModalContext.tsx";
import { ToastProvider } from "./shared/contexts/ToastContext.tsx";

async function enableMocking() {
  if (!import.meta.env.VITE_USE_MOCK) return;

  const { worker } = await import("./__mocks__/browser.ts");

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
      <BrowserRouter>
        <ToastProvider>
          <APIProvider>
            <ModalProvider>
              <App />
            </ModalProvider>
          </APIProvider>
        </ToastProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
});
