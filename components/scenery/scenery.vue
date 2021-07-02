<template>
		<view>
			<view class="menucontent"  v-for="(item, index) in shuju" :key='index'>
				<view class="">
					<view class="dis_flex aic ju_b" v-if="pagetype != 'xq'" @click='tiaozhuan' :data-url="'/pagesA/particulars/particulars?id='+item.id" :data-shifou='false'>
						<view class="dis_flex_c">
							<view class="dis_flex aic">
								<image class="mchlt_img" :src="getimg(item.p_info.img_url)" mode="aspectFit"></image>
								<text class="mchlt_txt">{{item.p_info.title}}</text>
							</view>
							<text class="mchl__text">{{item.p_info.subtitle}}</text>
						</view>
						<text class="mch_text">立即预约</text>
					</view>
					<view class="mc_txts">
						<view v-if="pagetype != 'xq'" @click='tiaozhuan' :data-url="'/pagesA/particulars/particulars?id='+item.id" :data-shifou='false'>
							<view class="mc_bgimg">
								<view class="place">
									<image class="placeimg" :src="getimg('/static_xcx/index/dw1.png')" mode="aspectFit"></image>
									<text class="placetxt">{{item.province}}{{item.city}}</text>
								</view>
								<view class="signup">
									报名中 {{item.start_time | formatDate('-')}}
								</view>
							</view>
							<image class="mct_img" :src="getimg(item.first_img)" mode="aspectFill"></image>
						</view>
						
						<view v-if="pagetype == 'xq'" style="position: relative;">
							<swiper class="swiper" @change="topSwiperTab" :current="pagenum">
								<swiper-item v-for="item,index in bannerlist" :key="index" @mouseup="aaa">
									<view class="swiper-item">
										<image class="bannerimg br8" :src="getimg(item)" mode="aspectFill"></image>
									</view>
								</swiper-item>
							</swiper>
							<view class="pageNum">
								{{pagenum+1}}/{{bannerlist.length}}
							</view>
						</view>
						
						<view class="mc_txt">
							<view class="mct_top dis_flex ju_b">
								<text class="group oh2" v-if="pagetype != 'xq'" @click='tiaozhuan' :data-url="'/pagesA/particulars/particulars?id='+item.id" :data-shifou='false'>{{item.title}}</text>
								<text class="group oh2" v-if="pagetype == 'xq'">{{item.title}}</text>
								<Heat v-if="pagetype != 'xq'"></Heat>
							</view>
							<view class="dis_flex aife">
								<Price>
									<text slot="num">{{item.price}}</text>
								</Price>
								<text class="mctc_text3" v-if="pagetype != 'xq'">起</text>
								<text class="mctc_text4" v-if="pagetype != 'xq'">{{item.start_time | formatDate('-')}}</text>
								<text class="mctc_text5" v-if="pagetype != 'xq'">{{item.open_time}}</text>
							</view>
						
							
							<view class="mct_bottom dis_flex" >
								<view class="tag" v-for="(num, index) in item.label_arr" :key='index'>
									{{num}}
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
	// 热度
	import Heat from '../heat/heat.vue'
	// 价格
	import Price from '../price/price.vue'
	
	export default {
		props:[
			'pagetype',
			"shuju"
		],
		components: {
			Heat,
			Price
		},
		data() {
			return {
				bannerlist: [
					'/static_xcx/index/banner.png',
					'/static_xcx/index/banner.png',
					'/static_xcx/index/banner.png',
				],
				pagenum: 0
			}
		},
		filters: {
			// 时间戳处理
			formatDate: function(value, spe = '/') {
				value = value * 1000
				let data = new Date(value);
				let year = data.getFullYear();
				let month = data.getMonth() + 1;
				let day = data.getDate();
				let h = data.getHours();
				let mm = data.getMinutes();
				let s = data.getSeconds();
				month = month > 10 ? month : "0" + month;
				day = day > 10 ? day : "0" + day;
				h = h > 10 ? h : "0" + h;
				mm = mm > 10 ? mm : "0" + mm;
				s = s > 10 ? s : "0" + s;
				return `${year}${spe}${month}${spe}${day}`;
			}
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
			topSwiperTab(e) {
				var that = this;
				this.pagenum = Number(e.target.current);
		   }
		}
	}
</script>

<style scoped>
	.mchlt_img {
		width: 40rpx;
		height: 40rpx;
	}
	
	.mchlt_txt {
		margin-left: 12rpx;
		font-size: 32rpx;
		font-weight: bold;
		color: #333333;
	}
	
	.mchl__text {
		margin-top: 11rpx;
		font-size: 22rpx;
		font-weight: bold;
		color: #999999;
	}
	
	.mch_text {
		font-size: 24rpx;
		font-weight: bold;
		color: #79C2EF;
	}
	
	.mc_txts {
		margin-top: 20rpx;
		box-shadow: 0rpx 10rpx 19rpx 3rpx rgba(153, 153, 153, 0.08);
		border-radius: 8rpx;
		position: relative;
		padding-bottom: 20rpx;
		overflow: hidden;
	}
	
	.mct_img {
		width: 100%;
		height: 337rpx;
	}
	
	.mc_txt{
		padding: 0 19rpx;
	}
	
	.mc_bgimg{
		width: 100%;
		height: 337rpx;
		position: absolute;
	}
	.place{
		margin: 20rpx 0 0 17rpx;
	}
	.placeimg{
		width: 30rpx;
		height: 30rpx;
		vertical-align: middle;
		margin-right: 6rpx;
	}
	.placetxt{
		font-size: 24rpx;
		font-weight: 400;
		color: #FFFFFF;
	}
	.signup{
		background: #1961B6;
		opacity: 0.8;
		border-radius: 50rpx 0rpx 0rpx 50rpx;
		position: absolute;
		bottom: 22rpx;
		right: 0;
		
		font-size: 24rpx;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 36rpx;
		padding: 7rpx 17rpx 6rpx 19rpx;
	}
	
	
	.mct_top {
		margin-top: 25rpx;
		align-content: center;
	}
	
	.mct_top>.group {
		width: 469rpx;
		font-size: 30rpx;
		font-weight: bold;
		color: #333333;
		flex-shrink: 0;
	}
	
	.price{
		margin-bottom: 0;
	}
	
	.mctc_text3,.mctc_text4,.mctc_text5 {
		display: inline-block;
		font-size: 22rpx;
		font-weight: 400;
		color: #333333;
		padding-bottom: 4rpx;
	}
	
	.mctc_text4 {
		margin-left: 42rpx;
	}
	
	.mctc_text5 {
		margin-left: 35rpx;
	}
	
	.mct_bottom{
		margin-top: 20rpx;
	}
	
	.tag {
		padding: 8rpx 6rpx;
		border: 1px solid #666666;
		border-radius: 8rpx;
		font-size: 22rpx;
		font-weight: 400;
		color: #666666;
		margin-right: 25rpx;
	}
	
	
	.scoreimg{
		width: 22rpx;
		height: 21rpx;
		vertical-align: middle;
	}
	.scoretxt{
		font-size: 22rpx;
		font-weight: bold;
		color: #1961B6;
	}
	
	
	
	.texts{
		color: #333333;
		font-weight: 400;
		font-size: 24rpx;
	}
	.kfsj {
		font-weight: bold;
		margin-right: 23rpx;
	}
	.tzjr{
		margin-left: 20rpx;
	}
	.gfxz {
		color: #666666;
		font-size: 22rpx;
	}
	.ingfxz{
		width: 30rpx;
		height: 30rpx;
		vertical-align: middle;
		margin-left: 9rpx;
	}
	
	.mapbox{
		margin-top: 9rpx;
	}
	.maptxt{
		width: 540rpx;
		height: 30rpx;
		font-size: 24rpx;
		font-weight: 400;
		color: #333333;
		padding-top: 15rpx;
	}
	.mapimg{
		width: 29rpx;
		height: 30rpx;
	}
	.maptxt2{
		font-size: 20rpx;
		font-weight: 400;
		color: #333333;
		margin-top: 4rpx;
	}
	.swiper{
		height: 336rpx;
	}
	.bannerimg{
		width: 100%;
		height: 336rpx;
	}
	.pageNum{
		background: #000000;
		opacity: 0.5;
		border-radius: 50rpx;
		font-size: 20rpx;
		font-weight: 400;
		color: #FFFFFF;
		padding: 5rpx 13rpx;
		position: absolute;
		bottom: 30rpx;
		right: 30rpx;
	}
</style>
