const user = {
  state: {
    menus: [],
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
    }
  }

}
export default user