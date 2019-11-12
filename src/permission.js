import router from './router'
import NProgress from 'nprogress'
import api from "@/api"

NProgress.configure({
    showSpinner: false
})

router.beforeEach((to, from, next) => {
    api('getUserInfo').then(res => {
        if (res.data.success) {

        }
    }).catch(err => {
        console.log(err)
    })
    NProgress.start()
    next()
})

router.afterEach((to) => {
    NProgress.done()
    document.title = to.meta.title
})