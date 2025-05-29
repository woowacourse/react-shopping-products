import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

console.log("MSW 브라우저 워커 설정 중...");
console.log("등록된 핸들러 수:", handlers.length);

// This configures a Service Worker with the given request handlers
export const worker = setupWorker(...handlers);

// MSW 디버깅 헬퍼 함수
export const debugMsw = () => {
  console.log("MSW 디버깅 정보:");
  console.log("- 핸들러 수:", handlers.length);
};
