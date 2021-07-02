<template>
	<view class="box">
		<view class="search dis_flex aic">
			<!-- <Search :searchbtn="true" :searchtext="searchtext"></Search> -->
			<image class="s_img" :src="getimg('/static_xcx/index/ss.png')" mode="aspectFit"></image>
			<input class="s_input" type="text"  v-model="searchtext" @confirm="search_fuc"  placeholder="请输入搜索内容"/>
		</view>
		<view v-if="datas.like&&datas.like.length>0" class="searchbox findbox">
			<text>猜你想找</text>
			<view class="finds dis_flex">
				<text class="find" v-for="(item,index) in datas.like" :key="index" @click="findbtn(index)">{{item}}</text>
			</view>
		</view>
		<view v-if="datas.list&&datas.list.length>0" class="searchbox recommendbox"  >
			<text>云享推荐</text>
			<view v-if="datas.list.length>0" class="heatgoods dis_flex ju_b">
				<view class="goods dis_flex_c ju_b" v-for="(item,index) in datas.list" :key="index" @click='jump' :data-url="'/pagesA/detail/detail?id='+item.id" :data-shifou='false'>
					<image :src="getimg(item.banner)" mode="aspectFill"></image>
					<text class="oh1">{{item.title}}</text>
					<view class="goodsprice dis_flex aife ju_b">
						<Price>
							<text slot="num">{{item.price}}</text>
						</Price>
						<text>已售 {{item.sales}}</text>
					</view>
				</view>
			</view>
			<view v-if="goods.length==0" class="zanwu">暂无数据</view>
			<view v-if="goods.length>0&&data_last" class="data_last">到底了~~</view>
		</view>
	</view>
</template>

<script>
	// 搜索
	import Search from '../searchs/searchs.vue'
	// box
	import service from '../../service.js';
	var that
	export default {
		components: {
			Search
		},
		data(){
			return {
				findlist: [
					'商品1',
					'商品1',
					'商品1',
					'商品1',
					'商品1',
				],
				searchtext: '',
				datas:[],
				page:1,
				data_last:false
			}
		},
		onLoad(option) {
			that = this
			
			that.onRetry()
		},
		methods:{
			search_fuc(e){
				console.log(e.detail.value)
				uni.navigateTo({
					url:'/pagesA/shopType/shopType?searchtype=1&search='+that.searchtext
				})
			},
			onRetry(){
				that.page=1
				that.data_last=false
				that.btn_kg=0
				that.getgoods_data()
			},
			getgoods_data(){
				var jkurl='/search_index'
				var data={
					type:2  //type 1、首页 2、商品
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
						var datas = res.data
						console.log(typeof datas)
				
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
							that.datas = datas.data
				
					} else {
				
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
			
			},
			findbtn(index){
				this.searchtext = this.datas.like[index]
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
		width: 100%;
		background: rgba(153, 153, 153, 0.3);
		height: 58rpx;
			
		border-radius: 29rpx;
		padding: 0 15upx;
	}
	.s_img {
		width: 40rpx;
		height: 40rpx;
		margin-right: 10upx;
	}
	.s_input {
		flex: 1;
		height: 58rpx;
	
		border-radius: 29rpx;
		font-size: 24rpx;
		/* text-align: center; */
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
	
	.heatgoods{
		flex-wrap: wrap;
		margin-bottom: 10rpx;
	}
	
	.goods{
		width: 330rpx;
		margin-top: 38rpx;
	}
	
	.goods>image{
		width: 100%;
		height: 400rpx;
	}
	
	.goods>text{
		width: 100%;
		font-size: 28rpx;
		font-weight: bold;
		color: #333333;
		margin-top: 33rpx;
	}
	
	.goodsprice{
		margin-top: 23rpx;
	}
	
	.goodsprice>text{
		font-size: 22rpx;
		font-weight: 400;
		color: #999999;
		padding-bottom: 4rpx;
	}
</style>
