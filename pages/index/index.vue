<template>
	<view>
		<uni-nav-bar fixed="true" title="云享自然· 国家公园生态体验" color="#79C2EF" class="status_title" statusBar="true"></uni-nav-bar>
		<htmlLoading ref="htmlLoading" @Retry='onRetry' :bj_show="false">
		
		
		<!-- 外侧 -->
		<view class="box"> 
			
			
			
			
			<!-- 头部 -->
			<view class="header dis_flex aic ju_b">
				<!-- 定位 -->
				<!-- <view class="location dis_flex aic" @click='jump' :data-url="'/pagesA/city/index?city='+city" :data-shifou='false'>
					<image :src="getimg('/static_xcx/index/dw2.png')" mode="aspectFit"></image>
					<text class="oh1" style="width: 3em;">{{city}}</text>
				</view> -->
				<view class="location dis_flex aic" @tap="getdinwei">
					<image :src="getimg('/static_xcx/index/dw2.png')" mode="aspectFit"></image>
					<text class="oh1" style="width: 3em;">{{addmsg.regeocodeData.addressComponent.city}}</text>
				</view>
				<!-- 搜索 -->
				<view class="flex_1" @click='jump' data-url='/pagesA/search/search' :data-shifou='false'>
					<view class="search dis_flex aic ju_c">
						<input class="s_input" type="text" disabled />
						<view class="searchcontent">
							<image class="s_img" :src="getimg('/static_xcx/index/ss.png')" mode="aspectFit"></image>
							<text class="s_txt">输入搜索内容</text>
						</view>
					</view>
				</view>
			</view>
			  
			<!-- 轮播 -->
			<view class="banner">
				<swiper class="swiper"
					indicator-dots
					indicator-color="rgba(255, 255, 255, 1.0)"
					indicator-active-color="#79C2EF"
					autoplay
					 circular
				>
					<swiper-item v-for="(item,index) in datas.banner">
						<view class="swiper-item uni-bg-red">
							<image :src="getimg(item.img_url)" mode="aspectFill" class="br5"></image>
						</view>
					</swiper-item>
				</swiper>
			</view>
			
			<!-- 轮播下的小菜单 -->
			<view class="menus dis_flex ">
				<view class="menu dis_flex_c aic" v-for="(item,index) in datas.spot" :key="index"  @click='jump' :data-url="'/pagesA/date/date?index='+index" :data-shifou='false'>
					<image :src="getimg(item.img_url)" mode="aspectFit"></image>
					<text class="oh2">{{item.title}}</text>
				</view>
			</view>
			<view class="menucontents">
				<!-- <Scenery v-for="(item,index) in datas.activity" :shuju="item" :key="index"></Scenery> -->
				<Scenery  :shuju="datas.activity" :key="index"></Scenery>
			</view>
			<!-- 特色商品推荐 -->
			<view class="goodtit">
				<view class="g_tit dis_flex ju_c aic">
					<image :src="getimg('/static_xcx/index/gg.png')" mode="aspectFit"></image>
					<text>特色商品推荐</text>
					<image :src="getimg('/static_xcx/index/gg.png')" mode="aspectFit"></image>
				</view>
				<image v-if="datas.shop_img" :src="getimg(datas.shop_img.index_img)" mode="aspectFill"></image>
				<!-- <view class="imagebox">
					<view class="dis_flex">
						<view class="tsss">青海特色</view>
						<view class="tstj">推荐</view>
					</view>
					<view class="tsjs oh3">
						青海省的特产有：旱獭皮，黑紫羔皮，藏刀，冬虫夏草，贝母，鹿茸，沙果，雪莲，柴杞（柴达木枸杞）青海省的特产有：旱獭皮，黑紫羔皮，藏刀，冬虫夏草，贝母，鹿茸，沙果，雪莲，柴杞（柴达木枸杞）
						青海省的特产有：旱獭皮，黑紫羔皮，藏刀，冬虫夏草，贝母，鹿茸，沙果，雪莲，柴杞（柴达木枸杞），青稞酒，羌活，西宁大黄，蕨麻，黑枸杞，红景天，秦艽等。
					</view>
				</view> -->
			</view>
			<view class="heatgoods dis_flex ju_b">
				<view class="goods dis_flex_c ju_b" v-for="(item,index) in goods" :key="index" @click='jump' :data-url="'/pagesA/detail/detail?id='+item.id" :data-shifou='false'>
					<image :src="getimg(item.first_img)" mode="aspectFill"></image>
					<text class="oh1">{{item.title}}</text>
					<view class="goodsprice dis_flex aife ju_b">
						<Price>
							<text slot="num">{{item.price}}</text>
						</Price>
						<text>已售 {{item.sales}}</text>
					</view>
				</view>
				<view v-if="goods.length==0" class="zanwu">暂无数据</view>
				<view v-if="goods.length>0&&data_last" class="data_last">到底了~~</view>
			</view>
			
		</view>
			
		</htmlLoading>
		<view class="html_bottom"></view>	
		<Tabbar :tabbarlist="tabbarlist" :navActive="0"></Tabbar>
			
	</view>
</template>

<script> 
	// 底部导航
	import Tabbar from '../../components/tabBar/tabBar.vue'
	// 景点
	import Scenery from '../../components/scenery/scenery.vue'
	// 搜索
	// import Search from '@/pagesA/searchs/searchs.vue'
	// 价格
	import Price from '../../components/price/price.vue'  
	import api from '../../components/url.js';
	import amap from '../../common/amap-wx.js'; 
	import service from '../../service.js';
	var that
	import {
		mapState,
		mapMutations
	} from 'vuex'
	var gd_key= '2795d92b80135431505e618d657ce87f'
	export default {
		components: {
			Tabbar,
			Scenery,
			// Search,
			Price
		},
		onShareAppMessage() {
		
		},
		
		data() {
			return {
				amapPlugin: null,  
				
				addressName: '',  
				weather: {  
						hasData: false,  
						data: []  
				},
				
				city: '北京',
				tabbarlist:[
					{
						txt: '访客预约',
						img: '/static_xcx/index/nav1.png',
					},{
						txt: '自然课堂',
						img: '/static_xcx/index/nav2.png',
					},{
						txt: '商城',
						img: '/static_xcx/index/nav3.png',
					},{
						txt: '我的',
						img: '/static_xcx/index/nav5.png',
					}
				],
				datas:'',
				shu:[{},{}],
				menulist: ['三江源国家公园', '祁连山国家公园', '三江源国家公园', '祁连山国家公园'],
				goods:[],
				page:1,
				data_last:false
			}
		},
		onLoad(option) {
			that = this
			that.city = option.city
			// this.amapPlugin = new amap.AMapWX({  
			// 		key: that.key  
			// });  
			
			that.onRetry()
		},
		onReady() {
			
		},
		onShow() {
			
		},
		onReachBottom() {
			that.getgoods_data()
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo','addmsg'])
		},
		methods: {
			...mapMutations(['logout', 'login','setadd']),
			getdinwei(){
				uni.showLoading({
					mask:true,
					title:'正在获取定位'
				})
				var myAmapFun = new amap.AMapWX({ key: gd_key });
				myAmapFun.getRegeo({
						success: (data) => {  
							uni.hideLoading()
								console.log(data)  
								// that.addressName = data[0].name;  
								// that.city = data[0].name;  
								// uni.hideLoading();  
								that.setadd(data[0])
						},
						fail: (data) => {   
								uni.hideLoading()
								console.log(data)  
								// uni.hideLoading();  
						}
				}); 
			},
			onRetry(){
				that.page=1
				that.data_last=false
				that.btn_kg=0
				that.getdata()
			},
			getdata(){
				var jkurl=service.IPurl
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
				var jkurl='/index_goods'
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
				return api.getimg(img)
			},
			jump(e) {
				return service.jump(e)
			
			},
			
		}
	}
</script>

<style scoped>
	
	/deep/.uni-nav-bar-text{
	  width: 700rpx;
	  /* text-align: center; */
	 }
	
	
	
	.status_title {
		font-size: 34rpx;
		font-weight: bold;
	}
	
	
	.search {
		position: relative;
	}
	
	.s_input {
		width: 100%;
		height: 58rpx;
		background: rgba(153, 153, 153, 0.3);
		border-radius: 29rpx;
		font-size: 24rpx;
		text-align: center;
	}
	
	/* 搜索图片和文字  开始 */
	.searchcontent {
		position: absolute;
	}
	
	.s_img {
		width: 40rpx;
		height: 40rpx;
		vertical-align: middle;
	}
	
	.s_txt {
		font-size: 24rpx;
		font-weight: 400;
		color: #666666;
	}
	
	
	
	
	
	
	
	
	.tsjs{
	  font-size: 22rpx;
	  font-weight: 400;
	  color: #FFFFFF;
	  line-height: 34rpx;
	  padding-top: 20rpx;
	 }
	 .tstj{
	  font-size: 22rpx;
	  font-weight: 400;
	  color: #FFFFFF;
	  background: #1961B6;
	  border-radius: 8rpx;
	  padding: 6rpx 13rpx;
	  margin-left: 24rpx;
	 }
	 .tsss{
	  font-size: 32rpx;
	  font-weight: bold;
	  color: #FFFFFF;
	 }
	/* 头部  开始 */
	.header {
		margin-top: 20rpx;
	}
	
	/* 定位  开始 */
	.location>image {
		width: 40rpx;
		height: 40rpx;
		vertical-align: middle;
	}
	
	.location>text {
		font-size: 24rpx;
		font-weight: 400;
		color: #333333;
		margin-right: 8upx;
	}
	
	/* 定位  结束 */
	/* 头部  结束 */
	
	
	
	/* 轮播  开始 */
	.banner {
		margin-top: 28rpx;
	}
	
	.swiper{
		width: 100%;
		height: 280rpx;
	}
	
	.banner image {
		width: 100%;
		height: 280rpx;
	}
	
	/* 轮播  结束 */
	
	
	
	
	
	/* 轮播下的小菜单  开始 */
	.menus {
		margin-top: 43rpx;
	}
	
	.menu{
		width: 25%;
	}
	.menu>image {
		width: 80rpx;
		height: 80rpx;
		border-radius: 100%;
	}
	
	.menu>text {
		margin-top: 26rpx;
		width: 118rpx;
		text-align: center;
		font-size: 24rpx;
		font-weight: 400;
		color: #333333;
		line-height: 38rpx;
	}
	
	/* 轮播下的小菜单  结束 */
	
	
	
	.menucontents{
		margin-top: 60rpx;
	}
	
	
	
	.goodtit{
		margin-top: 70rpx;
		position: relative;
	}
	
	.goodtit>image{
		width: 100%;
		height: 260rpx;
	}
	.goodtit>.imagebox{
		width: 100%;
		height: 260rpx;
		position: absolute;
		bottom: 8rpx;
		padding: 50rpx 53rpx;
	}
	
	.g_tit{
		margin-bottom: 44rpx;
	}
	.g_tit>image {
		width: 52rpx;
		height: 58rpx;
	}
	
	
	.g_tit>text{
		margin: 0 32rpx;
		font-size: 32rpx;
		font-weight: bold;
		color: #333333;
	}
	
	.heatgoods{
		flex-wrap: wrap;
		margin-bottom: 10rpx;
	}
	
	.goods{
		width: 330rpx;
		margin-top: 38rpx;
	}
	
	.goods>image{
		width: 100%;
		height: 400rpx;
	}
	
	.goods>text{
		width: 100%;
		font-size: 28rpx;
		font-weight: bold;
		color: #333333;
		margin-top: 33rpx;
	}
	
	.goodsprice{
		margin-top: 23rpx;
	}
	
	.goodsprice>text{
		font-size: 22rpx;
		font-weight: 400;
		color: #999999;
		padding-bottom: 4rpx;
	}
	
	
	
	
	
	
	.box{
		padding: 0 30rpx 20rpx;
		
	}
	.html_bottom{
		width: 100%;
		background: rgba(0,0,0,0);
		height:  calc(constant(safe-area-inset-bottom) + 60px);
		height:  calc(env(safe-area-inset-bottom) + 60px);
	}
	/* Tabbar组件的样式   开始 */
	/deep/.tabBar{
		background-color: #79C2EF;
	}
	/* /deep/.tabbartxt{
		color: #fff;
	}
	/deep/.nav{
		opacity: 0.7;
	}
	/deep/.nav_activt{
		opacity: 1;
	} */
	/* Tabbar组件的样式   结束 */
	
	/deep/.menucontent{
		margin-bottom: 45rpx;
	}
	/deep/.search {
		max-width: 580rpx;
	}
</style>
