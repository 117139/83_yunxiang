<template>
	<view class="box">
		<view class="search">
			<Search :searchbtn="true" :searchtext="searchtext"></Search>
		</view>
		<view class="searchbox findbox">
			<text>猜你想找</text>
			<view class="finds dis_flex">
				<text class="find" v-for="item,index in findlist" :key="index" @click="findbtn(index)">{{item}}</text>
			</view>
		</view>
		<view class="searchbox recommendbox">
			<text>云享推荐</text>
			<view class="recommends">
				<Recommend></Recommend>
			</view>
		</view>
	</view>
</template>

<script>
	// 搜索
	import Search from '../searchs/searchs.vue'
	// box
	import Recommend from "../../components/recommend/recommend.vue"
	export default {
		components: {
			Search,
			Recommend
		},
		data(){
			return {
				findlist: [
					'三江源国家公园',
					'祁连山国家公园',
					'三江源公园黄河源区',
					'三江源国家公园',
					'祁连山国家公园',
				],
				searchtext: ''
			}
		},
		methods:{
			findbtn(index){
				this.searchtext = this.findlist[index]
			}
		}
	}
</script>

<style>
	.box{
		padding: 0 30rpx 98rpx;
	}
	.search{
		margin-top: 20rpx;
	}
	.searchbox>text{
		font-size: 24rpx;
		font-weight: 400;
		color: #666666;
	}
	.findbox{
		margin-top: 56rpx;
	}
	.finds{
		width: calc(100% + 16rpx);
		flex-wrap: wrap;
	}
	.find{
		padding: 19rpx 24rpx;
		background: rgba(153,153,153,0.2);
		border-radius: 8rpx;
		font-size: 22rpx;
		font-family: PingFang;
		font-weight: 400;
		color: #333333;
		margin-top: 26rpx;
		margin-right: 16rpx;
	}
	.recommendbox{
		margin-top: 56rpx;
	}
</style>
