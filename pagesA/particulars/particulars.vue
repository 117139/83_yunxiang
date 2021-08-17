<template>
	<view>
		<view class="box ">
			<!-- <Scenery :pagetype="'xq'" :shuju="shuju"></Scenery> -->
			<view style="position: relative;">
				<swiper class="swiper" @change="topSwiperTab" :current="pagenum">
					<swiper-item v-for="(banner,index ) in shuju.bannerArr" :key="index" @mouseup="aaa">
						<view class="swiper-item">
							<image class="bannerimg br8" :src="getimg_fuc(banner)" mode="aspectFill"></image>
						</view>
					</swiper-item>
				</swiper>
				<view class="pageNum">
					{{pagenum+1}}/{{shuju.bannerArr.length}}
				</view>
			</view>

			<view class="mc_txts pl15 pr15">
				<view class="mct_top dis_flex ju_b">
					<text class="group oh2" >{{shuju.title}}</text>
					<!-- <text class="group oh2" >111</text> -->
					<!-- <Heat ></Heat> -->
					<view class="score">
						<image class="scoreimg" :src="getimg_fuc('/static_xcx/index/xxxxx.png')" mode="aspectFit">
						</image>
						<text class="scoretxt">4.0</text>
					</view>
				</view>
				<view class="dis_flex aife">
					<view class="g_price">
						<text>￥</text>
						<text class="big">
							<text name="num">{{shuju.price}}</text>
						</text>
						<text class="color_h" v-show="yyxq != 'yyxq'">元</text>
					</view>
				</view>

				<view class="dis_flex ju_b">
					<view>
						<text class="texts kfsj">开放时间</text>
						<text class="texts">{{shuju.open_time}}</text>
						<text class="texts tzjr">17:00停止进入</text>
					</view>
					<view>
						<text class="texts gfxz" @click='tiaozhuan'
							:data-url="'../xuzhi/xuzhi?id='+1+'&shu='+shuju.official_notice"
							:data-shifou='true'>官方须知</text>
						<image class="ingfxz" :src="getimg_fuc('/static_xcx/index/into.png')" mode="aspectFit"></image>
					</view>
				</view>

				<view class="mct_bottom dis_flex">
					<text class="tag " v-for="(num, index) in shuju.label_arr" :key='index'>
						{{num}}
					</text>
				</view>
				<!-- v-html="get_fwb(shuju.content)" -->
				<view class="dis_flex ju_b mapbox">
					<view class="maptxt ">{{shuju.province}}{{shuju.city}}{{shuju.county}}</view>
					<view class="dis_flex_c aic" @tap.stop="daohang(shuju)">
						<image class="mapimg" :src="getimg_fuc('/static_xcx/index/map.png')" mode="aspectFit"></image>
						<text class="maptxt2">地图</text>
					</view>
				</view>

			</view>
			<view class="signup dis_flex ju_b">
				<view class="dis_flex aic">
					<view class="signuping">报名中</view>
					<view class="stopsignup">报名截止时间：{{shuju.enlist_times}} </view>
				</view>
				<view class="dis_flex aic" @click='tiaozhuan'
					:data-url="'../xuzhi/xuzhi?id='+2+'&shu='+shuju.buy_notice" :data-shifou='true'>
					<view class="gpxz">购票须知</view>
					<image class="intoimg" :src="getimg_fuc('/static_xcx/index/into.png')" mode="aspectFit"></image>
				</view>
			</view>

			<view>
				<image class="xqimg br8" :src="getimg_fuc(shuju.img)" mode="aspectFill"></image>
			</view>

			<view class="bottombox">
				<view class="tabbox dis_flex ju_a">
					<view class="tabs dis_flex_c ju_b aic" v-for="(lost,index) in tablist" :key="index"
						@click="activetabnum = index" :class="{activetabs: index == activetabnum}">
						<view>{{lost}}</view>
						<view class="tabstyle" v-show="index == activetabnum"></view>
					</view>
				</view>

				<view v-show="activetabnum == 0">
					<view class="fs11 c6 pt10" v-html="get_fwb(shuju.content)">

					</view>
					<!-- 
					<view v-for="item,index in shu" :key="index">
						<view class="tabc_txt">三江源国家公园,位于中国的西部,青藏高原的腹地,青海省南部,包括长江源、黄河源、澜沧江源3个园区总面积为12.31万平方千米.</view>
						<image class="tabc_img" :src="getimg_fuc('/static_xcx/index/fjt.png')" mode="aspectFill"></image>
					</view>
					
					<view v-for="item,index in shu" :key="index">
						<view class="daytit dis_flex" :class="{daytit1:index == 0}">
							<view class="daynum">01</view>
							<view class="day">day</view>
							<view class="daytxt">● 北京出发，前往青海</view>
						</view>
						<view class="daycontent">15:00抵达锡林郭勒草原人家度假村，办理入住，开营仪式+破冰，介绍周边生态环境，时间充裕可在酒店周边探索自然</view>
						<view v-for="item2,index2 in shu" :key="index">
							<image class="dayimg" :src="getimg_fuc('/static_xcx/index/fjt.png')" mode="aspectFill"></image>
							<view class="dayimgcon">航拍黄河源河曲</view>
						</view>
					</view>
					
					<view class="reminder" v-for="item,index in shu" :key="index"
					:class="{reminder1: index == 0}">
						<view class="remindertit">费用: 5000元/人</view>
						<view class="remindertxt">费用包括:</view>
						<view class="remindertxt">住宿:全程3晚住宿房费</view>
						<view class="remindertxt">餐饮:活动期间的饮食、饮水费用，当地所有交通费用</view>
						<view class="remindertxt">场地:活动场地租</view>
					</view> -->
				</view>
				<view v-show="activetabnum == 1" class="fs11 c6" v-for="arr,index in shuju.schedule_arr" :key="index">
					<view class="daytit dis_flex aic pb10 " :class="{daytit1:index == 0}">
						<view class="daynum">{{arr.num}}</view>
						<view class="day">day</view>
						<view class="daytxt">● {{arr.title}}</view>
					</view>
					<view class="" v-html="get_fwb(arr.content)">

					</view>
				</view>
				<view v-show="activetabnum == 2" class="pt20 fs11 c6" v-for="arr,index in shuju.more_content_arr"
					:key="index">
					<text> {{arr.content}}</text>
				</view>
			</view>
		</view>

		<view class="ljyybox">
			<view class="aaaaaa dis_flex aic ju_b">
				<view class="dis_flex_c" @click='tiaozhuan' data-url='../jubao/jubao' :data-shifou='true'>
					<image class="subscribeimg" :src="getimg_fuc('/static_xcx/index/jb.png')" mode="aspectFit"></image>
					<text class="subscribetxt">举报</text>
				</view>
				<view class="dis_flex_c" style="position: relative;">
						<button type="default" open-type="share" :data-id="item.id" style="position: absolute;top: 0;opacity: 0;width: 100%;height: 100%;"></button>
					<image class="subscribeimg" :src="getimg_fuc('/static_xcx/index/fx1.png')" mode="aspectFit"></image>
					<text class="subscribetxt">分享</text>
				</view>
				<view class="" @click="shoucang">

					<!-- <image class="subscribeimg" :src="getimg_fuc('/static_xcx/index/sc1.png')" mode="aspectFit"></image> -->

					<view class="dis_flex_c aic" v-if="user_shou==2">
						<text class="iconfont icon-shoucang fs18 "></text>
						<text class="subscribetxt">收藏</text>
					</view>
					<view class="dis_flex_c aic" v-if="user_shou==1">
						<text class="icon-shoucang1 fs18 iconfont" style="color: #79C2EF;"></text>
						<text class="subscribetxt">已收藏</text>
					</view>
				</view>
				<view class="ljyy" @click='tiaozhuan' :data-url="'../arrange/arrange?id='+id" :data-shifou='false'>
					立即预约
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	import api from '../../components/url.js';
	import service from '../../service.js';
	import Price from '../../components/price/price.vue'
	// 底部  tabbar
	// import Tabbar from '../../components/tabBar/tabBar.vue'
	var that
	var tx_key = 'OUNBZ-TBSCQ-TT555-G5B75-M6MLZ-TWBSI'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import Scenery from "../../components/scenery/scenery.vue"
	export default {
		components: {
			Scenery,
			Price
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
				shuju: [],

				id: '',
				tablist: [
					'活动介绍',
					'日程安排',
					'更多内容',
				],
				bannerlist: [
					'/static_xcx/index/banner.png',
					'/static_xcx/index/banner.png',
					'/static_xcx/index/banner.png',
				],
				activetabnum: 0,
				shu: [{},
					{}
				],
				pagenum: 0,
				user_shou: 1,
			}
		},
		onLoad(option) {
			that = this
			console.log(option)
			that.id = option.id
			that.getdatas()
		},
		onReady() {

		},
		onShareAppMessage() {
			if (res.from === 'button') {
			
					return {
						title: '51代言',
						path: '/pagesA/particulars/particulars?id=' + that.id,
						success: function(res) {
							console.log('成功', res)
						}
					}
				
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo'])
		},
		methods: {
			...mapMutations(['logout', 'login']),
			daohang: function(item) {
				let that = this
				let plugin = requirePlugin('routePlan');

				let key = tx_key; //使用在腾讯位置服务申请的key
				let referer = item.title; //调用插件的app的名称
				var latitude = item.lat || 31.298886 //纬度
				var longitude = item.lng || 120.58531600000003 //经度
				let endPoint = JSON.stringify({ //终点
					'name': referer,
					'latitude': parseFloat(latitude),
					'longitude': parseFloat(longitude)
				});
				console.log(endPoint)
				wx.navigateTo({
					url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' +
						endPoint + '&navigation=1'
				});

			},
			getimg_fuc(img) {
				return api.getimg(img)
			},
			tiaozhuan(e) {
				return api.tiaozhuan(e)

			},
			shoucang() {
				var data = {
					cid: that.shuju.id,
					status: 2
				}
				service.P_post('shop/collection', data).then(res => {
					console.log(res)
					if (res.code == 1) {
						// uni.showToast({
						// 	icon: 'none',
						// 	title: '收藏成功'
						// })
						// that.user_shou = 1
						that.getdatas()
						// that.getdatas()
						// if (that.user_shou == 2) {
						// 	uni.showToast({
						// 		icon: 'none',
						// 		title: '收藏成功'
						// 	})
						// 	that.user_shou = 1
						// } else {
						// 	uni.showToast({
						// 		icon: 'none',
						// 		title: '已取消'
						// 	})
						// 	that.user_shou = 2
						// }
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

			topSwiperTab(e) {
				this.pagenum = Number(e.target.current);
			},
			get_fwb(str) {
				// console.log(str)
				if (!str) {
					return str
				}
				return service.get_fwb(str)
			},
			getdatas() {
				// console.log(that.id)
				var data = {
					id: that.id,
				}
				service.P_post('info/activity_detail', data).then(res => {
					console.log(res)
					if (res.code == 1) {
						that.shuju = res.data.info
						that.user_shou = res.data.user.collection
						// console.log(that.user_shou, 'that.user_shouthat.user_shouthat.user_shou')
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

		}
	}
</script>

<style scoped>
	.box {
		padding: 0 30rpx 98rpx;
	}

	.signup {
		margin: 26rpx 0;
		padding: 23rpx 19rpx;
		box-shadow: 0rpx 10rpx 19rpx 3rpx rgba(153, 153, 153, 0.08);
		border-radius: 8rpx;
	}

	.intoimg {
		width: 30rpx;
		height: 30rpx;
		margin-left: 19rpx;
	}

	.signuping {
		width: 109rpx;
		height: 44rpx;
		font-size: 26rpx;
		font-weight: bold;
		color: #FFFFFF;
		background: #79C2EF;
		border-radius: 8rpx;
		line-height: 44rpx;
		text-align: center;
	}

	.stopsignup {
		font-size: 24rpx;
		font-weight: 400;
		color: #333333;
		margin-left: 32rpx;
	}

	.gpxz {
		font-size: 22rpx;
		font-weight: 400;
		color: #666666;
	}

	.xqimg {
		width: 100%;
		height: 200rpx;
	}

	.tabbox {
		margin-top: 57rpx;
	}

	.tabstyle {
		width: 40rpx;
		height: 6rpx;
		background: #79C2EF;
		border-radius: 3rpx;
		margin-top: 16rpx;
	}

	.tabs {
		font-size: 28rpx;
		font-weight: 400;
		color: #333333;
		height: 70rpx;
	}

	.activetabs {
		font-size: 30rpx;
		font-weight: bold;
	}

	.tabc_txt {
		text-align: center;
		width: 488rpx;
		font-size: 22rpx;
		font-weight: 400;
		color: #333333;
		line-height: 42rpx;
		margin: 47rpx auto 0;
	}

	.tabc_img {
		width: 100%;
		height: 280rpx;
		border-radius: 8rpx;
		margin-top: 26rpx;
	}

	.daynum {
		font-size: 36rpx;
		font-weight: bold;
		color: #333333;
	}

	.day {
		font-size: 22rpx;
		font-weight: 400;
		color: #333333;
		margin-bottom: 5rpx;
	}

	.daytxt {
		font-size: 24rpx;
		font-weight: bold;
		color: #1961B6;
		padding: 0 27rpx 0 13rpx;
	}

	.daytit {
		align-items: flex-end;
		margin-top: 34rpx;
	}

	.daytit1 {
		margin-top: 56rpx;
	}

	.daycontent {
		font-size: 22rpx;
		font-weight: 400;
		color: #666666;
		line-height: 38rpx;
		margin: 32rpx 0 26rpx 0;
	}

	.dayimg {
		width: 100%;
		height: 280rpx;
		border-radius: 8rpx;
	}

	.dayimgcon {
		font-size: 18rpx;
		font-weight: 400;
		color: #999999;
		line-height: 38rpx;
		margin: 14rpx 0 34rpx 0;
		text-align: center;
	}

	.bottombox {
		padding: 0 35rpx 39rpx;
		background: #FDFDFD;
		box-shadow: 0rpx 10rpx 19rpx 3rpx rgba(153, 153, 153, 0.1);
		border-radius: 8rpx;
		margin-bottom: 120rpx;
	}

	.reminder {
		padding: 32rpx 29rpx;
		width: 100%;
		height: 290rpx;
		background: #EFEFEF;
		border: 1rpx solid #999999;
		border-radius: 8rpx;
		margin-top: 36rpx;
	}

	.reminder1 {
		margin-top: 57rpx;
	}

	.remindertit {
		font-size: 26rpx;
		font-weight: bold;
		color: #1961B6;
		line-height: 44rpx;
	}

	.remindertxt {
		font-size: 22rpx;
		font-weight: 400;
		color: #333333;
		line-height: 44rpx;
	}


	.subscribeimg {
		width: 40rpx;
		height: 40rpx;
	}

	.subscribetxt {
		font-size: 22rpx;
		font-weight: 400;
		color: #333333;
		line-height: 38rpx;
	}

	.ljyy {
		width: 460rpx;
		height: 80rpx;
		background: #79C2EF;
		border-radius: 40rpx;
		font-size: 30rpx;
		font-weight: bold;
		color: #FFFFFF;
		text-align: center;
		line-height: 80rpx;
	}

	.ljyybox {
		width: 100%;
		position: fixed;
		bottom: 0;
		z-index: 999;
		background-color: #FFFFFF;
		padding-bottom: 0;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		box-shadow: 0rpx -10rpx 19rpx 3rpx rgba(153, 153, 153, 0.08);
	}

	.aaaaaa {
		height: 120rpx;
		width: 100%;
		padding: 0 30rpx;
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

	.mc_txt {
		padding: 0 19rpx;
	}

	.mc_bgimg {
		width: 100%;
		height: 337rpx;
		position: absolute;
	}

	.place {
		margin: 20rpx 0 0 17rpx;
	}

	.placeimg {
		width: 30rpx;
		height: 30rpx;
		vertical-align: middle;
		margin-right: 6rpx;
	}

	.placetxt {
		font-size: 24rpx;
		font-weight: 400;
		color: #FFFFFF;
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

	.price {
		margin-bottom: 0;
	}

	.mctc_text3,
	.mctc_text4,
	.mctc_text5 {
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

	.mct_bottom {
		margin-top: 20rpx;
	}

	.tag {
		padding: 3rpx 6rpx;
		border: 1px solid #666666;
		border-radius: 8rpx;
		font-size: 22rpx;
		font-weight: 400;
		color: #666666;
		margin-right: 25rpx;
	}


	.scoreimg {
		width: 22rpx;
		height: 21rpx;
		vertical-align: middle;
	}

	.scoretxt {
		font-size: 22rpx;
		font-weight: bold;
		color: #1961B6;
	}



	.texts {
		color: #333333;
		font-weight: 400;
		font-size: 24rpx;
	}

	.kfsj {
		font-weight: bold;
		margin-right: 23rpx;
	}

	.tzjr {
		margin-left: 20rpx;
	}

	.gfxz {
		color: #666666;
		font-size: 22rpx;
	}

	.ingfxz {
		width: 30rpx;
		height: 30rpx;
		vertical-align: middle;
		margin-left: 9rpx;
	}

	.mapbox {
		margin-top: 9rpx;
	}

	.maptxt {
		width: 540rpx;
		height: 30rpx;
		font-size: 24rpx;
		font-weight: 400;
		color: #333333;
		padding-top: 15rpx;
	}

	.mapimg {
		width: 29rpx;
		height: 30rpx;
	}

	.maptxt2 {
		font-size: 20rpx;
		font-weight: 400;
		color: #333333;
		margin-top: 4rpx;
	}

	.swiper {
		height: 336rpx;
	}

	.bannerimg {
		width: 100%;
		height: 336rpx;
	}

	.pageNum {
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

	.color_h {
		padding-left: 5rpx;
		font-weight: 400;
		color: #333333;
	}
</style>
