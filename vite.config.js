import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const enablePwa = process.env.VITE_ENABLE_PWA === 'true'

export default defineConfig(async () => {
  const plugins = [react()]

  if (enablePwa) {
    const { VitePWA } = await import(/* @vite-ignore */ 'vite-plugin-pwa')
    plugins.push(
      VitePWA({
        registerType: 'autoUpdate',
        manifest: {
          name: 'HanziBridge',
          short_name: 'HanziBridge',
          theme_color: '#111111',
          background_color: '#111111',
          display: 'standalone',
          icons: [
            // Siapkan icon 192x192 dan 512x512 di folder /public ketika sudah ready
          ],
        },
      })
    )
  }

  return {
    plugins,
  }
})