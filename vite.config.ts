/// <reference types="vitest" />
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

export default defineConfig(() => {
  return {
    base: "/react-shopping-products/",
    plugins: [
      react({
        jsxImportSource: "@emotion/react",
      }),
    ],
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/setupTest.ts",
    },
  };
});
