import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createRequire } from 'module'
import tailwindcss from '@tailwindcss/vite'

// Create a require function that works in ESM context
const require = createRequire(import.meta.url)
// Get a direct reference to the actual crypto module
const crypto = require('crypto')

// Polyfill for crypto.hash which is expected by Vite but not available in Node.js v20
if (!('hash' in crypto)) {
  Object.defineProperty(crypto, 'hash', {
    value: function(algorithm, data, outputEncoding) {
      if (outputEncoding === 'buffer') {
        return crypto.createHash(algorithm).update(data).digest();
      }
      return crypto.createHash(algorithm).update(data).digest(outputEncoding || 'hex');
    },
    writable: false,
    enumerable: true,
    configurable: true
  });
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
      tailwindcss(),
  ],
})