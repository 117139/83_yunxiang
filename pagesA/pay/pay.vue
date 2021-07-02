<template>
	<view>
		<view class="box">
			<Recommend></Recommend>
			
			<view class="xxbox dis_flex_c ju_a">
				<view class="dis_flex ju_b aic">
					<view class="xxtitstyle">出发时间</view>
					<text class="cfsjtime">2021-04-30</text>
				</view>
				<view class="dis_flex ju_b aic">
					<view class="xxtitstyle">数量</view>
					<view class="numtxt">2</view>
				</view>
				<view class="dis_flex ju_b aic">
					<view class="xxtitstyle">金额合计</view>
					<Price :yyxq="'yyxq'">
						<text slot="num">5500</text>
					</Price>
				</view>
			</view>
			
			<view class="xxbox zffsbox dis_flex_c ju_a">
				<view class="xxtitstyle">支付方式</view>
				<view class="dis_flex ju_b">
					<view>
						<image class="weixin" :src="getimg('/static_xcx/index/weixin.png')" mode="aspectFit"></image>
						<text class="xxtitstyle wxzf">微信支付</text>
					</view>
					<image class="xuanzhong" :src="getimg('/static_xcx/index/agreeimg.png')" mode="aspectFit"></image>
				</view>
			</view>
			
			
		</view>
		
		<view class="okbtnbox">
			<view class="okbtn" @click="goto">
				立即支付
			</view>
		</view>
		
	</view>
</template>

<script>
	// box
	import Recommend from "../../components/recommend/recommend.vue"
	import Price from "../../components/price/price.vue"
	import api from '../../components/url.js';
	   
	var that
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		components: {
			Recommend,
			Price
		},
		data() {
			return {
				numval: 1
			}
		},
		onLoad() {
		},
		onReady() {
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
	 
	.box{
		padding: 0 30rpx;
	}
	.cfsjtime{
		font-size: 28rpx;
		font-weight: bold;
		color: #79C2EF;
	}
	.xxtitstyle{
		font-size: 28rpx;
		font-weight: 400;
		color: #666666;
	}
	.xxbox{
		margin-top: 26rpx;
		padding: 0 19rpx;
		height: 255rpx;
		box-shadow: 0rpx 10rpx 19rpx 3rpx rgba(153, 153, 153, 0.08);
		border-radius: 8rpx;
	}
	.zffsbox{
		height: 175rpx;
	}
	.okbtnbox{
		background-color: #ffffff;
		width: 100%;
		position: fixed;
		padding-top: 20rpx;
		bottom: 0;
		z-index: 999;
		padding-bottom: 0;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		box-shadow: 0rpx -10rpx 19rpx 3rpx rgba(153, 153, 153, 0.08);
	}
	.okbtn{
		width: 690rpx;
		height: 80rpx;
		background: #79C2EF;
		border-radius: 40rpx;
		font-size: 30rpx;
		font-weight: bold;
		color: #FFFFFF;
		line-height: 80rpx;
		text-align: center;
		margin: 0 auto 20rpx;
	}
	.numtxt{
		font-size: 28rpx;
		font-weight: bold;
		color: #333333;
	}
	.xuanzhong{
		width: 30rpx;
		height: 30rpx;
	}
	.weixin{
		width: 50rpx;
		height: 44rpx;
		vertical-align: middle;
	}
	.wxzf{
		color: #333333;
		margin-left: 20rpx;
	}
</style>
