const user = {
  state: {
    menus: [],
    collapsed: false,
    menusOpenKeys: ['/system']
  },
  actions: {
    //注销session
    FedLogOut({
      commit
    }) {
      return new Promise(resolve => {
        commit('SET_MENU', [])
        commit('DEL_ALL_TAG');
        resolve()
      })
    }
  },
  mutations: {
    SET_MENU: (state, menu) => {
      state.menu = menu
    },
    SET_COLLAPSED: (state, flag) => {
      state.collapsed = flag
    }
  }

}
export default user