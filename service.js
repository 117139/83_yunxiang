import Vue from 'vue'
import store from './store/index.js'
import event from './common/event.js'
// 管理账号信息
const USERS_KEY = 'USERS_KEY';
const STATE_KEY = 'STATE_KEY';
// const IPurl = 'https://datixcx.com.aa.800123456.top/api/';
// const imgurl = 'https://datixcx.com.aa.800123456.top/';
// const imgurl = 'http://192.168.129.246/';
const map_key = "7FEBZ-WLWK2-PMGUE-C4BFT-EKXB6-BFFNR"
const imgurl = "https://yunxiangziran.com.a.800123456.vip/"
const IPurl = imgurl + 'api/'
/**
 * 请求头
 */
var header= {
		'content-type': 'application/x-www-form-urlencoded',
		'token':uni.getStorageSync('token')||'',
		// 'userId':uni.getStorageSync('userId')||''
	}

/**
 * 供外部post请求调用  
 */
function post(url, params, onSuccess, onFailed) {
	console.log("请求方式：", "POST")
	request(url, params, "POST", onSuccess, onFailed);

}

/**
 * 供外部get请求调用
 */
function get(url, params, onSuccess, onFailed) {
	console.log("请求方式：", "GET")
	request(url, params, "GET", onSuccess, onFailed);
}

/**
 * function: 封装网络请求
 * @url URL地址
 * @params 请求参数
 * @method 请求方式：GET/POST
 * @onSuccess 成功回调
 * @onFailed  失败回调
 */

function request(url, params, method, onSuccess, onFailed) {
	console.log('请求url：' + url);

	console.log("请求头：", header)
	uni.request({
		url: IPurl + url,
		data: dealParams(params),
		method: method,
		header: header,
		success: function(res) {
			uni.hideLoading();
			uni.stopPullDownRefresh();
			console.log('响应：', res.data);

			// if (res.data) {
			if (res.data.code == -1) {
				// if (params.login_type == 1) {
				// 	//一进来就登录失败
				// 	return

				// }
				// if (params.login_type == 2) {
				// 	//授权登录失败
				// 	uni.navigateBack()
				// 	return

				// }
				uni.showToast({
					icon: 'none',
					title: '请先授权登录'
				})
				store.commit('logout')
				setTimeout(function() {
					// #ifdef MP-WEIXIN
					uni.navigateTo({
						url: './pages/login/login?haslogin=false'
					})
					// #endif
					// #ifndef MP-WEIXIN
					uni.navigateTo({
						url: '/pagesA/pc_login/pc_login'
					})
					// #endif
				}, 1000)
				return

			}

			/** start 根据需求 接口的返回状态码进行处理 */
			onSuccess(res);
			/** end 处理结束*/
			// }
		},
		fail: function(error) {

			uni.hideLoading();
			uni.stopPullDownRefresh();
			onFailed(error); //failure for other reasons
		}
	})
}

/**
 * function: 根据需求处理请求参数：添加固定参数配置等
 * @params 请求参数
 */
function dealParams(params) {
	console.log("请求参数:", params)
	return params;
}



const getUsers = function() {
	let ret = '';
	ret = uni.getStorageSync(USERS_KEY);
	if (!ret) {
		ret = '[]';
	}
	return JSON.parse(ret);
}

const addUser = function(userInfo) {
	let users = getUsers();
	users.push({
		account: userInfo.account,
		password: userInfo.password
	});
	uni.setStorageSync(USERS_KEY, JSON.stringify(users));
}

const gologin = function() {
	uni.navigateTo({
		url: '/pages/login_index/login_index'
	})
}

const jump = function(e) {
	// console.log(e.currentTarget.dataset.type)
	var datas = e.currentTarget.dataset
	console.log(datas.login == true)
	console.log(datas.haslogin)
	if (datas.login == true) {
		if (!datas.haslogin) {
			// #ifdef MP-WEIXIN
			uni.navigateTo({
				url: '/pagesA/login/login',
			});
			// #endif
			// #ifndef MP-WEIXIN
			uni.navigateTo({
				url: '/pages/login/login'
			})
			// #endif
			return
		}
	}
	if (datas.type == 'sp') {
		console.log(datas.spurl)
		store.commit('spurl_fuc', datas.spurl)
		uni.navigateTo({
			url: datas.url
		})
		return
	}
	if (datas.type == 'web') {
		console.log(datas.url)
		store.commit('web_url', datas.url)
		uni.navigateTo({
			url: '/pages/web_html/web_html'
		})
		return
	}
	if (datas.type == 2) {
		uni.switchTab({
			url: datas.url
		})
	} else if (datas.type == 3) {
		uni.redirectTo({
			url: datas.url
		})
	} else {
		uni.navigateTo({
			url: datas.url
		})
	}
}
const pveimg = function(e) {
	var current = e.currentTarget.dataset.src
	var urls = e.currentTarget.dataset.array

	let urls1 = []
	if (urls) {
		urls1 = urls

	} else {
		urls1[0] = current
	}
	// console.log(urls1)
	uni.previewImage({
		current: current, // 当前显示图片的http链接
		urls: urls1 // 需要预览的图片http链接列表
	})

}
const call = function(e) {
	console.log(e)
	// return
	if (e.currentTarget.dataset.tel) {
		// wx.makePhoneCall({
		// 	phoneNumber: e.currentTarget.dataset.tel+''
		// })
		uni.showModal({
			title: '提示',
			content: '是否拨打' + e.currentTarget.dataset.tel + '?',
			success: function(res) {
				if (res.confirm) {
					///shops/phone_buy
					var jkurl = '/shops/phone_buy'
					var datas={
						phone:e.currentTarget.dataset.tel
					}
					P_post(jkurl, datas).then(res => {
						console.log(res)
						if (res.code == 1) {
							var datas = res.data
							console.log(typeof datas)
					
							if (typeof datas == 'string') {
								datas = JSON.parse(datas)
							}
							
						} else {
							if (res.msg) {
								uni.showToast({
									icon: 'none',
									title: res.msg
								})
							} else {
								uni.showToast({
									icon: 'none',
									title: '操作失败'
								})
							}
						}
					}).catch(e => {
						console.log(e)
						uni.showToast({
							icon: 'none',
							title: '操作失败'
						})
					})
					wx.makePhoneCall({
						phoneNumber: e.currentTarget.dataset.tel + ''
					})
					console.log('用户点击确定');
				} else if (res.cancel) {
					console.log('用户点击取消');
				}
			}
		});
	}
}
// 微信登录
const wxlogin = function(num) {
	var that = this
	if (num == 1) {
		uni.showLoading({
			mask: true,
			title: '正在登录'
		})
	}
	if (num == 'token') {
		var data = {
			// 'token':uni.getStorageSync('token'),
			// // #ifdef H5
			// 'token':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozLCJhdWQiOiJZXyIsImlhdCI6MTYyNTEwMjEzOCwibmJmIjoxNjI1MTAyMTM4LCJleHAiOjE2MjUxMDkzMzh9.nXB2nkRcvx6gcngv30HT1irDFdS_8lbXPzn6oh7uf-E',
			// // #endif
			// type: 4
		}

		uni.request({
			url: IPurl + '/user',
			data: data,
			header: {
				'content-type': 'application/x-www-form-urlencoded',
				'token':uni.getStorageSync('token'),
			},
			dataType: 'json',
			method: 'POST',
			success(res) {
				uni.hideLoading()
				console.log(res.data)
				if (res.data.code == -1) {
					store.commit('logout')
					uni.navigateTo({
						url: '/pagesA/login/login'
					})
					return
				}
				if (res.data.code == -2) {
					if (num == 1) {
						uni.redirectTo({
							url: '/pages/login_tel/login_tel?nickname=' + uinfo.nickName + '&avatarurl=' + uinfo.avatarUrl
						})
					} else {
						uni.navigateTo({
							url: '/pages/login_tel/login_tel?nickname=' + uinfo.nickName + '&avatarurl=' + uinfo.avatarUrl
						})
					}
					return
				}
				if (res.data.code == 1) {
					console.log('登录成功')
					// uni.setStorageSync('token', res.data.data.token)
								
												
					store.commit('login', res.data.data)

				} else {
					uni.removeStorageSync('userInfo')
					uni.removeStorageSync('token')
					uni.showToast({
						icon: 'none',
						title: '登录失败',
					})
				}

			},
			fail() {
				uni.hideLoading()
				uni.showToast({
					icon: 'none',
					title: '登录失败'
				})
			}
		})
	} else {
		var userInfo = uni.getStorageSync('userInfo')
		if (!userInfo) {
				
		} else {
			uni.login({
				success: function(res) {
					// console.log(res)
					// return
					// 发送 res.code 到后台换取 openId, sessionKey, unionId
					var uinfo = userInfo
					let data = {
						js_code: res.code,
						nick: uinfo.nickName,
						img: uinfo.avatarUrl
					}
					if (num == 'token') {
						data = {
							token: uni.getStorageSync('token')
						}
					}
					let rcode = res.code
					console.log(res.code)
					uni.request({
						url: IPurl + '/sign/wx_register',
						data: data,
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						dataType: 'json',
						method: 'POST',
						success(res) {
							uni.hideLoading()
							console.log(res.data)
							if (res.data.code == -2) {
								uni.showToast({
									icon:'none',
									title:'请绑定手机号'
								})
								setTimeout(()=>{
									if (num == 1) {
										uni.redirectTo({
											url: '/pages/login_tel/login_tel?nickname=' + uinfo.nickName + '&avatarurl=' + uinfo.avatarUrl
										})
									} else {
										uni.navigateTo({
											url: '/pages/login_tel/login_tel?nickname=' + uinfo.nickName + '&avatarurl=' + uinfo.avatarUrl
										})
									}
								},1000)
								return
							}
							if (res.data.code == 1) {
								/*{
									"code":1,"msg":"success",
									"data":
									{"img":"https:\/\/thirdwx.qlogo.cn\/mmopen\/vi_32\/Q0j4TwGTfTLQyUDQBFgtqQlBSNEr4WJJqhslupYjMr1ojdUAPC0iaibmj2CICmC7aV6M5MG8nKFliaibxNAxJGSYXA\/132",
									"nick":"问心",
									"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozLCJhdWQiOiJZXyIsImlhdCI6MTYyMzk4NTYzMSwibmJmIjoxNjIzOTg1NjMxLCJleHAiOjE2MjM5OTI4MzF9.BCuXb7D3Uyryt8DPf6pT_ptMWCYyX6aufx2MH218jZ4"}}
								*/
								console.log('登录成功')
								console.log(res.data)
								uni.setStorageSync('token', res.data.data.token)
			
							
								store.commit('login', res.data.data)
			
								
								if (num == 1) {
									uni.showToast({
										icon: 'none',
										title: '登录成功'
									})
									setTimeout(() => {
										uni.navigateBack()
									}, 1000)
								}
							} else {
								uni.removeStorageSync('userInfo')
								uni.removeStorageSync('token')
								uni.showToast({
									icon: 'none',
									title: '登录失败',
								})
							}
			
						},
						fail() {
							uni.hideLoading()
							uni.showToast({
								icon: 'none',
								title: '登录失败'
							})
						}
					})
				}
			})
		}
		return
		
		// #ifdef MP-WEIXIN
		uni.getSetting({
			success: res => {
				console.log(res)
				if (res.authSetting['scope.userInfo'] == true) {
					// 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
					console.log('已经授权')
					uni.getUserInfo({
						success(res) {
							var userInfo = res.userInfo
							console.log(userInfo)
							uni.setStorageSync('userInfo', res.userInfo)
							if (!userInfo) {

							} else {
								uni.login({
									success: function(res) {
										console.log(res)
										return
										// 发送 res.code 到后台换取 openId, sessionKey, unionId
										var uinfo = userInfo
										let data = {
											code: res.code,
											nickname: uinfo.nickName,
											avatarurl: uinfo.avatarUrl,
											type: 1
										}
										if (num == 'token') {
											data = {
												token: uni.getStorageSync('token')
											}
										}
										let rcode = res.code
										console.log(res.code)
										uni.request({
											url: IPurl + '/login',
											data: data,
											header: {
												'content-type': 'application/x-www-form-urlencoded'
											},
											dataType: 'json',
											method: 'POST',
											success(res) {
												uni.hideLoading()
												console.log(res.data)
												if (res.data.code == -2) {
													uni.showToast({
														icon:'none',
														title:'请绑定手机号'
													})
													setTimeout(()=>{
														if (num == 1) {
															uni.redirectTo({
																url: '/pages/login_tel/login_tel?nickname=' + uinfo.nickName + '&avatarurl=' + uinfo.avatarUrl
															})
														} else {
															uni.navigateTo({
																url: '/pages/login_tel/login_tel?nickname=' + uinfo.nickName + '&avatarurl=' + uinfo.avatarUrl
															})
														}
													},1000)
													return
												}
												if (res.data.code == 1) {
													console.log('登录成功')
													console.log(res.data)
													uni.setStorageSync('token', res.data.data.userToken)

													store.commit('logindata', res.data.data)
													store.commit('login', res.data.data.nickname)
													uni.setStorageSync('loginmsg', res.data.data)

													// event.trigger({
													//     type:'test',
													//     page:'/pages/index/index',
													//     //obj和test是举的例子，随意啥都行，这个传过去在on中的args中都可以获取到
													//     obj:{

													//     },
													//     test:{
													// 			'loginmsg': res.data.data
													//     },
													//     success:function(data){
													//         //data为on中返回的数据
													//     }
													// });
													// im login



													if (num == 1) {
														uni.showToast({
															icon: 'none',
															title: '登录成功'
														})
														setTimeout(() => {
															uni.navigateBack()
														}, 1000)
													}
												} else {
													uni.removeStorageSync('userInfo')
													uni.removeStorageSync('token')
													uni.showToast({
														icon: 'none',
														title: '登录失败',
													})
												}

											},
											fail() {
												uni.hideLoading()
												uni.showToast({
													icon: 'none',
													title: '登录失败'
												})
											}
										})
									}
								})
							}
						}
					})

				} else {
					uni.hideLoading()
				}
			}
		})
		// #endif
	}
}
// 手机号登录
const login_tel = function(num) {
	var datas
	var tel
	var password
	/*if(uni.getStorageSync('tel')){
		tel= uni.getStorageSync('tel')
		password= uni.getStorageSync('password')
		datas = {
			type:3,
			phone: tel,
			password: password
		}
	}else{
		return
	}*/
	if(!uni.getStorageSync('token')){
		return
	}else{
	
	}
	// var jkurl = '/login/login'
	var jkurl = '/set/index'
	var loginDatas=uni.getStorageSync('loginmsg')
	datas={
		id:loginDatas.id
	}
	P_post(jkurl, datas).then(res => {
		console.log(res)
		if (res.code == 1) {
			var datas = res.data
			console.log(typeof datas)

			if (typeof datas == 'string') {
				datas = JSON.parse(datas)
			}
			console.log('登录成功')
			// uni.setStorageSync('token', datas.token)
			// uni.setStorageSync('userId', datas.id)
			// uni.setStorageSync('tel', tel)
			// uni.setStorageSync('password', password)
			uni.setStorageSync('loginmsg', datas)
			store.commit('logindata', datas)
			// store.commit('login', datas.nickname)
			// setTimeout(() => {
			// 	uni.navigateBack({
			// 		delta: 1
			// 	})
			// }, 1000)

		} else {
			if (res.msg) {
				uni.showToast({
					icon: 'none',
					title: res.msg
				})
			} else {
				uni.showToast({
					icon: 'none',
					title: '操作失败'
				})
			}
		}
	}).catch(e => {
		console.log(e)
		uni.showToast({
			icon: 'none',
			title: '操作失败'
		})
	})
}
const setUsermsg = function(data) {
	var jkurl = '/user/amendInfo'

	post(jkurl, data,
		function(res) {

			// if (res.data.code == 1) {
			if (res.data.code == 1) {
				var datas = res.data.data
				// console.log(typeof datas)

				if (typeof datas == 'string') {
					datas = JSON.parse(datas)
				}
				wxlogin()
				uni.showToast({
					title: '操作成功'
				})

			} else {
				if (res.data.msg) {
					uni.showToast({
						icon: 'none',
						title: res.data.msg
					})
				} else {
					uni.showToast({
						icon: 'none',
						title: '操作失败'
					})
				}
			}
		},
		function(err) {
			that.btnkg = 0

			uni.showToast({
				icon: 'none',
				title: '获取数据失败'
			})

		}
	)
}


const wx_upload = function(tximg) {
	return new Promise((resolve, reject) => {
		uni.showLoading({
			mask: true,
			title: '正在上传'
		})
		// #ifndef H5
		console.log(tximg)
		uni.uploadFile({
			url: IPurl + 'sign/img_upload',
			filePath: tximg,
			name: 'file',
			header: header,
			formData: {
				token: uni.getStorageSync('token')
			},
			// success: (uploadFileRes) => {
			// 	console.log(uploadFileRes.data);
			// 	var ndata = JSON.parse(uploadFileRes.data)
			// 	resolve(uploadFileRes)
			// },
			complete: (res) => {
				uni.hideLoading();
				uni.stopPullDownRefresh(); //慎用hideLoading,会关闭wx.showToast弹窗
				// console.log(`耗时${Date.now() - timeStart}`);
				console.log(res)
				if (res.statusCode == 200) { //请求成功
					var ndata = JSON.parse(res.data)
					if (ndata.code == -1) {
						store.commit('logout')
						uni.navigateTo({
							url: '/pages/login/login'
						})
						return
					} else if (ndata.code == 0) {
						if (ndata.msg) {

							uni.showToast({
								icon: 'none',
								title: ndata.msg
							})
						} else {

							uni.showToast({
								icon: 'none',
								title: '操作失败'
							})
						}
					}
					resolve(ndata)
				} else {
					reject(res);
				}
			}
		});
		// #endif
		// #ifdef H5
		uni.request({
				url: tximg,
				method: 'GET',
			
				responseType: 'arraybuffer',
				success: (res) => {
						let base64 = wx.arrayBufferToBase64(res.data); //把arraybuffer转成base64
						console.log('base64')
						// console.log(base64)
						base64 = 'data:image/jpeg;base64,' + base64; //不加上这串字符，在页面无法显示
						// return base64
						var datas={
							file:base64,
							// type:1,
						}
						var jkurl=IPurl + 'sign/upload_img'
						// var jkurl='https://yibeitong.com.aa.800123456.top/api/'+'/upload/base64Img'
						console.log('h5 upload')
						uni.request({
							url: jkurl,
							data: datas,
							method: 'POST',
							header: {
								'content-type': 'application/x-www-form-urlencoded'
							},
							complete: (res) => {
								uni.hideLoading();
								uni.stopPullDownRefresh(); //慎用hideLoading,会关闭wx.showToast弹窗
								console.log(res)
								if (res.statusCode == 200) { //请求成功
									console.log(res)
									if (res.data.code == 0) {
										if (res.data.msg) {
						
											uni.showToast({
												icon: 'none',
												title: res.data.msg
											})
										} else {
						
											uni.showToast({
												icon: 'none',
												title: '操作失败'
											})
										}
									}
									resolve(res.data)
								} else {
									reject(res);
								}
							}
						})
						// 单个请求
						// P_post(jkurl, datas).then(res => {
						// 	resolve(ndata)
						// }).catch(e => {
						// 	reject(res);
						// })
				},
				fail: (err) => {
					console.log(err)
				}
		});
		
		// #endif
	})

}




/**
 * @description    配置接口请求的公共方法
 * @example   
 * example   
 * @param {String} url = ''  接口请求地址  
 * @param {String} param = {}  接口请求参数  
 * @param {String} header = {}  接口请求头  
 * @param {String} method = [get|post] 可选值域包括get和post，get是直接请求，post是提交数据  
 * @author: wenxin  
 * @createTime: 2021-4-6 15:09:19  
 */
const http = ({
	url = '',
	param = {},
	method = '',
	header = {
		'content-type': 'application/x-www-form-urlencoded',
		'token':uni.getStorageSync('token')||''
	}
	
	
} = {}) => {
	console.log(header)
	let timeStart = Date.now();
	return new Promise((resolve, reject) => {
		console.log('请求url：' + getUrl(url));

		console.log("请求头：", header)
		console.log("param：", param)
		uni.request({
			url: getUrl(url),
			data: param,
			method: method,
			header: header,
			success: (res) => {
				uni.hideLoading();
				uni.stopPullDownRefresh(); //慎用hideLoading,会关闭wx.showToast弹窗
				
				if (res.data.code == -1) {
					store.commit('logout')
					uni.navigateTo({
						url: '/pagesA/login/login'
					})
					return
				} else if (res.data.code == 0 && res.msg == '请先登录账号~') {
					uni.navigateTo({
						url: '/pagesA/login/login'
					})
					return
				} else if (res.data.code == 0) {
					if (res.data.msg) {
				
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						})
					} else {
				
						uni.showToast({
							icon: 'none',
							title: '操作失败'
						})
					}
				}
				resolve(res.data)
			},
			fail: (err) => {
				uni.hideLoading()
				uni.stopPullDownRefresh()
				if(!reject){
					uni.showToast({
						icon: 'none',
						title: '系统异常错误'
					})
					return
				}
				reject(err)
			},
			/*complete: (res) => {
					uni.hideLoading();
					uni.stopPullDownRefresh(); //慎用hideLoading,会关闭wx.showToast弹窗
				console.log(`耗时${Date.now() - timeStart}`);
				console.log(res)
				if (res.statusCode == 200) { //请求成功
					console.log(res)
					if (res.data.code == -1) {
						store.commit('logout')
						// #ifdef MP-WEIXIN
						uni.navigateTo({
							url: '/pages/login/login'
						})
						// #endif
						// #ifndef MP-WEIXIN
						uni.navigateTo({
							url: '/pages/login/login'
						})
						// #endif
						return
					} else if (res.data.code == 0 && res.msg == '请先登录账号~') {
						// #ifdef MP-WEIXIN
						uni.navigateTo({
							url: '/pages/login/login'
						})
						// #endif
						// #ifndef MP-WEIXIN
						uni.navigateTo({
							url: '/pages/login/login'
						})
						// #endif
						return
					} else if (res.data.code == 0) {
						if (res.data.msg) {

							uni.showToast({
								icon: 'none',
								title: res.data.msg
							})
						} else {

							uni.showToast({
								icon: 'none',
								title: '操作失败'
							})
						}
					}
					resolve(res.data)
				} else {
					reject(res);
				}
			}*/
		})
	})
}
// 获取url
const getUrl = (url) => {
	if (!url) {
		return url
	}
	if (url.slice(0, 1) == "/") {
		console.log(true);
		url = url.substr(1);
	}
	if (url.indexOf('://') == -1) {
		url = IPurl + url;
	}
	return url;
}
//暴露出去调用的方法


/**
 * @description    get方法
 * @example   
 * example   
 * @param {String} url = ''  接口请求地址  
 * @param {String} param = 请求参数  
 * @author: wenxin  
 * @createTime: 2021-4-6 15:07:33  
 */
const P_get = (url, param = {}) => {
	if (!param.load_mode) {
		wx.showLoading({
			title: '请求中，请耐心等待...',
		});
	}
	return http({
		url,
		param,
		method: 'GET'
	})
}
/**
 * @description    post方法
 * @example   
 * example   
 * @param {String} url = ''  接口请求地址  
 * @param {String} param = 请求参数  
 * @author: wenxin  
 * @createTime: 2021-4-6 15:07:33  
 */
const P_post = (url, param = {}) => {
	return http({
		url,
		param,
		method: "POST"
	})
}

const P_put = (url, param = {}) => {
	return http({
		url,
		param,
		method: 'put'
	})
}

const P_delete = (url, param = {}) => {
	return http({
		url,
		param,
		method: 'put'
	})
}
// // 单个请求
// service.P_get('/cate/list').then(res => {
// 	console.log(res)
// }).catch(e => {
// 	console.log(e)
// })

// // 一个页面多个请求
// Promise.all([
//   service.P_get('/cate/list'),
//   service.P_get(`detail/${id}`)
// ]).then(result => {
//   console.log(result)
// }).catch(e => {
//   console.log(e)
// })
const getimg = function(img,type) {
	// return img



	if (!img) return
	if (!type) {
		type = ','
	}
	if(type!='arr'){
		
		img = img.split(type)
	}
	// console.log(imgurl+img)
	if (img[0].indexOf('://') == -1) {
		img = imgurl + img[0]
	}
	return img
}
const getimgarr = function(imgs, type) {
	if (!imgs) return
	if (!type) {
		type = ','
	}
	if(type!='arr'){
		
		imgs = imgs.split(type)
	}
	// console.log(imgurl+img)
	var newimgs = []
	for (var i = 0; i < imgs.length; i++) {
		var img = imgs[i]
		if (img.indexOf('://') == -1) {
			img = imgurl + img
		}
		newimgs.push(img)
	}
	// console.log(newimgs)
	return newimgs
}
const gettime = function(mj, join_msg) {
	if (!mj) {
		return {}
	}
	if(!join_msg){
		join_msg='-'
	}
	var ntime = new Date(mj * 1000)
	// console.log(ntime)
	var n_year = ntime.getFullYear();
	var n_month = ntime.getMonth() + 1;
	var n_date = ntime.getDate();
	var n_hour = ntime.getHours();
	var n_minute = ntime.getMinutes();
	n_month=n_month<10? '0'+n_month:n_month
	n_date = n_date < 10 ? '0' + n_date : n_date
	n_hour = n_hour < 10 ? '0' + n_hour : n_hour
	n_minute = n_minute < 10 ? '0' + n_minute : n_minute
	return n_year+join_msg+n_month+join_msg+n_date+' '+n_hour+':'+n_minute
	
	var time = new Date();
	var year = time.getFullYear();
	var month = time.getMonth() + 1;
	var date = time.getDate();
	var hour = time.getHours();
	var minute = time.getMinutes();
	// n_month=n_month<10? '0'+n_month:n_month
	n_date = n_date < 10 ? '0' + n_date : n_date
	n_hour = n_hour < 10 ? '0' + n_hour : n_hour
	n_minute = n_minute < 10 ? '0' + n_minute : n_minute
	if (n_year == year) {

		return {
			type: 1,
			year: n_year,
			month: n_month,
			date: n_date,
			hour: n_hour,
			minute: n_minute,
			time: '今天 ' + n_hour + ':' + n_minute
		}
	} else {

		return {
			type: 2,
			year: n_year,
			month: n_month,
			date: n_date,
			hour: n_hour,
			minute: n_minute,
			time: n_year + '-' + n_month + '-' + n_date
		}
	}
}


const get_fwb = function(str) {
	if (!str) {
		return
	}
	str = str // .replace(/<p([\s\w"=\/\.:;]+)((?:(style="[^"]+")))/ig, '<p')
		.replace(/<br\/>/ig, '<view style="width:100%;height:15upx;"></view>')
		.replace(/<br \/>/ig, '<view style="width:100%;height:15upx;"></view>')
		.replace(/<p([\s\w"-=\/\.:;]+)((?:(class="[^"]+")))/ig, '<p $1')
		.replace(/<p([\s\w"-=\/\.:;]+)/ig, '<p$1 class="xcx_fwb_p"')
		// .replace(/<div([\s\w"=\/\.:;]+)((?:(style="[^"]+")))/ig, '<div')
		.replace(/<div([\s\w"-=\/\.:;]+)((?:(class="[^"]+")))/ig, '<div $1')
		.replace(/<div([\s\w"-=\/\.:;]+)/ig, '<div$1 class="xcx_fwb_div"')

		// .replace(/<img([\s\w"-=\/\.:;]+)((?:(height="[^"]+")))/ig, '<img $1')
		// .replace(/<img([\s\w"-=\/\.:;]+)((?:(width="[^"]+")))/ig, '<img $1')
		// .replace(/<img([\s\w"-=\/\.:;]+)((?:(style="[^"]+")))/ig, '<img $1')
		.replace(/<img([\s\w"-=\/\.:;]+)((?:(alt="[^"]+")))/ig, '<img $1')
		.replace(/<img([\s\w"-=\/\.:;]+)((?:(class="[^"]+")))/ig, '<img $1')
		.replace(/<img([\s\w"-=\/\.:;]+)/ig, '<img class="xcx_fwb_img" $1 ')
	return str
}



//pay
const wxpay=function (datas,type){
	if(!datas) return
	uni.showLoading({
		mask:true,
		title:'正在拉起支付'
	})
	if (typeof datas == 'string') {
		datas = JSON.parse(datas)
	}
	return new Promise((resolve,reject)=>{
		uni.hideLoading()
		uni.requestPayment({
		    provider: 'wxpay',
		    timeStamp: datas.timeStamp||String(Date.now()),
		    nonceStr:  datas.nonceStr,
		    package:  datas.package,
		    signType: datas.signType,
		    paySign:  datas.paySign,
		    success: function (res) {
		        console.log('success:' + JSON.stringify(res));
						if(!resolve){
							if(type=='fwb'){
								uni.showToast({
									icon: 'none',
									title: '购买成功'
								})
								setTimeout(() => {
									uni.redirectTo({
										url: "/pages/my_fwb/my_fwb"
									})
								}, 1000)
							}else{
								resolve(res)
							}
						}else{
							resolve(res)
						}
						
		    },
		    fail: function (err) {
					if(!reject){
						uni.showToast({
							icon: 'none',
							title: '微信支付失败'
						})
					}else{
						
						reject(err);
					}
		        console.log('fail:' + JSON.stringify(err));
		    }
		});
	})
	
}


export default {
	getUsers,
	addUser,
	get,
	post,
	IPurl,
	map_key,
	imgurl,
	gologin,
	jump,
	call,
	wxlogin,
	login_tel,
	setUsermsg,
	P_get,
	P_post,
	P_put,
	P_delete,
	gettime,
	getimg,
	getimgarr,
	pveimg,
	get_fwb,
	wx_upload,
	wxpay
}
