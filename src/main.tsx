import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/index.css";

async function enableMocking() {
  const isDev = location.hostname === "localhost";
  const isGithubPages = location.hostname === "h0ngju.github.io";

  const { worker } = await import("./mocks/browser");

  if (isGithubPages) {
    return worker.start({
      serviceWorker: {
        url: "/react-shopping-products/mockServiceWorker.js",
      },
    });
  }

  if (isDev) {
    return worker.start();
  }

  return;
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
