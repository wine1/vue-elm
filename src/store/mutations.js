import {
  GET_USERINFO,
  SAVE_ADDRESS,
  RECORD_USERINFO
} from "./mutation-types.js";

import { setStore, getStore } from "../config/mUtils";

// import {localapi, proapi} from 'src/config/env'

export default {
  //获取用户信息存入vuex
  [GET_USERINFO](state, info) {
    if (state.userInfo && state.userInfo.username !== info.username) {
      return;
    }
    if (!state.login) {
      return;
    }
    if (!info.message) {
      state.userInfo = { ...info };
    } else {
      state.userInfo = null;
    }
  },
  //增加地址
  //   [ADD_ADDRESS](state, obj) {
  //     state.removeAddress = [obj, ...state.removeAddress];
  //   },
  //删除地址列表
  [SAVE_ADDRESS](state, newAdress) {
    state.removeAddress = newAdress;
  },
  //   记录用户信息
  [RECORD_USERINFO](state, info) {
    state.userInfo = info;
	state.login = true;
    setStore("user_id", info.user_id);
  }
};
