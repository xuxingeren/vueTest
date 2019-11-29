import Vue from 'vue'
import App from './App.vue'
import antd from 'ant-design-vue'
import router from './router'
import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';
import store from './store';
import moment from 'moment';
import 'moment/locale/zh-cn';
import './permission'
import "nprogress/nprogress.css";
import 'ant-design-vue/dist/antd.css';

moment.locale('zh-cn');
Vue.config.productionTip = false
Vue.use(antd)

if (process.env.VUE_APP_TITLE === 'production') {
  Sentry.init({
    dsn: 'https://801acda20a7248558355c594a5ecc5b2@sentry.io/1826001',
    integrations: [new Integrations.Vue({
      Vue,
      attachProps: true,
      logErrors: true
    })],
  });
}

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')