import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import tsConfigPaths from "vite-tsconfig-paths";
import * as packageJson from "./package.json";

export default defineConfig(() => ({
  plugins: [
    react(),
    tsConfigPaths(),
    dts({
      include: ["src"],
    }),
  ],

  build: {
    lib: {
      entry: resolve("src", "index.ts"),
      name: "tawasukha-ui",
      formats: ["es", "cjs"],
      fileName: (format) =>
        `tawasukha-ui.${format === "cjs" ? "cjs" : "es.js"
        }`,
    },
    optimizeDeps: {
      exclude: Object.keys(packageJson.peerDependencies),
    },
    esbuild: {
      minify: false,
    },
    rollupOptions: {
      external: ["react-textarea-autosize", "react", "react-dom"],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name == 'style.css')
            return 'theme.css';
          return assetInfo.name;
        },
      }
    }
  },
}));
