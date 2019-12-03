import axios from 'axios'
import NProgress from "nprogress"
import Message from "ant-design-vue/lib/message"
import cfg from '@/config'
import router from '@/router'
import {
  removeCookit,
  getCookit
} from '@/utils/cookie'

axios.defaults.baseURL = `${cfg.host}${cfg.port}${cfg.baseUrl}`
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.get['Accept'] = 'application/json'
axios.defaults.timeout = 10000
axios.defaults.withCredentials = true
NProgress.configure({
  showSpinner: false
})

axios.interceptors.request.use(
  config => {
    let token = getCookit()
    if (!token) {
      router.replace({
        path: "/login"
      });
    } else {
      config.headers["xuxin-auth"] = "Bearer " + getCookit();
    }
    config.headers["resources-type"] = "pc";
    NProgress.start()
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

axios.interceptors.response.use(res => {
  // 响应拦截
  NProgress.done()
  if (!res.data.success) {
    Message.error(res.data.message)
    return Promise.reject(res.data)
  }
  return res.data;
}, err => {
  NProgress.done()
  if (err.response) {
    let message = ''
    switch (err.response.status) {
      case 400:
        message = err.response.data.message;
        break;
      case 401:
        message = "登录失效";
        removeCookit();
        break;
      case 404:
        message = err.response.data.message;
        break;
      case 500:
        message = err.response.data.message;
        break;
    }
    Message.error(message);
  }
  return Promise.reject(err.response.data)
})

export default function (options) {
  let params = {
    method: options.method,
    url: options.url,
    params: options.params,
    data: options.params,
    ...options.other
  }
  if (options.method.toLowerCase() === 'get') {
    delete params.data
  } else if (options.method.toLowerCase() === 'post') {
    delete params.params
  }
  return axios(params)
}