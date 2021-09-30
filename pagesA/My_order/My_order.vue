<template>
	<view class="content">
		<scroll-view scroll-x class="scroll_x harder pl10 pr10">
			<!-- <view class=" flex justify-center align-items-center  "> -->
				<view class="fuwu" :class="currentIndex== index?'active':''" v-for="(item,index) in title"
					:key="index" @click="bian(index)">
					{{item.ti}}
				</view>
			<!-- </view> -->
		</scroll-view>
		<view class="harder" style="position: relative;z-index: 1;opacity: 0;"></view>
		<view class=" pl15 pr15 pt15 ">
			<view class="shuju pl10 pr10 pb15 pt10 mb12" v-for="(item,index) in datas" :key="index">
				<view class="flex flex-between align-items-center ">
					<text class="fs12 c6 flex">订单编号:{{item.code}}</text>
					<text class="blle flex fs12" v-if="item.type==1 ">等待买家付款</text>
					<text class="blle flex fs12" v-if="item.type==2 ">等待卖家发货</text>
					<text class="blle flex fs12" v-if="item.type==3 ">卖家已发货</text>
					<text class="blle flex fs12" v-if="item.type==5">交易成功</text>
					<text class="blle flex fs12" v-if="item.type==6">交易已取消</text>
				</view>
				<view class="flex pt15" v-for="(item1,index) in item.list" @click='jump' :data-url=" '../Successful_trade/Successful_trade?code='+item.code">
					<image :src="getimg(item1.goods_pic)" mode="aspectFill" class="img mr10 flex"></image>
					<view class="flex flex-col">
						<view class="flex align-items-center flex-between">
							<text class="oh1 fs14 " style="width: 310rpx; height: 40rpx;">{{item1.goods_title}}</text>
							<view class="c9  ">
								<text class="fs12">￥</text>
								<text class="fs14">{{item1.price}}</text>
							</view>
						</view>
						<view class="flex align-items-center pt6 flex-between">
							<text class="oh1 order_name" >{{item1.spec_title}}</text>
							<view class="c9 pl15">
								<text class="fs12">x{{item1.number}}</text>
							</view>
						</view>
						
						
					</view>

				</view>
				<view class="flex  pt25 ju_b">
					<view class=" text-right">
						<text class="fs11 c6">订单总价</text>
						<text class="fs11 dai pl3">￥</text>
						<text class="fs20 dai ">{{item.total}}</text>
					</view>
					<view class="flex btn_box">
						<view  v-if="item.type==1" class="quxiao flex align-items-center justify-center fs12 " @click="quxiao(item)">
							取消订单
						</view>
						<view  v-if="item.type==1" class="fu flex align-items-center justify-center fs12 dai fs12 "
							@click='jump' :data-url=" '../Successful_trade/Successful_trade?code='+item.code"
							:data-shifou='true'>
							付款
						</view>
						<view  v-if="item.type>2&&item.type<6" class="quxiao flex align-items-center justify-center fs12 " @click='jump'
							:data-url=" '../order_wuliu/order_wuliu?code='+item.code" :data-shifou='true'>
							物流
						</view>
						<view v-if="item.type==3" class="fu flex align-items-center justify-center fs12 dai fs12 "
							@click="shouhuo(item)">
							收货
						</view>
						<view v-if="item.type==5" class="fu flex align-items-center justify-center fs12 dai fs12 " 
							@click='jump' :data-url=" '../Successful_trade/Successful_trade?code='+item.code">
							评价
						</view>
						<view v-if="item.type==2" class="fu flex align-items-center justify-center fs12 dai fs12 " 
							@click='jump' :data-url=" '../Successful_trade/Successful_trade?code='+item.code">
							退款
						</view>
						<view v-if="item.type==5" class="fu flex align-items-center justify-center fs12 dai fs12 " 
							@click='jump' :data-url=" '../Successful_trade/Successful_trade?code='+item.code">
							退货
						</view>
						<view v-if="item.type==10" class="fu flex align-items-center justify-center fs12 dai fs12 " 
							@click='jump' :data-url=" '../Successful_trade/Successful_trade?code='+item.code">
							退货信息
						</view>
					</view>
				</view>
			</view>
			<view v-if="datas.length==0" class="zanwu">暂无数据</view>
			<view v-if="datas.length>0&&data_last" class="data_last">到底了~~</view>
		</view>

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
				title: [{
						ti: '全部订单',
						id: 0
					},
					{
						ti: '待付款',
						id: 1
					},
					{
						ti: '待发货',
						id: 2
					},
					{
						ti: '待收货',
						id: 3
					},
					{
						ti: '已完成',
						id: 5
					},
					{
						ti: '待退款',
						id: 7
					},
					{
						ti: '已退款',
						id: 8
					},
					{
						ti: '待退货',
						id: 9
					},
					{
						ti: '同意退货',
						id: 10
					},
					{
						ti: '退货中',
						id: 11
					},
					{
						ti: '已退货',
						id: 12
					},
				],

				currentIndex: 0,
				index: 0,
				status: 2,
				datas:[],
				page:1,
				data_last:false,
				shownum:0
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo'])
		},
		onLoad(option) {
			that = this
			console.log(option)
			if (option.currentIndex == '') {
				option.currentIndex = 0
			}
			that.currentIndex = option.currentIndex
			if (option.index == '') {
				option.index = 0
			}
			that.index = option.index
			that.onRetry()
		},
		onShow() {
			if(that.shownum>0){
					that.onRetry()
			}
			that.shownum++
		},
		onPullDownRefresh() {
			that.onRetry()
		},
		onReachBottom() {
			that.getdata()
		},
		methods: {
			...mapMutations(['logout', 'login']),
			onRetry(){
				that.page=1
				that.datas=[]
				that.data_last=false
				that.btn_kg=0
				that.getdata()
			},
			getdata() {
				var jkurl = '/order/see'
				var data = {
					type:that.title[that.currentIndex].id,
					page: that.page,
					limit: 20
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
						// that.$refs.htmlLoading.htmlReset_fuc(0)
						var datas = res.data
						console.log(typeof datas)
			
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						// that.datas = datas
						// return
						if (page_now == 1) {
			
							that.datas = datas.data
			
						} else {
							if (datas.data.length == 0) {
								that.data_last = true
								return
							}
							that.data_last = false
							that.datas = that.datas.concat(datas.data)
						}
						that.page++
						console.log(that.datas)
			
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
								title: '获取失败'
							})
						}
					}
				}).catch(e => {
			
					// that.$refs.htmlLoading.htmlReset_fuc(1)
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
			bian(index) {
				this.currentIndex = index
				this.index = index
				that.onRetry()
				console.log(this.currentIndex)

			},
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
									setTimeout(function(){
									that.btn_kg = 0
										that.onRetry()
									},1000)
							
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
						// setTimeout(function() {
						// 	uni.navigateTo({
						// 		url: '../Successful_trade/Successful_trade?id=' + 3
						// 	})
						// }, 1000)
						setTimeout(function(){
						that.btn_kg = 0
							that.onRetry()
						},1000)
				
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


		}
	}
</script>

<style>
	.fu {
		min-width: 90rpx;
		height: 60upx;
		border: 1px solid #EB4C50;
		border-radius: 30upx;
		margin: 6upx;
		padding: 0 12upx;
	}

	.quxiao {
		min-width: 90rpx;
		height: 60rpx;
		border: 1px solid #666666;
		border-radius: 30rpx;
		margin: 6upx;
		padding: 0 12upx;
	}

	.img {
		width: 200upx;
		height: 200upx
	}

	.blle {

		color: #A2B76A;
	}

	.shuju {
		background: #FFFFFF;
		box-shadow: 0px 10rpx 19rpx 3px rgba(153, 153, 153, 0.08);
		border-radius: 8px;
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

	.active {
		text-align: center;
		font-size: 30rpx;
		font-family: PingFang;
		font-weight: 500;
		color: #EB4C50 !important;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		margin-top: 10px;
	}

	.active:after {
		content: "";
		width: 35rpx;
		height: 5rpx;
		background: #EB4C50;
		border-radius: 3rpx;
		display: flex;
		margin-top: 18rpx;
	}

	.fuwu {
		display: inline-flex;
		text-align: center;
		font-size: 30rpx;
		font-family: PingFang;
		font-weight: 500;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		color: #000;
		padding: 0 10upx;
	}



	.harder {
		width: 100%;
		height: 97rpx;
		background-color: #fff;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 900;
		box-sizing: border-box;
	}
	.order_name{
		font-size: 22upx;
		color: #999;
		width: 300upx;
		height: 40upx;
		line-height: 40upx;
	}
	.btn_box{
		max-width: 50%;
		flex-wrap: wrap;
	}
</style>
