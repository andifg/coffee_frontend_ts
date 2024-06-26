/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/tests/setup.ts",
    coverage: {
      provider: "v8",
      exclude: [
        "src/client/**",
        "dev-dist/**",
        "public/**",
        "src/theme.ts",
        "src/vite-env.d.ts",
        ".eslintrc.cjs",
        "src/types/**",
        "src/main.tsx",
      ],
    },
  },
  base: "./",
  optimizeDeps: {
    include: [
      "@emotion/react",
      "@emotion/styled",
      "@mui/material/Tooltip",
      "@mui/material/Unstable_Grid2",
    ],
    exclude: ["js-big-decimal"],
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "prompt",
      includeAssets: ["*.png", "*.jpg"],
      manifest: {
        name: "Bean Score",
        short_name: "Bean Score",
        description: "My Awesome App Coffee Rating App!",
        theme_color: "#ffffff",
        icons: [
          {
            src: "pwa-64x64.png",
            sizes: "64x64",
            type: "image/png",
          },
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      devOptions: {
        enabled: true,
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /.*\/api\/.*\/image/,
            handler: "CacheFirst" as const,
            options: {
              cacheName: "coffee-images",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60, // 1 hour
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
});
