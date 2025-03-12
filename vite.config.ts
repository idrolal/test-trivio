import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { URL, fileURLToPath } from 'node:url';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: "",
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: `
        @import "@/assets/styles/mixin.less"; 
        @import "@/assets/styles/vars.less"; 
        `,
      },
    },
  },
  server: {
    port: 3000,
  },
});
