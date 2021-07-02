<template>
	<view class="content">
		<htmlLoading ref="htmlLoading" @Retry='onRetry'>
			<view class="pl15 pr15 pt10">
				<view class="flex align-items-center flex-between pb20" v-for="(item,index) in datas">
					<view class="flex flex-col">
						<text class="fs14 fwb">{{item.title}}</text>
						<text class="fs11 c9 pt5">{{item.create_time}}</text>
					</view>
					<text class="dai fs20 fwb">{{item.number}}</text>
				</view>
				<view v-if="datas.length==0" class="zanwu">暂无数据</view>
				<view v-if="datas.length>0&&data_last" class="data_last">到底了~~</view>
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
				datas:[],
				page:1,
				data_last:false

			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo'])
		},
		onLoad() {
			that = this
			that.onRetry()
		},
		onPullDownRefresh() {
			that.onRetry()
		},
		onReachBottom() {
			that.getdata()
		},
		methods: {
			...mapMutations(['logout', 'login']),
			onRetry(){
				that.page=1
				that.datas=[]
				that.data_last=false
				that.btn_kg=0
				that.getdata()
			},
			getdata() {
				var jkurl = '/user/price_history'
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
						// that.datas = datas
						// return
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
		

		}
	}
</script>

<style>

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
