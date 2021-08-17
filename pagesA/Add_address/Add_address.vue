<template>
	<view class="content">
		<htmlLoading ref="htmlLoading" @Retry='getdata' :bj_show="false">
			<view class="" >
				<view class="mian  bgcf pl15 pr15">
					<view class="flex pt15 pb15 bor  align-items-center">
						<text class="fs15 fwb add_text">收货人</text>
						<input class="fs12 pl8" type="text" placeholder="请输入姓名" v-model="name"
							style="width: 555rpx;" />
					</view>
					<view class="flex pt15 pb15 bor align-items-center flex-between">
						<view class="flex align-items-center">
							<text class="fs15 fwb add_text">手机号</text>
							<input class="fs12 pl8" type="number" placeholder="请输入手机号" v-model="phone"
								style="width: 505rpx;" />
						</view>
						<!-- <image :src="getimg('/static_xcx/fanh.png')" mode="aspectFill" class="fanhui  "></image> -->
					</view>
					<view class="">
						<wangding-pickerAddress class="  " @change="change">
							<view class=" pt15 pb15 bor flex  align-items-center flex-between">
								<view class="">
									<text class="fs15 fwb add_text">所在地区</text>
									<text class="fs12 pl8 c9">{{province?province:'请选择地址'}}{{city}}{{county}}</text>
								</view>
								<view class="">
									<image :src="getimg('/static_xcx/fanh.png')" mode="aspectFill" class="fanhui  ">
									</image>
								</view>
							</view>
						</wangding-pickerAddress>

					</view>
					<view class="flex pt15 pb15 bor align-items-center">
						<text class="fs15 fwb add_text">详细地址</text>
						<input class="fs12 pl8" type="text" placeholder="请输入详细地址" v-model="address"
							style="width: 555rpx;" />
					</view>
					
				</view>
				<view class="flex align-items-center justify-center tian fs15 ml15 " @click="sub_fuc">
					保存
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
				id:'',
				name: '',
				phone: '',
				address: '',
				province:'',
				city:'',
				county:'',
				
				title: '',
				is_default:'2'
			}
		},
		onLoad(option) {
			that = this
			console.log(option)
			if (option.id) {
				that.id = option.id
				that.title = '修改地址'
				that.getadd()
				
			}else {
				that.title = '添加收货地址'
				that.$refs.htmlLoading.htmlReset_fuc(0)
			}

			
			

			uni.setNavigationBarTitle({
				title: that.title
			});
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo'])
		},
		methods: {
			...mapMutations(['logout', 'login']),
			getadd(){
				var jkurl = '/user/address_show'
				var data = {
					id: that.id
				}
				if (that.btn_kg == 1) {
					return
				}
				that.btn_kg = 1
				uni.showLoading({
					title: '正在获取数据',
					mask: true
				})
				// var page_now = that.page
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
						that.is_default = datas.is_default
						that.name = datas.name
						that.phone = datas.phone
						that.province = datas.province
						that.city = datas.city
						that.county = datas.county
						that.address = datas.address
						
				
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
				// console.log(e.currentTarget.dataset,'123456')

			},
		
			changeitem(item) {
				console.log(item)

			},
			sub_fuc() {
				if (!that.name) {
					uni.showToast({
						title: '名称不能为空',
						icon: 'none',
					});

					return
				}
				if (!that.phone) {
					uni.showToast({
						title: '手机号不能为空',
						icon: 'none',
					});
					return
				} 
				if (!that.province) {
					uni.showToast({
						title: '请选择地址',
						icon: 'none',
					});
					return
				}
				if (!that.address) {
					uni.showToast({
						title: '详细地址不能为空',
						icon: 'none',
					});
					return
				}
				// else {
				// 	uni.showToast({
				// 		title: '保存成功',
				// 		icon: 'none',
				// 	});
				// 	setTimeout(function() {
				// 		wx.navigateBack({
				// 			delta: 1
				// 		})
				// 	}, 1000)
				// }
				
				var jkurl = '/user/address_add'
				var datas = {
					name: that.name,
					roaming: '86',
					phone: that.phone,
					address: that.address,
					is_default: that.is_default,
					province:that.province,
					city:that.city,
					county:that.county,
				}
				if(that.id){
					jkurl='/user/address_edit'
					datas = {
						id: that.id,
						name: that.name,
						roaming: '86',
						phone: that.phone,
						address: that.address,
						is_default: that.is_default,
						province:that.province,
						city:that.city,
						county:that.county,
					}
				}
				if (that.data_last) return
				if (that.btn_kg == 1) {
					return
				} else {
					that.btn_kg = 1
				}
				// 单个请求
				service.P_post(jkurl, datas).then(res => {
				
					
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						// console.log(typeof datas)
				
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						uni.showToast({
							icon:'none',
							title:'提交成功'
						})
						setTimeout(function(){
							that.btn_kg = 0
							uni.navigateBack({
								delta:1
							})
						},1000)
					}else{
						that.btn_kg = 0
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
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '获取数据失败'
					})
				})

			},
			change(data) {

				// this.city = data.data.join('')
				// console.log(data.data.join(''))
				// console.log(this.city);
				that.province = data.data[0]
				that.city = data.data[1]
				that.county = data.data[2]
			},
			

		}
	}
</script>

<style>
		
	.bor{
		border-bottom: 1rpx solid  #F3F3F3;;
	}
	page {
		background-color: #fff;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0; 
	} 

	.content {
		background-color: #fff;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
	}

	.tian {
		width: 690rpx;
		height: 82rpx;
		background:#EB4C50;
		border: 1px solid #EB4C50;
		border-radius: 40rpx;
		color: #fff;
		margin-top: 112rpx;
	}

	.fanhui {
		width: 11rpx;
		height: 20rpx;
		/* margin-top: -35rpx; */
	}
	.add_text{
		width: 4em;
	}
</style>
