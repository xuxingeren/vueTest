// import Layout from "@/containers/index";

export default [{
  path: '/login',
  name: 'Login',
  component: () => import('../views/Login'),
  meta: {
    title: '登录'
  }
}]