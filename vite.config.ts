import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'url'

export default defineConfig({
  // This fixes the blank page on GitHub Pages
  base: '/Portfolio/', 
  
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Modern way to define '@' alias without using __dirname
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  assetsInclude: ['**/*.svg', '**/*.csv'],
})