import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import role from './modules/role'
import getters from './getters'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    user,
    role
  },
  getters,
})

export default store