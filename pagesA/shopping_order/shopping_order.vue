<template>
	<view class="content">
		<htmlLoading ref="htmlLoading" @Retry='getdata' :bj_show="false">
			<view v-if="datas.address" class="pl8 ml15 mr15 pr8 mt15  mian pb20 pt15 flex align-items-center dizhis" 
			  @click='jump' data-url='/pagesA/address/address?type=1'  :data-login="true" :data-haslogin="hasLogin">
				<image :src="getimg('/static_xcx/weizhi.png')" mode="aspectFill" class="dizhi mr10"></image>
				<view class="flex flex-col">
					<view class="flex fwb align-items-center">
						<text class="fs15 ">{{datas.address.name}}</text>
						<text class="fs12 pl5">{{datas.address.phone}}</text>
					</view>
					<view class="flex oh2 fs14 pt10" style="width: 480rpx;">
						{{datas.address.province}} {{datas.address.city}} {{datas.address.county}} {{datas.address.address}}
					</view>
				</view>
				<view class="xiu flex align-items-center justify-center c6 fs12 ">
					<image :src="getimg('/static_xcx/fanh.png')" mode="aspectFill" class="jian"></image>
				</view>
			</view>
			<view v-else class="pl8 ml15 mr15 pr8 mt15  mian pb20 pt15 flex align-items-center dizhis" 
				@click='jump' data-url='/pagesA/address/address?type=1'  :data-login="true" :data-haslogin="hasLogin">
				<image :src="getimg('/static_xcx/weizhi.png')" mode="aspectFill" class="dizhi mr10"></image>
				<view class="flex flex-col flex_1">
					暂无地址
				</view>
				<view class="xiu flex align-items-center justify-center c6 fs12 ">
					<image :src="getimg('/static_xcx/fanh.png')" mode="aspectFill" class="jian"></image>
				</view>
			</view>
			<view class="mian pl8 ml15 mr15 pr8 mt15  mian  ">
				<view class="" v-for="(item,index) in datas.goods" :key='index'>
					<view class="flex pb10 pt10">
						<image :src="getimg(item.goods_pic)" mode="aspectFill" class="img mr10 "></image>
						<view class="flex flex-col">
							<view class="flex align-items-center flex-between">
								<text class="oh1 fs14 fwb" style="width: 340rpx; height: 40rpx;">{{item.goods_title}}</text>
								<view class="c9  ">
									<text class="fs12">￥</text>
									<text class="fs14">{{item.price}}</text>
								</view>
							</view>
							<view class="flex align-items-center pt6 flex-between">
								<text class="oh1 fs11 c9" style=" height: 40rpx;">{{item.spec_title}}</text>
								<view class="c9 pl15">
									<text class="fs12">x{{item.goods_num}}</text>
								</view>
							</view>
							<view class="fs11 c6 pt30 text-right">
								{{item.freight}}
							</view>
						</view>
					</view>
				</view>
				<view class="flex align-items-center flex-between pb15 pt10 pl5 pr5">
					<text class="fs11 c6">运费：{{datas.total_freight}}元</text>
					<view class="">
						<text class="fs11 c9">共{{datas.total_number}}件</text>
						<text class="fs11 c6 pl10">合计:</text>
						<text class="fs11 dai pl10">￥</text>
						<text class="fs20 dai">
							{{datas.total}}
						</text>
					</view>
				</view>

			</view>
			<view class="fun fixed bottom flex align-items-center flex-right pr15">
					<text class="fs11 c9">共{{datas.total_number}}件</text>
					<text class="fs14 fwb pl10">合计:</text>
					<text class="fs11 dai pl10">￥</text>
					<text class="fs20 dai">
						{{datas.total}}
					</text>
				<view class="heji flex align-items-center justify-center cf fs15 ml15" @click='tiao'>
					提交
				</view>
			</view>
		</htmlLoading>
	</view>
</template>

<script>
	import api from '../../components/url.js';
	
	import service from '../../service.js';
	var that
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				shuju: [{
						img: '/static_xcx/tui.png',
						title: '西北骄】青海特产风干西北骄】青海特产风干',
						sum: '五香味500g【收藏加购送20g',
						num: '99.00',
						pris: 1

					},
					{
						img: '/static_xcx/tui.png',
						title: '西北骄】青海特产风干西北骄】青海特产风干',
						sum: '五香味500g【收藏加购送20g',
						num: '99.00',
						pris: 1

					}
				],
				ids:'',
				datas:'',
				address_id:''

			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo'])
		},
		onLoad(option) {
			that = this
			that.ids=option.ids||''
			that.getdata()
		},
		onShow() {
			var that =this
		  let pages = getCurrentPages();
		  let currPage = pages[pages.length - 1];
			// #ifdef MP-WEIXIN
			//地理
		  if (currPage.data.addresschose) {  
		        //将携带的参数赋值
		          
		      that.address_id=currPage.data.addresschose
		      that.addressBack=true 
					that.getdata()
		    console.log(this.address, '地址')
				
		  }
			// #endif
		},
		methods: {
			...mapMutations(['logout', 'login']),
			getdata(){
				var jkurl='/order/sure'
				var data={
					id:that.ids,
					address_id:that.address_id
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
						that.datas = datas
						that.address_id=datas.address.id||''
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

			tiao() {
				if(!that.address_id){
					uni.showToast({
						icon:'none',
						title:'请选择地址'
					})
					return
				}
				uni.redirectTo({
				    url: '../Settlement_desk/Settlement_desk?add_id='+that.address_id+'&ids='+that.ids
				});
				return
				var jkurl='/order/add'
				var data={
					id:that.ids,
					address_id:that.address_id
				}
				if (that.btn_kg == 1) {
					return
				}
				that.btn_kg = 1
				uni.showLoading({
					title: '正在提交',
					mask: true
				})
				service.P_post(jkurl, data).then(res => {
					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						// that.$refs.htmlLoading.htmlReset_fuc(0)
						var datas = res.data
						console.log(typeof datas)
				
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						uni.redirectTo({
						    url: '../Settlement_desk/Settlement_desk'
						});
				
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
								title: '获取失败'
							})
						}
					}
				}).catch(e => {
					
					// that.$refs.htmlLoading.htmlReset_fuc(1)
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '系统错误'
					})
				})
				
			}

		}
	}
</script>

<style>
	.heji{
		width: 178upx;
		height: 60upx;
		background: #FECE0A;
		border-radius: 30upx;
		}
	.img {
		width: 200upx;
		height: 200upx
	}

	.mian {
		background: #FFFFFF;
		box-shadow: 0px 10upx 19upx 3px rgba(153, 153, 153, 0.08);
		border-radius: 8upx;
	}

	.dizhis {
		background: #FFFFFF;
		box-shadow: 0px 10upx 19upx 3px rgba(153, 153, 153, 0.08);
		border-radius: 8upx;
	}

	.jian {
		width: 11upx;
		height: 20upx;
		margin-left: 80rpx;
	}

	.dizhi {
		width: 48rpx;
		height: 48rpx;
	}

	.fun {
		width: 750rpx;
		height: 130rpx;
		box-shadow: 0px -10rpx 19rpx 3px rgba(153, 153, 153, 0.08);
	}

	page {
		background-color: #fff;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
	}

	.dai {
		color: #FA3117;
	}

	.content {
		background-color: #fff;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		overflow-x: hidden;
	}
</style>
