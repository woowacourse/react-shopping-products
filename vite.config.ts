/// <reference types="vitest" />
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(({ mode }) => {
  // 현재 모드 (development, test 등)에 따라 .env 파일 로드
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      react({
        jsxImportSource: "@emotion/react",
      }),
    ],
    define: {
      // 환경 변수들을 Vite에서 사용할 수 있게 주입
      "import.meta.env.VITE_BASE_URL": JSON.stringify(env.VITE_BASE_URL),
      "import.meta.env.VITE_USER_TOKEN": JSON.stringify(env.VITE_USER_TOKEN),
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/setupTest.ts",
    },
  };
});
