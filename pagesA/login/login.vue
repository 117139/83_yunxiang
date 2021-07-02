
<template>
	<view class="content"> 
		<!-- <image class="logo" src="../" mode="aspectFill"></image> -->
		<image :src="getimg('/static_xcx/lofin.png')" mode="aspectFit" class="loge"></image>
		<view class="title pt20 ">
			云享自然
		</view> 
		<view class="shuju"> 
			登录表示您同意<text @tap="jump" data-url="/pagesA/kefu/kefu?id=3">《法律声明和隐私权限》</text>
		</view>
		<image :src="getimg('/static_xcx/wei.png')" mode="aspectFill" class="wei"></image>
		<!-- @getphonenumber  获取用户手机号，可以从@getphonenumber回调中获取到用户信息-->
		<button v-if="canIUseGetUserProfile" @tap="getUserProfile" class="btn"> 微信用户一键登录 </button>
		<button v-else class="btn" open-type="getUserInfo" @getuserinfo="getUserInfo">微信用户一键登录</button>

	</view>
</template>

<script> 
	import api from '../../components/url.js'
	import service from '../../service.js'
	// vuex
	import {
		mapState,
		mapMutations
	} from 'vuex'
	// 全局this   
	var that
	export default {
		data() {
			return {
				canIUseGetUserProfile: false,
			}
		},
		onLoad() {
			that = this
			if (wx.getUserProfile) {
				that.canIUseGetUserProfile = true
			}
		},
		computed: mapState(['forcedLogin', 'hasLogin', 'univerifyErrorMsg', 'hideUniverify']),
		methods: {
			...mapMutations(['login']), 
			jump(e){
				service.jump(e)
			},
			getimg(img) {
				return api.getimg(img)
			},
			// 旧版本
			getUserInfo(e) { 
				// 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息

				wx.login({
					success: function(res_login) {
						if (res_login.code) {
							wx.getUserInfo({
								withCredentials: true,
								success: function(res_user) {
									// console.log(res_user)
									uni.setStorageSync('encryptedData', res_user.encryptedData);
									uni.setStorageSync('iv', res_user.iv);
									uni.setStorageSync('userInfo', e.detail.userInfo);
									service.wxlogin(1)
								}
							});
						}
					}

				})
			},
		// 新版本
			getUserProfile(e) {
				// 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
				// 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
				wx.getUserProfile({
					desc: '用于获取用户资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
					success: (res) => {
						console.log(res)
						uni.setStorageSync('userInfo', res.userInfo);
						uni.setStorageSync('encryptedData', res.encryptedData);
						uni.setStorageSync('iv', res.iv);
						service.wxlogin(1)
					}
				})
			},
			// 调用接口获取数据 登录
			wxlogin() {
				// 单个请求
				wx.login({
					success(res) {
						if (res.code) {
							const value = uni.getStorageSync('userInfo');
							var encryptedData = uni.getStorageSync('encryptedData');
							var iv = uni.getStorageSync('iv');
							//发起网络请求
							if (!encryptedData) {
								encryptedData = ''
							}
							if (!iv) {
								iv = ''
							}
							var data = { 
								code: res.code,
								nickname: value.nickName,
								avatar: value.avatarUrl,
								encryptedData: encryptedData,
								iv: iv,
							}
							//弹出提示框
							uni.showLoading({ 
								title:'正在登录...',
								mask:true
							})
							api.P_post('minapp/login', data).then(res => {
								console.log(res)
								if (res.code == 1) {
                                     uni.showToast({
                                       title: '登录成功',
                                       icon: 'none',
                                     })
									 uni.setStorageSync('token', res.data.token)
									 uni.setStorageSync('userinfo', res.data.userinfo)
									console.log(res.data.userinfo)
									that.login(res.data.userinfo);     
										 
									 setTimeout(function() {
										wx.navigateBack({
										  delta: 1
										})
									 },1000)

								} else {
									if(!res.msg) {
										uni.showToast({
											title:'失败',
											  icon: 'none',
										});
									}else {
										uni.showToast({
											title: res.msg,
											  icon: 'none',
										});
									}
                                    
								}
							}).catch(e => {
								console.log(e)
							})
						} else {
							console.log('登录失败！' + res.errMsg)
						}
					}
				})


			},
			// toMain(userinfo) {
			// 	this.login(userinfo);  
			// 	/**
			// 	 * 强制登录时使用reLaunch方式跳转过来
			// 	 * 返回首页也使用reLaunch方式
			// 	 */
			// 	uni.reLaunch({
			// 		url: '../first/first',
			// 	});
			// },
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		width: 750rpx;
		height: 424rpx;
	}

	.loge {
		width: 126rpx;
		height: 152rpx;
		margin-top: 216rpx;
	}

	.title {
		font-size: 34rpx;
		font-family: PingFang SC;
		font-weight: 500;
		/* width: 100%; */
		display: flex;
		align-items: center;
		padding-top: 19rpx;
	}

	.shuju {
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 500;
		padding-top: 241rpx;
		display: flex;
		align-items: center;

		color: #999999;
	}

	.btn {
		width: 690rpx;
		height: 88rpx;
		background: #79C2EF;
		border-radius: 44rpx;
		display: flex;
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		align-items: center;
		justify-content: center;
		margin-top: 40rpx;
	}

	.wei {
		width: 42rpx;
		height: 40rpx;
		display: flex;
		position: absolute;
		top: 795rpx;
		z-index: 222;
		left: 183rpx;
		vertical-align: middle;
	}
</style>

