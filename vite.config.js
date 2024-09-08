import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: './src/main.js', // Set this to your actual entry point
    },
  },
  base: '/SolarSystem/', 
});
