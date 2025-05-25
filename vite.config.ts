import path from 'path';

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
// eslint-disable-next-line no-restricted-exports
export default defineConfig({
  plugins: [react({ jsxImportSource: '@emotion/react' })],
  publicDir: 'public',
  base: 'https://keemsebin.github.io/react-shopping-products/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
