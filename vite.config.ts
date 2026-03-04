import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.jpg': 'file',
        '.jpeg': 'file',
        '.png': 'file',
        '.gif': 'file',
        '.webp': 'file',
        '.svg': 'text',
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
      output: {
        manualChunks: {
          'vendor-radix': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-popover',
            '@radix-ui/react-separator',
            '@radix-ui/react-slot',
            '@radix-ui/react-tooltip',
            '@radix-ui/react-collapsible',
          ],
          'vendor-map': ['leaflet', 'react-leaflet'],
          'vendor-gallery': ['lightgallery'],
          'vendor-icons': ['lucide-react'],
        },
      },
    },
  },
})
