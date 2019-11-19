const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const SentryCliPlugin = require('@sentry/webpack-plugin')
let url = "http://xuxinapi.com:3000"

const buildcfg = {
    baseURL: process.env.VUE_APP_TITLE === 'production' ? `/pc/` : "/", // 打包后文件链接
    productionGzip: true, // 是否使用gzip
    productionGzipExtensions: ['js', 'css'], // 需要gzip压缩的文件后缀
    closeConsole: false, // 是否移除console
    sourcemapUpload: true // 是否上传sourcemap到sentry
}

const externals = {
    'vue': 'Vue',
    'vue-router': 'VueRouter',
    'vuex': 'Vuex',
    'axios': 'axios',
    'vue-baidu-map': 'VueBaiduMap',
    'nprogress': 'NProgress',
    'ant-design-vue': 'antd',
    'vue-cropper': 'vue-cropper'
}
const cdn = {
    dev: {
        css: [
            'https://cdn.jsdelivr.net/npm/ant-design-vue@1.3.13/dist/antd.min.css',
            'https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.css'
        ],
        js: [
            'https://cdn.jsdelivr.net/npm/vue-cropper@0.4.9/dist/index.min.js'
        ]
    },
    prod: {
        css: [
            'https://cdn.jsdelivr.net/npm/ant-design-vue@1.3.13/dist/antd.min.css',
            'https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.css'
        ],
        js: [
            'https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.min.js',
            'https://cdn.jsdelivr.net/npm/vue-router@3.0.7/dist/vue-router.min.js',
            'https://cdn.jsdelivr.net/npm/vuex@3.1.1/dist/vuex.min.js',
            'https://cdn.jsdelivr.net/npm/axios@0.19.0/dist/axios.min.js',
            'https://cdn.jsdelivr.net/npm/vue-baidu-map',
            'https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.js',
            'https://cdn.jsdelivr.net/npm/ant-design-vue@1.3.13/dist/antd.min.js',
            'https://cdn.jsdelivr.net/npm/vue-cropper@0.4.9/dist/index.min.js'
        ]
    }
}
console.log(`环境变量：${process.env.VUE_APP_TITLE}, 
是否上传sourcemap到sentry：${buildcfg.sourcemapUpload},
打包后文件baseURL：${buildcfg.baseURL}, 
是否启用gzip压缩：${buildcfg.productionGzip},
是否移除console：${buildcfg.closeConsole}
`)
module.exports = {
    // publicPath: baseURL,
    // outputDir: 'pc',
    lintOnSave: true,
    productionSourceMap: buildcfg.sourcemapUpload,
    chainWebpack: (config) => {
        config.module.rule('worker')
            .test(/\.worker\.js$/)
            .use('worker-loader')
            .loader('worker-loader').end();
        config.module.rule('js').exclude.add(/\.worker\.js$/)
        if (~['analyz', 'production'].indexOf(process.env.VUE_APP_TITLE)) {
            config.externals(externals)
            if (process.env.VUE_APP_TITLE === 'analyz') {
                config.plugin('webpack-bundle-analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
            }
        }
        config.plugin('html').tap(args => {
            if (~['analyz', 'production'].indexOf(process.env.VUE_APP_TITLE)) {
                args[0].cdn = cdn.prod
            } else {
                args[0].cdn = cdn.dev
            }
            return args
        })
    },
    configureWebpack: (config) => {
        if (process.env.VUE_APP_TITLE === 'production') {
            config.mode = 'production'
                // 移除console
            if (buildcfg.closeConsole) {
                let optimization = {
                    minimizer: [
                        new UglifyJsPlugin({
                            uglifyOptions: {
                                warnings: false,
                                compress: {
                                    drop_console: true,
                                    drop_debugger: false,
                                    pure_funcs: ['console.log']
                                }
                            }
                        })
                    ]
                }
                Object.assign(config, { optimization })
            }
            buildcfg.productionGzip && config.plugins.push(
                new CompressionWebpackPlugin({
                    test: new RegExp('\\.(' + buildcfg.productionGzipExtensions.join('|') + ')$'),
                    threshold: 8192,
                    minRatio: 0.8
                })
            )
            buildcfg.sourcemapUpload && config.plugins.push(
                new SentryCliPlugin({
                    include: './dist',
                    ignoreFile: '.sentrycliignore',
                    ignore: ['node_modules', 'webpack.config.js'],
                    configFile: 'sentry.properties',
                    urlPrefix: '~/'
                })
            )
        } else {
            config.mode = 'development'
        }
    },
    devServer: {
        open: true,
        proxy: {
            '/api': {
                target: url,
                ws: true,
                pathRewrite: {
                    '^/api': '/'
                }
            },
            // '/ws': {
            //     target: url,
            //     ws: true,
            //     pathRewrite: {
            //         '^/ws': '/'
            //     }
            // }
        }
    }
}