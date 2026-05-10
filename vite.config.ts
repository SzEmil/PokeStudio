import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/PokeStudio/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'redux-vendor': ['@reduxjs/toolkit', 'react-redux', 'redux-persist'],
          'firebase-vendor': ['firebase/app', 'firebase/auth', 'firebase/database'],
          'motion-vendor': ['framer-motion'],
          'icons-vendor': ['react-icons'],
        },
      },
    },
  },
});
