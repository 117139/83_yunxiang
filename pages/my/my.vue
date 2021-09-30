<template>

	<view class="content">
		<!-- <view class="fixed width" style="z-index: 99;">
			<cu-custom :isBack="true" bgColor="bg-gradual-blue">
				<block slot="backText"></block>
			</cu-custom>
		</view> -->
		<!-- 头部 -->
		<topbar :bg_img="getimg('/static_xcx/zulog.png')" bg_color="#ff0000" text_color="#fff" :have_top="false">
				<text class=""></text>
				<text>个人中心</text>
				<text class=""></text>
		</topbar>
		<view class="flex hhh flex-between justify-center align-items-center">
			<image :src="getimg('/static_xcx/zulog.png')" mode="aspectFill" class="width img_box absolute "></image>
			<view v-if="hasLogin" class="flex relative align-items-center width relative7">
				<!-- @tap='jump' data-url='/pagesA/login2/login2':data-shifou='true' :data-hasLogin='hasLogin' -->
				<image :src="getimg(loginDatas.img)" mode="aspectFill" class="img "></image>

				<view class="flex flex-between" style="width: 350rpx;">
					<!-- <view class="user oh1 flex justify-centers align-items-center" > 
							未命名</view> -->
					<view class="user oh1 flex justify-centers align-items-center">{{loginDatas.nick}}
					</view>

				</view>
				<!-- <view class="xiu flex align-items-center justify-center ml35" 	@tap='jump' data-url='/pagesA/data/data' :data-shifou='false'>
					<text class="fs12 fwb">修改资料</text>
				</view> -->
			</view>
			<view v-else class="flex justify-center align-items-center fwb fs16 cf width" style="z-index: 3;" @tap="jump" data-url="/pagesA/login/login">
				<text>登录/注册</text>
			</view>
		</view>
		<view class="relative relative6">
			<view class="ka  ml10 flex pt20 pb15">
				<view class="flex-1 flex align-items-center justify-center flex-col" @tap='jump'
					data-url='/pagesA/My_collection/My_collection' :data-login="true" :data-haslogin="hasLogin">
					<image :src="getimg('/static_xcx/shouc.png')" mode="aspectFit" class="shou"></image>
					<text class="fs13 pt8">个人收藏</text>
				</view>
				<view class="flex-1 flex align-items-center justify-center flex-col" @tap='jump'
					data-url='/pagesA/my_make/my_make' :data-login="true" :data-haslogin="hasLogin">
					<image :src="getimg('/static_xcx/yuyue.png')" mode="aspectFit" class="yuyue"></image>
					<text class="fs13 pt8">我的预约</text>
				</view>
				<view class="flex-1 flex align-items-center justify-center flex-col" @tap='jump'
					data-url='/pagesA/my_Finance/my_Finance' :data-login="true" :data-haslogin="hasLogin">
					<image :src="getimg('/static_xcx/caiwu.png')" mode="aspectFit" class="caiwu"></image>
					<text class="fs13 pt8">财务记录</text>
				</view>
				<view class="flex-1 flex align-items-center justify-center flex-col" @tap='jump'
					data-url='/pagesA/address/address' :data-login="true" :data-haslogin="hasLogin">
					<image :src="getimg('/static_xcx/dizhi.png')" mode="aspectFit" class="dizhi"></image>
					<text class="fs13 pt8">收货地址</text>
				</view>
			</view>
		</view>
		<view class="flex pl15 width flex-between flex-row pt25">
			<text class=" fwb fs16">我的订单</text>
			<view class=" pr12" @tap='jump' data-url='/pagesA/My_order/My_order?currentIndex=0'
				 :data-login="true" :data-haslogin="hasLogin">
				<text class="fs11 chakan ">查看全部</text>
				<image :src="getimg('/static_xcx/fanh.png')" mode="aspectFit "
					style="width: 11rpx; height: 20rpx; margin-left: 18rpx;"></image>
			</view>
		</view>
		<view class="flex pt20 pb15">
			<view class="flex-1 flex align-items-center justify-center flex-col" @tap='jump'
				data-url='/pagesA/My_order/My_order?currentIndex=1'  :data-login="true" :data-haslogin="hasLogin">
				<image :src="getimg('/static_xcx/daizhif.png')" mode="aspectFit" class="dai"></image>
				<text class="fs13 pt8">待付款</text>
			</view>
			<view class="flex-1 flex align-items-center justify-center flex-col" @tap='jump'
				data-url='/pagesA/My_order/My_order?currentIndex=2'  :data-login="true" :data-haslogin="hasLogin">
				<image :src="getimg('/static_xcx/daifah.png')" mode="aspectFit" class="dai"></image>
				<text class="fs13 pt8">待发货</text>
			</view>
			<view class="flex-1 flex align-items-center justify-center flex-col" @tap='jump'
				data-url='/pagesA/My_order/My_order?currentIndex=3'  :data-login="true" :data-haslogin="hasLogin">
				<image :src="getimg('/static_xcx/daiquh.png')" mode="aspectFit" class="dai"></image>
				<text class="fs13 pt8">待收货</text>
			</view>
			<view class="flex-1 flex align-items-center justify-center flex-col" @tap='jump'
				data-url='/pagesA/My_order/My_order?currentIndex=4'  :data-login="true" :data-haslogin="hasLogin">
				<image :src="getimg('/static_xcx/yiwancheng.png')" mode="aspectFit" class="dais"></image>
				<text class="fs13 pt8">已完成</text>
			</view>
			<!-- <view class="flex-1 flex align-items-center justify-center flex-col" @tap='jump'
				data-url='/pagesA/Successful_trades/Successful_trades'  :data-login="true" :data-haslogin="hasLogin"> -->
			<view class="flex-1 flex align-items-center justify-center flex-col" @tap='jump'
				data-url='/pagesA/My_order/My_order?currentIndex=4'  :data-login="true" :data-haslogin="hasLogin">
				<image :src="getimg('/static_xcx/tuihuanh.png')" mode="aspectFit" class="dai"></image>
				<text class="fs13 pt8">售后</text>
			</view>
		</view>
		<view class="">
			<view class="flex flex-between align-items-center pl15 pr15 pb12 pt15" @tap='jump'
				data-url='/pagesA/Shopping_Cart/Shopping_Cart'  :data-login="true" :data-haslogin="hasLogin">
				<view class="flex align-items-center">
					<text class="iconfont icon-gouwuche fs22 "></text>
					<text class="fs13 pl10">购物车</text>
				</view>
				<image :src="getimg('/static_xcx/fanh.png')" mode="aspectFit"
					style="width: 11rpx; height: 20rpx; margin-left: 18rpx;"></image>
			</view>
			<view class="flex flex-between align-items-center pl15 pr15 pb12 pt15" @tap='jump'
				data-url='/pagesA/kefu/kefu?id=1'  :data-login="true" :data-haslogin="hasLogin">
				<view class="flex align-items-center">
					<image :src="getimg('/static_xcx/kefu.png')" mode="aspectFit" class="kefu "></image>
					<text class="fs13 pl10">联系客服</text>
				</view>
				<image :src="getimg('/static_xcx/fanh.png')" mode="aspectFit"
					style="width: 11rpx; height: 20rpx; margin-left: 18rpx;"></image>
			</view>
			<view class="flex flex-between align-items-center pl15 pr15 pb12 pt15" @tap='jump'
				data-url='/pagesA/kefu/kefu?id=2'  :data-login="false" :data-haslogin="hasLogin">
				<view class="flex align-items-center">
					<image :src="getimg('/static_xcx/women.png')" lazy-load='true' mode="aspectFit" class="kefu "></image>
					<text class="fs13 pl10">关于我们</text>
				</view>
				<image :src="getimg('/static_xcx/fanh.png')" mode="aspectFit"
					style="width: 11rpx; height: 20rpx; margin-left: 18rpx;"></image>
			</view>
			<view class="flex flex-between align-items-center pl15 pr15 pb12 pt15" @tap='jump'
				data-url='/pagesA/kefu/kefu?id=3'  :data-login="false" :data-haslogin="hasLogin">
				<view class="flex align-items-center">
					<image :src="getimg('/static_xcx/yinsi.png')" lazy-load='true' mode="aspectFit" class="kefu "></image>
					<text class="fs13 pl10">隐私政策</text>
				</view>
				<image :src="getimg('/static_xcx/fanh.png')" lazy-load='true' mode="aspectFit"
					style="width: 11rpx; height: 20rpx; margin-left: 18rpx;"></image>
			</view>
			<view class="flex flex-between align-items-center pl15 pr15 pb12 pt15" @tap='jump'
				data-url='/pagesA/kefu/kefu?id=4'  :data-login="false" :data-haslogin="hasLogin">
				<view class="flex align-items-center">
					<image :src="getimg('/static_xcx/xieyi.png')" lazy-load='true' mode="aspectFit" class="kefu "></image>
					<text class="fs13 pl10">用户协议</text>
				</view>
				<image :src="getimg('/static_xcx/fanh.png')" mode="aspectFit"
					style="width: 11rpx; height: 20rpx; margin-left: 18rpx;"></image>
			</view>

		</view>


		<Tabbar :tabbarlist="tabbarlist" :navActive="4"></Tabbar>
	</view>
</template>

<script>
	import service from '../../service.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	var that
	export default {
		data() {
			return {
				
				tabbarlist: [{
					txt: '访客预约',
					img: '/static_xcx/cao.png',
				}, {
					txt: '自然课堂',
					img: '/static_xcx/yuanwei.png',
				}, {
					txt: '商城',
					img: '/static_xcx/zhiwu.png',
				}, {
					txt: '我的',
					img: '/static_xcx/cao2.png',
				}],
				name: '1786354211',
				datau: '',
				statuss: '',
				ifOnShow: false,
				denrg: 0,

			}
		},
		onLoad() {
			that = this
		},
		onShow() {
		},

		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'loginDatas'])
		},
		methods: {
			...mapMutations(['logout', 'login']),
			jump(e){
				return service.jump(e)
			},
			getimg(img) {
				return service.getimg(img)
			},
			

		}
	}
</script>

<style>
	.relative7 {
		margin-top: 70rpx;
	}

	.relative6 {
		margin-top: 25rpx;
	}

	.bg-shadeTop {
		background-image: linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.01));
		color: #ffffff;
	}

	/* Tabbar组件的样式   开始 */
	/deep/.tabBar {
		background-color: #EB4C50;
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
	.fun {
		width: 100%;
		position: fixed;
		padding-top: 9rpx;
		bottom: 0;
		z-index: 999;
		padding-bottom: 0;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		background-color: #EB4C50;
	}

	.dibu {
		width: 48rpx;
		height: 48rpx;
	}

	.dibus {
		width: 50rpx;
		height: 50rpx;
	}

	.kefu {
		width: 40rpx;
		height: 40rpx;
	}

	.dai {
		width: 52rpx;
		height: 49rpx;
	}

	.dais {
		width: 63rpx;
		height: 49rpx;
	}

	.shou {
		width: 51rpx;
		height: 51rpx;
	}

	.yuyue {
		width: 53rpx;
		height: 50rpx;
	}

	.dizhi {
		width: 40rpx;
		height: 53rpx;
	}

	.caiwu {
		width: 53rpx;
		height: 53rpx;
	}

	.xiu {
		width: 160rpx;
		height: 60rpx;
		background: #FFFFFF;
		box-shadow: 0px 10rpx 19rpx 3rpx rgba(194, 0, 5, 0.15);
		border-radius: 30rpx;

		color: #EB4C50;
	}

	.status-bar {
		height: var(--status-bar-height);
		width: 100%;
	}

	.dengs {
		width: 690rpx;
		height: 82rpx;
		background: linear-gradient(-25deg, #FD7218, #FE9D30);
		border-radius: 10rpx;
	}

	page {
		background-color: #F7F7F7;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
	}

	.content {
		background-color: #fff;
		width: 100%;
		min-height: 100%;
		margin: 0;
		/* padding-bottom: calc(var(--window-bottom) + 30px); */
		padding-bottom:  calc(constant(safe-area-inset-bottom) + 60px);
		padding-bottom:  calc(env(safe-area-inset-bottom) + 61px);
		/* padding-bottom: var(--window-bottom); */
		/* padding: 0; */
	}

	.cfd {
		color: #FD7218;
	}

	.hhh {
		width: 750rpx;
		height: 390rpx;

	}

	.img_box {
		height: 470rpx;
		z-index: 0;

	}

	.logos {
		width: 40rpx;
		height: 40rpx;
		margin-top: 80rpx;
		margin-left: -35rpx;
		vertical-align: middle;
	}

	.img {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		/* margin-top: 127rpx; */
		margin-left: 35rpx;
		vertical-align: middle;
	}

	.user {
		font-size: 36rpx;
		font-family: PingFang;
		font-weight: 500;
		color: #FFFFFF;
		/* padding-top: 180rpx; */
		padding-left: 36rpx;
		height: 50rpx;
		/* margin-top: 40rpx; */
		z-index: 2;
	}

	.bian {
		width: 37rpx;
		height: 37rpx;
		/* margin-top: 192rpx; */
	}

	.ka {
		width: 718rpx;
		/* height: 317rpx; */
		background: #FFFFFF;
		box-shadow: 0px 5px 10px 1px rgba(194, 0, 5, 0.1);
		border-radius: 10rpx;
		background-color: #fff;
		z-index: 9999999;
		margin-top: -88rpx;
		padding-bottom: 30rpx;
	}
	/* .dh_top text{
		color: #fff;
	} */
</style>
