import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/expandTemplate': {
        target: 'http://velocity.ybogdanov.keenetic.link',
        changeOrigin: true,
      },
    },
  },
});
