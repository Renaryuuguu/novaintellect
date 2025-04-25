import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { join } from 'node:path';
// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": join(__dirname, "./src/")
    }
  },
  build: {
    target: "modules",
    outDir: "dist",
    assetsDir: "assets",
    cssCodeSplit: true,
    sourcemap: false,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  server: {
    host: 'localhost',
    port: 3333,
    open: true,
    strictPort: true,
  },
  plugins: [react()],
})
