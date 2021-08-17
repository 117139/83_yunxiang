<template> 
	<view class="content">
		<htmlLoading ref="htmlLoading" @Retry='getdata' :bj_show="false">
			<view class="relative">
				<image :src="getimg('/static_xcx/dibi.png')" mode="aspectFill" class="beij ml15 mt10 "></image>
				<text class="absolute fs14 cf" style="top: 48%; left: 22%;">您的订单已创建成功，请立即支付!</text>
			</view>
			<view class="mian pl10 pr10 m15">
				<view class="flex flex-between fs14 pt12 pb12">
					<text class="fs14 c6">订单编号</text>
					<text class="fwb">{{datas.code}}</text>
				</view>
				<view class="flex flex-between fs14 pt12 pb12">
					<text class="fs14 c6">下单时间</text>
					<text class="fwb">{{datas.add_time}}</text>
				</view>
				<view class="flex flex-between fs14 pt12 pb12">
					<text class="fs14 c6">金额合计</text>
					<view class="">
						<text class="fs11 dai">￥</text>
						<text class="fwb fs20 dai">{{datas.total}}</text>
					</view>
				</view>
			</view>
			<view class="mian pl10 pr10 m15 pt12">
				<text class="fs14 c6 ">支付方式</text>
				<view class="flex flex-between fs14 pt15 pb12 align-items-center">
					<view class="flex aic">
						<image :src="getimg('/static_xcx/weix.png')" mode="aspectFill" class="weix"></image>
						<text class=" fs14 pl10">微信支付</text>
					</view>
					<image :src="getimg('/static_xcx/xuan.png')" mode="aspectFill" class="xuna"></image>
				</view>
			</view>
			<view class="fun fixed bottom flex aic ju_c">
				<view class="zhifu flex aic ju_c cf" @click="tiao">
					立即支付
				</view>
			</view>
		</htmlLoading>
	</view>
</template>

<script>
	import api from '../../components/url.js';
	
	import service from '../../service.js';
	var that
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				datas:'',
				ids:'',
				add_id:'',
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo'])
		},
		onLoad(option) {
			that = this
			that.ids=option.ids||''
			that.add_id=option.add_id||''
			that.getdata()
		},
		methods: {
			...mapMutations(['logout', 'login']),
			getdata() {
			
				var jkurl='/order/add'
				var data={
					id:that.ids,
					address_id:that.add_id
				}
				if (that.btn_kg == 1) {
					return
				}
				that.btn_kg = 1
				uni.showLoading({
					title: '正在提交',
					mask: true
				})
				service.P_post(jkurl, data).then(res => {
					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						that.$refs.htmlLoading.htmlReset_fuc(0)
						var datas = res.data
						console.log(typeof datas)
				
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						that.datas=datas
				
					} else {
						
							that.$refs.htmlLoading.htmlReset_fuc(1)
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
					
					that.$refs.htmlLoading.htmlReset_fuc(1)
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '系统错误'
					})
				})
				
			},
			
			getimg(img) {
				return api.getimg(img)
			},
			tiaozhuan(e) {
				return api.tiaozhuan(e)
			},
		tiao() {
			if(that.btnkg==1){
				return
			}else{
				that.btnkg=1
			}
			var jkurl='/pay'
			var datas={
				code:that.datas.code
			}
			// 单个请求
			service.P_post(jkurl, datas).then(res => {
				that.btnkg=0
				console.log(res)
				if(res.code==1001){
					uni.showToast({
						icon: 'none',
						title: '购买成功'
					})
					// service.get_info()
					setTimeout(()=>{
						uni.hideLoading()
					
						that.btnkg=0
							uni.redirectTo({
								// url:'/pagesA/OrderList/OrderList'
								url:'/pagesA/My_order/My_order?currentIndex=0'
							})
					},1000)
					return
				}
				if (res.code == 1) {
					var datas = res.data
					console.log(typeof datas)
						
					// if (typeof datas == 'string') {
					// 	datas = JSON.parse(datas)
					// }
					service.wxpay(res.data).then(res => {
						uni.showToast({
							icon: 'none',
							title: '购买成功'
						})
						// service.get_info()
						setTimeout(() => {
							uni.redirectTo({
								// url:'/pagesA/OrderList/OrderList'
								url:'/pagesA/My_order/My_order?currentIndex=0'
							})
						}, 1000)
					}).catch(e => {
						that.btn_kg=0
						uni.showToast({
							icon: 'none',
							title: '微信支付失败'
						})
						setTimeout(() => {
							uni.redirectTo({
								url:'/pagesA/My_order/My_order?currentIndex=0'
							})
						}, 1000)
					})
				}
			}).catch(e => {
				that.btnkg=0
				console.log(e)
				uni.showToast({
					icon: 'none',
					title: '获取数据失败'
				})
			})
			// uni.showToast({
			// 	title: '支付成功',
			// 	icon: 'none',
			// });
			// setTimeout(function() {
			// 	uni.redirectTo({
			// 	    url: '../My_order/My_order'
			// 	});
			// },1000)
}
		}
	}
</script>

<style>
	.fun{
		width: 750upx;
		height: 120upx;
		background: #FFFFFF;
		box-shadow: 0px -10upx 19upx 3px rgba(153, 153, 153, 0.08);
	}
	.zhifu{
		width: 690upx;
		height: 80upx;
		background: #FECE0A;
		border-radius: 40upx;
	}
	.weix{
		width: 50upx;
		height: 44upx;
	}
	.xuna{
		width: 30upx;
		height: 30upx;
	}
	.mian{
box-shadow: 0px 10rpx 19rpx 3px rgba(153, 153, 153, 0.08);
border-radius: 10rpx;
	}
.beij{
	width: 690rpx;
	height: 236rpx;
}
	page {
		background-color: #fff;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
	}

	.dai {
		color: #FA3117;
	}

	.content {
		background-color: #fff;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		overflow-x: hidden;
	}
</style>
