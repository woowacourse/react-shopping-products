import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  base: '/react-shopping-products/',
  plugins: [
    react({
      jsxImportSource: '@emotion/react'
    })
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/setupTests.ts']
  }
});
