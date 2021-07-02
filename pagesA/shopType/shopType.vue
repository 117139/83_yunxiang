<template>
	<view class="shopType">
		<uni-nav-bar fixed="true" class="status_title" color="#000000" statusBar="true" :title="title"
			@clickLeft="back">
			<uni-icons slot="left" type="arrowleft" class="status-icon" size="17"></uni-icons>
		</uni-nav-bar>

		<view class="shopType-nav">
			<view class="shopType-nav-item" v-for="(item,index) in shopTypeNav" :key="index"
				:style="{color:active==index?'#FECE0A':'#333333'}"
				@click="shopTypeNavClick(index)">
				<view class="shopType-nav-item-left">
					<text>{{ item.text }}</text>
				</view>
				 <!-- :style=" -->
				<view class="shopType-nav-item-right">
					<text 
					:style="{color:active==index&&item.isPai==true?'#FECE0A':'#333333'}"
					:class="item.sortIcon?'iconfont icon-paixushang':''"
					></text>
					<text 
					:style="{color:active==index&&item.isPai==false?'#FECE0A':'#333333'}"
					:class="item.sortIcon?'iconfont icon-paixuxia':''"
					></text>
				</view>
			</view>
		</view>
		<view class="shopType-body" v-for="(item,index) in goods"  @click='jump' :data-url="'/pagesA/detail/detail?id='+item.id">
			<view class="shopType-body-item">
				<view class="shopType-body-item-left">
					<image :src="getimg(item.first_img)" mode=""></image>
				</view>
				<view class="shopType-body-item-right">
					<view class="shopType-body-item-right-first-line">
						<text class="oh2">{{item.title}}</text>
					</view>
					<view class="shopType-body-item-right-second-line">
						<view class="item" v-for="tag in item.label_arr">
							<text class="oh1">{{ tag }}</text>
						</view>
					</view>
					<view class="shopType-body-item-right-third-line">
						<view class="shopType-body-item-right-third-line-left">
							<text>￥<text>{{item.price}}</text><text>元</text></text>
						</view>
						<view class="shopType-body-item-right-third-line-right">
							<text>已售<text>{{item.sales>10000?parseInt(item.sales/10000)+'w+':item.sales}}</text></text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="goods.length==0" class="zanwu">暂无数据</view>
		<view v-if="goods.length>0&&data_last" class="data_last">到底了~~</view>
	</view>
</template>

<script>
	import api from '../../components/url.js';
	   
	// 底部  tabbar
	// import Tabbar from '../../components/tabBar/tabBar.vue'
	import service from '../../service.js';
	var that
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				searchtype:'',
				search_text:'',
				pid:'',
				title: "",
				active: 0,
				shopTypeNav: [{
						text: '默认排序',
						sortIcon: false,
						isPai:true
					},
					{
						text: '销量排序',
						sortIcon: true,
						isPai:false
					},
					{
						text: '价格排序',
						sortIcon: true,
						isPai:false
					}
				],
				shopTypeBody: [{
						img: '/static_xcx/tui.png',
						name: '青海特产风干藏牦牛肉精品肉干超干手撕牦牛肉干500g正宗麻辣',
						price: 300,
						num: 20000,
						tags: [{
								text: '新品包邮'
							},
							{
								text: '公益'
							}
						]
					},
					{
						img: '/static_xcx/tui.png',
						name: '青海特产风干藏牦牛肉精品肉干超干手撕牦牛肉干500g正宗麻辣',
						price: 300,
						num: 20000,
						tags: [{
								text: '新品包邮'
							},
							{
								text: '公益'
							}
						]
					}


				],
				goods:[],
				page:1,
				data_last:false
			};
		},
		onLoad(option) {
			that=this
			that.searchtype=option.searchtype||0
			this.title = option.text;
			if(option.searchtype==1){
				this.title =' 搜索结果'
				this.search_text =option.search
			}
			that.pid=option.id|''
			that.onRetry()
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo'])
		},
		methods: {
			...mapMutations(['logout', 'login']),
			onRetry(){
				that.page=1
				that.data_last=false
				that.btn_kg=0
				that.getgoods_data()
			},
			getgoods_data(){
				var jkurl='/shop/goods'
				var data={
					page:that.page,
					limit:20,
					search_title:that.search_text,
					order_type:that.active==0?1:that.active==1?2:3,
					order_status:that.active==0?'':that.shopTypeNav[that.active].isPai?1:2,
					pid:that.pid
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
		
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			shopTypeNavClick(index) {
				this.active = index;
				for (var i = 0; i < this.shopTypeNav.length; i++) {
					if(index == i){
						this.shopTypeNav[i].isPai = !this.shopTypeNav[i].isPai
					}else{
						this.shopTypeNav[i].isPai=false;
					}
				}
				that.onRetry()
				console.log(this.active)
			},
			/* 去详情 */
			toDetail(){
				uni.navigateTo({
					url:'/pagesA/detail/detail'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.shopType {
		box-sizing: border-box;
		padding: 0 30rpx;

		.status_title {
			font-size: 34rpx;
			font-family: PingFang;
			font-weight: bold;
		}

		

		.shopType-nav {
			width: 690rpx;
			height: 29rpx;
			display: flex;
			margin-top: 36rpx;
			justify-content: space-between;

			.shopType-nav-item {
				width: 33.3%;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 28rpx;
				font-family: PingFang;
				font-weight: bold;

				.shopType-nav-item-right {
					display: flex;
					flex-direction: column;
					align-items: center;
					margin-left: 15rpx;
				}
			}
		}

		.shopType-body {
			width: 690rpx;
			height: 256rpx;
			margin-top: 45rpx;
			box-sizing: border-box;
			padding: 29rpx 25rpx 27rpx 19rpx;
			background: #FFFFFF;
			box-shadow: 0px 10rpx 19rpx 3rpx rgba(153, 153, 153, 0.08);
			border-radius: 8rpx;
			margin-bottom:26rpx;

			.shopType-body-item {
				width: 100%;
				height: 100%;
				// background-color: #DD524D;
				display: flex;

				.shopType-body-item-left {
					width: 200rpx;
					height: 100%;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.shopType-body-item-right {
					width: 471rpx;
					height: 100%;
					// background-color: #666666;
					box-sizing: border-box;
					padding-left: 28rpx;
					padding-top: 7rpx;

					.shopType-body-item-right-first-line {
						width: 418rpx;
						height: 70rpx;
						// background-color: #79C2EF;
						font-size: 28rpx;
						font-family: PingFang;
						font-weight: bold;
						color: #333333;
						line-height: 44rpx;
						display: flex;
						align-items: center;
					}

					.shopType-body-item-right-second-line {
						width: 418rpx;
						height: 34rpx;
						margin-top: 18rpx;
						display: flex;

						.item {
							max-width: 126rpx;
							height: 100%;
							border: 1px solid #666666;
							border-radius: 8rpx;
							font-size: 22rpx;
							font-family: PingFang;
							font-weight: 400;
							color: #666666;
							line-height: 38rpx;
							display: flex;
							align-items: center;
							justify-content: center;
							margin-right: 21rpx;
							box-sizing: border-box;
							padding: 6rpx 17rpx;
						}
					}

					.shopType-body-item-right-third-line {
						width: 418rpx;
						height: 29rpx;
						margin-top: 33rpx;
						display: flex;
						justify-content: space-between;

						.shopType-body-item-right-third-line-left {
							display: flex;
							align-items: center;
							justify-content: flex-start;
							font-size: 22rpx;
							font-family: PingFang;
							font-weight: bold;
							color: #FA3117;
							line-height: 38rpx;

							text {
								text:nth-child(1) {
									font-size: 40rpx;
									font-family: DINCond;
									font-weight: bold;
									line-height: 38rpx;
									margin-left: 7rpx;
								}

								text:nth-child(2) {
									font-family: PingFang;
									font-weight: 400;
									color: #333333;
									margin-left: 10rpx;
								}
							}
						}

						.shopType-body-item-right-third-line-right {
							font-size: 22rpx;
							font-family: PingFang;
							font-weight: 400;
							color: #999999;
							line-height: 38rpx;
							display: flex;
							align-items: center;
							justify-content: flex-end;

							text {
								text:nth-child(1) {
									margin-left: 10rpx;
								}
							}
						}
					}
				}
			}
		}
	}

	.active {
		color: #FECE0A;
	}

	.icon-paixushang,
	.icon-paixuxia {
		font-size: 12rpx;
		color: #999999;
	}

	//修改第三方组件样式

	/deep/ .uni-navbar--border.data-v-6bda1a90 {
		border: none !important;
	}
</style>
