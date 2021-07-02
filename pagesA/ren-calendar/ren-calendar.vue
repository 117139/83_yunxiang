<template>
	<view class="calendar-wrapper">

		<view class="header" v-if="headerBar">
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
		<view :class="{ hide: !monthOpen }" class="content">
			<view :style="{ top: positionTop + 'rpx' }" class="days">
				<view class="item" v-for="(item, index) in dates" :key="index">
					<view class="day" @click="selectOne(item, $event)" :class="{
                            choose: choose == `${item.year}-${item.month}-${item.date}`&&item.isCurM,
                            nolm: !item.isCurM,
                            today: isToday(item.year, item.month, item.date),
                            isWorkDay: isWorkDay(item.year, item.month, item.date)
                        }">
						<view v-if="isToday(item.year, item.month, item.date)" class="jintian">
							<text class="cnang">今天</text>
							<text class="jihao">0场</text>
						</view>


						<view v-if="!isToday(item.year, item.month, item.date) && choose == `${item.year}-${item.month}-${item.date}`&&item.isCurM"
							class="jintian">
							<view class="" v-if="value.length==0 || value==[]">
								<text class="jtaa ">{{ Number(item.date) }}</text>
								
							</view>
							<view class="" v-else>
								<!-- <text class="jtaa" v-if="value.length === 0">{{ Number(item.date) }}</text> -->
								<!-- <view class=""  > -->
									<view  v-for="(arr, index) in value" :key="index" class="today dis_flex_c aic" v-if="arr.dataef==item.date">
										<text class="cnang">{{ Number(item.date) }}</text>
										<text>{{arr.num}}场</text>
									</view>
								<!-- </view> -->
							</view>
							<!-- <view class=""  v-for="(arr, index) in value" :key="index" v-else>
								<view class="today dis_flex_c aic" v-if="arr.dataef==item.date">
									<text class="cnang">{{ Number(item.date) }}</text>
									<text>{{arr.num}}场</text>
								</view>
							</view> -->
						</view>
						<view
							v-if="!isToday(item.year, item.month, item.date) && choose != `${item.year}-${item.month}-${item.date}`&&item.isCurM">
							<!-- <view class="" v-if="value.length==0">
								<text class="jtaa">{{ Number(item.date) }}</text>
							</view> -->
							<view class="" >
								<!-- <text class="cooo" v-for="(arr, index) in value" :key="index" v-if="arr.dataef==item.date ">{{ Number(item.date) }}</text> -->
								<text class="jtaa">{{ Number(item.date) }}</text> 

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
</template>

<script>
	import api from '../../components/url.js';

	var that
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {

		name: 'ren-calendar',
		// props:["value"],
		props: {

			// 星期几为第一天(0为星期日)
			weekstart: {
				type: Number,
				default: 0
			},

			// 标记的日期
			markDays: {
				type: Array,
				default: () => {
					return [];
				}
			},
			//是否展示月份切换按钮
			headerBar: {
				type: Boolean,
				default: true
			},
			disabledAfter: {
				type: Boolean,
				default: false
			},
			value: {
				type: Array,
				// default: function () { return [] }
				default: () => {
					return []
				}
			},
		},

		data() {
			return {
				weektext: ['日', '一', '二', '三', '四', '五', '六'],
				y: new Date().getFullYear(), // 年
				m: new Date().getMonth() + 1, // 月
				dates: [], // 当前月的日期数据
				positionTop: 0,
				monthOpen: true,
				choose: ''
			};
		},
		onLoad() {
			that = this
		},
		created() {
			this.dates = this.monthDay(this.y, this.m);
		},
		mounted() {
			this.choose = this.getToday().date;
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
		methods: {
			...mapMutations(['logout', 'login']),
			getimg(img) {
				return api.getimg(img)
			},
			tiaozhuan(e) {
				return api.tiaozhuan(e)
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
						this.$emit('onDayClick', response);
					}
				} else {
					this.choose = date;
					this.$emit('onDayClick', response);
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
					this.$emit("mouts", this.m)
					this.$emit("Transmit", this.y)

				} else {
					if (this.m + 1 == 13) {
						this.m = 1;
						this.y = this.y + 1;
					} else {
						this.m = this.m + 1;
					}
					this.$emit("mouts", this.m)
					this.$emit("Transmit", this.y)
				}
				this.dates = this.monthDay(this.y, this.m);
				// console.log(this.dates, 'this.datesthis.dates')
				console.log('--**--**--',this.value)
			}
		}
	};
</script>

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
