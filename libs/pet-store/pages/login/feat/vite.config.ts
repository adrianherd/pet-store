import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../../../../node_modules/.vite/libs/pet-store/pages/login/feat',

  plugins: [react(), nxViteTsPaths()],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  test: {
    globals: true,
    cache: {
      dir: '../../../../../node_modules/.vitest/libs/pet-store/pages/login/feat',
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory:
        '../../../../../coverage/libs/pet-store/pages/login/feat',
      provider: 'v8',
    },
  },
});
