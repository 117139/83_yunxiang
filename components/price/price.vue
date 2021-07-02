<template>
	<view class="g_price">
		<text>￥</text>
		<text class="big">
			<slot name="num"></slot>
		</text>
		<text class="color_h" v-show="yyxq != 'yyxq'">元</text>
	</view>
</template>

<script>
	export default {
		props:['yyxq'],
		data(){
			return {
			}
		}
	}
</script>

<style scoped>
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
	
</style>
