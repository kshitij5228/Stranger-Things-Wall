import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Stranger-Things-Wall/', // Add this line for GitHub Pages
  server: {
    port: 5173,
    strictPort: true,
    open: false
  }
})
