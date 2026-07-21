import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,          // écoute sur 0.0.0.0 → accessible depuis l'hôte via Docker
    port: 5173,
    watch: {
      // Le hot-reload dans un conteneur sur macOS/Windows nécessite le polling
      // (les événements de fichiers ne traversent pas toujours le montage).
      usePolling: true,
    },
  },
})
