import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

if (
  import.meta.env.MODE !== "production" ||
  import.meta.env.VITE_ENABLE_MSW === "true"
) {
  const { worker } = await import("./mocks/browser");
  await worker.start({
    serviceWorker: {
      url: `${import.meta.env.BASE_URL}mockServiceWorker.js`,
    },
  });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
