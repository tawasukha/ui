// vite.config.ts
import react from "file:///Users/forte/Workspace/TS/ui/node_modules/.pnpm/@vitejs+plugin-react@3.1.0_vite@4.2.1/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { resolve } from "path";
import { defineConfig } from "file:///Users/forte/Workspace/TS/ui/node_modules/.pnpm/vite@4.2.1/node_modules/vite/dist/node/index.js";
import dts from "file:///Users/forte/Workspace/TS/ui/node_modules/.pnpm/vite-plugin-dts@2.2.0_vite@4.2.1/node_modules/vite-plugin-dts/dist/index.mjs";
import tsConfigPaths from "file:///Users/forte/Workspace/TS/ui/node_modules/.pnpm/vite-tsconfig-paths@4.0.8_typescript@5.0.3_vite@4.2.1/node_modules/vite-tsconfig-paths/dist/index.mjs";

// package.json
var peerDependencies = {
  react: "^18.2.0",
  "react-dom": "^18.2.0"
};

// vite.config.ts
var external = ["@fontsource/abeezee", "@rehookify/datepicker", "@tawasukha/icon", "downshift", "framer-motion", "react", "react-dom", "react-dropzone", "react-modal-promise", "react-textarea-autosize"];
var vite_config_default = defineConfig(() => ({
  plugins: [
    react(),
    tsConfigPaths(),
    dts({
      include: ["src"]
    })
  ],
  build: {
    lib: {
      entry: resolve("src", "index.ts"),
      name: "tawasukha-ui",
      formats: ["es", "cjs"],
      fileName: (format) => `tawasukha-ui.${format === "cjs" ? "cjs" : "es.js"}`
    },
    optimizeDeps: {
      exclude: Object.keys(peerDependencies)
    },
    esbuild: {
      minify: true
    },
    rollupOptions: {
      external,
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name == "style.css")
            return "theme.css";
          return assetInfo.name;
        }
      }
    }
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2ZvcnRlL1dvcmtzcGFjZS9UUy91aVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2ZvcnRlL1dvcmtzcGFjZS9UUy91aS92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvZm9ydGUvV29ya3NwYWNlL1RTL3VpL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IGR0cyBmcm9tIFwidml0ZS1wbHVnaW4tZHRzXCI7XG5pbXBvcnQgdHNDb25maWdQYXRocyBmcm9tIFwidml0ZS10c2NvbmZpZy1wYXRoc1wiO1xuaW1wb3J0ICogYXMgcGFja2FnZUpzb24gZnJvbSBcIi4vcGFja2FnZS5qc29uXCI7XG5cbmNvbnN0IGV4dGVybmFsID0gW1wiQGZvbnRzb3VyY2UvYWJlZXplZVwiLCBcIkByZWhvb2tpZnkvZGF0ZXBpY2tlclwiLCBcIkB0YXdhc3VraGEvaWNvblwiLCBcImRvd25zaGlmdFwiLCBcImZyYW1lci1tb3Rpb25cIiwgXCJyZWFjdFwiLCBcInJlYWN0LWRvbVwiLCBcInJlYWN0LWRyb3B6b25lXCIsIFwicmVhY3QtbW9kYWwtcHJvbWlzZVwiLCBcInJlYWN0LXRleHRhcmVhLWF1dG9zaXplXCJdXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoKSA9PiAoe1xuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICB0c0NvbmZpZ1BhdGhzKCksXG4gICAgZHRzKHtcbiAgICAgIGluY2x1ZGU6IFtcInNyY1wiXSxcbiAgICB9KSxcbiAgXSxcbiAgYnVpbGQ6IHtcbiAgICBsaWI6IHtcbiAgICAgIGVudHJ5OiByZXNvbHZlKFwic3JjXCIsIFwiaW5kZXgudHNcIiksXG4gICAgICBuYW1lOiBcInRhd2FzdWtoYS11aVwiLFxuICAgICAgZm9ybWF0czogW1wiZXNcIiwgXCJjanNcIl0sXG4gICAgICBmaWxlTmFtZTogKGZvcm1hdCkgPT5cbiAgICAgICAgYHRhd2FzdWtoYS11aS4ke2Zvcm1hdCA9PT0gXCJjanNcIiA/IFwiY2pzXCIgOiBcImVzLmpzXCJcbiAgICAgICAgfWAsXG4gICAgfSxcbiAgICBvcHRpbWl6ZURlcHM6IHtcbiAgICAgIGV4Y2x1ZGU6IE9iamVjdC5rZXlzKHBhY2thZ2VKc29uLnBlZXJEZXBlbmRlbmNpZXMpLFxuICAgIH0sXG4gICAgZXNidWlsZDoge1xuICAgICAgbWluaWZ5OiB0cnVlLFxuICAgIH0sXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgZXh0ZXJuYWwsXG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgYXNzZXRGaWxlTmFtZXM6IChhc3NldEluZm8pID0+IHtcbiAgICAgICAgICBpZiAoYXNzZXRJbmZvLm5hbWUgPT0gJ3N0eWxlLmNzcycpXG4gICAgICAgICAgICByZXR1cm4gJ3RoZW1lLmNzcyc7XG4gICAgICAgICAgcmV0dXJuIGFzc2V0SW5mby5uYW1lO1xuICAgICAgICB9LFxuICAgICAgfVxuICAgIH1cbiAgfSxcbn0pKTtcbiIsICJ7XG4gIFwibmFtZVwiOiBcIkB0YXdhc3VraGEvdWlcIixcbiAgXCJ2ZXJzaW9uXCI6IFwiMC4wLjhcIixcbiAgXCJ0eXBlXCI6IFwibW9kdWxlXCIsXG4gIFwidHlwZXNcIjogXCJkaXN0L2luZGV4LmQudHNcIixcbiAgXCJleHBvcnRzXCI6IHtcbiAgICBcIi5cIjoge1xuICAgICAgXCJyZXF1aXJlXCI6IFwiLi9kaXN0L3Rhd2FzdWtoYS11aS5janNcIixcbiAgICAgIFwiaW1wb3J0XCI6IFwiLi9kaXN0L3Rhd2FzdWtoYS11aS5lcy5qc1wiXG4gICAgfSxcbiAgICBcIi4vdGhlbWUuY3NzXCI6IHtcbiAgICAgIFwicmVxdWlyZVwiOiBcIi4vZGlzdC90aGVtZS5jc3NcIixcbiAgICAgIFwiZGVmYXVsdFwiOiBcIi4vZGlzdC90aGVtZS5jc3NcIlxuICAgIH0sXG4gICAgXCIuL2NvcmUuY3NzXCI6IHtcbiAgICAgIFwicmVxdWlyZVwiOiBcIi4vZGlzdC9jb3JlLmNzc1wiLFxuICAgICAgXCJkZWZhdWx0XCI6IFwiLi9kaXN0L2NvcmUuY3NzXCJcbiAgICB9XG4gIH0sXG4gIFwiZmlsZXNcIjogW1xuICAgIFwiZGlzdFwiXG4gIF0sXG4gIFwic2NyaXB0c1wiOiB7XG4gICAgXCJidWlsZFwiOiBcInJtIC1yZiBkaXN0ICYmIHZpdGUgYnVpbGQgJiYgbnBtIHJ1biBidWlsZDpjc3NcIixcbiAgICBcImJ1aWxkOmNzc1wiOiBcInRhaWx3aW5kY3NzIC1tIC1pIC4vc3JjL3RhaWx3aW5kLWVudHJ5LmNzcyAtbyAuL2Rpc3QvY29yZS5jc3NcIixcbiAgICBcImJ1aWxkLXdhdGNoXCI6IFwiY29uY3VycmVudGx5IFxcXCJ2aXRlIGJ1aWxkIC0td2F0Y2hcXFwiIFxcXCJucG0gcnVuIGJ1aWxkLXdhdGNoOmNzc1xcXCJcIixcbiAgICBcImJ1aWxkLXdhdGNoOmNzc1wiOiBcInRhaWx3aW5kY3NzIC13IC1pIC4vc3JjL3RhaWx3aW5kLWVudHJ5LmNzcyAtbyAuL2Rpc3QvY29yZS5jc3NcIixcbiAgICBcInN0b3J5Ym9va1wiOiBcImNvbmN1cnJlbnRseSBcXFwicG5wbSBydW4gc3Rvcnlib29rOmNzc1xcXCIgXFxcInN0b3J5Ym9vayBkZXYgLXAgNjAwNlxcXCJcIixcbiAgICBcInN0b3J5Ym9vazpjc3NcIjogXCJ0YWlsd2luZGNzcyAtdyAtaSAuL3NyYy90YWlsd2luZC1lbnRyeS5jc3MgLW8gLi9zcmMvaW5kZXguY3NzXCIsXG4gICAgXCJidWlsZC1zdG9yeWJvb2tcIjogXCJjb25jdXJyZW50bHkgXFxcInBucG0gcnVuIGJ1aWxkLXN0b3J5Ym9vazpjc3NcXFwiIFxcXCJzdG9yeWJvb2sgYnVpbGRcXFwiXCIsXG4gICAgXCJidWlsZC1zdG9yeWJvb2s6Y3NzXCI6IFwidGFpbHdpbmRjc3MgLW0gLWkgLi9zcmMvdGFpbHdpbmQtZW50cnkuY3NzIC1vIC4vc3JjL2luZGV4LmNzc1wiLFxuICAgIFwicHJlcHVibGlzaE9ubHlcIjogXCJwbnBtIGJ1aWxkXCJcbiAgfSxcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiQGJhYmVsL2NvcmVcIjogXCJeNy4yMS40XCIsXG4gICAgXCJAc3Rvcnlib29rL2FkZG9uLWVzc2VudGlhbHNcIjogXCJeNy4wLjJcIixcbiAgICBcIkBzdG9yeWJvb2svYWRkb24taW50ZXJhY3Rpb25zXCI6IFwiXjcuMC4yXCIsXG4gICAgXCJAc3Rvcnlib29rL2FkZG9uLWxpbmtzXCI6IFwiXjcuMC4yXCIsXG4gICAgXCJAc3Rvcnlib29rL2Jsb2Nrc1wiOiBcIl43LjAuMlwiLFxuICAgIFwiQHN0b3J5Ym9vay9yZWFjdFwiOiBcIl43LjAuMlwiLFxuICAgIFwiQHN0b3J5Ym9vay9yZWFjdC12aXRlXCI6IFwiXjcuMC4yXCIsXG4gICAgXCJAc3Rvcnlib29rL3Rlc3RpbmctbGlicmFyeVwiOiBcIl4wLjEuMFwiLFxuICAgIFwiQHR5cGVzL3JlYWN0XCI6IFwiXjE4LjAuMzNcIixcbiAgICBcIkB0eXBlcy9yZWFjdC1kb21cIjogXCJeMTguMC4xMVwiLFxuICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L2VzbGludC1wbHVnaW5cIjogXCJeNS41Ny4wXCIsXG4gICAgXCJAdHlwZXNjcmlwdC1lc2xpbnQvcGFyc2VyXCI6IFwiXjUuNTcuMFwiLFxuICAgIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjogXCJeMy4xLjBcIixcbiAgICBcImF1dG9wcmVmaXhlclwiOiBcIl4xMC40LjE0XCIsXG4gICAgXCJiYWJlbC1sb2FkZXJcIjogXCJeOC4zLjBcIixcbiAgICBcImNvbmN1cnJlbnRseVwiOiBcIl44LjAuMVwiLFxuICAgIFwiZXNsaW50XCI6IFwiXjguMzcuMFwiLFxuICAgIFwiZXNsaW50LWNvbmZpZy1wcmV0dGllclwiOiBcIl44LjguMFwiLFxuICAgIFwiZXNsaW50LWNvbmZpZy1zdGFuZGFyZC13aXRoLXR5cGVzY3JpcHRcIjogXCJeMzQuMC4xXCIsXG4gICAgXCJlc2xpbnQtcGx1Z2luLWltcG9ydFwiOiBcIl4yLjI3LjVcIixcbiAgICBcImVzbGludC1wbHVnaW4tblwiOiBcIl4xNS43LjBcIixcbiAgICBcImVzbGludC1wbHVnaW4tcHJvbWlzZVwiOiBcIl42LjEuMVwiLFxuICAgIFwiZXNsaW50LXBsdWdpbi1yZWFjdFwiOiBcIl43LjMyLjJcIixcbiAgICBcInBvc3Rjc3NcIjogXCJeOC40LjIxXCIsXG4gICAgXCJwcmV0dGllclwiOiBcIl4yLjguN1wiLFxuICAgIFwicHJldHRpZXItcGx1Z2luLXRhaWx3aW5kY3NzXCI6IFwiXjAuMi42XCIsXG4gICAgXCJwcm9wLXR5cGVzXCI6IFwiXjE1LjguMVwiLFxuICAgIFwicmVhY3RcIjogXCJeMTguMi4wXCIsXG4gICAgXCJyZWFjdC1kb21cIjogXCJeMTguMi4wXCIsXG4gICAgXCJyZWFjdC1odG1sLXByb3BzXCI6IFwiXjIuMC4yXCIsXG4gICAgXCJzdG9yeWJvb2tcIjogXCJeNy4wLjJcIixcbiAgICBcInRhaWx3aW5kY3NzXCI6IFwiXjMuMy4xXCIsXG4gICAgXCJ0eXBlc2NyaXB0XCI6IFwiXjUuMC4zXCIsXG4gICAgXCJ2aXRlXCI6IFwiXjQuMi4xXCIsXG4gICAgXCJ2aXRlLXBsdWdpbi1kdHNcIjogXCJeMi4yLjBcIixcbiAgICBcInZpdGUtdHNjb25maWctcGF0aHNcIjogXCJeNC4wLjhcIlxuICB9LFxuICBcInBlZXJEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwicmVhY3RcIjogXCJeMTguMi4wXCIsXG4gICAgXCJyZWFjdC1kb21cIjogXCJeMTguMi4wXCJcbiAgfSxcbiAgXCJwcmV0dGllclwiOiB7XG4gICAgXCJzZW1pXCI6IGZhbHNlLFxuICAgIFwidHJhaWxpbmdDb21tYVwiOiBcImFsbFwiLFxuICAgIFwic2luZ2xlUXVvdGVcIjogdHJ1ZSxcbiAgICBcInByaW50V2lkdGhcIjogMTAwLFxuICAgIFwidGFiV2lkdGhcIjogMlxuICB9LFxuICBcImRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAZm9udHNvdXJjZS9hYmVlemVlXCI6IFwiXjQuNS4xMFwiLFxuICAgIFwiQHJlaG9va2lmeS9kYXRlcGlja2VyXCI6IFwiXjQuMy4yXCIsXG4gICAgXCJAdGF3YXN1a2hhL2ljb25cIjogXCJeMi4wLjFcIixcbiAgICBcImN2YVwiOiBcIm5wbTpjbGFzcy12YXJpYW5jZS1hdXRob3JpdHlAXjAuNC4wXCIsXG4gICAgXCJkYXRlLWZuc1wiOiBcIl4yLjI5LjNcIixcbiAgICBcImRvd25zaGlmdFwiOiBcIl43LjYuMFwiLFxuICAgIFwiZnJhbWVyLW1vdGlvblwiOiBcIl4xMC4xMC4wXCIsXG4gICAgXCJyZWFjdC1kcm9wem9uZVwiOiBcIl4xNC4yLjNcIixcbiAgICBcInJlYWN0LW1vZGFsLXByb21pc2VcIjogXCJeMS4wLjJcIixcbiAgICBcInJlYWN0LXRleHRhcmVhLWF1dG9zaXplXCI6IFwiXjguNC4xXCJcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFzUSxPQUFPLFdBQVc7QUFDeFIsU0FBUyxlQUFlO0FBQ3hCLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixPQUFPLG1CQUFtQjs7O0FDbUV4Qix1QkFBb0I7QUFBQSxFQUNsQixPQUFTO0FBQUEsRUFDVCxhQUFhO0FBQ2Y7OztBRG5FRixJQUFNLFdBQVcsQ0FBQyx1QkFBdUIseUJBQXlCLG1CQUFtQixhQUFhLGlCQUFpQixTQUFTLGFBQWEsa0JBQWtCLHVCQUF1Qix5QkFBeUI7QUFFM00sSUFBTyxzQkFBUSxhQUFhLE9BQU87QUFBQSxFQUNqQyxTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixjQUFjO0FBQUEsSUFDZCxJQUFJO0FBQUEsTUFDRixTQUFTLENBQUMsS0FBSztBQUFBLElBQ2pCLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxLQUFLO0FBQUEsTUFDSCxPQUFPLFFBQVEsT0FBTyxVQUFVO0FBQUEsTUFDaEMsTUFBTTtBQUFBLE1BQ04sU0FBUyxDQUFDLE1BQU0sS0FBSztBQUFBLE1BQ3JCLFVBQVUsQ0FBQyxXQUNULGdCQUFnQixXQUFXLFFBQVEsUUFBUTtBQUFBLElBRS9DO0FBQUEsSUFDQSxjQUFjO0FBQUEsTUFDWixTQUFTLE9BQU8sS0FBaUIsZ0JBQWdCO0FBQUEsSUFDbkQ7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLFFBQVE7QUFBQSxJQUNWO0FBQUEsSUFDQSxlQUFlO0FBQUEsTUFDYjtBQUFBLE1BQ0EsUUFBUTtBQUFBLFFBQ04sZ0JBQWdCLENBQUMsY0FBYztBQUM3QixjQUFJLFVBQVUsUUFBUTtBQUNwQixtQkFBTztBQUNULGlCQUFPLFVBQVU7QUFBQSxRQUNuQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLEVBQUU7IiwKICAibmFtZXMiOiBbXQp9Cg==
