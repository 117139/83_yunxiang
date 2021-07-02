
import Vue from 'vue'
import App from './App'
import store from './store' 
// 全局组件引用
// vuex
// 公用的utl
import url from './components/url.js'
// 地址控件
// 剪裁头像
import avatar from "./components/yq-avatar/yq-avatar.vue";


import Tabbar from './components/tabBar/tabBar.vue'


// Vue.prototype.$url = url
Vue.component('avatar',avatar)
Vue.component('Tabbar',Tabbar)

import htmlLoading from '@/components/html_loading/html_loading.vue'
Vue.component('htmlLoading', htmlLoading)
import topbar from '@/components/top_bar/top_bar.vue'
Vue.component('topbar', topbar)


Vue.prototype.$store = store  
App.mpType = 'app' 

const app = new Vue({
	store,
  ...App
})
app.$mount()
