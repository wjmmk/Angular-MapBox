/// <reference types="vitest" />
import { defineConfig } from 'vite';
import angular from '@analogjs/platform';

export default defineConfig({
  plugins: [angular()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts'],
  },
});
