import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Global } from "@emotion/react";
import { resetCss } from "./styles/reset";

async function startApp() {
  try {
    const { worker } = await import("./mocks/browser");

    await worker.start({
      serviceWorker: {
        url: "/react-shopping-products/mockServiceWorker.js",
      },
      onUnhandledRequest: "warn",
    });
  } catch (error) {
    console.error("MSW 로드 실패:", error);
  }

  const root = ReactDOM.createRoot(document.getElementById("root")!);
  root.render(
    <React.StrictMode>
      <Global styles={resetCss} />
      <App />
    </React.StrictMode>
  );
}

startApp();
