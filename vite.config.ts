import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'production' ? '/react-shopping-products/' : '/', // ✅ 조건 분기
  test: {
    globals: true,
    environment: 'jsdom',
  },
}));
