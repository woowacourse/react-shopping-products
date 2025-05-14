import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom", // jsdom 환경 설정 (기본값이 jsdom이지만 명시적으로 설정)
    globals: true, // 전역 변수 활성화
    setupFiles: "./vitest.setup.ts", // 여기를 통해 위 코드가 실행됨
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@components": path.resolve(__dirname, "./src/components"),
    },
  },
});
