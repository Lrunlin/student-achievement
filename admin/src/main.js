import {
    createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

import axios from 'axios';
import vueAxios from 'vue-axios';


import 'dayjs/locale/zh-cn'
import locale from 'element-plus/lib/locale/lang/zh-cn'



axios.defaults.baseURL = 'http://127.0.0.1:6789';




createApp(App)
    .use(store)
    .use(router)
    .use(vueAxios, axios)
    .use(ElementPlus, {
        locale
    })
    .mount('#app')