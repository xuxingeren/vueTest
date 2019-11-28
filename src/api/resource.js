export default {
  // 登录
  login: {
    method: 'post',
    url: '/auth/login'
  },
  // 注册
  register: {
    method: 'post',
    url: '/auth/register'
  },
  // 退出登录
  logout: {
    method: 'post',
    url: '/auth/logout'
  },
  // 获取个人信息
  getUserInfo: {
    method: 'get',
    url: '/auth/getUserInfo'
  },
  // 获取路由表
  getRouteList: {
    method: 'get',
    url: '/auth/getRouteList'
  }
}