import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5038', // use HTTP port from launchSettings
        changeOrigin: true,
        secure: false // not relevant for HTTP, keeps config tolerant
      }
    }
  }
})