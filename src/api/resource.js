export default {
    // 登录
    login: {
        method: 'post',
        url: '/fetch/login'
    },
    getInfo: {
        method: 'get',
        url: '/fetch/getInfo'
    },
    // 注册
    register: {
        method: 'post',
        url: '/register'
    },
    // 退出登录
    logout: {
        method: 'post',
        url: '/logout'
    },
    // 获取个人信息
    getUserInfo: {
        method: 'post',
        url: '/getUserInfo'
    },
    Hello: {
        method: 'get',
        url: '/ping'
    }
}