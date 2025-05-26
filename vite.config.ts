import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],

  base: "/react-shopping-products/",
  build: {
    rollupOptions: {
      external: [],
    },
  },
  publicDir: "public",
  test: {
    environment: "jsdom",
    globals: true,
  },
  server: {
    fs: {
      allow: [".."],
    },
  },
});
