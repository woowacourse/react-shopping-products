import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react', // :white_check_mark: 이것만 있어도 기본적으로 작동함
    }),
  ],

  test: {
    globals: true,
    environment: 'jsdom',
  },
  base: '',
});
