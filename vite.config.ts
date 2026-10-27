import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          postprocessing: ['postprocessing', '@react-three/postprocessing'],
          vendor: ['react', 'react-dom', 'framer-motion', 'gsap', 'lucide-react'],
        },
      },
    },
  },
});
