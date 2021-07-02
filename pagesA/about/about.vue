<template>
	<view>
		<htmlLoading ref="htmlLoading" @Retry='getdata' :bj_show="false">
			<view class="xmfwb_box">
				<!-- <image class="imgs" :src="getimg('/static_xcx/index/banner.png')" mode="aspectFill"></image> -->
				<view v-if="options.type==0" v-html="get_fwb(datas.position)"></view>
				<view v-if="options.type==1" v-html="get_fwb(datas.animal)"></view>
				<view v-if="options.type==2" v-html="get_fwb(datas.botany)"></view>
				<view v-if="options.type==3" v-html="get_fwb(datas.humanity)"></view>
				<view v-if="options.type==10" v-html="get_fwb(datas.about)"></view>
				<view v-if="options.type==11" v-html="datas.about">三江源地区位于青藏高原腹地，平均海拔4000米以上，总面积39.5万平方公里。它对于中国有多重要？如果说世界上每一个伟大文明的形成和发展，都需要一个为之度身定制的地理空间作为孕育温床，那么对中国来说，青藏高原与三江源地区，正是塑造中华文明独一无二的地理空间和历史场域。</view>
			</view>
		</htmlLoading>
	</view>
</template>  

<script>
	import api from '../../components/url.js';
	import service from '../../service.js';
	   
	// 底部  tabbar
	// import Tabbar from '../../components/tabBar/tabBar.vue'
	
	import {
		mapState,
		mapMutations
	} from 'vuex'
	var that
	export default {
		components:{
			// Tabbar
		},
		data() {
			return {
				id:'',
				options:'',
				datas:''
			}
		},
		onHide() {
	
		},
		onLoad(option) {
	
			that = this
			that.id=option.id
			that.options=option
			if(option.type==0){
				uni.setNavigationBarTitle({
					title:'地理知识'
				})
			}
			if(option.type==1){
				uni.setNavigationBarTitle({
					title:'动物知识'
				})
			}
			if(option.type==2){
				uni.setNavigationBarTitle({
					title:'植物知识'
				})
			}
			if(option.type==3){
				uni.setNavigationBarTitle({
					title:'人文知识'
				})
			}
			that.getdata()
		},
		onShow() {
		
		},
	
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo'])
		},
		methods: {
			...mapMutations(['logout', 'login']),
			get_fwb(str){
				if(!str){
					return str
				}
				return service.get_fwb(str)
			},
			getdata(){
				var jkurl='/education/detail'
				var data={
					id:that.id
				}
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
						that.datas=datas
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
			getimg(img) {
				return api.getimg(img)
			},
			tiaozhuan(e) {
				return api.tiaozhuan(e)
			
			}
		}
	}
</script>

<style scoped>
	.box{
		margin-top: 20rpx;
		padding: 0 30rpx;
	}
	.imgs{
		width: 100%;
		height: 320rpx;
	}
	.tit{
		padding-top: 25rpx;
		text-align: center;
		font-size: 30rpx;
		font-weight: bold;
		color: #000000;
	}
	.txt{
		padding: 26rpx 0;
		font-size: 24rpx;
		font-weight: 400;
		color: #000000;
		line-height: 44rpx;
	}
	.xmfwb_box{
		padding: 10upx 30upx;
	}
</style>
