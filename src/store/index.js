import Vue from "vue";
import Vuex from "vuex";
// import actions from "./actions";
import mutations from "./mutations";
Vue.use(Vuex);

const state = {
  userInfo: {},
  geohash: "31.22299,121.36025", //地址geohash值
  searchHistory:[],
  cartList:[],//购物车列表
};
const store = new Vuex.Store({
  state,
//   actions,
  mutations
});

export default store;
