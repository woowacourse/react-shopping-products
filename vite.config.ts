/// <reference types="vitest" />
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    base: "/react-shopping-products/",
    plugins: [
      react({
        jsxImportSource: "@emotion/react",
      }),
    ],
    define: {
      "import.meta.env.VITE_BASE_URL": JSON.stringify(env.VITE_BASE_URL || ""),
      "import.meta.env.VITE_USER_TOKEN": JSON.stringify(env.VITE_USER_TOKEN),
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/setupTest.ts",
    },
  };
});
