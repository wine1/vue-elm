# 生命周期函数面试题

1. 什么是 vue 生命周期,vue生命周期的作用是什么
    Vue 实例从开始创建、初始化数据、编译模板、挂载Dom和渲染、更新和渲染、卸载等一系列过程，这是 Vue 的生命周期
    beforeCreate
    created
    beforeMount
    mounted
    beforeUpdate
    undated
    beforeDestory
    destroy

2. 第一次页面加载会触发哪几个钩子
    beforeCreate() created() beforeMount() mounted() 

3. 简述每个周期具体适合哪些场景
    beforeCreate() 实例创建前
    created() 创建实例
    beforeMount() 实例挂在前
    mounted() 挂载实例
    beforeUpdate() 更新前
    updated()   更新
    beforeDestory() 销毁前
    destroy() 销毁

4. created和mounted的区别
    create阶段new了实例 但是并没有挂载 不能进行dom操作

# vue路由面试题

1. mvvm 框架是什么？
model -> viewmodel  view 的双向绑定框架

2. vue-router 是什么?它有哪些组件
 vue-router是vue官方路由管理器
     ```
        <router-link :to=‘‘ class=‘active-class‘>   //路由声明式跳转 ，active-class是标签被点击时的样式
        <router-view>                  //渲染路由的容器
        <keep-alive>                    //缓存组件
    ```
3. active-class 是哪个组件的属性？
    router-link 用于做选中样式的切换
    
4. 怎么定义 vue-router 的动态路由? 怎么获取传过来的值、
    params 和 query 

5. vue-router 有哪几种导航钩子?
    全局守卫 router.beforeEach
    全局解析守卫 router.beforeResolve
    全局后置钩子 router.afterEach
    路由独享的守卫 beforeEnter
    组件内的守卫 beforeRouteEnter、beforeRouteUpdate (2.2 新增)、beforeRouteLeave

6. route和router 的区别
    $route对象表示当前的路由信息，包含了当前 URL 解析得到的信息。包含当前的路径，参数，query对象等。
    $router对象是全局路由的实例，是router构造方法的实例。

7. vue-router响应路由参数的变化

8. vue-router实现路由懒加载（ 动态加载路由 ）
- 使用AMD风格的require `const Foo = resolve => require(['./Foo.vue'], resolve)`
- 使用import `component: () => import('@/components/Two')`
- 使用webpack特有的require.ensure() `components: r => require.ensure([], () => r(require('@/components/Three')), 'group-home')`

# vue常见面试题

1. vue优点
轻量级 易上手 渐进式框架 数据双向绑定 虚拟dom 速度快

2. vue父组件向子组件传递数据？
子组件通过props暴露接口

3. 子组件向父组件传递事件
this.$emit()

4. v-show和v-if指令的共同点和不同点
v-if 是真正的条件判断 只有条件为真时 才渲染相应的dom
v-show 的元素始终会被渲染并保留在 DOM 中,对应的是display:none

5. 如何让CSS只在当前组件中起作用
scoped

6. 如何获取dom
vm.$refs

7. 说出几种vue当中的指令和它的用法？
v-if v-on v-bind v-show

8. vue-loader是什么？使用它的用途有哪些？
  简单的说，他就是基于webpack的一个的loader，解析和转换 .vue 文件，提取出其中的逻辑代码 script、样式代码 style、以及 HTML 模版 template，再分别把它们交给对应的 Loader 去处理，核心的作用，就是提取，划重点。

9. Vue中v-for为什么必须要key？为什么不能用index作为key？
列表的唯一标识 提升渲染效率
[链家](https://blog.csdn.net/lixinyi0622/article/details/107713977)

10. axios及安装

11. axios解决跨域

12. v-model的使用
    v-model其实是一个语法糖，这背后其实做了两个操作
    1.v-bind绑定一个value属性 2.v-on指令给当前元素绑定input事件

13. scss的安装以及使用
node-sass

14. 分别简述computed和watch的使用场景
    watch  属性监听 监听属性的变化
    computed:计算属性通过属性计算而得来的属性
    watch中的函数不需要调用 变量发生变化时触发
    2、使用场景
    computed 　　　　
　　　　当一个属性受多个属性影响的时候就需要用到computed
　　　　最典型的例子： 购物车商品结算的时候
    watch
　　　　当一条数据影响多条数据的时候就需要用watch
　　　　搜索数据

15. v-on可以监听多个方法吗
 v-on="{
     input:onInput,
     focus:onFocus,
     blur:onBlur,
     }"

16. $nextTick的使用
定义：在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。

17. vue组件中data为什么必须是一个函数
[vue组件中data为什么必须是一个函数](https://zhuanlan.zhihu.com/p/100859260)
组件是可复用的vue`实例`，一个组件被创建好之后，就可能被用在各个地方，而组件不管被复用了多少次，组件中的data数据都应该是相互隔离，互不影响的，基于这一理念，组件每复用一次，data数据就应该被复制一次，之后，当某一处复用的地方组件内data数据被改变时，其他复用地方组件的data数据不受影响

18. vue事件对象的使用 (https://img2018.cnblogs.com/blog/1319943/201810/1319943-20181026105419449-936188685.png)
click.prevent 阻止默认行为
click.stop 阻止事件冒泡
click.capture 事件只在捕获阶段执行
click.once 只执行一次
click.self 只有触发自己的时候才会执行

19. 组件间的通信
     路由 query params 

20. 渐进式框架的理解
    可以根据自己的业务需求，部分使vue框架

21. Vue中双向数据绑定是如何实现的
    数据劫持 和 发布订阅模式

22. 单页面应用和多页面应用区别及优缺点
    单页面用户体验更好，数据的传递更加方便，也能实现更加精美的转场效果但是首屏加载比较慢，而且要自己实现页面堆栈，也不利于seo

23. vue中过滤器有什么作用及详解 ❓

24. v-if和v-for的优先级
    v-for优先级高于v-if 不要同时使用

25. assets和static的区别
    assetes这些资源可能在构建过程中被内联/复制/重命名，所以它们基本上是源代码的一部分。相比之下，static/ 目录下的文件并不会被 Webpack 处理：它们会直接被复制到最终目录（默认是dist/static）下。必须使用绝对路径引用这些文件

26. 列举常用的指令
v-on v-if v-for v-model 

27. vue常用的修饰符
    lazy trim number once prevent stop self capture

29. 数组更新检测
    由于 JavaScript 的限制，Vue 不能检测数组和对象的变化
    vue将被侦听的数组的变异方法进行了包裹，所以它们也将会触发到视图更新，这些被包裹的方法包括有：
    push() pop() shift() unshift() splice() sort() reverse()
     filter() 、concat() 、slice()，它们不会改变原始数组，而是返回一个新的数组。当使用这些非变异方法时，可以使用新数组去替换旧数组
     set视图更新

30. Vue.set视图更新
this.$set()和Vue.set()本质方法一样，前者可以用在methods中使用。
set方法调用时，可以触发页面全部重新渲染。

31. 自定义指令详解 ❓

32. vue的两个核心点
双向绑定 组件

33. vue和jQuery的区别
vue中使用的虚拟dom 不直接操作dom 而是通过改变数据来改变视图

34. 引进组件的步骤
    import
    声明为组件
    使用

35. Vue-cli打包命令是什么？打包后导致路径问题，应该在哪里修改

36. 三大框架的对比

37. 跨组件双向数据绑定

38. delete和Vue.delete删除数组的区别
    delete只是被删除的元素值变成了 empty/undefined 他的元素的键还是不变。
V   ue.delete 直接删除了数组的键值对 改变了数组的键值。

39. SPA首屏加载慢如何解决
    路由懒加载 本地缓存静态资源 压缩图片文件体积 打包

40. Vue-router跳转和location.href有什么区别
    Vue-router跳转是静态跳转 页面不会重载

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

# vuex常见面试题
1. vuex是什么？怎么使用？哪种功能场景使用它？
vuex是vue的全局状态管理器 通过`npm install vuex`安装之后 在main.js中引入store

2. vuex有哪几种属性
State , Getter , Mutation , Action , Module (就是mapAction)

3. 不使用Vuex会带来什么问题

4. Vue.js中ajax请求代码应该写在组件的methods中还是vuex的actions中？

5. vuex一个例子方法

6. Vuex中如何异步修改状态
action

7. Vuex中actions和mutations的区别
action处理异步事件 通过muaction改变state的值 会默认将自身封装为一个Promise

8. 数组中出现__ob__: Observer无法取值
需要用JSON.parse(JSON.stringify(数组))
重新生成一个可枚举数组