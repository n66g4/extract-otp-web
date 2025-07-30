import { defineConfig } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl';

/**
 * @see https://vitejs.dev/config/
 */
export default defineConfig({
  base: '/extract-otp-web/',
  plugins: [basicSsl()],
  server: {
    https: true,
  },
});
