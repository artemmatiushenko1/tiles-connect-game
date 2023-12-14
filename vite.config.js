import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'tiles-connect-app',
      filename: 'remoteEntry.js',
      exposes: {
        './app': './src/components/tiles-board/TilesBoard.jsx',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  build: { target: 'esnext' },
  server: {
    port: 3001,
  },
  preview: {
    port: 3001,
  },
});
