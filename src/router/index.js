import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Login = () =>
    import ('../views/Login')
const Hello = () =>
    import ('../views/Hello')
const Test = () =>
    import ('../views/Test')
const visibilitychange = () =>
    import ('../views/visibilitychange')

export default new VueRouter({
    mode: 'history',
    fallback: false,
    scrollBehavior: to => {
        if (to.hash) {
            return {
                selector: to.hash
            }
        } else {
            return { y: 0 }
        }
    },
    routes: [
        { path: '/', redirect: { name: 'Login' } },
        {
            path: '/hello',
            name: 'Hello',
            component: Hello,
            meta: { title: '首页' }
        }, {
            path: '/test',
            name: 'Test',
            component: Test,
            meta: { title: 'Test' }
        }, {
            path: '/login',
            name: 'Login',
            component: Login,
            meta: { title: '登录' }
        }, {
            path: '/visibilitychange',
            name: 'visibilitychange',
            component: visibilitychange,
            meta: { title: 'visibilitychange' }
        }
    ]
})