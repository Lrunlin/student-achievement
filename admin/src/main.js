import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory, createWebHashHistory } from "vue-router";

import "@/style/index.scss";
import "@/plugin/axios";
import { createPinia } from "pinia";
import "moment/dist/locale/zh-cn";
const app = createApp(App);

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";


import { setupLayouts } from "virtual:generated-layouts";
import pages from "~pages";

const routes = setupLayouts(pages);
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

app.use(router).use(createPinia()).use(ElementPlus).mount("#app");
