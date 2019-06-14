import App from "../App";
// webpack中利用require.ensure()实现按需加载
const home = r =>
  require.ensure([], () => r(require("../pages/home/home")), "home");
const city = r =>
  require.ensure([], () => r(require("../pages/city/city")), "city");

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
      }
    ]
  }
];
