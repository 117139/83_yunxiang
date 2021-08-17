<template>
	<view>
		<view class="dis_flex_c aic">
			
			
			<image v-if="option.ok_type==1" :src="getimg('/static_xcx/education/resultres.png')" mode="aspectFit"></image>
			<image v-else :src="getimg('/static_xcx/education/resulterr.png')" mode="aspectFit"></image>
			
			
			<text class="tit" v-if="option.ok_type==1">恭喜您！测试通过</text>
			<text class="tit tit2" v-else>抱歉，测试未通过</text>
			
			
			
			<text class="txt">您的测试成绩为{{option.score}}分</text>
			<text class="txt txt2">其中单选题得分{{option.one}}分，多选题得分{{option.two}}分</text>
			
			
		</view>
		
		
		<view class="bottombtnbox">
		   <view class="bottombtn" v-if="option.ok_type==1" @click='jump' :data-url="'/pagesA/qsxy/qsxy?id='+option.id"  :data-login="true" :data-haslogin="hasLogin" 
		   :data-type="3">签署协议</view>
		   <view class="bottombtn" v-else @click="back">我知道了</view>
		  </view>
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
				option: true
			}
		},
		onLoad(option) {
			that=this
			that.option=JSON.parse(option.datas)
			that.getdata()
		},
		computed: {
			...mapState(['hasLogin'])
		},
		methods: {
			...mapMutations(['logout', 'login']),
			getimg(img) {
				return service.getimg(img)
			},
			jump(e) {
				 service.jump(e)
			
			},
			back() {
				// setTimeout(function() {
					wx.navigateBack({
						delta: 1
					})
				// }, 1000)
			}
		}
	}
</script>

<style scoped>
	image{
		width: 100rpx;
		height: 100rpx;
		margin-top: 143rpx;
	}
	
	
	.tit{
		font-size: 44rpx;
		font-weight: bold;
		color: #358540;
		margin-top: 55rpx;
	}
	.tit2{
		font-size: 44rpx;
		font-weight: bold;
		color: #333333;
	}
	.txt{
		font-size: 28rpx;
		font-weight: 400;
		color: #666666;
		line-height: 48rpx;
		margin-top: 590rpx;
	}
	.txt2{
		margin-top: 0rpx;
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
