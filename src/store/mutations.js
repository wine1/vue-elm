import { setStore, getStore, removeStore } from "../config/mUtils";
import {
  SAVE_ADDRESS,
  GET_USERINFO,
  RECORD_USERINFO,
  SAVE_SEARCHHISTORY,
  GET_SEARCHHISTORY,
  DELETE_SEARCHHISTORY,
  CLEAR_SEARCHHISTORY
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
  [GET_USERINFO](state) {
    state.userInfo = JSON.parse(getStore("userInfo"));
  },
  [SAVE_SEARCHHISTORY](state, history) {
    if (state.searchHistory.indexOf(history) == -1) {
      state.searchHistory = state.searchHistory.concat(history);
      setStore("searchHistory", state.searchHistory);
    }
  },
  [GET_SEARCHHISTORY](state) {
    state.searchHistory = JSON.parse(getStore("searchHistory"));
  },
  [DELETE_SEARCHHISTORY](state, history) {
    state.searchHistory = state.searchHistory.filter(item => {
      item != history;
    });
    setStore("searchHistory", state.searchHistory);
  },
  [CLEAR_SEARCHHISTORY](state) {
    state.searchHistory = [];
    setStore("searchHistory", state.searchHistory);
  }
};
