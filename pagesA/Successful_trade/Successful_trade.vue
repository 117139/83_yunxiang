<template>
	<view class="content">
		<htmlLoading ref="htmlLoading" @Retry='getdata' >
			<view class="">
				<view class="pl8 ml15 mr15 pr8 mt15  mian pb20 pt15 flex align-items-center">
					<image :src="getimg('/static_xcx/dihzi.png')" mode="aspectFill" class="dizhi mr10"></image>
					<view class="flex flex-col">
						<view class="flex fwb align-items-center">
							<text class="fs15 ">{{datas.name}}</text>
							<text class="fs12 pl5">{{datas.phone}}</text>
						</view>
						<view class="flex oh2 fs14 pt10" style="width: 450rpx;">
							{{datas.province}}{{datas.city}}{{datas.county}}{{datas.address}}
						</view>
					</view>
					<!-- <view class="xiu flex align-items-center justify-center c6 fs12 ml20" @click='jump'
						data-url='/pagesA/address/address' :data-shifou='true'>
						修改
					</view> -->
				</view>
				<view class="pl8 ml15 mr15 pr8 mt15  mian pb15 pt20">
					<view class="flex" v-for="(item,index) in datas.list">
						<image :src="getimg(item.goods_pic)" mode="aspectFill" class="img mr10 "></image>
						<view class="flex flex-col">
							<view class="flex align-items-center flex-between">
								<text class="oh1 fs14 fwb" style="width: 340rpx; height: 40rpx;">{{item.goods_title}}</text>
								<view class="c9  ">
									<text class="fs12">￥</text>
									<text class="fs14">{{item.price}}</text>
								</view>
							</view>
							<view class="flex align-items-center pt6 flex-between">
								<text class="oh1 order_name">{{item.spec_title}}</text>
								<view class="c9 pl15">
									<text class="fs12">x{{item.number}}</text>
								</view>
							</view>
							<view>
								<view v-if="datas.type==5" @tap="jump" :data-url="'/pagesA/order_pj/order_pj?id='+item.id" class="quxiao flex aic ju_c fs12  mb10 mt10">
									评价
								</view>
							</view>
						</view>
					</view>
					<view class="flex flex-between align-items-center pt15">
						<text class="c6 fs13">商品总价</text>
						<text class="c9 fs13">￥{{datas.goods_price}}</text>
					</view>
					<view class="flex flex-between align-items-center pt15">
						<text class="c6 fs13">运费</text>
						<text class="c9 fs13">￥{{datas.freight}}</text>
					</view>
					<view class=" text-right pt25 ">
						<text class="fs11 c6">订单总价</text>
						<text class="fs11 dai pl3">￥</text>
						<text class="fs20 dai ">{{datas.total}}</text>
					</view>
				</view>
				<view class="mian  ml15 mr15  mt15 pt10 pb15 pl8 pr8">
					<text class="fs14 fwb">订单信息</text>
					<view class="flex pt10">
						<text class="c9 fs13" style="width: 200rpx;">订单编号：</text>
						<text class="c9 fs13">{{datas.code}}</text>
					</view>
					<view v-if="datas.create_time"  class="flex pt10">
						<text class="c9 fs13" style="width: 200rpx;">订单创建时间：</text>
						<text class="c9 fs13">{{gettime(datas.create_time)}} </text>
					</view>
					<view  v-if="datas.pay_time" class="flex pt10">
						<text class="c9 fs13" style="width: 200rpx;">订单支付时间：</text>
						<text class="c9 fs13">{{gettime(datas.pay_time)}} </text>
					</view>
					<view  v-if="datas.send_time" class="flex pt10">
						<text class="c9 fs13" style="width: 200rpx;">订单发货时间：</text>
						<text class="c9 fs13">{{gettime(datas.send_time)}} </text>
					</view>
					<view  v-if="datas.over_time" class="flex pt10">
						<text class="c9 fs13" style="width: 200rpx;">订单完成时间：</text>
						<text class="c9 fs13">{{gettime(datas.over_time)}} </text>
					</view>
				</view>
				<view class="fun fixed bottom">
					<view class="flex flex-right  pr15 ">
						<view v-if="datas.type==1" class="fu flex aic ju_c fs12 dai fs12 ml12 mb10"  @click="quxiao(datas)">
							取消订单
						</view>
						<view v-if="datas.type==1" class="fu flex aic ju_c fs12 dai fs12 ml12 mb10" @click='pay' :data-url="'../Settlement_desk/Settlement_desk?code='+datas.code" :data-shifou='true'>
							付款
						</view>
						<view v-if="datas.type>2&&datas.type!= 6"  @tap="jump" :data-url=" '../order_wuliu/order_wuliu?code='+datas.code" class="quxiao flex aic ju_c fs12  mb10">
							查看物流
						</view>
						<view v-if="datas.type==3" class="fu flex aic ju_c fs12 dai fs12 ml12 mb10" @click="shouhuo(datas)">
							确认收货
						</view>
						
					</view>
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
				id: '',
				datas:''
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo'])
		},
		onLoad(option) {
			that = this
			console.log(option)
			that.code = option.code||''

		



			uni.setNavigationBarTitle({
				title: '订单详情'
			});
			that.getdata()
		},

		methods: {
			...mapMutations(['logout', 'login']),
			quxiao(item) {
				uni.showModal({
					title: '提示',
					content: '确定取消订单吗',
					success: function(res) {
						if (res.confirm) {
							var jkurl='/order/save'
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
										title: '取消订单成功',
										icon: 'none',
									});
									setTimeout(function() {
										that.btn_kg = 0
										that.getdata()
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
			shouhuo(item) {
				var jkurl='/order/save'
				var data={
					code:item.code,
					type:2,
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
							title: '收货成功',
							icon: 'none',
						});
						setTimeout(function() {
							that.btn_kg = 0
							that.getdata()
						}, 1000)
						// setTimeout(function(){
						// that.btn_kg = 0
						// 	that.onRetry()
						// },1000)
				
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
				
			
			},
			
			pay(){
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
							that.getdata()
								// uni.redirectTo({
								// 	// url:'/pagesA/OrderList/OrderList'
								// 	url:'/pagesA/My_order/My_order?currentIndex=0'
								// })
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
								that.btnkg=0
								that.getdata()
							}, 1000)
						}).catch(e => {
							that.btn_kg=0
							uni.showToast({
								icon: 'none',
								title: '微信支付失败'
							})
							// service.wxlogin()
							
							setTimeout(() => {
								uni.redirectTo({
									url:'/pagesA/My_order/My_order'
								})
							}, 1000)
						})
					}
				}).catch(e => {
					that.btnkg=0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '系统异常'
					})
				})
			},
			gettime(mj){
				return service.gettime(mj,'-')
			},
			getdata(){
				var jkurl='/order/detail'
				var data={
					code:that.code
				}
				if (that.btn_kg == 1) {
					return
				}
				that.btn_kg = 1
				uni.showLoading({
					title: '正在获取数据',
					mask: true
				})
				var page_now = that.page
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
						that.datas = datas
						if (datas.type == 1) {
						
							that.title = '等待买家付款'
						} else if (datas.type == 2) {
							that.title = '买家已付款'
						} else if (datas.type == 3) {
							that.title = '等待收货'
						
						} else if (datas.type == 4) {
							that.title = '卖家已发货'
						} else if (datas.type == 5) {
							that.title = '交易成功'
						} else if (datas.type == 6) {
							that.title = '订单已取消'
						}
						
						
						
						uni.setNavigationBarTitle({
							title: that.title
						});
						console.log(that.datas)
				
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
				return service.getimg(img)
			},
			jump(e) {
				return service.jump(e)
			},

			que() {
				that.id = 3
			}
		}
	}
</script>

<style>
	.xiu {
		width: 100rpx;
		height: 50rpx;
		border: 1px solid #666666;
		border-radius: 25rpx;
	}

	.dizhi {
		width: 48rpx;
		height: 48rpx;
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
		padding-bottom: 0;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		box-shadow: 0px -10rpx 19rpx 3px rgba(153, 153, 153, 0.08);
		
	}

	.mian {

		box-shadow: 0px 10rpx 19rpx 3px rgba(153, 153, 153, 0.08);
	}

	.img {
		width: 200upx;
		height: 200upx
	}

	page {
		background-color: #fff;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
	}

	.dai {
		color: #EB4C50;
	}

	.content {
		background-color: #fff;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		overflow-x: hidden;
	}
	.order_name{
		font-size: 22upx;
		color: #999;
		width: 300upx;
		height: 40upx;
		line-height: 40upx;
	}
</style>
