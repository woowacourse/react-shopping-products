import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

async function enableMocking() {
  if (import.meta.env.MODE !== "mock") {
    return;
  }

  const { worker } = await import("./mocks/browser");
  return worker.start({
    serviceWorker: {
      url: "/react-shopping-products/mockServiceWorker.js",
    },
  });
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
