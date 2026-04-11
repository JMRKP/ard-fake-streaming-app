import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import fs from 'fs'

 const basePath = (mode: string): string => {                                                            
    if (process.env.CAPACITOR) return '/';                                                                
    return mode === 'production' ? '/ard-fake-streaming-app/' : '/';                                      
  }

export default defineConfig(({ mode }) => ({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
    // Skip VitePWA when building for Capacitor. A service worker inside a
    // native wrapper is pointless (assets are packaged) and tends to serve
    // stale precached bundles when the scheme or base path changes.
    ...(process.env.CAPACITOR
      ? []
      : [
          VitePWA({
            registerType: 'autoUpdate',
            devOptions: { enabled: true },
            includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg', 'animated/Ikosaeder-Animation.png', 'animated/Nagrasyster_encoded_frame.png'],
            workbox: {
              navigateFallbackDenylist: [/\/controller(\/|$)/],
            },
            manifest: {
              name: '3 Minutes',
              short_name: '3 Minutes',
              description: 'Dummy PWA App for ARD production 3 Minutes',
              theme_color: '#000000',
              background_color: '#000000',
              display: 'fullscreen',
              orientation: 'portrait',
              scope: basePath(mode),
              start_url: basePath(mode),
              icons: [
                {
                  src: 'pwa-192x192.png',
                  sizes: '192x192',
                  type: 'image/png'
                },
                {
                  src: 'pwa-512x512.png',
                  sizes: '512x512',
                  type: 'image/png'
                },
                {
                  src: 'pwa-512x512.png',
                  sizes: '512x512',
                  type: 'image/png',
                  purpose: 'any maskable'
                }
              ],
              categories: ['productivity', 'utilities']
            }
          })
        ]),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],

  // GitHub Pages configuration
  base: basePath(mode),

  // HTTPS only for development (GitHub Pages serves over HTTP)
  server: mode === 'development' ? {
    https: {
      key: fs.readFileSync('../.cert/key.pem'),
      cert: fs.readFileSync('../.cert/cert.pem'),
    },
    host: true, // Allow access from network
  } : undefined,

  // Build configuration for GitHub Pages
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
}))
