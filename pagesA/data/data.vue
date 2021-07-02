<template>
	<view class="content">
		<view class=" pt15 ">
			<view class="  pl15 pr15">
				<view class="flex align-items-center   pb15  flex-between ">
					<text class="fs13 fwb">头像</text>
					<!-- 	<image src="../../static_xcx/adatu.png" mode="aspectFill" class="tou"></image> -->
					<view class="flex align-items-center">
						<avatar selWidth="250rpx" selHeight="250rpx" @upload="myUpload"
							:avatarSrc="avatar"
							avatarStyle="width: 120rpx;height: 120rpx;border-radius: 50%;" inner=true></avatar>
						<image :src="getimg('/static_xcx/fanh.png')" mode="aspectFill"
							style="width: 11rpx; height: 20rpx; margin-left: 18rpx;" class="pl10"></image>
					</view>
				</view>
				<view class="flex align-items-center pt15  pb15  flex-between ">
					<text class="fs13 fwb">昵称</text>
					<view class="flex align-items-center">
						<input type="text" placeholder="输入昵称" v-model="username" class="c9 fs14 text-right" />
						<image :src="getimg('/static_xcx/fanh.png')" mode="aspectFill"
							style="width: 11rpx; height: 20rpx; margin-left: 18rpx;" class="pl10"></image>
					</view>
				</view>

				<view class="bao cf flex align-items-center justify-center fs15 absolute bottom20 " @click="baocun">
					保存
				</view>
			</view>
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
		data() {
			return {
				nickname: '',
				username: '',
				mailbox: '',
				avatar: '/static_xcx/logo.png',
				value: '',
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo'])
		},
		onLoad() {
			that = this
			
		},
		methods: {
			...mapMutations(['logout', 'login']),
			getimg(img) {
				return api.getimg(img)
			},
			tiaozhuan(e) {
				return api.tiaozhuan(e)
			},
			baocun() {
				uni.showToast({
					title: '修改成功',
					icon: 'none',
				});
				setTimeout(function() {
					wx.navigateBack({
						delta: 1
					})
				}, 1000)
				},
			// 更新头像
			myUpload(rsp) {
				that.avatar = rsp.path

				wx.uploadFile({
					url: api.IPurl + 'Base/upload', //仅为示例，非真实的接口地址
					filePath: that.avatar,
					name: 'file',
					formData: {

					},
					header: {
						'Authorization': uni.getStorageSync('token') || '',
					},
					success(res) {
						// const data = JSON.parse(res.data)
						// console.log(res.data)
						// that.avatar = data.data
						// that.getimg()
						//do something
					}
				})

			},
			openChooseImg() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择，和摄像头功能，默认二者都有
					success: res => {
						console.log(res)
						/*res.tempFilePaths[0]是获取到的第一个数据的blob地址，将他赋值给数据区的imgUrl*/
						that.avatar = res.tempFilePaths[0]
						console.log(that.avatar)
					}
				});
			},
			
		}
	}
</script>

<style>
	page {
		background-color: #fff;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
	}

	.content {
		background-color: #fff;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
	}

	.mian {
		width: 690rpx;
		background: #FFFFFF;
		box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
		border-radius: 10rpx;
	}

	.tou {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
	}

	.bao {
		width: 690rpx;
		height: 82rpx;
		background: linear-gradient(-25deg, #FD7218, #FE9D30);
		border-radius: 10rpx;
	}

	/* .my-avatar {
		width: 80rpx !important;
		height: 80rpx !important;
	} */
</style>
