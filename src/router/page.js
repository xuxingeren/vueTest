// import Layout from "@/containers/index";

export default [{
    path: '/',
    redirect: {
      name: 'Index'
    }
  },
  {
    path: '/index',
    name: 'Index',
    component: () => import('../containers/index'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login'),
    meta: {
      title: '登录'
    }
  }, {
    path: '/visibilitychange',
    name: 'visibilitychange',
    component: () =>
      import('../views/visibilitychange'),
    meta: {
      title: 'visibilitychange'
    }
  }, {
    path: '/403',
    name: '403',
    component: () => import('@/components/errorPage/403'),
    meta: {
      title: '403'
    }
  }, {
    path: '/404',
    name: '404',
    component: () => import('@/components/errorPage/404'),
    meta: {
      title: '404'
    }
  }, {
    path: '/500',
    name: '500',
    component: () => import('@/components/errorPage/500'),
    meta: {
      title: '500'
    }
  }
]