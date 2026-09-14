import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'index.html'),
        experience: resolve(__dirname, 'experience.html'),
        projects: resolve(__dirname, 'projects.html'),
        certificates: resolve(__dirname, 'certificates.html'),
      },
    },
  },
});
