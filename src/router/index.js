import Vue from 'vue'
import VueRouter from 'vue-router'
import page from './page'

Vue.use(VueRouter)

let Router = new VueRouter({
  mode: 'history',
  fallback: false,
  scrollBehavior: to => {
    if (to.hash) {
      return {
        selector: to.hash
      }
    } else {
      return {
        y: 0
      }
    }
  }
})
Router.addRoutes([...page]);
export default Router;