import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ErrorContextProvider } from "./contexts/ErrorContext";
import { CartContextProvider } from "./contexts/CartContext.tsx";
import { ProductContextProvider } from "./contexts/ProductContext.tsx";

// MSW 디버깅용 전역 타입 확장
declare global {
  interface Window {
    __MSW_ENABLED__?: boolean;
  }
}

// MSW 초기화
async function initMsw() {
  try {
    // 환경 변수 로깅
    console.log("MSW 환경변수:", import.meta.env.VITE_APP_USE_MSW);

    // MSW 활성화 여부 확인
    const enableMsw =
      import.meta.env.VITE_APP_USE_MSW === true ||
      import.meta.env.VITE_APP_USE_MSW === "true";

    console.log("MSW 활성화 상태:", enableMsw);

    if (enableMsw) {
      console.log("MSW 초기화 중...");

      // 브라우저 환경에서만 MSW 로드
      if (typeof window !== "undefined") {
        const { worker } = await import("./mocks/browser");

        // 서비스 워커 시작 (publicPath 명시적 설정)
        const baseUrl = import.meta.env.BASE_URL || "/";
        await worker.start({
          serviceWorker: {
            url: `${window.location.origin}${baseUrl}mockServiceWorker.js`,
            options: {
              scope: baseUrl,
            },
          },
          onUnhandledRequest: "warn",
        });
        // 전역 객체에 MSW 표시 (디버깅용)
        window.__MSW_ENABLED__ = true;
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
      <ProductContextProvider>
        <CartContextProvider>
          <ErrorContextProvider>
            <App />
          </ErrorContextProvider>
        </CartContextProvider>
      </ProductContextProvider>
    </React.StrictMode>
  );
}

// 앱 시작
startApp().catch((error) => {
  console.error("앱 초기화 실패:", error);
});
