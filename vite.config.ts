import react from '@vitejs/plugin-react';

import path from 'path';
import { reactScopedCssPlugin } from 'rollup-plugin-react-scoped-css';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths(), reactScopedCssPlugin()],
  base: '',
  resolve: {
    alias: {
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/variables";`,
      },
    },
  },
});
