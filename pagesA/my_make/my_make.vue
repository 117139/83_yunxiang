<template>
	<view class="content">
		<view class="harder flex justify-center align-items-center">
			<view class="fuwu flex-1 flex" :class="currentIndex== index?'active':''" v-for="(item,index) in title"
				:key="index" @click="bian(index)">
				{{item.ti}}
			</view>
		</view>
		<view class="harder" style="position: relative;z-index: 1;opacity: 0;"></view>

		<view class="pl15 pr15 pt10 " >
			<!-- <view class="data_last" v-if="datas == [] || datas.length == 0 ">
				暂无数据
			</view> -->
			<view class=" flex mia pt15 pb15 pl10 mb15" v-for="(item,index) in datas" @tap="jump" :data-url="'/pagesA/my_yy_xq/my_yy_xq?code='+item.code">
				<image :src="getimg(item.img_url)" mode="aspectFill" class="tu mr15"></image>
				<view class="">
					<text class="oh1 fs14 fwb"
						style="width: 419rpx;">{{item.title}}</text>
					<view class="flex  flex-col pt12">
						<text class="fs11">预约时间：{{item.start_times}}</text>
						<text class="fs11 pt5">预约人数：{{item.num}}人</text>
					</view>
					<view class="flex flex-between pt15 align-items-baseline">
						<view class="flex align-items-baseline">
							<text class="ceb4 fs11">￥</text>
							<text class="ceb4 fs20">{{item.price}}</text>
							<text class="fs11">元</text>
						</view>
						<view class="flex align-items-center">
							<image :src="getimg('/static_xcx/icon-test.png')" mode="aspectFill" class="din"></image>
							<text class="fs11 c6 pl5">{{item.province}} {{item.city}}</text>
						</view>
					</view>
				</view>

			</view>
			
		</view>

	
		<view v-if="datas.length==0" class="zanwu">暂无数据</view>
		<view v-if="datas.length>0&&data_last" class="data_last">到底了~~</view>
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
						ti: '待审核',
						id: 1
					},{
						ti: '预约成功',
						id: 2
					},
					{
						ti: '预约失败',
						id: 3
					},
					{
						ti: '待退款',
						id: 4
					},
					{
						ti: '已退款',
						id: 5
					},
				],

				xiang: [

				],
				currentIndex: 0,
				xiangs: [],
				datas: [],
				disabled: false,
				btnWidth: 180,
				show: false,

				page:1,
				data_last:false,
				shownum:0
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo'])
		},
		onLoad() {
			that = this
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
			that.onRetry()
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
				var jkurl = '/order/activity_list'
				var data = {
					status:that.title[that.currentIndex].id,
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
				console.log(this.currentIndex)
				that.onRetry()
			},


		}
	}
</script>

<style>
	.din {
		width: 20rpx;
		height: 24rpx;
	}

	.icon {
		width: 20rpx;
		height: 20rpx;
	}

	.tu {
		width: 200rpx;
		height: 200rpx;
	}

	.mia {
		box-shadow: 0px 10rpx 19rpx 3px rgba(153, 153, 153, 0.08);
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
		text-align: center;
		font-size: 30rpx;
		font-family: PingFang;
		font-weight: 500;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		color: #000;
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
	}
</style>
