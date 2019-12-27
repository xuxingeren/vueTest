import {
  getOnlyCookit,
} from '@/utils/cookie';
import {
  SgetItem
} from '@/utils/storage'
import api from "@/api";

const user = {
  state: {
    userInfo: {
      user: '',
      uid: '',
      avatar: ''
    },
    menus: [],
    menusAll: [],
    collapsed: false,
    menusOpenKeys: ['/system']
  },
  actions: {
    getUserInfo({
      commit
    }) {
      api('getUserInfo').then(res => {
        commit('SET_USER_INFO', res.data)
      })
    },
    logOut({
      commit
    }) {
      commit('SET_MENU_ALL', [])
      let menus = SgetItem('menus')
      if (menus && menus.length > 0) {
        // window.location.reload()
        sessionStorage.clear()
        return
      }
      if (getOnlyCookit()) {
        return api('logout').then(() => {
          return Promise.resolve({
            success: true
          })
        }).catch(err => {
          console.log(err)
          return Promise.resolve({
            success: true
          })
        })
      } else {
        return Promise.resolve({
          success: true
        })
      }
    }
  },
  mutations: {
    FIND_MENU: (state, val) => {
      if (val) {
        state.menus = []
      } else {
        state.menus = state.menusAll
      }
    },
    SET_MENU_ALL: (state, menus) => {
      state.menusAll = menus
      state.menus = menus
      console.log('菜单:', menus)
    },
    SET_COLLAPSED: (state, flag) => {
      state.collapsed = flag
    },
    SET_USER_INFO: (state, data) => {
      state.userInfo = data
    }
  }

}
export default user