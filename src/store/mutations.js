import {
	GET_USERINFO,
	SAVE_ADDRESS,
} from './mutation-types.js'

import {setStore, getStore} from '../config/mUtils'

import {localapi, proapi} from 'src/config/env'

export default {

    //获取用户信息存入vuex
	[GET_USERINFO](state, info) {
		if (state.userInfo && (state.userInfo.username !== info.username)) {
			return;
		};
		if (!state.login) {
			return
		}
		if (!info.message) {
			state.userInfo = {...info};
		} else {
			state.userInfo = null;
		}
    },
    	//增加地址
	[ADD_ADDRESS](state, obj) {
		state.removeAddress = [obj, ...state.removeAddress];
	},
}