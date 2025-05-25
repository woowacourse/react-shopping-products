import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";

async function enableMocking() {
  const { worker } = await import("./mocks/browser"); //Dynamic import
  await worker.start({
    serviceWorker: {
      url: `${
        import.meta.env.BASE_URL
      }/react-shopping-products/mockServiceWorker.js`,
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
