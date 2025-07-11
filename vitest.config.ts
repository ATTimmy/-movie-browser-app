import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/Config/setupTests.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      exclude: [
        'dist/**',
        'vite.config.*',
        'vite.ssr.config.*',
        'vitest.config.*',
        'eslint.config.*',
        'src/main.tsx',
        'src/Server/Server.tsx',
        'src/setupTests.ts',
        '**/*.test.tsx',
        '**/__tests__/**',
      ],
    },
  },
});
