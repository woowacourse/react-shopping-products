import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

async function enableMocking() {
  const { worker } = await import("./apis/mocks/browser.ts");

  const isLocalhost = location.hostname === "localhost";

  return worker.start({
    serviceWorker: {
      url: isLocalhost
        ? "/mockServiceWorker.js"
        : "/react-shopping-products/mockServiceWorker.js",
    },
    onUnhandledRequest: "bypass",
  });
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
