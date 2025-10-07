import { defineConfig } from 'vite'
import { djangoVitePlugin } from 'django-vite-plugin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    djangoVitePlugin([
      'frontend/main.ts',
    ]),
  ],
})
