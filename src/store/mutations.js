import { setStore, getStore, removeStore } from "../config/mUtils";
import { SAVE_ADDRESS, GET_USERINFO, RECORD_USERINFO } from "./mutation-types";
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
  [GET_USERINFO](state) {
    state.userInfo = JSON.parse(getStore("userInfo"));
  }
};
