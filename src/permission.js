import router from './router'
import NProgress from 'nprogress'
import api from "@/api"
import { nextUrl } from "@/config/const"

NProgress.configure({
    showSpinner: false
})

router.beforeEach((to, from, next) => {
    if (nextUrl.includes(to.path)) {
        if (from.path === "/login") {
            next(false)
        } else {
            next()
        }
        return false
    }
    api('getUserInfo').then(res => {
        if (res.data.success) {}
    })
    NProgress.start()
    next()
})

router.afterEach((to) => {
    NProgress.done()
    document.title = to.meta.title
})