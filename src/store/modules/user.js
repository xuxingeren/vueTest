const user = {
  state: {
    userInfo: {
      name: '徐新',
      uid: '',
      avatar: ''
    },
    menus: [],
    menusAll: [],
    collapsed: false,
    menusOpenKeys: ['/system']
  },
  actions: {
    logOut({
      commit
    }) {
      commit('SET_MENU_ALL', [])
      sessionStorage.clear()
      console.log('登出清空数据')
      return Promise.resolve({
        success: true
      })
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
      console.log(`菜单: ${menus}`)
    },
    SET_COLLAPSED: (state, flag) => {
      state.collapsed = flag
    }
  }

}
export default user