# vue-blog

使用 vue、vue-router、vuex、vue-cli、element-ui 搭建个人博客

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your tests

```
npm run test
```

### Lints and fixes files

```
npm run lint
```

### Run your unit tests

```
npm run test:unit
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

使用 .env 和 .env.local 来进行变量配置，在 .env 中配置所有的变量， .env.local 中配置本地开发所需要的变量，在本地运行时， .env.local 会覆盖 .env 中对应的变量。

注意：只有以 `VUE_APP_` 开头的变量会被 webpack.DefinePlugin 静态嵌入到客户端侧的包中。你可以在应用的代码中这样访问它们：

```javascript
console.log(process.env.VUE_APP_SECRET)
```

在构建过程中，`process.env.VUE_APP_SECRET` 将会被相应的值所取代。在 `VUE_APP_SECRET=secret` 的情况下，它会被替换为 `"secret"`。

## Mock的使用

添加 [Mock](https://github.com/nuysoft/Mock) 生成模拟数据。

新添加了一种运行模式 `"mock": "vue-cli-service serve --mode mock"` ,要使用 mock 生成假数据的时候，直接运行 `npm run mock`。

## git 提交

`npm run commit` 

说明文档：[git commit 规范](https://mp.weixin.qq.com/s/8oWsj_ipp73crD_vg58LeQ)
