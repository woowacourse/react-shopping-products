import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ToastProvider } from "./components/toastProvider/ToastProvider.tsx";
import { DataProvider } from "./provider/DataProvider.tsx";

async function enableMocking() {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  const { worker } = await import("./mocks/browser");
  return worker.start();
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
