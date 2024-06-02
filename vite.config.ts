import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "@svgr/rollup";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: [
      { find: "@src", replacement: resolve(__dirname, "src") },
      { find: "@apis", replacement: resolve(__dirname, "src/apis") },
      { find: "@assets", replacement: resolve(__dirname, "src/assets") },
      { find: "@components", replacement: resolve(__dirname, "src/components") },
      { find: "@env", replacement: resolve(__dirname, "src/env") },
      { find: "@hooks", replacement: resolve(__dirname, "src/hooks") },
      { find: "@mocks", replacement: resolve(__dirname, "src/mocks") },
      { find: "@pages", replacement: resolve(__dirname, "src/pages") },
      { find: "@store", replacement: resolve(__dirname, "src/store") },
      { find: "@styles", replacement: resolve(__dirname, "src/styles") },
      { find: "@types", replacement: resolve(__dirname, "src/types") },
      { find: "@utils", replacement: resolve(__dirname, "src/utils") },
    ],
  },
});
