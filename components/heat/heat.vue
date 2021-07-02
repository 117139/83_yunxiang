<template>
	<view class="heatbox dis_flex">
		<text class="heat">热度</text>
		<view class="dis_flex aic">
			<image class="starimg" :src="getimg('/static_xcx/index/xxxxx.png')" mode="aspectFit" v-for="item,index in 5" :key="index"></image>
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
		onLoad() {
			that = this
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
			}
			
	}
</script>

<style scoped>
	.heatbox{
		align-content: center;
	}
	.heat {
		font-size: 22rpx;
		font-weight: 400;
		color: #999999;
		line-height: 38rpx;
	}
	.starimg{
		width: 21rpx;
		height: 20rpx;
		margin-left: 6rpx;
		flex-shrink: 0;
	}
	.starimg:first-child{
		margin-left: 18rpx;
	}
</style>
