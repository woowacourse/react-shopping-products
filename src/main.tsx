import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Global } from "@emotion/react";
import { resetCss } from "./styles/reset";

async function startApp() {
  console.log("MSW 초기화 중...");

  try {
    const { worker } = await import("./mocks/browser");

    console.log("MSW 워커 로드됨:", !!worker);

    await worker
      .start({
        onUnhandledRequest: "warn",
      })
      .catch((error: Error) => {
        console.error("MSW 시작 실패:", error);
      });

    console.log("🔶 MSW 모의 서버가 성공적으로 시작되었습니다.");
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
