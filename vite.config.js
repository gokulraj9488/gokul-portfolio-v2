import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' produces relative asset URLs so the same build works on
//  - a custom domain at root (gokul.quest)        -> https://gokul.quest/
//  - GitHub project pages at a subpath            -> https://<user>.github.io/<repo>/
// No client-side router is used (single-page anchor scroll), so no SPA 404 fallback is needed.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 900,
  },
})
