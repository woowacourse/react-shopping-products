import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ErrorContextProvider } from "./contexts/ErrorContext";
import { QueryContextProvider } from "./contexts/QueryContext.tsx";

async function initMsw() {
  try {
    const enableMsw =
      String(import.meta.env.VITE_APP_USE_MSW).toLowerCase() === "true";

    if (!enableMsw) return;

    const { worker } = await import("./mocks/browser");

    const baseUrl = import.meta.env.BASE_URL;

    await worker.start({
      serviceWorker: {
        url: `${window.location.origin}${baseUrl}mockServiceWorker.js`,
        options: { scope: baseUrl },
      },
      onUnhandledRequest: "warn",
    });
  } catch (error) {
    console.error("MSW 초기화 실패:", error);
  }
}

async function startApp() {
  // MSW 초기화 먼저 수행
  await initMsw();

  // 그 후 앱 렌더링
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <QueryContextProvider>
        <ErrorContextProvider>
          <App />
        </ErrorContextProvider>
      </QueryContextProvider>
    </React.StrictMode>
  );
}

// 앱 시작
startApp().catch((error) => {
  console.error("앱 초기화 실패:", error);
});
