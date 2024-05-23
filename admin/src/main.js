import {
    createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import ElementPlus from 'element-plus';
// import 'element-plus/lib/theme-chalk/index.css';
import "element-plus/dist/index.css";
import axios from 'axios';
// import vueAxios from 'vue-axios';


import 'dayjs/locale/zh-cn'
// import locale from 'element-plus/lib/locale/lang/zh-cn'
import zhCn from "element-plus/es/locale/lang/zh-cn";

axios.defaults.baseURL = 'http://127.0.0.1:6789';

createApp(App)
  .use(store)
  .use(router)
  .use(ElementPlus, {
    locale: zhCn,
  })
  .mount("#app");