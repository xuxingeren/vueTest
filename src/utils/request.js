import axios from 'axios'
import NProgress from "nprogress"
import Message from "ant-design-vue/lib/message"
import cfg from '@/config'
import router from '@/router'
import {
  isMobile
} from '@/utils'
import {
  getOnlyCookit
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
    if (!getOnlyCookit()) {
      router.replace({
        path: "/login"
      });
    }
    config.headers["resources-type"] = isMobile() ? "mobile" : "pc";
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
  console.log(res)
  if (!res.data.success) {
    Message.error(res.data.message)
    return Promise.reject(res.data)
  }
  return res.data;
}, err => {
  NProgress.done()
  let message = ''
  if (err.message.includes('timeout')) {
    message = '请求超时'
  } else {
    if (err.response) {
      switch (err.response.status) {
        case 401:
          router.replace({
            path: "/login"
          });
          break;
      }
      message = err.response.data.message;
    }
  }
  Message.error(message);
  return Promise.reject(err.response ? err.response.data : null)
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