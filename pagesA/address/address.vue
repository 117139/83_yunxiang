<template>
	<view class="content">
		<htmlLoading ref="htmlLoading" @Retry='getdata' :bj_show="false">
			<view class="pl15 pr15 pt10">
				<view class="flex flex-col pt15 pb15 mb15 dhouh pl10 pr15" v-for="(item,index) in datas" :key='index' @tap="xz_add"  :data-idx="index">
					<view class="flex align-items-baseline">
						<text class="fs15 fwb">{{item.name}}</text>
						<text class="fs12 c6 pl6">{{item.phone}}</text>
					</view>
					<view class=" pt10 flex-between flex">
						<view class="fs14" style="width: 480rpx;">
							<text class=" mo " v-if="item.is_default == 1">
								默认
							</text>
							<text v-else></text>
							{{item.province}}
							{{item.city}}
							{{item.county}}
							{{item.address}}
						</view>
						<view class="" @tap.stop='jump' :data-url="'/pagesA/Add_address/Add_address?id='+item.id" :data-login="false" :data-haslogin="hasLogin">
							<image :src="getimg('/static_xcx/xiug.png')" mode="aspectFill" class="xiu"></image>
						</view>
					</view>
					<view class=" pt5 flex-between flex pt15">
						<view class="flex align-items-center" @tap.stop='set_mr(item)'>
							<image :src="getimg('/static_xcx/yuan2xx_07.png')" mode="aspectFill" class="wiimim"
								v-if="item.is_default == 1">
							</image>
							<image :src="getimg('/static_xcx/yuan1.png')" mode="aspectFill" class="wiimim" v-else>
							</image>
							<text class="fs12 c6 pl8">默认地址</text>
						</view>
						<view class=" fs12" @click="del(item)">
							删除
						</view>
					</view>
				</view>
				<view v-if="datas.length==0" class="zanwu">暂无数据</view>
				<view v-if="datas.length>0&&data_last" class="data_last">到底了~~</view>
			</view>
			<view class="fun pl15 fixed bottom pt10">
				<view class="dibu flex align-items-center justify-center cf fs15" @click='jump'
					data-url='/pagesA/Add_address/Add_address' :data-shifou='true'>
					+添加收货地址
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
				page:1,
				datas: [],
				mridx: 0,
				form_type: 0,
				show_num:0

			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo'])
		},
		onLoad(option) {
			that = this
			if (option.type) {
				that.form_type = option.type
			}
			that.getdata()
		},
		onShow() {
			if(that.show_num>0){
				
				that.getdata()
			}
			that.show_num++
		},
		onPullDownRefresh() {
			that.getdata()
		},
		methods: {
			...mapMutations(['logout', 'login']),
			xz_add(e) {
				var that = this
				if (that.form_type != 1) {
					return
				}
				console.log(e.currentTarget.dataset.idx)
				var idx = e.currentTarget.dataset.idx
				var pages = getCurrentPages(); //当前页面
				var prevPage = pages[pages.length - 2]; //上一页面
				prevPage.setData({
					//直接给上一个页面赋值
					addresschose: that.datas[idx].id,
				});

				wx.navigateBack({
					//返回
					delta: 1
				})
			},
			getdata() {
				var jkurl = '/user/address'
				var data = {
					page: that.page,
					limit: 20
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
						return
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
			set_mr(item){
				if(item.is_default==1){
					return
				}
				var jkurl='/user/address_default'
				var data={
					id:item.id,
					// name: item.name,
					// roaming: '86',
					// phone: item.phone,
					// address: item.address,
					// is_default: 1,
					// province:item.province,
					// city:item.city,
					// county:item.county,
				}
				if (that.btn_kg == 1) {
					return
				}
				that.btn_kg = 1
				service.P_post(jkurl, data).then(res => {
					console.log(res)
					if (res.code == 1) {
						// that.$refs.htmlLoading.htmlReset_fuc(0)
						var datas = res.data
						console.log(typeof datas)
				
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						uni.showToast({
							title: '设置成功',
							icon: 'none',
						});
						setTimeout(function(){
						that.btn_kg = 0
							that.getdata()
						},1000)
				
					} else {
						
							that.btn_kg = 0
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
					that.btn_kg = 0
				
					// that.$refs.htmlLoading.htmlReset_fuc(1)
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '系统错误'
					})
				})
			},
			del(item) {
				uni.showModal({
					title: '提示',
					content: '确定删除地址吗',
					success: function(res) {
						if (res.confirm) {
							var jkurl='/user/address_del'
							var data={
								id:item.id
							}
							if (that.btn_kg == 1) {
								return
							}
							that.btn_kg = 1
							service.P_post(jkurl, data).then(res => {
								console.log(res)
								if (res.code == 1) {
									// that.$refs.htmlLoading.htmlReset_fuc(0)
									var datas = res.data
									console.log(typeof datas)
							
									if (typeof datas == 'string') {
										datas = JSON.parse(datas)
									}
									uni.showToast({
										title: '删除地址成功',
										icon: 'none',
									});
									setTimeout(function(){
									that.btn_kg = 0
										that.getdata()
									},1000)
							
								} else {
									
										that.btn_kg = 0
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
								that.btn_kg = 0
							
								// that.$refs.htmlLoading.htmlReset_fuc(1)
								console.log(e)
								uni.showToast({
									icon: 'none',
									title: '系统错误'
								})
							})
							
						} else if (res.cancel) {
							// uni.showToast({
							// 	title: '删除地址失败',
							// 	icon: 'none',
							// });
						}
					}
				});
			}


		}
	}
</script>

<style>
	.dibu {
		width: 690rpx;
		height: 80rpx;
		background: #EB4C50;
		border-radius: 40rpx;
	}

	.fun {
		width: 749rpx;
		height: 120rpx;
		background: #FFFFFF;
		box-shadow: 0px -10rpx 19rpx 3px rgba(153, 153, 153, 0.08);
	}

	.wiimim {
		width: 32rpx;
		height: 32rpx;
	}

	.xiu {
		width: 30rpx;
		height: 30rpx;
	}

	.dhouh {
		box-shadow: 0px 10rpx 19rpx 3px rgba(153, 153, 153, 0.08);
	}

	.mo {
		width: 80rpx;
		height: 34rpx;
		background: #A2B76A;
		border-radius: 8rpx;
		font-size: 22rpx;
		color: #fff;
		padding: 0 5upx;
		margin-right: 8upx;
	}

	page {
		background-color: #fff;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
	}

	.dai {
		color: #EB4C50;
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
