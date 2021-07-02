<template>
	<view class="address-nav">
		<view class="address-nav-item" v-for="(item,index) in addressNav" :key="index" @click="jump" :data-url="'/pagesA/shopType/shopType?id='+ item.id+'&text='+item.title">
			<view class="img">
				<image :src="getimg(item.img_url)" mode="aspectFill"></image>
			</view>
			<view class="text">
				<text>{{ item.title }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '../../components/url.js';
	import service from '../../service.js'
	var that
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		name: "address-nav",
		props:[
			'addressNav'
		],
		data() {
			return {

			};
		},
		onLoad() {
			that = this
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo'])
		},
		
		methods: {
			...mapMutations(['logout', 'login']),
			getimg(img) {
				return service.getimg(img)
			},
			jump(e) {
				return service.jump(e)
			},
			address_nav_to(item){
				console.log(item)
				uni.navigateTo({
					// url:item.url+'?text='+ JSON.stringify(item)
					url:item.url+'?text='+ item.text
				})
			},
		}
	}
</script>

<style lang="scss">
	.address-nav {
		width: 690rpx;
		height: 139rpx;
		display: flex;
		flex-direction: row;

		// background-color: #0077AA;
		.address-nav-item {
			width: 172rpx;
			height: 100%;
			// background-color: #FFFDEF;
			display: flex;
			flex-direction: column;
			box-sizing: border-box;
			padding: 59rpx 0 0rpx 0;
			text-align: center;
			

			.img {
				width: 100%;
				height: 80rpx;
				box-sizing: border-box;
				padding: 0 46rpx;
				margin-bottom: 20rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.text {
				padding: 0 17rpx;
				width: 100%;
				box-sizing: border-box;

				text {
					font-size: 24rpx;
					line-height: 38rpx;
					max-width: 240rpx;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
					color: #333333;
				}
			}
		}
	}
</style>
