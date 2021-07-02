<template>
	<view>
		<htmlLoading ref="htmlLoading" @Retry='getdata' :bj_show="false">
		
		
		<view class="box">
			<view class="card"  @click='jump' :data-url="'../about/about?id='+id+'&type=10'" :data-shifou='false'>
				<image :src="getimg('/static_xcx/education/zsgy.png')" mode="aspectFill"></image>
				<view class="dis_flex_c">
					<text class="tit">关于{{datas.easy_title}}</text>
					<text class="txt">查看{{datas.easy_title}},了解{{datas.easy_title}}的相关知识</text>
				</view>
			</view>
			<view class="cardB dis_flex ju_b">
				<view class="card" v-for="(item,index) in zslist" :key="index" @click='jump' :data-url="'../about/about?id='+id+'&type='+index">
					<image :src="getimg(item.img)" mode="aspectFill"></image>
					<view class="dis_flex_c">
						<text class="tit">{{item.tit}}</text>
						<text class="txt">查看{{datas.easy_title}}{{item.txt}}</text>
					</view>
				</view>
			</view>
			
			
			<view class="zgbox dis_flex_c">
				<text class="zgtit">访客资格的获得</text>
				<text class="zgtxt1">访客将通过生态体验访客测试，成为生态访客，方可获得{{datas.easy_title}}生态体验资格。</text>
				<text class="zgtxt2">总成绩{{datas.passing_score}}分以上获得{{datas.easy_title}}生态体验资格。</text>
			</view>
			
			<view class="agree" @click='jump' :data-url="'../test/test?id='+datas.id">
				<image :src="getimg('/static_xcx/education/agree.png')" mode="aspectFit"></image>
				<text>云享自然生态体验平台用户使用协议</text>
			</view>
			
			
		</view>
		
		
		
		<view v-if="datas.user_type==2" class="bottombtnbox"  @click='jump' :data-url="'../test/test?id='+datas.id" :data-login="true" :data-haslogin="hasLogin">
			<view class="bottombtn">访客测试</view>
		</view>
		<view v-if="datas.user_type==1&datas.img_type==1" class="bottombtnbox">
			<view class="bottombtn">访客测试已通过</view>
		</view>
		<view v-if="datas.user_type==1&datas.img_type==2" class="bottombtnbox"  @click='jump' :data-url="'/pagesA/qsxy/qsxy?id='+datas.questions_id" :data-login="true" :data-haslogin="hasLogin">
			<view class="bottombtn">签署协议</view>
		</view>
		
		</htmlLoading>
	</view>
</template>

<script>
	import api from '../../components/url.js';
	import service from '../../service.js';
	   
	// 底部  tabbar
	// import Tabbar from '../../components/tabBar/tabBar.vue'
	var that
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				id:'',
				zslist: [
					{img:'/static_xcx/education/zsdl.png',tit:'地理知识',txt:'地理知识'},
					{img:'/static_xcx/education/zsdw.png',tit:'动物知识',txt:'动物知识'},
					{img:'/static_xcx/education/zszw.png',tit:'植物知识',txt:'植物知识'},
					{img:'/static_xcx/education/zsrw.png',tit:'人文知识',txt:'人文知识'}
				],
				datas:'',
				show_num:0
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo'])
		},
		onLoad(option) {
			that=this
			that.id=option.id
			that.getdata()
		},
		onShow() {
			if(that.show_num>0){
				that.getdata()
			}
			that.show_num++
		},
		methods: {
			...mapMutations(['logout', 'login']),
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
				return service.getimg(img)
			},
			jump(e) {
				return service.jump(e)
			
			},
		}
	}
</script>

<style scoped>
	.box{
		margin-top: 20rpx;
		padding: 0 30rpx;
	}
	
	.card>image,.card>view{
		width: 100%;
		height: 190rpx;
		border-radius: 8rpx;
	}
	.card{
		position: relative;
		margin-bottom: 26rpx;
	}
	.cardB{
		flex-wrap: wrap;
	}
	.cardB>.card{
		width: 48%;
	}
	.card>view{
		position: absolute;
		top: 0;
		padding: 40rpx 46rpx;
	}
	
	.tit{
		font-size: 28rpx;
		font-weight: bold;
		color: rgba(255,255,255,0.9);
	}
	.txt{
		margin-top: 20rpx;
		font-size: 24rpx;
		font-weight: 400;
		color: rgba(255,255,255,0.8);
	}
	.agree{
		
		
		
		width: 100%;
		text-align: center;
		position: fixed;
		bottom: 140rpx;
		left: 0;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		box-sizing: border-box;
		
		
	}
	.agree>image{
		width: 30rpx;
		height: 30rpx;
		border-radius: 50%;
		vertical-align: middle;
	}
	.agree>text{
		font-size: 24rpx;
		font-weight: bold;
		text-decoration: underline;
		color: #666666;
		margin-left: 16rpx;
	}
	.zgtit{
		font-size: 30rpx;
		font-weight: bold;
		color: #358540;
		text-align: center;
	}
	.zgtxt1{
		font-size: 24rpx;
		font-weight: 400;
		color: #666666;
		line-height: 44rpx;
		margin-top: 29rpx;
	}
	.zgtxt2{
		font-size: 24rpx;
		font-weight: 400;
		color: #74B565;
		margin-top: 27rpx;
	}
	.zgbox{
		margin-top: 18rpx;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	.bottombtnbox{
		width: 100%;
		position: fixed;
		bottom: 0;
		z-index: 999;
		padding-bottom: 0;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		background: #FFFFFF;
		box-shadow: 0rpx -10rpx 19rpx 3rpx rgba(153, 153, 153, 0.08);
		
	}
	.bottombtn{
		margin: 20rpx auto;
		width: 690rpx;
		height: 80rpx;
		background: #358540;
		border-radius: 40rpx;
		font-size: 30rpx;
		font-weight: bold;
		color: #FFFFFF;
		line-height: 80rpx;
		text-align: center;
	}
</style>
