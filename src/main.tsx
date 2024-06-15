import App from "@/App";
import ToastsProvider from "@/provider/toastProvider";
import React from "react";
import ReactDOM from "react-dom/client";

async function enableMocking() {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  /**
   * 주석 여부
   * 브라우저 환경에서 MSW (Mock Service Worker)를 사용하여 API 요청을 모킹할지 여부를 설정합니다.
   * 이 설정은 테스트 환경에서 실제 API 호출을 대체하여 안정적인 가짜 데이터를 반환하도록 도와줍니다.
   */
  // const { worker } = await import("./mocks/browser.ts");
  // return worker.start();
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <ToastsProvider>
        <App />
      </ToastsProvider>
    </React.StrictMode>
  );
});
