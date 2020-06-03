const CompressionPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
module.exports = {
  publicPath: '/vue-blog/',
  outputDir: 'docs',
  assetsDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: undefined,
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
          'https://cdn.bootcdn.net/ajax/libs/element-ui/2.12.0/theme-chalk/index.css'
        ],
        js: [
          // vue
          'https://cdn.bootcdn.net/ajax/libs/vue/2.6.10/vue.min.js',
          // vue-router
          'https://cdn.bootcdn.net/ajax/libs/vue-router/3.1.3/vue-router.min.js',
          // vuex
          'https://cdn.bootcdn.net/ajax/libs/vuex/3.1.2/vuex.min.js',
          // axios
          'https://cdn.bootcdn.net/ajax/libs/axios/0.18.0/axios.min.js',
          // element-ui js
          'https://cdn.bootcdn.net/ajax/libs/element-ui/2.12.0/index.js'
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
    } else {
      // 开发环境
    }
  }
}
