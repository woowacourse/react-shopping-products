import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  base: '/react-shopping-products/',
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
    }),
  ],
});
