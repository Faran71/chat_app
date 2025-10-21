import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    allowedHosts: [
      'development-lumina.firewoodtools.com',
      'lumina.firewoodtools.com'
    ],
    host: '0.0.0.0',
    port: 5173,
  }
});
