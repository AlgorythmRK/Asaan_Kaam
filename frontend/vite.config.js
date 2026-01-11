import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Listen on all local IPs
    port: process.env.PORT || 5173,
    open: true
  },
  preview: {
    host: true, // Listen on all local IPs
    port: process.env.PORT || 4173
  }
})
