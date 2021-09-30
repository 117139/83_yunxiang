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
					
					
					<!-- <ren-calendar :dvalue="curDate" ref='ren' :markDays='markDays' headerBar @onDayClick='onDayClick'
						@Transmit='handle' @mouts='mouts'></ren-calendar> -->
					<view class="calendar-wrapper">
					
						<view class="header" >
							<view class="pre" @click="changeMonth('pre')">
								<image :src="getimg('/static_xcx/index/left.png')" mode="aspectFit"></image>
							</view>
							<view>{{y+'年'+formatNum(m)+'月'}}</view>
							<view class="next" @click="changeMonth('next')">
								<image :src="getimg('/static_xcx/index/right.png')" mode="aspectFit"></image>
							</view>
						</view>
						<view class="week">
							<view class="week-day" v-for="(item, index) in weekDay" :key="index" :class="{lvlv: index==0 || index==6}">
								{{ item }}
							</view>
						</view>
						
						<!--  today: isToday(item.year, item.month, item.date), -->
						<view :class="{ hide: !monthOpen }" class="content">
							<view :style="{ top: positionTop + 'rpx' }" class="days">
								<view class="item" v-for="(item, index) in dates" :key="index">
									<view class="day" @click="selectOne(item, $event)" :class="{
																		choose: choose == `${item.year}-${item.month}-${item.date}`&&item.isCurM,
																		nolm: !item.isCurM,
																	 
																		isWorkDay: isWorkDay(item.year, item.month, item.date)
																}">
										<!-- <view v-if="isToday(item.year, item.month, item.date)" class="jintian">
											<text class="cnang">今天</text>
											<text class="jihao">0场</text>
										</view> -->
				
										<!-- !isToday(item.year, item.month, item.date) && -->
										<view v-if="choose == `${item.year}-${item.month}-${item.date}`&&item.isCurM"
											class="jintian">
											
											
											<view class=""  v-if="getshow(item.date)">
													<view class="today dis_flex_c aic">
														<text class="cnang">{{ Number(item.date) }}</text>
														<text>{{getshow(item.date,1)}}场</text>
													</view>
												<!-- </view> -->
											</view>
											<view class="" v-else>
												<view class="today dis_flex_c aic">
													<text class="cnang">{{ Number(item.date) }}</text>
													<text>0场</text>
												</view>
												
											</view>
										</view>
										<view v-if="choose != `${item.year}-${item.month}-${item.date}`&&item.isCurM">
											<!-- 非选中 -->
											
											<view class=""  v-if="getshow(item.date)">
													<view   class=" dis_flex_c aic" >
														<text class="jtaa " style="color: #333;">{{ Number(item.date) }}</text>
													</view>
											</view>
											<view class="" v-else>
												<text class="jtaa ">{{ Number(item.date) }}</text>
												
											</view>
				
										</view>
									</view>
								</view>
							</view>
							<view class="bgyy">
								{{m}}
							</view>
						</view>
				
				
					</view>	
						
						
						
						
						

				</view>
			</view>
			<view class="box scenerybox">
				<!-- <Scenery :shuju="shuju"></Scenery> -->
				<view class="pb20" v-for="(item, index) in shuju" :key='index'>
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
	import Heat from '../../components/heat/heat.vue'
	var that
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		components: {
			Scenery,
			RenCalendar,
			Heat
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
				
				
				
				weektext: ['日', '一', '二', '三', '四', '五', '六'],
				y: new Date().getFullYear(), // 年
				m: new Date().getMonth() + 1, // 月
				dates: [], // 当前月的日期数据
				positionTop: 0,
				monthOpen: true,
				choose: '',
				disabledAfter:false,
				weekstart:0,
				headerBar:true
			}
		},
		onReady() {
			that.page = 1
			that.data_last = false
			// let today = this.$refs.ren.getToday().date;
			let today = this.getToday().date;
			// console.log(today,'sss')
			this.curDate = today;
			this.markDays.push(today);
		},
		onLoad(option) {
			that = this
			console.log(option)
			that.index = option.index
			// let today = this.$refs.ren.getToday().date;
			let today = this.getToday().date;
			this.curDate = today;
			that.getdata()
			// console.log(this.curDate,'1111')

			// console.log(m)
		// },
		// created() {
			this.dates = this.monthDay(this.y, this.m);
		},
		mounted() {
			this.choose = this.getToday().date;
			console.log(this.dvalue)
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo']),
			// 顶部星期栏
			weekDay() {
				return this.weektext.slice(this.weekstart).concat(this.weektext.slice(0, this.weekstart));
			},
			//      height() {
			// console.log(this.dates.length)
			//          return (this.dates.length / 7) * 90 + 'rpx';
			//      }
		},
		onReachBottom() {
			that.getdatas()
		},
		methods: {
			...mapMutations(['logout', 'login']),
			getshow(date,type){
				var show_type=false
				for(var s=0;s<that.curDate.length;s++){
					
					
					if(date==that.curDate[s].dataef){
						show_type= true
						// console.log('跳过'+a)
						if(type==1){
							show_type= that.curDate[s].num
						}
					}
				
				}
				return show_type
			},
			formatNum(num) {
				let res = Number(num);
				return res < 10 ? '0' + res : res;
			},
			getToday() {
				let date = new Date();
				let y = date.getFullYear();
				let m = date.getMonth();
				let d = date.getDate();
				let week = new Date().getDay();
				let weekText = ['日', '一', '二', '三', '四', '五', '六'];
				let formatWeek = '星期' + weekText[week];
				let today = {
					date: y + '-' + this.formatNum(m + 1) + '-' + this.formatNum(d),
					week: formatWeek
				};
				return today;
			},
			// 获取当前月份数据
			monthDay(y, month) {
				let dates = [];
				let m = Number(month);
				let firstDayOfMonth = new Date(y, m - 1, 1).getDay(); // 当月第一天星期几
				let lastDateOfMonth = new Date(y, m, 0).getDate(); // 当月最后一天
				let lastDayOfLastMonth = new Date(y, m - 2, 0).getDate(); // 上一月的最后一天
				let weekstart = this.weekstart == 7 ? 0 : this.weekstart;
				let startDay = (() => {
					// 周初有几天是上个月的
					if (firstDayOfMonth == weekstart) {
						return 0;
					} else if (firstDayOfMonth > weekstart) {
						return firstDayOfMonth - weekstart;
					} else {
						return 7 - weekstart + firstDayOfMonth;
					}
				})();
				let endDay = 7 - ((startDay + lastDateOfMonth) % 7); // 结束还有几天是下个月的
				for (let i = 1; i <= startDay; i++) {
					dates.push({
						date: this.formatNum(lastDayOfLastMonth - startDay + i),
						day: weekstart + i - 1 || 7,
						month: m - 1 >= 0 ? this.formatNum(m - 1) : 12,
						year: m - 1 >= 0 ? y : y - 1
					});
				}
				for (let j = 1; j <= lastDateOfMonth; j++) {
					dates.push({
						date: this.formatNum(j),
						day: (j % 7) + firstDayOfMonth - 1 || 7,
						month: this.formatNum(m),
						year: y,
						isCurM: true //是否当前月份
					});
				}
				for (let k = 1; k <= endDay; k++) {
					dates.push({
						date: this.formatNum(k),
						day: (lastDateOfMonth + startDay + weekstart + k - 1) % 7 || 7,
						month: m + 1 <= 11 ? this.formatNum(m + 1) : 0,
						year: m + 1 <= 11 ? y : y + 1
					});
				}
				// console.log(dates);
				return dates;
			},
			isWorkDay(y, m, d) {
				//是否工作日
				let ymd = `${y}/${m}/${d}`;
				let formatDY = new Date(ymd.replace(/-/g, '/'));
				let week = formatDY.getDay();
				if (week == 0 || week == 6) {
					return false;
				} else {
					return true;
				}
			},
			isFutureDay(y, m, d) {
				//是否未来日期
				let ymd = `${y}/${m}/${d}`;
				let formatDY = new Date(ymd.replace(/-/g, '/'));
				let showTime = formatDY.getTime();
				let curTime = new Date().getTime();
				if (showTime > curTime) {
					return true;
				} else {
					return false;
				}
			},
			isToday(y, m, d) {
				let checkD = y + '-' + m + '-' + d;
				let today = this.getToday().date;
				if (checkD == today) {
					return true;
				} else {
					return false;
				}
			},
			// 点击回调
			selectOne(i, event) {
				// console.log(event,'eventeventevent')
				let date = `${i.year}-${i.month}-${i.date}`;
				let selectD = new Date(date).getTime();
				let curTime = new Date().getTime();
				let week = new Date(date).getDay();
				let weekText = ['日', '一', '二', '三', '四', '五', '六'];
				let formatWeek = '星期' + weekText[week];
				let response = {
					date: date,
					week: formatWeek
				};
				if (!i.isCurM) {
					// console.log('不在当前月范围内');
					return false;
				}
				if (selectD > curTime) {
					if (this.disabledAfter) {
						console.log('未来日期不可选');
						return false;
					} else {
						this.choose = date;
						// this.$emit('onDayClick', response);
						that.onDayClick(response)
					}
				} else {
					this.choose = date;
					// this.$emit('onDayClick', response);
					that.onDayClick(response)
				}
			},
			//改变年月
			changYearMonth(y, m) {
				this.dates = this.monthDay(y, m);
				this.y = y;
				this.m = m;
			},
			changeMonth(type) {
				if (type == 'pre') {
					if (this.m + 1 == 2) {
						this.m = 12;
						this.y = this.y - 1;
					} else {
						this.m = this.m - 1;
					}
					// console.log(this.m)
					// console.log(this.y)
					// this.$emit("mouts", this.m)
					// this.$emit("Transmit", this.y)
					this.mouts( this.m)
					this.Transmit(this.y)
				} else {
					if (this.m + 1 == 13) {
						this.m = 1;
						this.y = this.y + 1;
					} else {
						this.m = this.m + 1;
					}
					// this.$emit("mouts", this.m)
					// this.$emit("Transmit", this.y)
					this.mouts( this.m)
					this.Transmit(this.y)
				}
				this.dates = this.monthDay(this.y, this.m);
				// console.log(this.dates, 'this.datesthis.dates')
				console.log('--**--**--',this.curDate)
				
			},
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			getimg(img) {
				return api.getimg(img)
			},
			tiaozhuan(e) {
				return api.tiaozhuan(e)

			},
			onDayClick(data) {
				// this.curDate = data.date;
				console.log(this.curDate, '111')
				// var arr = this.curDate
				// var s = arr.substring(0, 4)
				// that.year = s
				// var m = arr.substring(5, 7)
				// that.month = m
				// that.getdata()
				that.getdatas()

			},
			Transmit(val) {
				this.year = val;
				that.getdata()
			},
			mouts(val) {
				this.month = val;
			},
			bindPickerChange: function(e) {
				// console.log('picker发送选择改变，携带值为', e.target.value)
				this.indexs = e.target.value
				this.index = that.array[e.target.value].id
				that.getdatas()
			},
			getdatas() {
				// that.page=1
				console.log(that.array[that.indexs].id)
				console.log(this.curDate)
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
					page: 1,
					limit: 10,
					date: this.choose,
					spot_id: that.array[that.indexs].id,
				}
				// var page_now = that.page
				service.P_post('info/activity', data).then(res => {
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						// if (page_now == 1) {

						that.shuju = datas.data
						that.getdata()
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
					if(this.curDate){
						var arr = this.curDate
						var s = arr.substring(0, 4)
						that.year = s
						var m = arr.substring(5, 7)
						that.month = m
					}
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
						for(var i=0;i<that.array.length;i++){
							if( that.index==that.array[i].id){
								that.indexs=i
							}
						}
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
<style lang="scss" scoped>
	.ccccs {
		color: #666666;
	}

	.cooo {
		color: #333333;
	}

	.bgyy {
		width: 100%;
		height: 100%;
		position: absolute;
		bottom: 0;
		font-size: 320rpx;
		font-weight: bold;
		color: rgba(51, 51, 51, 0.08);
		text-align: center;
		line-height: 540rpx;
	}

	.jintian {
		display: flex;
		flex-direction: column;
		line-height: 45rpx;


	}

	.jtaa {
		font-size: 28rpx;
		font-weight: 400;
		color: rgba(51, 51, 51, 0.5);
	}

	.jtaas {
		font-size: 28rpx;
		font-weight: 400;
		color: rgba(51, 51, 51, 0.7);
	}

	.ccaa {
		font-size: 24rpx;
		font-weight: 400;
		color: rgba(51, 51, 51, 0.5);
	}

	.cnang {
		font-size: 28rpx;
		font-weight: bold;
		color: #fff;
	}

	.jihao {
		font-size: 24rpx;
		font-weight: 400;
		color: #fff;
	}

	.calendar-wrapper {
		color: #bbb7b7;
		font-size: 28rpx;
		text-align: center;
		background-color: #fff;
		padding-bottom: 10rpx;

		.header {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 80rpx;
			background: #79C2EF;
			font-size: 32rpx;
			font-weight: bold;
			color: #FFFFFF;

			.pre,
			.next {
				image {
					width: 20rpx;
					height: 20rpx;
				}
			}

			.pre {
				margin-right: 30rpx;
			}

			.next {
				margin-left: 30rpx;
			}
		}

		.week {
			display: flex;
			align-items: center;
			height: 80rpx;
			line-height: 80rpx;
			background: #F7F7F7;

			font-size: 28rpx;
			font-weight: 400;
			color: #333333;

			.lvlv {
				color: #0B7E5D;
			}

			view {
				flex: 1;
			}
		}

		.content {
			height: 540rpx;
			position: relative;
			overflow: hidden;
			box-shadow: 0rpx 10rpx 19rpx 3rpx rgba(153, 153, 153, 0.08);

			.days {
				transition: top 0.3s;
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				position: relative;
				z-index: 999;

				.item {
					position: relative;
					display: block;
					height: 90rpx;
					line-height: 90rpx;
					width: calc(100% / 7);

					.day {
						font-style: normal;
						display: inline-block;
						vertical-align: middle;
						overflow: hidden;
						width: 100%;
						border-radius: 8rpx;

						// height: 60rpx;
						// line-height: 60rpx;
						// border-radius: 60rpx;

						&.choose {
							color: rgba(51, 51, 51, 0.5);
						}

						// &.nolm {
						// 	display: none;
						// }
					}

					.isWorkDay {
						color: rgba(51, 51, 51, 0.5);
					}

					.today {
						color: #fff;
						background-color: rgba(121, 194, 239, 0.5);
					}

					.workDay {
						font-style: normal;
						width: 8rpx;
						height: 8rpx;
						background: #4d7df9;
						border-radius: 10rpx;
						position: absolute;
						left: 50%;
						bottom: 0;
						pointer-events: none;
					}
				}
			}
		}

		.hide {
			height: 80rpx !important;
		}

		// .weektoggle {
		//     width: 85rpx;
		//     height: 32rpx;
		//     position: relative;
		//     bottom: -42rpx;
		//     &.down {
		//         transform: rotate(180deg);
		//         bottom: 0;
		//     }
		// }
	}
</style>