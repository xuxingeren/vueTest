import router from './router'
import addRouter from './router/addRouter'
import NProgress from 'nprogress'
import api from "@/api"
import store from './store'
import {
  SsetItem,
  SgetItem
}
from '@/utils/storage'
import {
  nextUrl
} from "@/config/const"

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
  let menus = SgetItem('menus')
  if ((store.state.user.menus && store.state.user.menus.length > 0) || (menus && menus.length > 0)) {
    if (to.name === null) {
      addRouter(menus).then(data => {
        store.state.user.menus = data
        next({
          ...to,
          replace: true
        })
      }).catch(() => {
        next({
          path: "/login"
        })
      })
    } else {
      next()
    }
  } else {
    api('getRouteList').then(res => {
      SsetItem('menus', res.data)
      addRouter(res.data).then(data => {
        store.state.user.menus = data
        console.log(data)
        next({
          ...to,
          replace: true
        })
      }).catch(() => {
        next({
          path: "/login"
        })
      })
    })
  }
  NProgress.start()
})

router.afterEach((to) => {
  NProgress.done()
  document.title = to.meta.title
})