<template>
	<view class="recommend">
		<view class="title">
			<image :src="getimg(recommend.recommendTitleLeftImg)" mode="" lazy-load></image>
			<text>特色商品推荐 </text>
			<image :src="getimg(recommend.recommendTitleLeftImg)" mode="" lazy-load></image>
		</view>
		<view class="body">
			<view class="f-r" v-if="false">
				<view class="f-r-item">
					<view class=""><text>{{recommend.type}}特色</text><text>推荐</text></view>
					<view class="">
						<text>{{recommend.detail}}</text>
					</view>
				</view>
				<image class="back" :src="getimg(recommend.recommendBack)" mode="" lazy-load></image>
			</view>
			<view class="s-r">
				<view class="s-r-item" v-for="(item,index) in recommend.recommends" :key="index"
					@click="recommend_detail_to(item)">
					<image :src="getimg(item.img)" mode="" lazy-load></image>
					<view class="name"><text>{{item.title}}</text></view>
					<view class="price">
						<view class=""><text style="font-size: 22rpx;margin-right: 13rpx;"
								:style="{color:item.recommendColor}">￥</text><text style="margin-right: 5rpx;"
								:style="{color:item.recommendColor}">{{ item.price }}</text>元
						</view>
						<view class=""><text>已售</text>{{item.num>10000?parseInt(item.num/10000)+'w+':item.num}}</view>
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
		name: "recommend",
		props: [
			'recommend'
		],
		data() {
			return {

			};
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
			recommend_detail_to(item) {
				console.log(item)
				uni.navigateTo({
					url: '/pagesA/detail/detail'
				})
			}
		}
	}
</script>

<style lang="scss">
	.recommend {
		width: 690rpx;
		margin-top: 4rpx;
		margin-bottom: 98rpx;

		.title {
			display: flex;
			justify-content: center;
			align-items: center;
			// margin: 69rpx 0 40rpx 0;
			margin-bottom: 40rpx;

			image {
				width: 52rpx;
				height: 28rpx;
			}

			text {
				width: 253rpx;
				text-align: center;
				font-size: 32rpx;
				color: $index-font-color-one;
				font-weight: bold;
			}
		}

		.body {
			width: 690rpx;

			.f-r {
				width: 690rpx;
				height: 260rpx;
				// background-image: url(../../static/image/my/banner.png);
				// background-size: cover;
				box-sizing: border-box;
				padding: 56rpx 53rpx;
				position: relative;

				.back {
					position: absolute;
					top: 0;
					left: 0;
					width: 690rpx;
					height: 280rpx;
					z-index: -1;
					border-radius: 6rpx;
				}

				.f-r-item {
					width: 100%;
					height: 100%;
					// background-color: #007AFF;

					view:nth-child(1) {
						display: flex;
						margin-bottom: 27rpx;

						text:nth-child(1) {
							display: block;
							width: 150rpx;
							height: 38rpx;
							line-height: 38rpx;
							// background-color: #4CD964;
							font-size: 32rpx;
							color: #fff;
							font-weight: bold;
						}

						text:nth-child(2) {
							display: block;
							width: 70rpx;
							height: 38rpx;
							color: #fff;
							background-color: #1961B6;
							text-align: center;
							line-height: 38rpx;
							// background-color: #4CD964;
							font-size: 22rpx;
							border-radius: 8rpx;
						}
					}

					view:nth-child(2) {
						color: #fff;
						font-size: 22rpx;
						line-height: 34rpx;
						display: -webkit-box;
						font-weight: 400;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 3;
						overflow: hidden;
					}

				}
			}

			.s-r {
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				margin-top: 39rpx;

				.s-r-item {
					width: 330rpx;
					height: 540rpx;
					margin-bottom: 39rpx;
					// background-color: #0077AA;

					image {
						width: 100%;
						height: 400rpx;
						border-radius: 8rpx;
					}

					.name {
						font-weight: bold;
						line-height: 38rpx;
						color: $index-font-color-one;
						font-size: 28rpx;
						margin: 33rpx 0 0 0;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 1;
						overflow: hidden;
						max-width: 300rpx;
					}

					.price {
						display: flex;
						align-items: center;
						justify-content: space-between;
						margin-top: 16rpx;
						font-weight: 400;

						view:nth-child(1) {
							font-size: 22rpx;
							color: $index-font-color-one;
							font-weight: bold;

							text {
								font-size: 40rpx;
								margin-left: -10rpx;
								color: #1961B6;
								font-weight: bold;

							}
						}

						view:nth-child(2) {
							font-size: 22rpx;
							color: $index-font-color-two;
							font-weight: 400;

							text {
								margin: 0 10rpx 0 0;
							}
						}
					}
				}
			}
		}
	}
</style>
