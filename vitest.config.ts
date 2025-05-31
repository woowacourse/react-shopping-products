import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react"; // React 프로젝트라면 이 플러그인을 사용하고 있을 것입니다.

export default defineConfig({
  plugins: [react()], // 사용하는 플러그인을 여기에 포함
  test: {
    globals: true, // describe, it, expect 등을 전역으로 사용하게 해줍니다 (RTL과 함께 자주 사용)
    environment: "jsdom", // <--- 이 줄을 추가 또는 수정합니다.
    setupFiles: "./src/setpupTests.ts",
    // 다른 Vitest 설정들...
  },
});
