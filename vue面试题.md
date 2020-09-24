# 生命周期函数面试题

1. 什么是 vue 生命周期,vue生命周期的作用是什么
    Vue 实例从开始创建、初始化数据、编译模板、挂载Dom和渲染、更新和渲染、卸载等一系列过程，这是 Vue 的生命周期

2. 第一次页面加载会触发哪几个钩子
    beforeCreate() created() beforeMount() mounted() 

3. 简述每个周期具体适合哪些场景
    beforeCreate()
    created()
    beforeMount()
    mounted()
    beforeUpdate()
    updated()
    beforeDestory()
    destroy()

4. created和mounted的区别
    create阶段new了实例 但是并没有挂载 不能进行dom操作

vue路由面试题

1. mvvm 框架是什么？

2. vue-router 是什么?它有哪些组件

3. vue-router是vue官方路由管理器

     ```
        <router-link :to=‘‘ class=‘active-class‘>   //路由声明式跳转 ，active-class是标签被点击时的样式
        <router-view>                  //渲染路由的容器
        <keep-alive>                    //缓存组件
    ```

4. active-class 是哪个组件的属性？
    router-link 用于做选中样式的切换
    
5. 怎么定义 vue-router 的动态路由? 怎么获取传过来的值
6. vue-router 有哪几种导航钩子?
7. route和router 的区别
    $route对象表示当前的路由信息，包含了当前 URL 解析得到的信息。包含当前的路径，参数，query对象等。
    $router对象是全局路由的实例，是router构造方法的实例。

8. vue-router响应路由参数的变化
9.  vue-router传参
    query params

10. vue-router实现路由懒加载（ 动态加载路由 ）

- 使用AMD风格的require `const Foo = resolve => require(['./Foo.vue'], resolve)`
- 使用import `component: () => import('@/components/Two')`
- 使用webpack特有的require.ensure() `components: r => require.ensure([], () => r(require('@/components/Three')), 'group-home')`

vue常见面试题

1.vue优点
2.vue父组件向子组件传递数据？
子组件通过props暴露接口

3.子组件向父组件传递事件
this.$emit()

4.v-show和v-if指令的共同点和不同点
v-if 是真正的条件判断 只有条件为真时 才渲染相应的dom
v-show 的元素始终会被渲染并保留在 DOM 中,对应的是display:none

5.如何让CSS只在当前组件中起作用
scoped

7.如何获取dom
vm.$refs

8.说出几种vue当中的指令和它的用法？
v-if v-on v-bind v-show

9.vue-loader是什么？使用它的用途有哪些？
  简单的说，他就是基于webpack的一个的loader，解析和转换 .vue 文件，提取出其中的逻辑代码 script、样式代码 style、以及 HTML 模版 template，再分别把它们交给对应的 Loader 去处理，核心的作用，就是提取，划重点。

10.为什么使用key

11.axios及安装

12.axios解决跨域

13.v-modal的使用

14.scss的安装以及使用
15.请说出vue.cli项目中src目录每个文件夹和文件的用法？
16.分别简述computed和watch的使用场景
17.v-on可以监听多个方法吗
18.$nextTick的使用
定义：在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。

19.vue组件中data为什么必须是一个函数
20.vue事件对象的使用
21 组件间的通信
22.渐进式框架的理解
23.Vue中双向数据绑定是如何实现的
24.单页面应用和多页面应用区别及优缺点
25.vue中过滤器有什么作用及详解

26.v-if和v-for的优先级
v-for优先级高于v-if 不要同时使用

27.assets和static的区别
28.列举常用的指令
29.vue常用的修饰符
30.数组更新检测
31.Vue.set视图更新
32.自定义指令详解
33.vue的两个核心点
34.vue和jQuery的区别
35 引进组件的步骤
36.Vue-cli打包命令是什么？打包后悔导致路径问题，应该在哪里修改
37.三大框架的对比
38.跨组件双向数据绑定
39.delete和Vue.delete删除数组的区别
40.SPA首屏加载慢如何解决
41.Vue-router跳转和location.href有什么区别
42.vue slot
43.你们vue项目是打包了一个js文件，一个css文件，还是有多个文件？
44.vue遇到的坑，如何解决的？
45.Vue里面router-link在电脑上有用，在安卓上没反应怎么解决？
46.Vue2中注册在router-link上事件无效解决方法
47.RouterLink在IE和Firefox中不起作用（路由不跳转）的问题
48.axios的特点有哪些
49.请说下封装 vue 组件的过程？
50.vue 各种组件通信方法（父子 子父 兄弟 爷孙 毫无关系的组件）
51.params和query的区别
52.vue mock数据
53 vue封装通用组件
54.vue初始化页面闪动问题
55.vue禁止弹窗后的屏幕滚动
56.vue更新数组时触发视图更新的方法
57.vue常用的UI组件库
58.vue如何引进本地背景图片
59.vue如何引进sass
60.vue修改打包后静态资源路径的修改

vuex常见面试题
1.vuex是什么？怎么使用？哪种功能场景使用它？
vuex是vue的全局状态管理器 通过`npm install vuex`安装之后 在main.js中引入store

2.vuex有哪几种属性
State , Getter , Mutation , Action , Module (就是mapAction)

3.不使用Vuex会带来什么问题

4.Vue.js中ajax请求代码应该写在组件的methods中还是vuex的actions中？

5.vuex一个例子方法

6.Vuex中如何异步修改状态
action

7.Vuex中actions和mutations的区别
action处理异步事件 通过muaction改变state的值 会默认将自身封装为一个Promise

8.数组中出现__ob__: Observer无法取值
需要用JSON.parse(JSON.stringify(数组))
重新生成一个可枚举数组