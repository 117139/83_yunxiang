<template>
	<view class="evaluate compatibleProcessing">
		<!-- 自定义导航 -->
		<uni-nav-bar fixed statusBar :title="title" class="status-title" @clickLeft="back">
			<uni-icons slot="left" type="arrowleft" class="status-icon" size="17"></uni-icons>
		</uni-nav-bar>
		<htmlLoading ref="htmlLoading" @Retry='onRetry' :bj_show="false">
			<view class="evaluateView">
				
				<!-- 第二行 -->
				<view class="evaluate-second-line" v-for="(item,index) in datas" :key="index">
					<!-- 第二行 第一行-->
					<view class="evaluate-second-line-first">
						<!-- 第二行 第一行 左-->
						<view class="evaluate-second-line-first-left">
							<image :src="getimg(item.user_Info.img)" mode="aspectFill"></image>
						</view>
						<!-- 第二行 第一行 右-->
						<view class="evaluate-second-line-first-right">
							<!-- 昵称 -->
							<view class="evaluate-second-line-first-right-nick">
								<text>{{ item.user_Info.nick }}</text>
							</view>
							<!-- 时间 -->
							<view class="evaluate-second-line-first-right-time">
								<text>{{item.add_time}}</text>
								<text v-if="item.spec">|</text>
								<text v-if="item.spec">{{item.spec}}</text>
							</view>
						</view>
					</view>
					<!-- 第二行 第二行-->
					<view class="evaluate-second-line-second">
						<text>{{item.content}}</text>
					</view>
				</view>
			</view>
		</htmlLoading>
	</view>
</template>

<script> 
	import service from '../../service.js';
	var that
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		
		data() {
			return {
				title: "全部评价",
			
				id:'',
				datas:[],
				page:1,
				data_last:false
			};
		},
		onLoad(option) {
			that = this
			that.id=option.id
			that.onRetry()
		},
		onReachBottom() {
			that.getdata()
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo','addmsg'])
		},
		methods: {
			onRetry(){
				that.page=1
				that.data_last=false
				that.btn_kg=0
				that.getdata()
			},
			getdata(){
				var jkurl='/shop/goods_comment'
				var data={
					id:that.id,
					page:that.page,
					limit:20
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
			back() {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>
<style lang="scss">
	.evaluateView {
		width: 690rpx;
		height: 467rpx;
		box-sizing: border-box;
		padding: 35rpx 19rpx 34rpx 20rpx;
		background: #FDFDFD;
		box-shadow: 0px 10px 19px 3px rgba(153, 153, 153, 0.08);
		border-radius: 8px;

		// background-color: #0077AA;
		.evaluate-first-line {
			width: 100%;
			height: 29rpx;
			// background-color: #55A532;
			display: flex;
			justify-content: space-between;

			.evaluate-first-line-left {
				width: 547rpx;
				height: 100%;
				// background-color: #990055;
				display: flex;
				align-items: center;

				.evaluate-first-line-left-title {
					font-size: 30rpx;
					font-family: PingFang;
					font-weight: bold;
					color: #333333;
					line-height: 38rpx;
				}
			}

			.evaluate-first-line-right {
				width: 143rpx;
				height: 100%;
				// background-color: #666666;
				display: flex;
				justify-content: center;
				align-items: center;

				.evaluate-first-line-right-more {
					display: flex;
					justify-content: flex-end;
					align-items: center;

					text {
						font-size: 24rpx;
						font-family: PingFang;
						font-weight: 400;
						color: #999999;
						line-height: 38rpx;
					}

					image {
						width: 20rpx;
						height: 20rpx;
						margin-left: 19rpx;
					}

				}
			}

		}

		.evaluate-second-line {
			width: 100%;
			box-sizing: border-box;
			// height: 300rpx;
			// background-color: #1961B6;

			.evaluate-second-line-first {
				width: 100%;
				height: 70rpx;
				// background-color: #795DA3;
				display: flex;
				flex-direction: row;

				.evaluate-second-line-first-left {
					width: 70rpx;
					height: 70rpx;
					
					image {
						width: 70rpx;
						height: 70rpx;
						border-radius: 50%;
					}
				}

				.evaluate-second-line-first-right {
					width: 620rpx;
					height: 100%;
					margin-left: 23rpx;
					// background-color: #9A6E3A;
					display: flex;
					flex-direction: column;

					.evaluate-second-line-first-right-nick {
						display: flex;
						align-items: center;

						text {
							font-size: 24rpx;
							font-family: PingFang;
							font-weight: bold;
							color: #333333;
							line-height: 38rpx;
						}
					}

					.evaluate-second-line-first-right-time {
						display: flex;
						align-items: center;

						text {
							font-size: 22rpx;
							font-family: PingFang;
							font-weight: 400;
							color: #999999;
							line-height: 38rpx;
							margin-right: 0.25em;
						}
					}
				}
			}

			.evaluate-second-line-second {
				text {
					font-size: 24rpx;
					font-family: PingFang;
					font-weight: 400;
					color: #333333;
					line-height: 38rpx;
				}
			}
		}
	}
	.evaluate-second-line+.evaluate-second-line{
		
		margin-top: 44rpx;
	}
	.evaluate {
		.status-title {
			font-size: 34rpx;
			font-family: PingFang;
			font-weight: bold;
			color: #000000;

			.status-icon {
				font-size: 30rpx;
			}
		}

		.evaluateView {
			width: 750rpx;
			// margin: 0 30rpx 0 30rpx;
			height: auto !important;
			box-shadow: none;
			background-color: #ffffff;
			padding-top: 20upx 30upx 20upx;
			.evaluate-second-line-second {
				// padding-right: 30rpx;
			}
		}
	}

	//修改第三方组件样式
	/deep/ .uni-navbar--border.data-v-6bda1a90 {
		border: none !important;
	}
</style>
