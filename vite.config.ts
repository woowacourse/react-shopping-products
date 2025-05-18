import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(({ mode }) => {
  // VITE_APP_USE_MSW 환경변수가 "true"이거나 개발 모드일 때 MSW 활성화
  const useMsw =
    process.env.VITE_APP_USE_MSW === "true" || mode === "development";

  return {
    base: "/react-shopping-products/",
    plugins: [
      react({
        jsxImportSource: "@emotion/react",
      }),
    ],
    test: {
      environment: "jsdom",
      globals: true,
      setupFiles: ["./src/setupTests.ts"],
    },
    define: {
      // import.meta.env.VITE_APP_USE_MSW에 값 주입
      "import.meta.env.VITE_APP_USE_MSW": JSON.stringify(useMsw),
    },
  };
});
