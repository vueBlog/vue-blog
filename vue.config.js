const CompressionPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']

const SentryPlugin = require('@sentry/webpack-plugin')

module.exports = {
  publicPath: '/vue-blog/',
  outputDir: 'dist',
  assetsDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: true,
  parallel: undefined,

  css: {
    sourceMap: true
  },

  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        ws: true,
        changeOrigin: true
      }
    }
  },
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      var externals = {
        vue: 'Vue',
        axios: 'axios',
        'element-ui': 'ELEMENT',
        'vue-router': 'VueRouter',
        vuex: 'Vuex'
      }
      config.externals(externals)
      const cdn = {
        css: [
          // element-ui css
          'https://unpkg.com/element-ui@2.12.0/lib/theme-chalk/index.css'
        ],
        js: [
          // vue
          'https://cdn.jsdelivr.net/npm/vue@2.6.10',
          // vue-router
          'https://unpkg.com/vue-router@3.1.3/dist/vue-router.min.js',
          // vuex
          'https://unpkg.com/vuex@3.1.2',
          // axios
          'https://unpkg.com/axios@0.18.0/dist/axios.min.js',
          // element-ui js
          'https://unpkg.com/element-ui@2.12.0/lib/index.js'
        ]
      }
      config.plugin('html')
        .tap(args => {
          args[0].cdn = cdn
          return args
        })
    }
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 生产环境
      config.plugins.push(
        new CompressionPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8
        })
      )

      config.plugins.push(
        new SentryPlugin({
          include: './dist/',
          release: process.env.RELEASE_VERSION, // 一致的版本号
          configFile: 'sentry.properties', // 不用改
          ignore: ['node_modules', 'webpack.config.js'],
          urlPrefix: '~/vue-blog/' // 这里指的你项目需要观测的文件如果你的项目有publicPath这里加上就对了
        })
      )
    } else {
      // 开发环境
    }
  }
}
