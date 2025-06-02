import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      external: ['vitest'], // 혹은 expect 관련 테스트 종속성 제외
    },
  },

  plugins: [react()],
});
