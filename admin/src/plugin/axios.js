import axios from "axios";
import cookie from "js-cookie";
import { ElMessage } from "element-plus";

axios.defaults.baseURL = import.meta.env.VITE_API_HOST;

function tokenKey() {
  let hash = window.location.hash.split("/")[1];
  let keys = ["admin", "student", "teacher"];
  let token = keys.find(item => item == hash);

  return token + "_token";
}

axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    config.headers.authorization = cookie.get(tokenKey());
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  function (config) {
    return config;
  },
  function (error) {
    let message = error?.response?.data?.message;
    // ElMessage.error(message);
    return Promise.reject(error);
  }
);
