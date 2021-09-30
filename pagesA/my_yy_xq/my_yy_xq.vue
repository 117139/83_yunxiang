<template>
	<view>
		<view class="box">
			<!-- <Recommend :shuju='shuju'></Recommend> -->
			<view class="recommend dis_flex" >
				
				<image :src="getimg_fuc(shuju.img_url)" mode="aspectFill"></image>
				<view class="recommendR">
					<text class="oh2">{{shuju.title}}</text>
					<view class="price dis_flex aic  ju_b pt10">
						<!-- <view class="g_price">
							<text>￥</text>
							<text class="big">
								{{shuju.price}}
							</text>
							<text class="color_h">元</text>
						</view> -->
						<view class="">
							<view class="pr_dw">
								<image :src="getimg_fuc('/static_xcx/index/dw2.png')" mode="aspectFill"></image>
								<text>{{shuju.province}}{{shuju.county}}</text>
							</view>
						</view>
						
					</view>
					<view class="price dis_flex aic  ju_b pt10">
						{{shuju.status==1?'待审核':shuju.status==2?'预约成功':shuju.status==3?'预约失败':shuju.status==4?'待退款':'已退款'}}
						
					</view>
				</view>
			</view>
			
			<view class="xxbox dis_flex_c ju_a">
				<view class="dis_flex ju_b aic">
					<view class="xxtitstyle">订单状态</view>
					<view class="flex_1 tar int_moren">
						{{shuju.status==1?'待审核':shuju.status==2?'预约成功':shuju.status==3?'预约失败':shuju.status==4?'待退款':'已退款'}}
					</view>
					
				</view>
				<view class="dis_flex ju_b aic">
					<view class="xxtitstyle">出发时间</view>
					<!-- <view class="dis_flex aic" @tap="toggleTab()">
						<text class="cfsjtime">{{time}}</text>
						<image class="intoimg" :src="getimg_fuc('/static_xcx/index/into.png')" mode="aspectFit"></image>
					</view> -->
					
					<text class="cfsjtime">{{shuju.start_times}}</text>
					
					<!-- <picker class="dis_flex aic" mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
						<text class="cfsjtime">{{date}}</text>
						<image class="intoimg" :src="getimg_fuc('/static_xcx/index/into.png')" mode="aspectFit"></image>  
					</picker> -->
					
					
					
				</view>
				<view class="dis_flex ju_b aic">
					<view class="xxtitstyle">数量</view>
					<!-- <view class="numbox dis_flex aic">
						<view style="border-right: 1rpx solid #999999;" @click="numval--">-</view>
						<input type="text" value="" v-model="numval"/>
						<view style="border-left: 1rpx solid #999999;" @click="numval++">+</view>
					</view> -->
					
					<view class=" flex align-items-center ">
						{{shuju.num}}
					</view>
					
				</view>
				<view class="dis_flex ju_b aic">
					<view class="xxtitstyle">金额合计</view>
					<view class="g_price">
						<text>￥</text>
						<text class="int_moren">
							{{shuju.price}}
						</text>
					</view>
				</view>
			</view>
			
			<block v-for="(item,index) in shuju.info_arr">
					<view class="xxbox dis_flex_c ju_a">
						<view class="dis_flex ju_b aic">
							<view class="xxtitstyle">姓名</view>
							<view class="flex_1 tar int_moren">{{item.name}}</view>
						</view>
						<view class="dis_flex ju_b aic">
							<view class="xxtitstyle">手机号</view>
							<view class="flex_1 tar int_moren">{{item.phone}}</view>
							
						</view>
						<view class="dis_flex ju_b aic">
							<view class="xxtitstyle">身份证</view>
							<view class="flex_1 tar int_moren">{{item.IdCard}}</view>
						</view>
					</view>
			</block>
			<view class="xxbox xxbox2" v-for="arr,index in shuju.more_content_arr" :key="index">
				<view class="remindertit pb10">
					{{arr.title}}
				</view>
				<view  class="fs12" >
					<text> {{arr.content}}</text>
				</view>
			</view>
			<view  v-if="shuju.status==2" class="fun fixed bottom">
				<view class="flex flex-right  pr15 ">
					
					<view class="fu flex aic ju_c fs12 dai fs12 ml12 mb10" @click="tuikuan(shuju)">
						申请退款
					</view>
					
				</view>
			</view>
			<view  v-if="shuju.status==2" class="fun  bottom" style="opacity: 0;position: relative;">
				<view class="flex flex-right  pr15 ">
					
					<view class="fu flex aic ju_c fs12 dai fs12 ml12 mb10"></view>
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// import yuDatetimePicker from "@/components/yu-datetime-picker/yu-datetime-picker.vue"
	// box
	import api from '../../components/url.js';
	   import service from '../../service.js';
	   import Heat from "../../components/heat/heat.vue"
	// 底部  tabbar
	// import Tabbar from '../../components/tabBar/tabBar.vue'
	var that
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import Recommend from "../../components/recommend/recommend.vue"
	import Price from "../../components/price/price.vue"
	export default {
		components: {
			Recommend,
			Price,
			Heat
		},
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				shuju:'',
				
				code:'',
				info:[
					{
						name:'',
						phone:'',
						IdCard:'',
					}
				]
			}
		},
		onReady() {
		},
		onLoad(option) {
			that=this
			console.log(option)
			that.code=option.code
			that.getdatas()
			
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo']),
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
			...mapMutations(['logout', 'login']),
			tuikuan(item){
				///order/activity_refund
				uni.showModal({
					title: '提示',
					content: '确定要申请退款吗',
					success: function(res) {
						if (res.confirm) {
							var jkurl='/order/activity_refund'
							var data={
								code:item.code,
								type:1,
							}
							if (that.btn_kg == 1) {
								return
							}
							that.btn_kg = 1
							service.P_post(jkurl, data).then(res => {
								console.log(res)
								if (res.code == 1) {
									// that.$refs.htmlLoading.htmlReset_fuc(0)
									var datas = res.data
									console.log(typeof datas)
							
									if (typeof datas == 'string') {
										datas = JSON.parse(datas)
									}
									uni.showToast({
										title: '退款申请已提交，请耐心等待审核',
										icon: 'none',
									});
									setTimeout(function() {
										that.btn_kg = 0
										that.getdatas()
									}, 1000)
							
								} else {
									
										that.btn_kg = 0
									// that.$refs.htmlLoading.htmlReset_fuc(1)
									if (res.msg) {
										uni.showToast({
											icon: 'none',
											title: res.msg
										})
									} else {
										uni.showToast({
											icon: 'none',
											title: '获取失败'
										})
									}
								}
							}).catch(e => {
								that.btn_kg = 0
							
								// that.$refs.htmlLoading.htmlReset_fuc(1)
								console.log(e)
								uni.showToast({
									icon: 'none',
									title: '系统错误'
								})
							})
							
						} else if (res.cancel) {
							// uni.showToast({
							// 	title: '取消订单失败',
							// 	icon: 'none',
							// });
						}
					}
				});
			},
			getimg_fuc(img) {
				return api.getimg(img)
			},
			tiaozhuan(e) {
				return api.tiaozhuan(e)
			
			},
			getdatas() {
				// console.log(that.id)
				var data = {
					code: that.code,
				}
				service.P_post('order/activity_detail', data).then(res => {
					console.log(res)
					if (res.code == 1) {
						that.shuju = res.data
						
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
			
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
	
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			
			
		}
	}
</script>

<style scoped>
	 /* 数量加减 */
	 .shoppingNumber {
	 	width: 200upx;
	 	height: 50upx;
	 	border: 1px solid #999999;
	 	border-radius: 12upx;
	 	justify-content: space-between;
	 }
	 /* 减去商品数量 */
	 .minute {
	 	width: 55rpx;
	 	text-align: center;
	 	line-height: 50rpx;
	 	font-size: 40rpx;
	 	border-right: 1px solid #929292;
	 }
	 .input {
	 	width: 55rpx;
	 	height: 50upx;
	 	text-align: center;
	 	font-size: 25rpx;
	 	min-height: 0;
	 	/* margin-top: -5rpx; */
	 }
	 /* 添加商品数量 */
	 .add {
	 	width: 55rpx;
	 	border-left: 1px solid #929292;
	 	line-height: 50rpx;
	 	text-align: center;
	 	font-size: 35rpx;
	 }
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	.box{
		padding: 0 30rpx;
	}
	.intoimg{
		width: 30rpx;
		height: 30rpx;
		vertical-align: middle;
		margin-left: 18rpx;
	}
	.cfsjtime{
		vertical-align: middle;
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
		min-height: 255rpx;
		box-shadow: 0rpx 10rpx 19rpx 3rpx rgba(153, 153, 153, 0.08);
		border-radius: 8rpx;
	}
	.xxbox>view{
		height: 70upx;
	}
	.xxbox2{
		height: auto;
		padding: 35rpx 19rpx;
	}
	.remindertit{
		font-size: 28rpx;
		font-weight: bold;
		color: #1961B6;
		line-height: 48rpx;
	}
	.remindertxt{
		font-size: 24rpx;
		font-weight: 400;
		color: #333333;
		line-height: 48rpx;
	}
	.agree{
		width: 100%;
		text-align: center;
		position: fixed;
		bottom: 120rpx;
		padding-top: 10upx;
		padding-bottom: calc(20upx + constant(safe-area-inset-bottom));
		padding-bottom: calc(20upx + env(safe-area-inset-bottom));
		background: #fff;
	}
	.agree text{
		font-size: 24rpx;
		font-weight: bold;
		color: #666666;
	}
	.agreeimg{
		width: 30rpx;
		height: 30rpx;
		vertical-align: middle;
	}
	.gofwxy {
		text-decoration:underline;
	}
	.okbtnbox{
		width: 100%;
		position: fixed;
		padding-top: 20rpx;
		bottom: 0;
		z-index: 1;
		padding-bottom: 0;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		box-shadow: 0rpx -10rpx 19rpx 3rpx rgba(153, 153, 153, 0.08);
		background-color: #FFFFFF;
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
	.numbox{
		width: 200rpx;
		height: 50rpx;
		border: 1rpx solid #999999;
		border-radius: 12rpx;
		font-size: 28rpx;
		font-weight: bold;
		color: #333333;
		text-align: center;
	}
	.numbox>input{
		width: 90rpx;
		flex-shrink: 0;
	}
	.numbox>view{
		flex: 1;
		height: 100%;
	}
	.g_price{
		font-size: 22rpx;
		font-weight: bold;
		color: #1961B6;
	}
	.big{
		font-size: 40rpx;
	}
	.color_h{
		padding-left: 5rpx;
		font-weight: 400;
		color: #333333;
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
	.fun {
		/* height: 130rpx;
		box-shadow: 0px -10rpx 19rpx 3px rgba(153, 153, 153, 0.08);
		width: 100%;
		position: fixed;
		bottom: 0;
		z-index: 999;
		padding-bottom: 0;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom); */
		
		width: 100%;
		position: fixed;
		padding-top: 25rpx;
		
		bottom: 0;
		z-index: 999;
		padding-right: 30upx;
		padding-bottom: 0;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		box-shadow: 0px -10rpx 19rpx 3px rgba(153, 153, 153, 0.08);
		
	}
	
	.fu {
		width: 178upx;
		height: 60upx;
		border: 1px solid #EB4C50;
		border-radius: 30upx;
	}
	
	.quxiao {
		width: 178rpx;
		height: 60rpx;
		border: 1px solid #666666;
		border-radius: 30rpx;
	}
</style>
