// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import VueRouter from "vue-router";
import routes from "./router/routes";
import { routerMode } from "./config/env";
import "./config/rem";
import store from "./store/index";
Vue.config.productionTip = false;

import VueAwesomeSwiper from "vue-awesome-swiper";
require("swiper/swiper.scss");
// If you use Swiper 6.0.0 or higher
require("swiper/swiper-bundle.css");

Vue.use(VueAwesomeSwiper);

Vue.use(VueRouter);
const router = new VueRouter({
  routes,
  mode: routerMode,
  strict: process.env.NODE_ENV !== "production",
  scrollBehavior(to, from, savedposition) {
    if (savedposition) {
      return savedposition;
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedposition = document.body.scrollTop;
      }
      return { x: 0, y: to.meta.savedposition || 0 };
    }
  }
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
