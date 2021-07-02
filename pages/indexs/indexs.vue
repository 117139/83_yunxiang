<template>
	<view class="">
		<uni-nav-bar fixed="true" class="status_title" color="#000000" statusBar="true" :title="title">
		</uni-nav-bar>
		<htmlLoading ref="htmlLoading" @Retry='onRetry' :bj_show="false">
			<view class="ShoppingMall">
				<!-- search -->
				<view class="search">

					<view class="search-view" @click='jump' data-url='/pagesA/searchgoods/searchgoods' >
						<text class="iconfont icon-search search-icon"></text>
						<text class="search-text">输入搜索内容</text>
					</view>
					<view class="flex flex-col aic" style="" @click='jump' data-url='/pagesA/Shopping_Cart/Shopping_Cart' :data-login="true" :data-haslogin="hasLogin">
						<text class="iconfont icon-gouwuche fs21 fwb"></text>
						<text class="fs12">购物车</text>
					</view>
				</view>   
				<!-- banner -->
				<view class="banner">
					<!-- 轮播 -->
					<uni-swiper-dot :info="datas.banner" :current="current" field="content" :mode="mode" class="swiper"
						:dotsStyles="dotsStyles">
						<swiper class="swiper-box" @change="changeSwiper" circular>
							<swiper-item v-for="(item ,index) in datas.banner" :key="index">
								<view class="swiper-item">
									<image :src="getimg(item.img_url)" mode="aspectFill" lazy-load></image>
								</view>
							</swiper-item>
						</swiper>
					</uni-swiper-dot>
				</view>
				<!-- type_nav -->
				<address-nav :addressNav="datas.classfiy"></address-nav>
				<view class="recommend">
					<view class="title">
						<image :src="getimg('/static_xcx/image/shoppingMall/DiagonalBar1.png')" mode="aspectFit" lazy-load></image>
						<text>特色商品推荐</text>
						<image :src="getimg('/static_xcx/image/shoppingMall/DiagonalBar1.png')" mode="aspectFit" lazy-load></image>
					</view>
					<view class="body">
						<view class="s-r">
							<view class="s-r-item" v-for="(item,index) in goods" :key="index"
								@click="jump" :data-url="'/pagesA/detail/detail?id='+item.id">
								<image :src="getimg(item.first_img)" mode="aspectFill" lazy-load></image>
								<view class="name"><text>{{item.title}}</text></view>
								<view class="price">
									<view class="">
										<text style="font-size: 22rpx;margin-right: 13rpx;color:#FA3117;">￥</text>
										<text style="margin-right: 5rpx;color:#FA3117;">{{ item.price }}</text>元
									</view>
									<view class=""><text>已售</text>{{item.sales>10000?parseInt(item.sales/10000)+'w+':item.sales}}</view>
								</view>
							</view>
						</view>
					</view>
					<view v-if="goods.length==0" class="zanwu">暂无数据</view>
					<view v-if="goods.length>0&&data_last" class="data_last">到底了~~</view>
				</view>
				<!-- recommend -->
				<!-- <recommends :recommend="goods" class="shop_recommend"></recommends> -->
				<view class="" style="width: 690rpx;height: 50rpx;margin-bottom:40rpx;"></view>
				<!-- <view class="tab">
					<view class="tab-item" v-for="(item,index) in tab" :key="index" @click="navTo(item.url)">
						<image :src="getimg(item.img)" mode="heightFix" lazy-load></image>
						<text> {{item.text}}</text>
					</view>
				</view>  -->
			</view>
		</htmlLoading>
		<Tabbar :tabbarlist="tabbarlist" :navActive="2"></Tabbar>
	</view>
</template>

<script>
	import addressNav from '../../components/address-nav/address-nav.vue'
	import recommends from '../../components/recommends/recommends.vue'
	import api from '../../components/url.js';
	import Tabbar from '../../components/tabBar/tabBar.vue'
	// 底部  tabbar
	// import Tabbar from '../../components/tabBar/tabBar.vue'
	import service from '../../service.js';
	var that
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		components: {
			addressNav,
			recommends,
			Tabbar

		},
		data() {

			return {
				tabbarlist: [{
					txt: '访客预约',
					img: '/static_xcx/gou_03.png',
				}, {
					txt: '自然课堂',
					img: '/static_xcx/gou_05.png',
				}, {
					txt: '商城',
					img: '/static_xcx/chd_05.png',
				}, {
					txt: '我的',
					img: '/static_xcx/wode_06.png',
				}],
				title: '商城',
				//banner
				swiperImg: [
					'/static_xcx/image/shoppingMall/banner.png',
					'/static_xcx/image/shoppingMall/banner.png'
				],
				none: true,
				current: 0,
				mode: 'round',
				swiperCurrent: 0,
				dotsStyles: {
					width: 8,
					height: 8,
					bottom: 13,
					backgroundColor: 'rgba(255, 255, 255,1)',
					border: '1px rgba(0, 0, 0, .3) solid',
					selectedBackgroundColor: 'rgba(254, 206, 10, 1)',
					selectedBorder: 'none'
				},
				//type_nav
				
				datas:{},
				goods:[],
				page:1,
				data_last:false
			};
		},
		onLoad(option) {
			that = this
			that.city = option.city
			// this.amapPlugin = new amap.AMapWX({  
			// 		key: that.key  
			// });  
			
			that.onRetry()
		},
		onReachBottom() {
			that.getgoods_data()
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo','addmsg'])
		},
		methods: {
			...mapMutations(['logout', 'login','setadd']),
			onRetry(){
				that.page=1
				that.data_last=false
				that.btn_kg=0
				that.getdata()
			},
			getdata(){
				var jkurl='/shop'
				var data={}
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
						that.getgoods_data()
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
			
			getgoods_data(){
				var jkurl='/shop/goods'
				var data={
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
						var datas = res.data
						console.log(typeof datas)
				
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						if (page_now == 1) {
						
							that.goods = datas.data
						
						} else {
							if (datas.data.length == 0) {
								that.data_last = true
								return
							}
							that.data_last = false
							that.goods = that.goods.concat(datas.data)
						}
						that.page++
						console.log(that.goods)
				
					} else {
				
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
			changeSwiper(e) {
				this.current = e.detail.current;
			},
			//tab跳转
			navTo(url) {
				// console.log(url);
				uni.switchTab({
					url: url
				});
			},
		
			// toSearch(){
			// 	uni.navigateTo({
			// 		url:'/pagesA/search/search'
			// 	})
			// }

		}
	}
</script>

<style lang="scss">
	/* Tabbar组件的样式   开始 */
	/deep/.tabBar {
		background-color: #FECE0A;
	}

	/deep/.tabbartxt {
		color: #fff;
	}

	/deep/.nav {
		opacity: 0.7;
	}

	/deep/.nav_activt {
		opacity: 1;
	}

	/* Tabbar组件的样式   结束 */
	.ShoppingMall {
		padding: 0 30rpx;

		.status_title {
			font-size: 34rpx;
			font-family: PingFang;
			font-weight: bold;
		}

		.search {
			width: 690rpx;
			height: 58rpx;
			box-sizing: border-box;
			margin: 20rpx 0 28rpx 0;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.toGo {
				// width: 50%;
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: #FECE0A;
				height: 100%;
				border-radius: 29rpx;
			}

			.search-view {
				width: 83%;
				height: 100%;
				background-color: rgba(153, 153, 153, 0.3);
				border-radius: 29rpx;
				display: flex;
				justify-content: center;
				align-items: center;

				.search-icon {
					font-size: 40rpx;
				}

				.search-text {
					font-size: 24rpx;
					font-family: PingFang;
					font-weight: 400;
					color: #666666;
					line-height: 38rpx;
					margin-left: 7rpx;

				}
			}
		}

		//banner
		.banner {

			// margin-top: 15rpx;
			swiper {
				height: 280rpx;
			}

			.swiper {
				width: 690rpx;
				height: 280rpx;
				border-radius: 16rpx;
				overflow: hidden;
				position: relative;

				.swiper-item {
					width: 750rpx;
					height: 280rpx;

					image {
						width: 690rpx;
						height: 280rpx;
						display: block;
						box-sizing: border-box;
						border-radius: 6rpx;
					}
				}

			}
		}

		/deep/.recommend {
			margin-top: 107rpx;
			margin-bottom: 62rpx;

			.title {
				margin-bottom: 47rpx;
			}
		}

		.tab {
			background-color: #FECE0A;

			text {
				font-size: 20rpx;
				font-family: PingFang;
				font-weight: 500;
				color: #FA3117;
				opacity: 0.8;
			}

			.tab-item {
				opacity: 0.8;
			}

			.tab-item:nth-child(3) {
				opacity: 1;
			}
		}
	}
	.recommend {
		width: 690rpx;
		margin-top: 107rpx;
		margin-bottom: 62rpx;
		.title {
			display: flex;
			justify-content: center;
			align-items: center;
			// margin: 69rpx 0 40rpx 0;
			margin-bottom: 47rpx;
		
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
	
	/* 修改第三方组件 */
	//导航栏
	/deep/ .uni-navbar--border.data-v-6bda1a90 {
		border: none !important;
	}
</style>
