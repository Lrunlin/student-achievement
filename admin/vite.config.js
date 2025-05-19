import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import Pages from "vite-plugin-pages";
import Layouts from "vite-plugin-vue-layouts";
import AutoImport from "unplugin-auto-import/vite";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    extensions: [".js", ".vue"],
  },
  base: "./",
  server: {
    port: 8001,
  },
  build: {
    outDir: "front_end",
  },
  plugins: [
    vue(),
    Pages({
      dirs: "src/pages",
      extensions: ["vue"],
      extendRoute(route) {
        if (route.path.startsWith("/admin") && !route.path.includes("sign")) {
          route.meta = Object.assign(route.meta || {}, { layout: "admin" });
        } else if (route.path.startsWith("/teacher") && !route.path.includes("sign")) {
          route.meta = Object.assign(route.meta || {}, { layout: "teacher" });
        } else if (route.path.startsWith("/student") && !route.path.includes("sign")) {
          route.meta = Object.assign(route.meta || {}, { layout: "student" });
        }

        return route;
      },
    }),
    Layouts(),
    AutoImport({
      imports: ["vue", "vue-router"],
      // dts: "src/auto-import.d.ts",
      include: [/\.vue$/, /\.vue\?vue/],
    }),
  ],
});
