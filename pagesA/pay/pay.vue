<template>
	<view>
		<view class="box">
			<view class="recommend dis_flex" v-if="isToload">
				
				<image :src="getimg(shuju.img_url)" mode="aspectFill" v-show="!isgoods"></image>
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
			
			<view class="xxbox dis_flex_c ju_a">
				<view class="dis_flex ju_b aic">
					<view class="xxtitstyle">出发时间</view>
					<text class="cfsjtime">{{shuju.start_times}}</text>
				</view>
				<view class="dis_flex ju_b aic">
					<view class="xxtitstyle">数量</view>
					<view class="numtxt">{{num}}</view>
				</view>
				<view class="dis_flex ju_b aic">
					<view class="xxtitstyle">金额合计</view>
					<view class="g_price">
						<text>￥</text>
						<text class="big">
							{{monder}}
						</text>
						<text class="color_h" v-show="yyxq != 'yyxq'">元</text>
					</view>
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
	import Heat from "../../components/heat/heat.vue"
	   import service from '../../service.js';
	var that
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		components: {
			Recommend,
			Price,
			Heat
		},
		data() {
			return {
				numval: 1,
				num:'',
				id:'',
				code:'',
				shuju:[],
				monder:'',
				loginres:'',
				isToload:false,
				yy_info:'',
			}
		},
		onLoad(option) {
			that=this
			console.log(option)
			that.id=option.id
			that.num=option.num
			that.monder=option.monder
			// if(that.shuju==[] || that.shuju.length=0) {
			// 	that.shuju=''
			// }
			that.yy_info=uni.getStorageSync('yy_info')
			that.getdatas()
			// that.getdataa()
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
			goto() {
				uni.getProvider({
					service: 'oauth',
					success: function(res) {
						// console.log(res.provider)
						if (~res.provider.indexOf('weixin')) {
							uni.login({
								provider: 'weixin',
								success: function(loginRes) {
									console.log(loginRes);
									that.loginres = loginRes.code
								}
							});
						}
					}
				});
				var data = {
					code: that.code,
					
				}
				service.P_post('pay', data).then(res => {
					console.log(res)
					if (res.code == 1) {
						uni.requestPayment({
								appId: res.data.appId,
								provider: that.loginres,
								// 时间
								timeStamp: res.data.timeStamp,
								// 随机字符串
								nonceStr: res.data.nonceStr,
								// 接口返回的 prepay_id 参数值
								package: res.data.package,
								// 签名类型，默认为MD5
								signType: res.data.signType,
								// 签名
								paySign: res.data.paySign,
												
								success(res) {
									
									console.log(res)
									// that.titles = '等待发货'
									// that.ids=2
									uni.showToast({
										title: '支付成功',
										icon: 'none',
									});
									// that.getdataa()
									setTimeout(function() {
										uni.redirectTo({
											url:'../my_make/my_make'
										})
									}, 1000)
									
								},
								fail(err) {
									// that.btnkg=0
									// console.error('pay fail', err)
							    	// setTimeout(function() {
										setTimeout(function() {
											uni.showToast({
												title: "支付失败",
												duration: 3000,
												icon: 'none',
											})
										}, 1000)
									
									that.getdataa()
							    	// },1000)
									
									// // if(that.shang==3) {
									// 		wx.navigateBack({
									// 			delta: 1
									// 		})
									// }else{
										// uni.reLaunch({
										// 	url:'../my_make/my_make'
										// })
									// }
								}
							})
							// that.$refs.htmlLoading.htmlReset_fuc(1)
						
					} else {
						
						// that.$refs.htmlLoading.htmlReset_fuc(1)
						if (res.msg) {
							uni.showToast({
								icon: 'none',
								title: res.msg
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: '操作失败'
							})
						}
					}
				}).catch(e => {
							
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '获取数据失败'
					})
				})
			},
			getdatas() {
				// console.log(that.id)
				var data = {
					id: that.id,
					num: that.num,
					info:JSON.stringify(that.yy_info)
				}
				service.P_post('order/activity', data).then(res => {
					console.log(res)
					if (res.code == 1) {
						that.code=res.data
						that.getdataa()
					} else {
			
						// that.$refs.htmlLoading.htmlReset_fuc(1)
						if (res.msg) {
							uni.showToast({
								icon: 'none',
								title: res.msg
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: '操作失败'
							})
						}
					}
				}).catch(e => {
			
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '获取数据失败'
					})
				})
			},
			getdataa() {
				// console.log(that.id)
				var data = {
					code:that.code
				}
				service.P_post('order/activity_detail', data).then(res => {
					console.log(res)
					if (res.code == 1) {
						that.shuju = res.data
						that.isToload=true
					} else {
			
						// that.$refs.htmlLoading.htmlReset_fuc(1)
						if (res.msg) {
							uni.showToast({
								icon: 'none',
								title: res.msg
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: '操作失败'
							})
						}
					}
				}).catch(e => {
			
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '获取数据失败'
					})
				})
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
