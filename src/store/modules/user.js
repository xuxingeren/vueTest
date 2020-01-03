import api from "@/api";

const user = {
  state: {
    userInfo: {
      user: '',
      uid: '',
      avatar: ''
    }
  },
  actions: {
    getUserInfo({
      commit
    }) {
      api('getUserInfo').then(res => {
        commit('SET_USER_INFO', res.data)
      })
    }
  },
  mutations: {
    SET_USER_INFO: (state, data) => {
      state.userInfo = data
    }
  }
}
export default user