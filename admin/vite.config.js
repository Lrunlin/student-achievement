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
    outDir: "front_end", //想要把dist修改成什么名字在这边改
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
      imports: ["vue", "vue-router", "vuex"],
      dts: "src/auto-import.d.ts",
      // include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
    }),
  ],
});
