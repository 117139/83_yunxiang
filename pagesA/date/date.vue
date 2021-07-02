<template>
	<view>
		<htmlLoading ref="htmlLoading" @Retry='getdata' :bj_show="false">
			<!-- <view class="box dis_flex  selectbox"> -->
			<!-- <view class=" aic dis_flex ju_b selectbox"> -->

			<picker @change="bindPickerChange" :value="indexs" :range="array" :range-key="'title'">
				<view class="dis_flex aic ju_b selectbox">
					<text class="selecttxt">请选择景区</text>
					<view class="flex aic">
						<text class="jdtxt">{{array[indexs].title }}</text>
						<image class="selectimg" :src="getimg('/static_xcx/index/select.png')" mode="aspectFit"></image>
					</view>
				</view>

			</picker>
			<!-- </view> -->
			<!-- </view> -->
			<view>
				<view class="content">

					<ren-calendar :value="curDate" ref='ren' :markDays='markDays' headerBar @onDayClick='onDayClick'
						@Transmit='handle' @mouts='mouts'></ren-calendar>

				</view>
			</view>
			<view class="box scenerybox">
				<Scenery :shuju="shuju"></Scenery>
				<view v-if="shuju.length==0" class="zanwu">暂无数据</view>
				<view v-if="shuju.length>0&&data_last" class="data_last">到底了~~</view>
			</view>
		</htmlLoading>
	</view>
</template>

<script>
	import RenCalendar from '@/pagesA/ren-calendar/ren-calendar.vue'

	import Scenery from "../../components/scenery/scenery.vue"
	import api from '../../components/url.js';
	import service from '../../service.js';

	var that
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		components: {
			Scenery,
			RenCalendar
		},
		data() {
			return {
				array: [],
				index: 0,
				indexs: 0,
				curDate: [],
				markDays: [],
				year: '',
				month: '',
				shuju: [],
				data_last: false,
				page: 1,
			}
		},
		onReady() {
			that.page = 1
			that.data_last = false
			let today = this.$refs.ren.getToday().date;
			// console.log(today,'sss')
			this.curDate = today;
			this.markDays.push(today);
		},
		onLoad(option) {
			that = this
			console.log(option)
			that.index = option.index
			let today = this.$refs.ren.getToday().date;
			this.curDate = today;
			that.getdata()
			// console.log(this.curDate,'1111')

			// console.log(m)
		},
		onReachBottom() {
			that.getdatas()
		},
		methods: {
			...mapMutations(['logout', 'login']),
			getimg(img) {
				return api.getimg(img)
			},
			tiaozhuan(e) {
				return api.tiaozhuan(e)

			},
			onDayClick(data) {
				this.curDate = data.date;
				console.log(this.curDate, '111')
				// var arr = this.curDate
				// var s = arr.substring(0, 4)
				// that.year = s
				// var m = arr.substring(5, 7)
				// that.month = m
				// that.getdata()
				that.getdatas()

			},
			handle(val) {
				this.year = val;
				that.getdata()
			},
			mouts(val) {
				this.month = val;
			},
			bindPickerChange: function(e) {
				// console.log('picker发送选择改变，携带值为', e.target.value)
				this.indexs = e.target.value
			},
			getdatas() {
				 // that.page=1
				console.log(that.array[that.indexs].id)
				console.log( this.curDate)
				// that.shuju=[]
				// if(typeof this.curDate == 'object') {

				// }else {
				// 	var arr = this.curDate
				// 					var s = arr.substring(0, 4)
				// 					that.year = s
				// 					var m = arr.substring(5, 7)
				// 					that.month = m
				// }

				var data = {
					page:1,
					limit: 10,
					date: this.curDate,
					spot_id: that.array[that.indexs].id,
				}
				// var page_now = that.page
				service.P_post('info/activity', data).then(res => {
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						// if (page_now == 1) {

							that.shuju = datas.data

						// } else {
							// if (datas.data.length == 0) {
								// that.data_last = true
								// return
							// }
							// that.data_last = false
							// that.shuju = that.shuju.concat(datas.data)
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
				// console.log(typeof this.curDate)
				if (typeof this.curDate == 'object') {

				} else {
					var arr = this.curDate
					var s = arr.substring(0, 4)
					that.year = s
					var m = arr.substring(5, 7)
					that.month = m
				}

				var data = {
					year: that.year,
					month: that.month,
					spot_id: that.index,
				}
				service.P_post('info/spot', data).then(res => {
					console.log(res)
					if (res.code == 1) {
						that.$refs.htmlLoading.htmlReset_fuc(0)
						// var datas = res.data
						// console.log(typeof datas)

						// if (typeof datas == 'string') {
						// datas = JSON.parse(datas)
						// }
						this.curDate = res.data.list
						that.array = res.data.spot
						for (var i = 0; i < that.curDate.length; i++) {
							// console.log(that.curDate[i].day)
							var arr = that.curDate[i].day
							var s = arr.substring(0, 4)
							// that.year = s
							var m = arr.substring(5, 7)
							var f = arr.substring(8, 10)
							that.curDate[i].month = m
							that.curDate[i].year = s
							that.curDate[i].dataef = f
							// that.month = m
						}
						// console.log(this.curDate)
						// that.getgoods_data()
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
		}
	}
</script>

<style>
	.box {
		padding: 0 30rpx;
	}

	.selectimg {
		width: 20rpx;
		height: 20rpx;
	}

	.jdtxt {
		font-size: 28rpx;
		font-weight: bold;
		color: #79C2EF;
		padding-right: 21rpx;
	}

	.selecttxt {
		font-size: 28rpx;
		font-weight: 400;
		color: #666666;
	}

	.selectbox {
		padding: 51rpx 30rpx 32rpx 30rpx;
	}

	.scenerybox {
		margin: 34rpx 0 73rpx 0;
	}
</style>
