import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./style/reset.css";
import MobileLayout from "@components/MobileLayout";
import { worker } from "./mocks/browser.ts";

worker
  .start({
    serviceWorker: {
      url: "/mockServiceWorker.js",
    },
  })
  .then(() => {
    ReactDOM.createRoot(document.getElementById("root")!).render(
      <React.StrictMode>
        <MobileLayout>
          <App />
        </MobileLayout>
      </React.StrictMode>
    );
  });
