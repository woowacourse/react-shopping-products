import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/react-shopping-products/",
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
    }),
  ],
  test: {
    include: ["**/*.test.tsx"],
    globals: true,
    environment: "jsdom",
  },
});
