import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          // Add Locator.js babel plugin for development
          ...(process.env.NODE_ENV === "development"
            ? [
                [
                  "@locator/babel-jsx/dist/index.js",
                  {
                    env: "development",
                  },
                ],
              ]
            : []),
        ],
      },
    }),
  ],
  define: {
    // Enable Locator.js in development
    __LOCATOR_ENABLED__: process.env.NODE_ENV === "development",
  },
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
});
