import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from 'vite-plugin-pwa'
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Dish List App',
        short_name: 'DishList',
        description: 'A Progressive Web App to list and manage your favorite dishes.',
        theme_color: '#000000',
        icons: [
          {
            src: './icons/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: './icons/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,ts,tsx,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            // cache google spreadsheet
            urlPattern: ({url}) => url.origin === 'https://docs.google.com' && url.pathname.startsWith('/spreadsheets/'),
            handler: 'NetworkFirst', // Use NetworkFirst strategy
            options: {
              cacheName: 'api-cache',
              networkTimeoutSeconds: 10,
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24, // 1 day
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      }
    })
  ],
})
