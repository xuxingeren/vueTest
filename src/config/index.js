// 配置编译环境和线上环境之间的切换
const env = process.env

let config = {
    host: "",
    port: "",
    baseUrl: "",
    type: "development"
}

config.type = env.VUE_APP_TITLE

if (config.type === 'development') {
    // config.baseUrl = '/api'
    config.port = ':3000'
    config.host = 'http://localhost'
} else if (config.type === 'production') {
    config.baseUrl = '/api'
        // config.host = 'http://xuxinapi.com'
        // config.port = ':3000'
} else if (config.type === 'test') {
    // config.baseUrl = '/api'
}
export default config