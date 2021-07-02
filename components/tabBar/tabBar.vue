<template>
	<view class="tabBar dis_flex aic ju_a">
		<view
			class="dis_flex_c aic nav"
			v-for="item,index in tabbarlist" :key="index"
			@click="navbtn(index)"
			:class="{nav_activt:navActive == index}"
		>
			<image class="tabbarimg" :src="getimg(item.img)" mode=""></image>
			<text class="tabbartxt">{{item.txt}}</text>
		</view>
	</view>
</template>

<script>
	import api from '../../components/url.js';
	   
	var that
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		props: [
			'tabbarlist',
			'navActive'
		],
		data() {
			return {
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo'])
		},
		methods: {
			...mapMutations(['logout', 'login']),
			getimg(img) {
				return api.getimg(img)
			},
			tiaozhuan(e) {
				return api.tiaozhuan(e)
			
			},
			navbtn(index){
				this.navActive = index
				if(index==0) {
					uni.switchTab({
						url: '../../pages/index/index'
					})
				}
				if(index==1) {
					console.log(111111)
					uni.switchTab({
						url: '../../pages/education/index'
					})
				}
				if(index  == 2) { 
					uni.switchTab({
						url: '../../pages/indexs/indexs'
					})
				}
				if(index==3) {
					uni.switchTab({
						url: '../../pages/my/my'
					})
				}
				// if(index==4) {
				// 	uni.switchTab({
				// 		url: '../../pages/my/my'
				// 	})
				// }
				
			}
		}
	}
</script>

<style scoped>
	.tabBar{  
		width: 100%;
		position: fixed;
		padding-top: 15rpx;
		bottom: 0;
		z-index: 999;
		padding-bottom: 0;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
	}
	.tabBar>view{
		flex: 1;
	}
	.tabbarimg{
		width: 52rpx;
		height: 52rpx;
	}
	.tabbartxt{
		font-size: 26rpx;
		font-weight: 500;
		padding: 8rpx 0;
	}
	
	.tabbartxt{
	 color: #fff;
	}
	.nav{
	 opacity: 0.7;
	}
	.nav_activt{
	 opacity: 1;
	}
	
</style>
