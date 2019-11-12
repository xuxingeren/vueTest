export default {
    // 登录
    login: {
        method: 'post',
        url: '/fetch/login'
    },
    // 注册
    register: {
        method: 'post',
        url: '/fetch/register'
    },
    // 退出登录
    logout: {
        method: 'post',
        url: '/fetch/logout'
    },
    // 获取个人信息
    getUserInfo: {
        method: 'get',
        url: '/fetch/getUserInfo'
    }
}