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
    √ 定位功能 
    √ 选择城市 
    √ 搜索地址 （防抖）
    √ 展示所选地址附近商家列表 
    √ 搜索美食，餐馆 
    根据距离、销量、评分、特色菜、配送方式等进行排序和筛选 
    √ 餐馆食品列表页 
    购物车功能 (联动效果 加入购物车效果)
    店铺评价页面 
    单个食品详情页面 
    商家详情页 
    √ 登录、注册 退出登陆 （登陆状态管理 vuex + localstorage）
    修改密码 
    个人中心 
    发送短信、语音验证 
    下单功能  ✨✨🎉🎉
    订单列表 
    订单详情 
    下载App 
    添加、删除、修改收货地址 
    帐户信息 
    服务中心 
    红包 
    上传头像 

ui设计原则
主题蓝色色值#3190e8
边框颜色 色值#e4e4e4
字体大小 .7rem 14px


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

4. setcookie在chrome中失败

