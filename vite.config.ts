import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { test } from 'vitest';

export default defineConfig({
  plugins: [react()],
  base: '/react-shopping-products/',
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    include: ['src/**/*.ts'],
  },
});
