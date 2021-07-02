<template>
	<view class="search dis_flex aic ju_c">
		<input class="s_input" type="text" @focus="ininput" @blur="outinput"  v-model="searchval" :disabled="!searchbtn" />
		<view class="searchcontent" v-show="show">
			<image class="s_img" :src="getimg('/static_xcx/index/ss.png')" mode="aspectFit"></image>
			<text class="s_txt">输入搜索内容</text>
		</view>
	</view>
</template>

<script>
	import api from '../../components/url.js';
	   
	var that
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		props:[
			// input 是否可以点击
			'searchbtn',
			// 猜你想找的value
			'searchtext'
		],
		data() {
			return {
				// 显示搜索框上的内容
				show: true,
				// input的value
				searchval: ''
			}
		},
		onLoad() {
			that = this
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo'])
		},
		watch:{
			searchtext(newVal) {
				if(newVal){
					this.show = false
					this.searchval = newVal
				}
			}
		},
		methods:{
			...mapMutations(['logout', 'login']),
			getimg(img) {
				return api.getimg(img)
			},
			tiaozhuan(e) {
				return api.tiaozhuan(e)
			},
			ininput(){
				this.show = false
			},
			outinput(){
				if(this.searchval == ''){
					this.show = true
				}
			}
		}
	}
</script>

<style scoped>
	/* 搜索  开始 */
	.search {
		position: relative;
	}
	
	.s_input {
		width: 100%;
		height: 58rpx;
		background: rgba(153, 153, 153, 0.3);
		border-radius: 29rpx;
		font-size: 24rpx;
		text-align: center;
	}
	
	/* 搜索图片和文字  开始 */
	.searchcontent {
		position: absolute;
	}
	
	.s_img {
		width: 40rpx;
		height: 40rpx;
		vertical-align: middle;
	}
	
	.s_txt {
		font-size: 24rpx;
		font-weight: 400;
		color: #666666;
	}
	
	/* 搜索图片和文字  结束 */
	/* 搜索  结束 */
</style>
