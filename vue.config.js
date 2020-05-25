const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const SentryCliPlugin = require('@sentry/webpack-plugin')
const childProcess = require('child_process');
const buildAfter = require('./src/utils/buildAfter')
const gitObj = {
  dev: 'development',
  test: 'test',
  master: 'production'
}

const buildcfg = {
  proxyUrl: "http://xuxinapi.com:3000", // 本地运行代理
  outputDir: 'pc', // 打包输出文件名
  env: process.env.VUE_APP_TITLE, // 环境变量值
  gitBranch: childProcess.execSync('git rev-parse --abbrev-ref HEAD').toString().replace(/\s+/, ''), // 当前打包分支
  baseURL: process.env.VUE_APP_TITLE === 'production' ? `/` : "/", // 打包后文件链接
  productionGzip: true, // 是否使用gzip
  productionGzipExtensions: ['js', 'css'], // 需要gzip压缩的文件后缀
  closeConsole: true, // 是否移除console
  sourcemapUpload: false, // 是否上传sourcemap到sentry
  gitBuild: true, // 是否启用git打包限制
  externals: { // 忽略打包
    'vue': 'Vue',
    'vue-router': 'VueRouter',
    'vuex': 'Vuex',
    'axios': 'axios',
    'nprogress': 'NProgress',
    'ant-design-vue': 'antd'
  }
}

if (buildcfg.env !== gitObj[buildcfg.gitBranch] && buildcfg.gitBuild && process.argv[2] !== 'serve' && process.argv[4] !== 'analyz') {
  console.log(`打包环境和git分支不一致，终止打包，
  目标环境：${buildcfg.env}，
  当前分支：${buildcfg.gitBranch}，对应环境变量：${gitObj[buildcfg.gitBranch]}`)
  process.exit();
}

const cdn = {
  dev: {
    css: [
      // 'https://cdn.jsdelivr.net/npm/ant-design-vue@1.3.13/dist/antd.min.css',
      // 'https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.css'
    ],
    js: []
  },
  prod: {
    css: [
      'https://cdn.jsdelivr.net/npm/ant-design-vue@1.4.10/dist/antd.min.css',
      'https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.css'
    ],
    js: [
      'https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.min.js',
      'https://cdn.jsdelivr.net/npm/vue-router@3.0.7/dist/vue-router.min.js',
      'https://cdn.jsdelivr.net/npm/vuex@3.1.1/dist/vuex.min.js',
      'https://cdn.jsdelivr.net/npm/axios@0.19.0/dist/axios.min.js',
      'https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.js',
      'https://cdn.jsdelivr.net/npm/ant-design-vue@1.4.10/dist/antd.min.js'
    ]
  }
}
console.log(`环境变量：${buildcfg.env}, 
当前分支：${buildcfg.gitBranch},
是否上传sourcemap到sentry：${buildcfg.sourcemapUpload},
打包后文件baseURL：${buildcfg.baseURL}, 
是否启用gzip压缩：${buildcfg.productionGzip},
是否移除console：${buildcfg.closeConsole}
`)
module.exports = {
  publicPath: buildcfg.baseURL,
  outputDir: buildcfg.outputDir,
  lintOnSave: true,
  productionSourceMap: buildcfg.sourcemapUpload,
  chainWebpack: (config) => {
    config.module.rule('worker')
      .test(/\.worker\.js$/)
      .use('worker-loader')
      .loader('worker-loader').end();
    config.module.rule('js').exclude.add(/\.worker\.js$/)
    if (~['analyz', 'production'].indexOf(buildcfg.env)) {
      config.externals(buildcfg.externals)
    }
    config.plugin('html').tap(args => {
      if (~['analyz', 'production'].indexOf(buildcfg.env)) {
        args[0].cdn = cdn.prod
      } else {
        args[0].cdn = cdn.dev
      }
      return args
    })
  },
  configureWebpack: (config) => {
    if (~['analyz', 'production'].indexOf(buildcfg.env)) {
      config.mode = 'production'
      buildcfg.closeConsole && config.plugins.push(
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
      )
      buildcfg.productionGzip && config.plugins.push(
        new CompressionWebpackPlugin({
          test: new RegExp('\\.(' + buildcfg.productionGzipExtensions.join('|') + ')$'),
          threshold: 8192,
          minRatio: 0.8
        })
      )
      if (buildcfg.env === 'production' && buildcfg.sourcemapUpload) {
        config.plugins.push(
          new SentryCliPlugin({
            include: './dist',
            ignoreFile: '.sentrycliignore',
            release: process.env.RELEASE_VERSION,
            ignore: ['node_modules', 'webpack.config.js'],
            configFile: 'sentry.properties',
            urlPrefix: '~/'
          })
        )
      }
    } else {
      config.mode = 'development'
    }
    config.plugins.push(new buildAfter())
  },
  devServer: {
    open: true,
    proxy: {
      '/api': {
        target: buildcfg.proxyUrl,
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
  },
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: buildcfg.env === 'analyz',
      analyzerMode: buildcfg.env === 'analyz' ? 'server' : 'disabled'
    }
  }
}