import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		/**
		 * 是否需要强制登录
		 */
		forcedLogin: false,
		hasLogin: false,
		userName: "游客",
		loginDatas:{},
		addmsg:{}
	},
	mutations: {
		setadd(state,addmsg) {
			state.addmsg = addmsg;

		},
		login(state, userinfo) {
			console.log('userinfo-------------------------------.>')
			console.log(userinfo)
			state.loginDatas = userinfo;
			state.hasLogin = true;
			// uni.setStorage({
			// 	key: 'userinfo',
			// 	data: userinfo
			// })
			// console.log(state.userinfo)
			console.log(state.hasLogin)
		},
		logout(state) {
			state.userinfo = "";
			state.hasLogin = false;

		},
	}
})

export default store
