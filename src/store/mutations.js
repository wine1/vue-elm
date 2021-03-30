import { setStore, getStore, removeStore } from "../config/mUtils";
import {
  SAVE_ADDRESS,
  GET_USERINFO,
  RECORD_USERINFO,
  SAVE_SEARCHHISTORY,
  GET_SEARCHHISTORY,
  CLEAR_SEARCHHISTORY,
  ADD_CART,
  REDUCE_CART,
  INIT_BUYCART,

  OUT_LOGIN
} from "./mutation-types";

export default {
  saveUserInfo(state) {
    state.userInfo;
  },
  [SAVE_ADDRESS](state, geohash) {
    state.geohash = geohash;
  },
  [RECORD_USERINFO](state, userInfo) {
    state.userInfo = userInfo;
    setStore("userInfo", userInfo);
  },
  [GET_USERINFO](state, info) {
    // if (
    //   state.userInfo &&
    //   info.username &&
    //   state.userInfo.username !== info.username
    // ) {
    //   return;
    // }
    state.userInfo = JSON.parse(getStore("userInfo"));
  },
  [SAVE_SEARCHHISTORY](state, history) {
    if (state.searchHistory.indexOf(history) == -1) {
      state.searchHistory = state.searchHistory.concat(history);
      console.log(state.searchHistory);
      setStore("searchHistory", state.searchHistory);
    }
  },
  [GET_SEARCHHISTORY](state) {
    state.searchHistory = JSON.parse(getStore("searchHistory"));
  },

  [CLEAR_SEARCHHISTORY](state) {
    state.searchHistory = [];
    setStore("searchHistory", state.searchHistory);
  },

  //   state,
  //   {
  //     shopid,
  //     category_id,
  //     item_id,
  //     food_id,
  //     name,
  //     price,
  //     specs,
  //     packing_fee,
  //     sku_id,
  //     stock
  //   }
  // ) {
  //   let cart = state.cartList;
  //   let shop = (cart[shopid] = cart[shopid] || {});
  //   let category = (shop[category_id] = shop[category_id] || {});
  //   let item = (category[item_id] = category[item_id] || {});
  //   if (item[food_id]) {
  //     item[food_id]["num"]++;
  //   } else {
  //     item[food_id] = {
  //       num: 1,
  //       id: food_id,
  //       name: name,
  //       price: price,
  //       specs: specs,
  //       packing_fee: packing_fee,
  //       sku_id: sku_id,
  //       stock: stock
  //     };
  //   }
  //   state.cartList = { ...cart };
  //   //存入localStorage
  //   setStore("buyCart", state.cartList);
  // },

  [ADD_CART](state, {
		shopid,
		category_id,
		item_id,
		food_id,
		name,
		price,
		specs,
		packing_fee,
		sku_id,
		stock
	}) {
		let cart = state.cartList;
		let shop = cart[shopid] = (cart[shopid] || {});
		let category = shop[category_id] = (shop[category_id] || {});
		let item = category[item_id] = (category[item_id] || {});
		if (item[food_id]) {
			item[food_id]['num']++;
		} else {
			item[food_id] = {
					"num" : 1,
					"id" : food_id,
					"name" : name,
					"price" : price,
					"specs" : specs,
					"packing_fee" : packing_fee,
					"sku_id" : sku_id,
					"stock" : stock
			};
		}
		state.cartList = {...cart};
    console.log(state.cartList)
		//存入localStorage
		setStore('buyCart', state.cartList);
	},
	// 移出购物车
	[REDUCE_CART](state, {
		shopid,
		category_id,
		item_id,
		food_id,
		name,
		price,
		specs,
	}) {
		let cart = state.cartList;
		let shop = (cart[shopid] || {});
		let category = (shop[category_id] || {});
		let item = (category[item_id] || {});
		if (item && item[food_id]) {
			if (item[food_id]['num'] > 0) {
				item[food_id]['num']--;
				state.cartList = {...cart};
				//存入localStorage
				setStore('buyCart', state.cartList);
			} else {
				//商品数量为0，则清空当前商品的信息
				item[food_id] = null;
			}
		}
	},
	//网页初始化时从本地缓存获取购物车数据
	[INIT_BUYCART](state) {
		let initCart = getStore('buyCart');
		if (initCart) {
			state.cartList = JSON.parse(initCart);
		}
	},
  [OUT_LOGIN](state){
		state.userInfo = {};
		state.login = false;
    removeStore('userInfo')
  },
};
