<template>
	<view>
		<!-- <htmlLoading ref="htmlLoading" @Retry='getdata' :bj_show="false"> -->
			<view class="title">协 议 书</view>
			<view class="content .xmfwb_box" v-html="datas.content"></view>
		
			<view class="qmbox">
				<text class="qm">
					签名：
				</text>
				<canvas class='firstCanvas' canvas-id="firstCanvas" @touchmove='move' @touchstart='start($event)' @touchend='end'
				 @touchcancel='cancel' @longtap='tap' disable-scroll='true' @error='error'>
				</canvas>
				<view class="chongqian dis_flex ju_b" style="    margin-top: 25rpx;">
					<text class="qm">时间： {{date}}</text>
					<text @tap='clearClick' style="    padding: 10rpx 30rpx;
			background: #DDDDDD;
			color: #000000;
			font-size: 24rpx;
		border-radius: 100rpx;">
						重签
					</text>
				</view>
				
			</view>
			
				
			<view class="bottombtnbox" style="position: relative;opacity: 0;margin-top: 100upx;">
				<view class="bottombtn" ></view>
			</view>
			<view class="bottombtnbox">
				<view class="bottombtn" @tap="overSign">提交</view>
			</view>
		<!-- </htmlLoading> -->
	</view>
</template>

<script>
	var content = null;
	var touchs = [];
	var canvasw = 0;
	var canvash = 0;
	var _that;
	//获取系统信息
	uni.getSystemInfo({
		success: function(res) {
			canvasw = res.windowWidth;
			canvash = res.windowHeight;
		},
	})
	// 周一  ---> 李耀林 冯  凯
	// 周二  ---> 郭潇鹏 申敬尧
	// 周三  ---> 梁  亚 柴  腾 
	// 周四  ---> 苏  鑫 马东元
	// 周五  ---> 刘智超 李  亨
	import api from '../../components/url.js';
	import service from '../../service.js';
	var that
	export default {
		data() {
			return {
				id:'',
				date: new Date().toISOString().slice(0, 10),
				signImage: '',
				isEnd: false, // 是否签名
				datas:'',
				key:'ktxy'
			}
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad(option) {
			_that = this
			that=this
			//获得Canvas的上下文
			content = wx.createCanvasContext('firstCanvas')
			//设置线的颜色
			content.setStrokeStyle("#000")
			//设置线的宽度
			content.setLineWidth(5)
			//设置线两端端点样式更加圆润
			content.setLineCap('round')
			//设置两条线连接处更加圆润
			content.setLineJoin('round')
			
			that.id=option.id
			that.getdata()
		},
		methods: {
			jump(e) {
				return service.jump(e)
			},
			getdata(key){
				var jkurl='/info/detail'
				var data={
					key:that.key
				}
				service.P_post(jkurl, data).then(res => {
					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						// that.$refs.htmlLoading.htmlReset_fuc(0)
						var datas = res.data
						console.log(typeof datas)
				
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						that.datas=datas
					} else {
				
						// that.$refs.htmlLoading.htmlReset_fuc(1)
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
						title: '获取数据失败'
					})
				})
			},
			overSign: function() {
				
				if (this.isEnd) {
					uni.canvasToTempFilePath({
						canvasId: 'firstCanvas',
	
						success: function(res) {
							//打印图片路径
							console.log(res.tempFilePath)
							console.log('完成签名')
							//设置图片
							_that.signImage = res.tempFilePath
							service.wx_upload(res.tempFilePath).then(res => {
										
								that.btn_kg = 0
								console.log(res)
								if (res.code == 1) {
									var datas = res.data
									// Vue.set(that.loginDatas_data,'img',datas)
									// console.log(that.loginDatas_data)
									var datas={
										id:that.id,
										img:res.data
									}
									var jkurl='/education/answer_img'
									service.P_post(jkurl, datas).then(res => {
										that.btn_kg = 0
										console.log(res)
										if (res.code == 1) {
											// that.$refs.htmlLoading.htmlReset_fuc(0)
											var datas = res.data
											console.log(typeof datas)
									
											if (typeof datas == 'string') {
												datas = JSON.parse(datas)
											}
											uni.showToast({
												icon:'none',
												title:'上传成功'
											})
											setTimeout(function(){
												uni.navigateBack({
													delta:1
												})
											},1000)
										} else {
									
											// that.$refs.htmlLoading.htmlReset_fuc(1)
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
											title: '系统异常'
										})
									})
								} else {
									if (res.msg) {
										uni.showToast({
											icon: 'none',
											title: res.msg
										})
									} else {
										uni.showToast({
											icon: "none",
											title: "上传失败"
										})
									}
								}
							}).catch(e => {
								that.btn_kg = 0
								console.log(e)
								uni.showToast({
									icon: 'none',
									title: '操作失败'
								})
							})
							// uni.navigateBack({
							//     delta: 4
							// });
						}
					})
				} else {
					uni.showToast({
						title: '请先完成签名',
						icon: "none",
						duration: 1500,
						mask: true
					})
				}
	
			},
	
			// 画布的触摸移动开始手势响应
			start: function(event) {
				// console.log(event)
				console.log("触摸开始" + event.changedTouches[0].x)
				console.log("触摸开始" + event.changedTouches[0].y)
				//获取触摸开始的 x,y
				let point = {
					x: event.changedTouches[0].x,
					y: event.changedTouches[0].y
				}
				// console.log(point)
				touchs.push(point);
	
			},
			// 画布的触摸移动手势响应
			move: function(e) {
				let point = {
					x: e.touches[0].x,
					y: e.touches[0].y
				}
				// console.log(point)
				touchs.push(point)
				if (touchs.length >= 2) {
					this.draw(touchs)
				}
			},
	
			// 画布的触摸移动结束手势响应
			end: function(e) {
				console.log("触摸结束" + e)
				// 设置为已经签名
				this.isEnd = true
				// 清空轨迹数组
				for (let i = 0; i < touchs.length; i++) {
					touchs.pop()
				}
	
			},
	
			// 画布的触摸取消响应
			cancel: function(e) {
				console.log("触摸取消" + e)
			},
	
			// 画布的长按手势响应
			tap: function(e) {
				console.log("长按手势" + e)
			},
	
			error: function(e) {
				console.log("画布触摸错误" + e)
			},
	
			//绘制
			draw: function(touchs) {
				console.log(touchs[0],touchs[1])
				let point1 = touchs[0]
				let point2 = touchs[1]
				touchs.shift()
				content.moveTo(point1.x, point1.y)
				content.lineTo(point2.x, point2.y)
				content.stroke()
				content.draw(true)
			},
			//清除操作
			clearClick: function() {
				// 设置为未签名
				this.isEnd = false
				//清除画布
				content.clearRect(0, 0, canvasw, canvash)
				content.draw(true)
			},
		},
		
	
	
	
	}
</script>

<style>
	.title {
		margin: 30rpx auto;
		text-align: center;
		font-size: 40rpx;
		font-weight: bold;
	}
	.content {
		 padding: 0 30rpx;
		 font-size: 28rpx;
		 line-height: 40rpx;
		 color: #333333;
	}
	
	.qmbox{
		margin-top: 60rpx;
		padding: 0 30rpx;
	}
	.qm{
		    font-size: 26rpx;
		    font-weight: bold;
	}
	
	
	
	
	.ts {
		color: #FF485D;
		font-size: 30upx;
		height: 100upx;
		line-height: 100upx;
		padding-left: 20upx;
	}

	canvas {
		margin-top: 10rpx;
		background-color: #DDDDDD;
		width: 100%;
		height: 300upx;
	}

	.contents {
		padding-top: 20upx;
		padding-bottom: 100upx;
		box-sizing: border-box;
	}

	#signatureImg {
		background-color: #EEEEEE;
	}

	.bottombtnbox{
		width: 100%;
		position: fixed;
		bottom: 0;
		z-index: 999;
		padding-bottom: 0;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		background: #FFFFFF;
		box-shadow: 0rpx -10rpx 19rpx 3rpx rgba(153, 153, 153, 0.08);
		
	}
	.bottombtn{
		margin: 20rpx auto;
		width: 690rpx;
		height: 80rpx;
		background: #358540;
		border-radius: 40rpx;
		font-size: 30rpx;
		font-weight: bold;
		color: #FFFFFF;
		line-height: 80rpx;
		text-align: center;
	}
	.chongqian{
		
	}

</style>
