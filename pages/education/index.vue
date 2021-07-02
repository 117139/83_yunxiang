<template>
	<view>
		<uni-nav-bar fixed="true" class="status_title" color="#000000" statusBar="true" title="自然课堂"></uni-nav-bar>
		<htmlLoading ref="htmlLoading" @Retry='onRetry' :bj_show="false">
			<view class="box">
				<view class="hjjybox" v-for="(item,index) in datas" :key="index" @click='jump' :data-url="'/pagesA/particularsed/particularsed?id='+item.id" :data-shifou='false'>
					<image class="bgimg" :src="getimg(item.img_url)" mode="aspectFill"></image>
					<view class="txtbox dis_flex_c ju_b">
						<text class="hjjytxt oh1">{{item.title}}</text>
						<text class="hjjytxt oh1">{{item.subtitle}}</text>
						<view class="hjjybtn">自然课堂</view>
					</view>
				</view>
				<view v-if="datas.length==0" class="zanwu">暂无数据</view>
				<view v-if="datas.length>0&&data_last" class="data_last">到底了~~</view>
			</view>
		</htmlLoading>
		
		<Tabbar :tabbarlist="tabbarlist" :navActive="1"></Tabbar>
		
	</view>
</template>

<script>
	import Tabbar from "../../components/tabBar/tabBar.vue"
	import api from '../../components/url.js';
	 
	import service from '../../service.js';
	// 底部  tabbar
	// import Tabbar from '../../components/tabBar/tabBar.vue'
	var that
	import {
		mapState,
		mapMutations
	} from 'vuex'
	var that
	export default {
		components: {
			Tabbar
		},
		data() {
			return {
				show_num:0,
				datas:'',
				data_last:false,
				page:1,
				tabbarlist:[
					{
						txt: '访客预约',
						img: '/static_xcx/education/nav1.png',
					},{
						txt: '自然课堂',
						img: '/static_xcx/education/nav2.png',
					},{
						txt: '商城',
						img: '/static_xcx/education/nav3.png',
					},{
						txt: '我的',
						img: '/static_xcx/education/nav5.png',
					}
				]
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo'])
		},
		// onPullDownRefresh() {
		// 	that.onRetry()
		// },
		onReachBottom() {
			that.getdata()
		},
		onLoad(option) {
			that = this
			// that.city = option.city
			// this.amapPlugin = new amap.AMapWX({  
			// 		key: that.key  
			// });  
			
			that.onRetry()
		},
		onShow() {
			if(that.show_num>0){
				return
			}
			that.show_num++
			that.onRetry()
		},
		methods: {
			...mapMutations(['logout', 'login']),
			onRetry(){
				that.page=1
				that.data_last=false
				that.btn_kg=0
				that.getdata()
			},
			getdata(){
				var jkurl='/education/list'
				var data={
					page:that.page,
					limit:20
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
			
			}
			
		}
	}
</script>

<style scoped>
	.status_title {
		font-size: 34rpx;
		font-family: PingFang;
		font-weight: bold;
	}
	.box{
		padding: 0 30rpx;
		margin-top: 20rpx;
	}
	.hjjybox{
		position: relative;
		margin-bottom: 20rpx;
	}
	.bgimg{
		width: 100%;
		height: 240rpx;
		border-radius: 8rpx;
	}
	.txtbox{
		position: absolute;
		top: 0;
		width: 100%;
		height: 240rpx;
		padding: 44rpx 55rpx;
	}
	.hjjybtn{
		width: 180rpx;
		font-size: 24rpx;
		font-weight: bold;
		color: rgba(255,255,255,0.8);
		background: #358540;
		border-radius: 50rpx;
		padding: 14rpx 0;
		margin-top: 10rpx;
		text-align: center;
	}
	.hjjytxt{
		font-size: 30rpx;
		font-weight: bold;
		color: rgba(255,255,255,0.8);
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	/* Tabbar组件的样式   开始 */
	/deep/.tabBar{
		background-color: #358540;
	}
	/* /deep/.tabbartxt{
		color: #fff;
	}
	/deep/.nav{
		opacity: 0.7;
	}
	/deep/.nav_activt{
		opacity: 1;
	} */
	/* Tabbar组件的样式   结束 */
</style>
