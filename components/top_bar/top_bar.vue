<template>
	<view>
		<view class="dh_top" :class="bg_img?'cf':''" :style="'height: '+CustomBar+'px;background-color:'+bg_color">
			<image v-if="bg_img" class="nav_bar_img" :src="bg_img" mode="widthFix"></image>
			<!-- <text class=""></text>
			<text>个人中心</text>
			<text class=""></text> -->
			<slot></slot>
		</view>
		<view v-if="have_top" class="dh_top dh_top1" :style="'height: '+CustomBar+'px;'"></view>
	</view>
</template>

<script>
	var that
	export default {
		name:"top_bar",
		props: {
			bg_img:{
				type: String,
				default: ''
			},
			bg_color:{
				type: String,
				default: ''
			},
			have_top:{
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
			};
		}
	}
</script>

<style scoped>
	.dh_top{
		width: 100vw;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 990;
		background: #fff;
		padding: var(--status-bar-height) 15upx 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		overflow: hidden;
	}
	.dh_top1{
		opacity: 0;
		position: relative;
	}
	.dh_top>.nav_bar_img{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		width: 100vw;
		height: auto;
		z-index: 991;
	}
	.dh_top /deep/ text{
		position: relative;
		z-index: 	992;
		color: #333;
	}
	.cf  /deep/ text{
		color: #fff;
	}
</style>
