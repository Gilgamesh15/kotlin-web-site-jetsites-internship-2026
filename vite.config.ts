import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [reactRouter(), tsconfigPaths()],
  resolve: {
    alias: {
      // Point to .js file as .ts file is not being referred to by default
      "@rescui/card": "@rescui/card/lib/index.js",
    },
  },
  ssr: {
    noExternal: [/@rescui\/.*/, /@jetbrains\/kotlin-web-site-ui/],
  },
});
