// /// <reference types="vitest" />
// import { fileURLToPath, URL } from 'url';
// import react from '@vitejs/plugin-react';
// import { defineConfig } from 'vite';
// import environment from 'vite-plugin-environment';
// import dotenv from 'dotenv';

// dotenv.config({ path: '../../.env' });

// export default defineConfig({
//   build: {
//     emptyOutDir: true,
//     rollupOptions: {
//       external: ['react', 'react-dom', 'react-router-dom'],
//     }
//   },
//   optimizeDeps: {
//     esbuildOptions: {
//       define: {
//         global: "globalThis",
//       },
//     },
//   },
//   server: {
//     proxy: {
//       "/api": {
//         target: "http://127.0.0.1:4943",
//         changeOrigin: true,
//       },
//     },
//   },
//   plugins: [
//     react(),
//     environment("all", { prefix: "CANISTER_" }),
//     environment("all", { prefix: "DFX_" }),
//   ],
//   test: {
//     environment: 'jsdom',
//     setupFiles: 'src/setupTests.js',
//   },
//   resolve: {
//     alias: [
//       {
//         find: "declarations",
//         replacement: fileURLToPath(
//           new URL("../declarations", import.meta.url)
//         ),
//       },
//     ],
//     dedupe: ['@dfinity/agent'],
//   },
// });

import { fileURLToPath, URL } from "url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import environment from "vite-plugin-environment";
import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

export default defineConfig({
  resolve: {
    alias: {
      "@": "/src", // This helps with path resolution
      declarations: fileURLToPath(new URL("../declarations", import.meta.url)), // Merged alias
    },
  },
  build: {
    emptyOutDir: true,
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:4943",
        changeOrigin: false,
      },
    },
  },
  plugins: [
    react(),
    environment("all", { prefix: "CANISTER_" }),
    environment("all", { prefix: "DFX_" }),
  ],
});