import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ToastProvider } from "./provider/ToastProvider.tsx";
import { DataProvider } from "./provider/DataProvider.tsx";

async function enableMocking() {
  const { worker } = await import("./mocks/browser");
  return worker.start({
    serviceWorker: {
      url:
        window.location.hostname === "localhost"
          ? "/mockServiceWorker.js"
          : "/react-shopping-products/mockServiceWorker.js",
    },
  });
}
enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <ToastProvider>
        <DataProvider>
          <App />
        </DataProvider>
      </ToastProvider>
    </React.StrictMode>
  );
});
