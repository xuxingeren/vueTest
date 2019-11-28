import router from './router'
import addRouter from './router/addRouter'
import NProgress from 'nprogress'
import api from "@/api"
import store from './store'
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
  if (store.state.user.menus && store.state.user.menus.length > 0) {
    if (to.name === null) {
      addRouter([
        ...store.state.user.menus,
        {
          path: '*',
          redirect: '/404'
        }
      ]).then(() => {
        next({
          ...to
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
      let data = [{
        path: '/view',
        isLast: false,
        title: '其他',
        id: 1,
        parentId: '',
        levelId: '1',
        icon: 'setting'
      }, {
        path: '/hello',
        isLast: true,
        title: 'hello',
        id: 2,
        parentId: 1,
        levelId: '1-2',
        icon: 'heart'
      }, {
        path: '/test',
        isLast: true,
        title: 'test',
        id: 3,
        levelId: '1-3',
        parentId: 1,
        icon: 'experiment'
      }]
      addRouter(data).then(res => {
        store.state.user.menus = res
        console.log(res)
        next({
          ...to
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