import App from "../App";
// webpack中利用require.ensure()实现按需加载
const home = r =>
  require.ensure([], () => r(require("../pages/home/home")), "home");
const city = r =>
  require.ensure([], () => r(require("../pages/city/city")), "city");
const login = r =>
  require.ensure([], () => r(require("../pages/login/login")), "login");
const forget = r =>
  require.ensure([], () => r(require("../pages/forget/forget")), "forget");
const profile = r =>
  require.ensure([], () => r(require("../pages/profile/profile")), "profile");

const msite = r =>
  require.ensure([], () => r(require("../pages/msite/msite")), "msite");

const search = r =>
  require.ensure([], () => r(require("../pages/search/search")), "search");
const order = r =>
  require.ensure([], () => r(require("../pages/order/order")), "order");
const info = r => require.ensure([], () => r(require('../pages/profile/children/info')), 'info')
export default [
  {
    path: "/",
    component: App, //顶层路由，对应index.html
    children: [
      //二级路由。对应App.vue
      //地址为空时跳转home页面
      {
        path: "",
        redirect: "/home"
      },
      //首页城市列表页
      {
        path: "/home",
        component: home
      },
      //当前选择城市页
      {
        path: "/city/:cityid",
        component: city
      },
      // 登录页
      {
        path: "/login",
        component: login
      },
      // 忘记密码页
      {
        path: "/forget",
        component: forget
      },
      {
        path: "/msite",
        component: msite
      },
      {
        path: "/search",
        component: search
      },
      {
        path: "/order",
        component: order
      },
      {
        path: "/profile",
        component: profile,
        children: [
          {
            path: "info",
            component: info
          }
        ]
      }
    ]
  }
];
