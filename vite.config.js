import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default ({ mode }) => {
  // Load environment variables based on the current mode (development or production)
  const env = loadEnv(mode, process.cwd(), '')

  return defineConfig({
    plugins: [react()],
    base: "/Gemini-Chat-Bot/",
    
    // Example: you can define env variables for your app
    define: {
      'process.env': env
    },

  
  })
}
