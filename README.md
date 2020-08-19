# vue-elm

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

开发进度：
    √ 定位以及城市选择（暂时没有实现获取真实位置）
    √ 登录及注册
    个人页
    首页



ui设计原则
主题蓝色色值#3190e8
边框颜色 色值#e4e4e4
字体大小 .7rem



vuex
State 单一状态树
mapState 辅助函数


问题集锦:
1. 热更新只在js代码改变时生效 (webpack更新模块有点不对)

2. 如何理解热更新 keepalive
    keepalive 音译过来就是保持活跃，所以在vue中我们可以使用keepalive来进行组件缓存
    activated 当keepalive包含的组件再次渲染的时候触发
    deactived 当keepalive包含的组件销毁的时候触发
    keepalive可以接收三个属性作为参数进行匹配对应的组件进行缓存
    include 包含的组件
    exclude 排除的组件
    max 缓存组件的最大值

3. webpack中利用require.ensure()实现按需加载

4. 插槽 slot 不懂

