import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ErrorContextProvider } from "./contexts/ErrorContext";
import { QueryContextProvider } from "./contexts/QueryContext.tsx";

async function initMsw() {
  try {
    // MSW 활성화 여부 확인
    const enableMsw =
      import.meta.env.VITE_APP_USE_MSW === true ||
      import.meta.env.VITE_APP_USE_MSW === "true";

    console.log("MSW 활성화 상태:", enableMsw);

    if (enableMsw) {
      console.log("MSW 초기화 중...");

      if (typeof window !== "undefined") {
        const { worker } = await import("./mocks/browser");

        const baseUrl = import.meta.env.BASE_URL || "/";
        const scopeUrl = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
        await worker.start({
          serviceWorker: {
            url: `${window.location.origin}${baseUrl}${
              baseUrl.endsWith("/") ? "" : "/"
            }mockServiceWorker.js`,
            options: {
              scope: scopeUrl,
            },
          },
          onUnhandledRequest: "warn",
        });
      }
    } else {
      console.log(
        "MSW가 비활성화되었습니다. 실제 API 요청이 서버로 전송됩니다."
      );
    }
  } catch (error) {
    console.error("MSW 초기화 실패:", error);
  }
}

// 앱 렌더링 함수
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
