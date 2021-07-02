<template>
	<view class="mark_box">
		<view v-if="htmlReset==1" class="minh100_90" >
			<view class="data_lost tac">
				<image src="/static/images/zdl.png" mode="widthFix" class="data_img"></image>
				<view class="fz30 c6 mb10">服务器走丢了</view>
				<view class="fz24 c9 mb30">别紧张，试试看刷新页面</view>
				<button type="primary" plain="true" class="refresh_btn" @click="onRetry">刷新</button>
			</view>
		</view>
		<view v-if="htmlReset==2" class="minh100_90" >
			<view class="data_lost tac">
				<image src="/static/images/zdl.png" mode="widthFix" class="data_img"></image>
				<view class="fz30 c6 mb10">网络连接失败</view>
				<view class="fz24 c9 mb30">请确认手机网络</view>
			</view>
		</view>
		<view v-if="htmlReset==-1"  class="loading_def minh100">
				<image class="loading_def_img" src="../../static/images/loading.gif" mode=""></image>
		</view>
		<view v-show="htmlReset==0">
			<view>
				<slot></slot>
			</view>
			
		</view>
		<!-- 其他公共组件 -->
		<!-- <bao-jing v-if="bj_show"></bao-jing> -->
	</view>
</template>

<script>
	export default {
		props: {
			bj_show:{
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				htmlReset: -1
			}
		},
		methods: {
			onRetry(e){
				this.$emit('Retry', e);
			},
			htmlReset_fuc(num) {
				this.htmlReset=num
				console.log('this.htmlReset-----------?>')
				console.log(this.htmlReset)
			},
			maskHide() {
				if(this.tapMaskHide) this.hide();
			},
			hide() {
				this.showBl = false;
			},
			voidFc() {}
		}
	}
</script>

<style scoped>
	.minh100_90{
		position: relative;
		/* z-index: 900; */
		min-height: 70vh;
	}
	.mark_box {
		background: #fff;
	/* 	position: fixed;
		top: var(--window-top);
		left: 0;
		right: 0;
		bottom: var(--window-bottom); */
	}
	.data_img {
		width: 240rpx;
		height: 240rpx;
		margin: auto;
		margin-bottom: 20rpx;
	}
	.data_lost {
		position: absolute;
		top: 50%;
		left:50%;
		max-width: 100%;
		transform: translate3d(-50%, -50%,0);
		z-index: 11;
	}
	.tac{
		text-align: center;
	}
	.refresh_btn {
		width: 200rpx;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 24rpx;
	}
	.zanwu{
		width: 100%;
		line-height: 240rpx;
		text-align: center;
		font-size: 28rpx;
		color: #999;
	}
	.loading_def{
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #fff;
		z-index: 900;
	}
	.loading_def_img{
		width: 200rpx!important;
		height: 200rpx!important
	}
</style>
