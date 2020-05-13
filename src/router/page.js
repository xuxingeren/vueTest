import Layout from "@/containers/index";

export default [{
  path: '/login',
  name: 'Login',
  component: () => import('../views/Login'),
  meta: {
    title: '登录'
  }
}, {
  path: '/index',
  component: Layout,
  redirect: '/workbench',
  meta: {
    title: '首页'
  },
  children: [{
    path: '/403',
    name: '403',
    component: () => import('@/components/errorPage/403'),
    meta: {
      title: '403',
      keepAlive: true
    }
  }, {
    path: '/404',
    name: '404',
    component: () => import('@/components/errorPage/404'),
    meta: {
      title: '404',
      keepAlive: true
    }
  }, {
    path: '/500',
    name: '500',
    component: () => import('@/components/errorPage/500'),
    meta: {
      title: '500',
      keepAlive: true
    }
  }]
}]