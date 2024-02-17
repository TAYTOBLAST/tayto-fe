import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import svgrPlugin from "vite-plugin-svgr";
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.join(__dirname, "src"),
    },
  },
  server: {
    hmr: true,
    cors: true,
    proxy: {
      "/ins": {
        target: `https://goerli-api.ethscriptions.com/`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ins/, ""),
      },
    },
  },
  plugins: [
    react(),
    nodePolyfills({
      protocolImports: true,
    }),
    svgrPlugin({
      svgrOptions: {
        icon: true,
        // ...svgr options (https://react-svgr.com/docs/options/)
      },
    }),
  ],
  build: {
    chunkSizeWarningLimit: 1600,
  },
});
