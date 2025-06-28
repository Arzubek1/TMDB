import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // <-- кош

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      $: path.resolve(__dirname, 'src'), // <-- бул эң негизгиси
    },
  },
})
