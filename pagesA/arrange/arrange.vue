<template>
	<view>
		<view class="box">
			<!-- <Recommend :shuju='shuju'></Recommend> -->
			<view class="recommend dis_flex" >
				
				<image :src="getimg_fuc(shuju.first_img)" mode="aspectFill" v-show="!isgoods"></image>
				<image :src="getimg_fuc('/static_xcx/index/goods.png')" mode="aspectFill" v-show="isgoods"></image>
				<view class="recommendR">
					<text class="oh2">{{shuju.title}}</text>
					<view class="heat pt10" v-show="!isgoods">
						<Heat></Heat>
					</view>
					<view class="heat" v-show="isgoods" style="height: 40rpx;"></view>
					<view class="price dis_flex aic  ju_b pt20">
						<view class="g_price">
							<text>￥</text>
							<text class="big">
								{{shuju.price}}
							</text>
							<text class="color_h" v-show="yyxq != 'yyxq'">元</text>
						</view>
						<view class="">
							<view class="heat" v-show="isgoods" style="height: 40rpx;"></view>
							<view class="pr_dw" v-show="!isgoods">
								<image :src="getimg_fuc('/static_xcx/index/dw2.png')" mode="aspectFill"></image>
								<text>{{shuju.province}}{{shuju.county}}</text>
							</view>
						</view>
						
					</view>
				</view>
			</view>
			<view class="xxbox dis_flex_c ju_a">
				<view class="dis_flex ju_b aic">
					<view class="xxtitstyle">出发时间</view>
					<!-- <view class="dis_flex aic" @tap="toggleTab()">
						<text class="cfsjtime">{{time}}</text>
						<image class="intoimg" :src="getimg_fuc('/static_xcx/index/into.png')" mode="aspectFit"></image>
					</view> -->
					
					<text class="cfsjtime">{{shuju.start_times}}</text>
					
					<!-- <picker class="dis_flex aic" mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
						<text class="cfsjtime">{{date}}</text>
						<image class="intoimg" :src="getimg_fuc('/static_xcx/index/into.png')" mode="aspectFit"></image>  
					</picker> -->
					
					
					
				</view>
				<view class="dis_flex ju_b aic">
					<view class="xxtitstyle">数量</view>
					<!-- <view class="numbox dis_flex aic">
						<view style="border-right: 1rpx solid #999999;" @click="numval--">-</view>
						<input type="text" value="" v-model="numval"/>
						<view style="border-left: 1rpx solid #999999;" @click="numval++">+</view>
					</view> -->
					
					<view class="shoppingNumber flex align-items-center ">
						<label class="minute"  @click="jian">-</label>
						<input class="input" v-model="numval" />
						<label class="add" @click="numvals">+</label>
					</view>
					
				</view>
				<view class="dis_flex ju_b aic">
					<view class="xxtitstyle">金额合计</view>
					<view class="g_price">
						<text>￥</text>
						<text class="big">
							{{monder}}
						</text>
					</view>
				</view>
			</view>
			
			<block v-for="(item,index) in info">
					<view class="xxbox dis_flex_c ju_a">
						<view class="dis_flex ju_b aic">
							<view class="xxtitstyle">姓名</view>
							<input class="flex_1 tar int_moren" type="text" v-model="item.name" placeholder="请输入预约人的姓名">
						</view>
						<view class="dis_flex ju_b aic">
							<view class="xxtitstyle">手机号</view>
							<input class="flex_1 tar int_moren" type="number"  v-model="item.phone" placeholder="请输入预约人的手机号">
							
						</view>
						<view class="dis_flex ju_b aic">
							<view class="xxtitstyle">身份证</view>
							<input class="flex_1 tar int_moren" type="text"  v-model="item.IdCard" placeholder="请输入预约人的身份证">
						</view>
					</view>
			</block>
			<view class="xxbox xxbox2" v-for="arr,index in shuju.more_content_arr" :key="index">
				<view class="remindertit pb10">
					{{arr.title}}
				</view>
				<view  class="fs12" >
					<text> {{arr.content}}</text>
				</view>
			</view>
			
		</view>
		
		<view class="agree dis_flex ju_c">
			<image v-show="showxz" @click='showxz=!showxz' class="agreeimg" :src="getimg_fuc('/static_xcx/index/agreeimg.png')" mode="aspectFit"></image>
			<view v-show="!showxz" @click='showxz=!showxz' style="width: 30rpx;height: 30rpx;border: 2rpx solid #666666;border-radius: 50%;"></view>
			<text style="padding-left: 17rpx;">我同意</text><text class="gofwxy" @click='tiaozhuan' data-url='/pagesA/kefu/kefu?id=7' :data-shifou='true'>服务协议</text>
		</view>
		
		<view class="okbtnbox">
			<view class="okbtn" @click='zf_tip' >
				确认订单
			</view>
		</view>
		
		
		<!-- <yu-datetime-picker
		    ref="dateTime"
		    startYear="2015"
		    value="2019-11-10 08:30:01"
		    :isAll="false"
		    :current="false"
		    @confirm="onConfirm">
		</yu-datetime-picker> -->
		
		<yu-datetime-picker style="" @confirm="onConfirm" startYear="2015" ref="dateTime" value="2019-11-10 08:30:01" :isAll="false" :current="false"></yu-datetime-picker>

		
		
	</view>
</template>

<script>
	// import yuDatetimePicker from "@/components/yu-datetime-picker/yu-datetime-picker.vue"
	// box
	import api from '../../components/url.js';
	   import service from '../../service.js';
	   import Heat from "../../components/heat/heat.vue"
	// 底部  tabbar
	// import Tabbar from '../../components/tabBar/tabBar.vue'
	var that
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import Recommend from "../../components/recommend/recommend.vue"
	import Price from "../../components/price/price.vue"
	export default {
		components: {
			Recommend,
			Price,
			Heat
		},
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				shuju:'',
				date: currentDate,
				id:'',
				showxz: true,
				numval: 1,
				time: '请选择',
				monder:'',
				info:[
					{
						name:'',
						phone:'',
						IdCard:'',
					}
				]
			}
		},
		onReady() {
		},
		onLoad(option) {
			that=this
			console.log(option)
			that.id=option.id
			that.getdatas()
			
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo']),
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
			...mapMutations(['logout', 'login']),
			getimg_fuc(img) {
				return api.getimg(img)
			},
			tiaozhuan(e) {
				return api.tiaozhuan(e)
			
			},
			getdatas() {
				// console.log(that.id)
				var data = {
					id: that.id,
				}
				service.P_post('info/activity_make', data).then(res => {
					console.log(res)
					if (res.code == 1) {
						that.shuju = res.data
						console.log(that.shuju)
						that.monder=parseInt(that.shuju.price) * parseInt(that.numval)
						// that.user_shou = res.data.user.collection
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
			toggleTab(item, index) {  
				this.$refs.dateTime.show();  
			},  
			onConfirm(val) {
				that = this
				console.log(val); 
				that.time = val.selectArr[0]+'-'+ val.selectArr[1]+'-'+val.selectArr[2]
				// that.time = val.selectArr.[1]+ '-' +val.selectArr.[2]+'-'+val.selectArr.[3]
			},
			 bindDateChange: function(e) {
				this.date = e.target.value
			},
			 getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
	
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			jian(){
				if (this.numval > 1) {
					this.numval--
					// that.getdatas()
					that.info.pop()
				} else {
					uni.showToast({
						title: '再减就没有商品啦',
						icon: 'none',
					});
				}
			},
			numvals() {
				that.numval++
				var info_new={
					name:'',
					phone:'',
					IdCard:'',
				}
				that.info.push(info_new)
				// that.getdatas()
			},
			zf_tip(){
				if(!that.showxz){
					uni.showToast({
						icon:'none',
						title:'请先阅读服务协议'
					})
					return
				}
				var usermsg=true
				for(var i=0;i<that.info.length;i++){
					if(!that.info[i].name||!that.info[i].phone||!that.info[i].IdCard){
						usermsg=false
					}
				}
				if(!usermsg){
					uni.showToast({
						icon:'none',
						title:'请先填写预约人的信息'
					})
					return
				}
				uni.setStorageSync('yy_info',that.info)
				uni.navigateTo({
					url:'../pay/pay?id='+that.shuju.id+'&num='+that.numval+'&monder='+that.monder
				})
			}
		}
	}
</script>

<style scoped>
	 /* 数量加减 */
	 .shoppingNumber {
	 	width: 200upx;
	 	height: 50upx;
	 	border: 1px solid #999999;
	 	border-radius: 12upx;
	 	justify-content: space-between;
	 }
	 /* 减去商品数量 */
	 .minute {
	 	width: 55rpx;
	 	text-align: center;
	 	line-height: 50rpx;
	 	font-size: 40rpx;
	 	border-right: 1px solid #929292;
	 }
	 .input {
	 	width: 55rpx;
	 	height: 50upx;
	 	text-align: center;
	 	font-size: 25rpx;
	 	min-height: 0;
	 	/* margin-top: -5rpx; */
	 }
	 /* 添加商品数量 */
	 .add {
	 	width: 55rpx;
	 	border-left: 1px solid #929292;
	 	line-height: 50rpx;
	 	text-align: center;
	 	font-size: 35rpx;
	 }
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	.box{
		padding: 0 30rpx;
	}
	.intoimg{
		width: 30rpx;
		height: 30rpx;
		vertical-align: middle;
		margin-left: 18rpx;
	}
	.cfsjtime{
		vertical-align: middle;
		font-size: 28rpx;
		font-weight: bold;
		color: #79C2EF;
	}
	.xxtitstyle{
		font-size: 28rpx;
		font-weight: 400;
		color: #666666;
	}
	.xxbox{
		margin-top: 26rpx;
		padding: 0 19rpx;
		height: 255rpx;
		box-shadow: 0rpx 10rpx 19rpx 3rpx rgba(153, 153, 153, 0.08);
		border-radius: 8rpx;
	}
	.xxbox2{
		height: auto;
		padding: 35rpx 19rpx;
	}
	.remindertit{
		font-size: 28rpx;
		font-weight: bold;
		color: #1961B6;
		line-height: 48rpx;
	}
	.remindertxt{
		font-size: 24rpx;
		font-weight: 400;
		color: #333333;
		line-height: 48rpx;
	}
	.agree{
		width: 100%;
		text-align: center;
		position: fixed;
		bottom: 120rpx;
		padding-top: 10upx;
		padding-bottom: calc(20upx + constant(safe-area-inset-bottom));
		padding-bottom: calc(20upx + env(safe-area-inset-bottom));
		background: #fff;
	}
	.agree text{
		font-size: 24rpx;
		font-weight: bold;
		color: #666666;
	}
	.agreeimg{
		width: 30rpx;
		height: 30rpx;
		vertical-align: middle;
	}
	.gofwxy {
		text-decoration:underline;
	}
	.okbtnbox{
		width: 100%;
		position: fixed;
		padding-top: 20rpx;
		bottom: 0;
		z-index: 1;
		padding-bottom: 0;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		box-shadow: 0rpx -10rpx 19rpx 3rpx rgba(153, 153, 153, 0.08);
		background-color: #FFFFFF;
	}
	.okbtn{
		width: 690rpx;
		height: 80rpx;
		background: #79C2EF;
		border-radius: 40rpx;
		font-size: 30rpx;
		font-weight: bold;
		color: #FFFFFF;
		line-height: 80rpx;
		text-align: center;
		margin: 0 auto 20rpx;
	}
	.numbox{
		width: 200rpx;
		height: 50rpx;
		border: 1rpx solid #999999;
		border-radius: 12rpx;
		font-size: 28rpx;
		font-weight: bold;
		color: #333333;
		text-align: center;
	}
	.numbox>input{
		width: 90rpx;
		flex-shrink: 0;
	}
	.numbox>view{
		flex: 1;
		height: 100%;
	}
	.g_price{
		font-size: 22rpx;
		font-weight: bold;
		color: #1961B6;
	}
	.big{
		font-size: 40rpx;
	}
	.color_h{
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
	
</style>
