import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // vite-react-ssg picks up this entry automatically via package.json scripts.
  ssr: {
    // framer-motion ships ESM that must be processed during SSR/SSG.
    noExternal: ['framer-motion'],
  },
  build: {
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1200,
  },
});
