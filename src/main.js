import Vue from 'vue'
import App from './App.vue'
import antd from 'ant-design-vue'
import router from './router'
import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';
import VueBaiduMap from 'vue-baidu-map'
import './permission'
import btts from './utils/baidu_tts_cors'

Vue.config.productionTip = false
Vue.prototype.$btts = btts
Vue.use(antd)

if (process.env.VUE_APP_TITLE === 'production') {
    Vue.use(window['vue-cropper'])
} else {
    Vue.use(require('vue-cropper').default)
}

Sentry.init({
    dsn: 'https://801acda20a7248558355c594a5ecc5b2@sentry.io/1826001',
    integrations: [new Integrations.Vue({ Vue, attachProps: true, logErrors: true })],
});
// axios.get('https://openapi.baidu.com/oauth/2.0/token?grant_type=client_credentials&client_id=at4UYixhc2RmQDzfZSWMIDGW&client_secret=hB0Gmv4rRRXW4SyEzeljh96q3m9YiG3E').then(res => {

// })
Vue.use(VueBaiduMap, {
    ak: 'fWSrZTFEzCkfpqQktqQnnBqVwNTNr4H2'
})
new Vue({
    router,
    render: h => h(App),
}).$mount('#app')