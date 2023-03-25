import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    dedupe: ["vue"],
    preserveSymlinks: false,
  },
  logLevel: "info",
  build: {
    target: "esnext",
    minify: "terser",
    lib: {
      entry: path.resolve(__dirname, "lib/main.ts"),
      name: "SortableJS-Vue3",
      fileName: (format) => `sortablejs-vue3.${format}.js`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["vue", "sortablejs"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: "Vue",
          sortablejs: "Sortable",
        },
      },
    },
  },
});
