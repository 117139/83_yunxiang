<template>
	<view class="content">
		
		<view class=" pl15 pr15 pt15 ">
			<view class="shuju pl10 pr10 pb15 pt10 mb12" v-for="(item,index) in shuju" :key="index">
				<view class="flex flex-between align-items-center ">
					<text class="fs12 c6 flex">订单编号{{item.bianh}}</text>
					<text class="blle flex fs12" v-if="item.stst==1 ">退款成功</text>
					<text class="blle flex fs12" v-if="item.stst==2 ">退款失败</text>
				</view>
				<view class="flex pt15">
					<image :src="getimg(item.img)" mode="aspectFill" class="img mr10 flex"></image>
					<view class="flex flex-col">
						<view class="flex align-items-center flex-between">
							<text class="oh1 fs14 " style="width: 325rpx; height: 40rpx;">{{item.title}}</text>
							<view class="c9  ">
								<text class="fs12">￥</text>
								<text class="fs14">99.00</text>
							</view>
						</view>
						<view class="flex align-items-center pt6 flex-between">
							<text class="oh1 fs11 c9" style=" height: 40rpx;">{{item.bain}}</text>
							<view class="c9 pl15">
								<text class="fs12">x1</text>
							</view>
						</view>
						<view class=" text-right pt25 ">
							<text class="fs11 c6">订单总价</text>
							<text class="fs11 dai pl3">￥</text>
							<text class="fs20 dai ">{{item.sum}}</text>
						</view>
						<view class="flex  pt25 flex-right">
							<view class="flex">
								<view class="quxiao flex align-items-center justify-center fs12 " @click="quxiao">
									删除记录
								</view>
								<view class="fu flex align-items-center justify-center fs12 dai fs12 ml12"
									@click='tiaozhuan' :data-url="'../Successful_trade/Successful_trade?id='+5"
									:data-shifou='true'>
									查看详情
								</view>
							</view>
							
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
	export default {
		data() {
			return {
				title: [{
						ti: '全部订单',
						id: 1
					},
					{
						ti: '待付款',
						id: 2
					},
					{
						ti: '待发货',
						id: 2
					},
					{
						ti: '待收货',
						id: 2
					},
					{
						ti: '已完成',
						id: 2
					},
				],

				shuju: [{
					bianh: '12486530126',
					stst: 1,
					img: '/static_xcx/tui.png',
					title: '西北骄】青海特产风干西北骄】青海特产风干西北骄】青海特产风干',
					num: '99.99',
					bain: '五香味500g【收藏加购送20g】',
					sum: 201,

				},
				
				{
					bianh: '12486530126',
					stst: 1,
					img: '/static_xcx/tui.png',
					title: '西北骄】青海特产风干西北骄】青海特产风干西北骄】青海特产风干',
					num: '99.99',
					bain: '五香味500g【收藏加购送20g】',
					sum: 500,
				
				},
				],
				currentIndex: 0,
				index: 0,
				status: 2


			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo'])
		},
		onLoad(option) {
			that = this
			console.log(option)
			
		},
		methods: {
			...mapMutations(['logout', 'login']),
			getimg(img) {
				return api.getimg(img)
			},
			tiaozhuan(e) {
				return api.tiaozhuan(e)
			},
			bian(index) {
				this.currentIndex = index
				this.index = index
				console.log(this.currentIndex)

			},
			quxiao() {
				uni.showModal({
					title: '提示',
					content: '确定删除记录吗',
					success: function(res) {
						if (res.confirm) {
							uni.showToast({
								title: '删除记录成功',
								icon: 'none',
							});
						} else if (res.cancel) {
							uni.showToast({
								title: '删除记录失败',
								icon: 'none',
							});
						}
					}
				});
			},
			shouhuo() {
				uni.showToast({
					title: '已确认收货',
					icon: 'none',
				});
				setTimeout(function() {
					uni.navigateTo({
						url: '../Successful_trade/Successful_trade?id=' + 3
					})
				}, 1000)

			},


		}
	}
</script>

<style>
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
		height: 97rpx;
		background-color: #fff;
	}
</style>
