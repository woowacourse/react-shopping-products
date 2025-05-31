import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./style/reset.css";
import MobileLayout from "@components/MobileLayout";

async function enableMocking() {
  // if (process.env.NODE_ENV !== 'development') {
  //   return;
  // }
  const isLocalhost = location.hostname === "localhost";
  const { worker } = await import("./mocks/browser");
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
      <MobileLayout>
        <App />
      </MobileLayout>
    </React.StrictMode>
  );
});
