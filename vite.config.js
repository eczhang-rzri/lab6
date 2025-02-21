import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': { // All requests starting with /api will be proxied
        target: 'http://localhost:5000', // Your backend URL
        changeOrigin: true, // Required for CORS to work correctly
        // rewrite: (path) => path.replace(/^\/api/, ''), // Optional: remove /api prefix from the request
      },
    },
  },
})
