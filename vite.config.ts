import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  base: '/react-shopping-products/',
  test: {
    globals: true,
    environment: 'jsdom',
  },
});
