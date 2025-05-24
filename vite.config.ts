import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { configDefaults } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  base:
    process.env.NODE_ENV === "production" ? "/react-shopping-products/" : "/",
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    exclude: [...configDefaults.exclude, "node_modules"],
  },
});
