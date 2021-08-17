<template>
	<view class="box">
		<htmlLoading ref="htmlLoading" @Retry='getdata' :bj_show="false">
		<view class="search">
			<!-- <Search :searchbtn="true" :searchtext="searchtext"></Search> -->
			<image class="s_img" :src="getimg('/static_xcx/index/ss.png')" mode="aspectFit"></image>
			<input class="s_input" type="text" placeholder="输入搜索内容" v-model="searchval" @confirm="soud" />
			<!-- <view class="searchcontent" v-show="show"> -->
			<!-- <text class="s_txt">输入搜索内容</text> -->
		</view>
		<view class="searchbox findbox">
			<text>猜你想找</text>
			<view class="finds dis_flex">
				<text class="find" v-for="item,index in findlist" :key="index" @click="findbtn(index,item)">{{item}}</text>
			</view>
		</view>
		<view class="searchbox recommendbox" v-if="searchval=='' && searchs.length==0">
			<text>云享推荐</text>
			<view class="recommend dis_flex" v-for="(item,index) in shuju" :key='index' @click='tiaozhuan' :data-url="'/pagesA/particulars/particulars?id='+item.id" :data-shifou='false'>

				<image :src="getimg(item.first_img)" mode="aspectFill" v-show="!isgoods"></image>
				<image :src="getimg('/static_xcx/index/goods.png')" mode="aspectFill" v-show="isgoods"></image>
				<view class="recommendR">
					<text class="oh2">{{item.title}}</text>
					<view class="heat pt10" v-show="!isgoods">
						<Heat></Heat>
					</view>
					<view class="heat" v-show="isgoods" style="height: 40rpx;"></view>
					<view class="price dis_flex aic  ju_b pt20">
						<view class="g_price">
							<text>￥</text>
							<text class="big">
								{{item.price}}
							</text>
							<text class="color_h" v-show="yyxq != 'yyxq'">元</text>
						</view>
						<view class="">
							<view class="heat" v-show="isgoods" style="height: 40rpx;"></view>
							<view class="pr_dw" v-show="!isgoods">
								<image :src="getimg('/static_xcx/index/dw2.png')" mode="aspectFill"></image>
								<text>{{item.province}}{{item.city}}</text>
							</view>
						</view>

					</view>
				</view>
			</view>
		</view>
		<view class="searchbox mt10"v-if="searchs.length>0">
			<text class="pb12">搜索列表</text>
			<view class=" scenerybox">
			<view class="pb20" v-for="(item, index) in searchs" :key='index'>
				<view class="dis_flex aic ju_b" @click='tiaozhuan'
					:data-url="'/pagesA/particulars/particulars?id='+item.id" :data-shifou='false'>
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
					<view @click='tiaozhuan' :data-url="'/pagesA/particulars/particulars?id='+item.id"
						:data-shifou='false'>
						<view class="mc_bgimg">
							<view class="place">
								<image class="placeimg" :src="getimg('/static_xcx/index/dw1.png')" mode="aspectFit">
								</image>
								<text class="placetxt">{{item.province}}{{item.city}}</text>
							</view>
							<view class="signup">
								报名中 {{item.start_time | formatDate('-')}}
							</view>
						</view>
						<image class="mct_img" :src="getimg(item.first_img)" mode="aspectFill"></image>
					</view>
			
			
			
					<view class="mc_txt">
						<view class="mct_top dis_flex ju_b">
							<text class="group oh2" @click='tiaozhuan'
								:data-url="'/pagesA/particulars/particulars?id='+item.id"
								:data-shifou='false'>{{item.title}}</text>
							<Heat></Heat>
			
						</view>
						<view class="dis_flex aife">
							<view class="g_price">
								<text>￥</text>
								<text class="big">
									<text name="num">{{item.price}}</text>
								</text>
								<text class="color_h" v-show="yyxq != 'yyxq'">元</text>
							</view>
							<text class="mctc_text3">起</text>
							<text class="mctc_text4">{{item.start_time | formatDate('-')}}</text>
							<text class="mctc_text5">{{item.open_time}}</text>
						</view>
			
			
			
						<view class="mct_bottom dis_flex">
							<view class="tag" v-for="(num, index) in item.label_arr" :key='index'>
								{{num}}
							</view>
						</view>
					</view>
				</view>
			</view>
			
				<view v-if="searchs.length==0" class="zanwu">暂无数据</view>
				<view v-if="searchs.length>0&&data_last" class="data_last">到底了~~</view>
		</view>
		</view>
		<view v-if="searchval!='' &&searchs.length==''" class="zanwu">暂无数据</view>
		</htmlLoading>
	</view>
</template>

<script>
	import api from '../../components/url.js';
	// 搜索
	import Search from '../searchs/searchs.vue'
	// box
	import service from '../../service.js';
	import Recommend from "../../components/recommend/recommend.vue"
	import Heat from "../../components/heat/heat.vue"
	import Scenery from "../../components/scenery/scenery.vue"
	var that
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		components: {
			Search,
			Recommend,
			Heat,
			Scenery
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
		data() {
			return {
				findlist: [

				],
				searchtext: '',
				shuju: '',
				searchval: '',
				page: 1,
				searchs: [],
				data_last: false,
			}
		},
		onLoad() {
			that = this
			that.getdata()
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo'])
		},
		onReady() {
			that.page = 1
			that.data_last = false
		},

		onReachBottom() {
			that.soud()
		},
		methods: {
			...mapMutations(['logout', 'login']),
			getimg(img) {
				return api.getimg(img)
			},
			tiaozhuan(e) {
				return api.tiaozhuan(e)
			},
			soud() {
				// console.log(e)
				 // that.searchval=e.detail.value
				console.log(that.searchval)
				var data = {
					page: that.page,
					limit: 10,
					// date: this.curDate,
					// spot_id: that.array[that.indexs].id,
					search: that.searchval
				}
				var page_now = that.page
				service.P_post('info/activity', data).then(res => {
					// console.log(res)
					if (res.code == 1) {
						var datas = res.data
						// if (page_now == 1) {
							that.searchs = res.data.data
							console.log(that.searchs,'sss')
							// that.shuju = datas.data
							

						// } else {
							// if (datas.data.length == 0) {
								// that.data_last = true
								// return
							// }
							// that.data_last = false
							// that.searchs = that.searchs.concat(datas.data)
							// console.log(that.searchs,'aaa')
						// }
						// that.page++
						// console.log(that.data_last)
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

			getdata() {
				var jkurl = 'search_index'
				var data = {
					type: 1
				}
				service.P_post(jkurl, data).then(res => {
					console.log(res)
					if (res.code == 1) {
						that.$refs.htmlLoading.htmlReset_fuc(0)
						that.findlist = res.data.like
						that.shuju = res.data.list
						// console.log(that.shuju)
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
		
			findbtn(index,item) {
				this.searchtext = this.findlist[index]
				that.searchval=item
				that.soud()
			}
		}
	}
</script>

<style>
	.boxs {
		padding: 0 30rpx;
	}

	.scenerybox {
		margin: 34rpx 0 73rpx 0;
	}

	.box {
		padding: 0 30rpx 98rpx;
	}

	.s_input {
		margin-top: -35rpx;
		font-size: 24rpx;
		padding-left: 70rpx;
		box-sizing: border-box;
	}

	.s_img {
		width: 40rpx;
		height: 40rpx;
		vertical-align: middle;
		margin-left: 20rpx;
	}

	.search {
		width: 100%;
		height: 58rpx;
		background: rgba(153, 153, 153, 0.3);
		border-radius: 29rpx;
		margin-top: 20rpx;
	}

	.searchbox>text {
		font-size: 24rpx;
		font-weight: 400;
		color: #666666;
	}

	.findbox {
		margin-top: 56rpx;
	}

	.finds {
		width: calc(100% + 16rpx);
		flex-wrap: wrap;
	}

	.find {
		padding: 19rpx 24rpx;
		background: rgba(153, 153, 153, 0.2);
		border-radius: 8rpx;
		font-size: 22rpx;
		font-family: PingFang;
		font-weight: 400;
		color: #333333;
		margin-top: 26rpx;
		margin-right: 16rpx;
	}

	.recommendbox {
		margin-top: 56rpx;
	}

	.recommend {
		padding: 30rpx 19rpx;
		width: 100%;
		background: #FFFFFF;
		box-shadow: 0rpx 10rpx 19rpx 3rpx rgba(153, 153, 153, 0.08);
		border-radius: 8rpx;
		margin-top: 26rpx;
	}

	.recommend>image {
		width: 200rpx;
		height: 200rpx;
		flex-shrink: 0;
	}

	.recommendR {
		margin-left: 27rpx;
	}

	.recommendR>text {
		font-size: 28rpx;
		font-weight: bold;
		color: #333333;
	}

	.heat {
		margin-top: 5rpx;
	}

	.pr_dw {
		padding-bottom: 4rpx;
	}

	.pr_dw>image {
		width: 17rpx;
		height: 19rpx;
		vertical-align: middle;
	}

	.pr_dw>text {
		font-size: 22rpx;
		font-weight: 400;
		color: #666666;
		margin-left: 7rpx;
	}

	.g_price {
		font-size: 22rpx;
		font-weight: bold;
		color: #1961B6;
	}

	.price {
		width: 420rpx;
	}

	.big {
		font-size: 40rpx;
	}

	.color_h {
		padding-left: 5rpx;
		font-weight: 400;
		color: #333333;
	}
	.recommend{
		padding: 30rpx 19rpx;
		width: 100%;
		background: #FFFFFF;
		box-shadow: 0rpx 10rpx 19rpx 3rpx rgba(153, 153, 153, 0.08);
		border-radius: 8rpx;
		margin-top: 26rpx;
	}
	.recommend>image{
		width: 200rpx;
		height: 200rpx;
		flex-shrink: 0;
	}
	.recommendR{
		margin-left: 27rpx;
	}
	.recommendR>text{
		font-size: 28rpx;
		font-weight: bold;
		color: #333333;
	}
	.heat{
		margin-top: 5rpx;
	}
	.pr_dw{
		padding-bottom: 4rpx;
	}
	.pr_dw>image{
		width: 17rpx;
		height: 19rpx;
		vertical-align: middle;
	}
	.pr_dw>text{
		font-size: 22rpx;
		font-weight: 400;
		color: #666666;
		margin-left: 7rpx;
	}
	.g_price{
		font-size: 22rpx;
		font-weight: bold;
		color: #1961B6;
	}
	.price {
		    width: 420rpx;
	}
	.big{
		font-size: 40rpx;
	}
	.color_h{
		padding-left: 5rpx;
		font-weight: 400;
		color: #333333;
	}
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
	.g_price {
		font-size: 22rpx;
		font-weight: bold;
		color: #1961B6;
	}
	
	.big {
		font-size: 40rpx;
	}
</style>
