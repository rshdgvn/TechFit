import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'html-inject-date',
      transformIndexHtml(html) {
        const currentDate = new Date().toISOString();
        return html.replace(/%BUILD_DATE%/g, currentDate);
      }
    }
  ],
})