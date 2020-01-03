import router from './router'
import addRouter from './router/addRouter'
import NProgress from 'nprogress'
import api from "@/api"
import store from './store'
import {
  SsetItem,
  SgetItem
} from '@/utils/storage'
import {
  getOnlyCookit
} from '@/utils/cookie'
import {
  nextUrl
} from "@/config/const"

NProgress.configure({
  showSpinner: false
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (nextUrl.includes(to.path)) {
    if (from.path === "/login") {
      next(false)
    } else {
      next()
    }
    return false
  }
  let menus = SgetItem('menus')
  if ((store.state.role.menus && store.state.role.menus.length > 0) || (menus && menus.length > 0)) {
    if (to.name === null) {
      addRouter(menus).then(({
        list,
        levelObj
      }) => {
        store.commit('SET_MENU_ALL', list)
        store.commit('SET_LEVEL_OBJ', levelObj)
        next({
          ...to,
          replace: true
        })
      }).catch(() => {
        next({
          path: "/login",
          replace: true
        })
      })
    } else {
      store.commit('SET_BREADCRUMB', to.meta)
      console.log('next')
      next()
    }
  } else {
    getOnlyCookit() ? api('getRouteList').then(res => {
      SsetItem('menus', res.data)
      addRouter(res.data).then(({
        list,
        levelObj
      }) => {
        store.commit('SET_MENU_ALL', list)
        store.commit('SET_LEVEL_OBJ', levelObj)
        next({
          ...to,
          replace: true
        })
      }).catch(() => {
        next({
          path: "/login",
          replace: true
        })
      })
    }) : next({
      path: "/login",
      replace: true
    });
  }
})

router.afterEach((to) => {
  NProgress.done()
  document.title = to.meta.title
})