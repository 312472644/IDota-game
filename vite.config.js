import { defineConfig } from 'vite';
import vitePluginEslint from 'vite-plugin-eslint';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vitePluginEslint({
      throwOnError: true
    })
  ],
  resolve: {
    alias: {
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@service': path.resolve(__dirname, 'src/service'),
      '@components': path.resolve(__dirname, 'src/components')
    },
    extensions: ['.vue', '.js']
  }
});
