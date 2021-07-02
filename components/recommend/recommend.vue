<template>
	<view class="">
		<view class="recommend dis_flex" >
			
			<image :src="getimg(shuju.first_img)" mode="aspectFill" v-show="!isgoods"></image>
			<image :src="getimg('/static_xcx/index/goods.png')" mode="aspectFill" v-show="isgoods"></image>
			<view class="recommendR">
				<text class="oh2">{{shuju.title}}</text>
				<view class="heat pt10" v-show="!isgoods">
					<Heat></Heat>
				</view>
				<view class="heat" v-show="isgoods" style="height: 40rpx;"></view>
				<view class="price dis_flex aic  ju_b pt20">
					<view class="g_price">
						<text>￥</text>
						<text class="big">
							{{shuju.price}}
						</text>
						<text class="color_h" v-show="yyxq != 'yyxq'">元</text>
					</view>
					<view class="">
						<view class="heat" v-show="isgoods" style="height: 40rpx;"></view>
						<view class="pr_dw" v-show="!isgoods">
							<image :src="getimg('/static_xcx/index/dw2.png')" mode="aspectFill"></image>
							<text>{{shuju.province}}{{shuju.county}}</text>
						</view>
					</view>
					
				</view>
			</view>
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
	// 价钱样式
	import Price from "../price/price.vue"
	// 热度
	import Heat from "../heat/heat.vue"
	export default {
		components: {
			Price,
			Heat
		},
		props: ['isgoods','shuju'],
		data(){
			return {
				
			}
		},
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
	.recommend{
		padding: 30rpx 19rpx;
		width: 100%;
		background: #FFFFFF;
		box-shadow: 0rpx 10rpx 19rpx 3rpx rgba(153, 153, 153, 0.08);
		border-radius: 8rpx;
		margin-top: 26rpx;
	}
	.recommend>image{
		width: 200rpx;
		height: 200rpx;
		flex-shrink: 0;
	}
	.recommendR{
		margin-left: 27rpx;
	}
	.recommendR>text{
		font-size: 28rpx;
		font-weight: bold;
		color: #333333;
	}
	.heat{
		margin-top: 5rpx;
	}
	.pr_dw{
		padding-bottom: 4rpx;
	}
	.pr_dw>image{
		width: 17rpx;
		height: 19rpx;
		vertical-align: middle;
	}
	.pr_dw>text{
		font-size: 22rpx;
		font-weight: 400;
		color: #666666;
		margin-left: 7rpx;
	}
	.g_price{
		font-size: 22rpx;
		font-weight: bold;
		color: #1961B6;
	}
	.price {
		    width: 420rpx;
	}
	.big{
		font-size: 40rpx;
	}
	.color_h{
		padding-left: 5rpx;
		font-weight: 400;
		color: #333333;
	}
	
</style>
