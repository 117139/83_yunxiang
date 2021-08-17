<template>
	<view class="content">
		
		<!-- <uni-nav-bar fixed="true" class="status_title" color="#000000" statusBar="true" title="购物车"></uni-nav-bar> -->
		
		<view class="p12">
			<view class="mia flex align-items-center p10" v-for="(item,index) in datas" :key="index" :data-index="index"
				@touchstart="drawStart" @touchmove="drawMove" @touchend="drawEnd" :style="'right:'+item.right+'px'">

				<view @click="ststts(item,index)">
					<image :src="item.statusy?getimg('/static_xcx/xuan.png'):getimg('/static_xcx/yuan1.png')" mode="aspectFill"
						class="wiimim">
						</image> 
				</view>
				<image :src="getimg(item.goods_pic)" mode="aspectFill" class="logepic mr20 ml10" @click='jump' :data-url="'/pagesA/detail/detail?id='+item.goods_id" :data-shifou='true'></image>
				<view class="flex  flex-col ">
					<text class="oh1  fs14" style="width: 400rpx;"@click='jump' :data-url="'/pagesA/detail/detail?id='+item.goods_id">{{item.goods_title}}</text> 
					<view class="oh1">
						<text class="hui mt8 fs11" style="max-width: 300rpx;">
							{{item.spec_title}}
						</text>
					</view>
					<view class="flex flex-between align-items-center pt15">
						<view class="dai fs20 ">
							<text class="fs11">￥</text>
							<text>{{item.spec_price}}</text>
						</view>
						<view class="shoppingNumber flex align-items-center ">
							<label class="minute" @click="btn_minute(index)">-</label>
							<input class="input" type="number" v-model="item.goods_num" @blur="input_num(item.goods_num)" disabled="disabled" />
							<label class="add" @click="btn_add(index)">+</label>
						</view>
					</view>
				</view>
				<view class="delete-icon" @click="shanc(item)">
					删除
				</view>
			</view>

		</view>
		<view class="b-t-1 p10 flex align-items-center flex-between typeadd">
			<view class="flex ml10">
				<view @click="allchange">
					<image :src="allchecked?getimg('/static_xcx/xuan.png'):getimg('/static_xcx/yuan1.png')" mode="aspectFill" class="wiimim"></image>
				</view>
				<text class="fs14 pl12" @click="allchange">全选</text>
			</view>
			<view class=" flex align-items-center">
				<text class="fs14 fwb pr12">合计:</text>
				<text class="fs11 fwb dai">￥</text>
				<text class="fs20 fwb dai">{{allprice}}</text>
				<view class="heji flex align-items-center justify-center cf fs15 ml12" @tap='js_fuc'
					data-url='/pagesA/shopping_order/shopping_order' :data-shifou='true'>
					结算
				</view>
			</view>
		</view>
		<!-- <view class="fun flex cf pt5 align-items-center ju_c">
			<view class="flex-1 flex align-items-center justify-center flex-col" @click='tiaozhuan' data-url='../index/index' :data-shifou='true'>
				<image :src="getimg('/static_xcx/gou_03.png')" mode="aspectFill" class="dibu"></image>
				<text class="fs11 pt3">首页</text>
			</view>
			<view class="flex-1 flex align-items-center justify-center flex-col" @click='tiaozhuan' data-url='../education/index' :data-shifou='true'>
				<image :src="getimg('/static_xcx/gou_05.png')" mode="aspectFill" class="dibu"></image>
				<text class="fs11 pt3">环境教育</text>
			</view>
			<view class="flex-1 flex align-items-center justify-center flex-col" @click='tiaozhuan' data-url='../indexs/indexs' :data-shifou='true'>
				<image :src="getimg('/static_xcx/chd_05.png')" mode="aspectFill" class="dibus"></image>
				<text class="fs11 pt3">商城</text>
			</view>
			<view class="flex-1 flex align-items-center justify-center flex-col">
				<image :src="getimg('/static_xcx/gh_05.png')" mode="aspectFill" class="dibu"></image>
				<text class="fs11 pt3">购物车</text>
			</view>
			<view class="flex-1 flex align-items-center justify-center flex-col" @click='tiaozhuan' data-url='../my/my' :data-shifou='true'>
				<image :src="getimg('/static_xcx/wode_06.png')" mode="aspectFill" class="dibu"></image>
				<text class="fs11 pt3">我的</text>
			</view>
		</view> -->
		<!-- <Tabbar :tabbarlist="tabbarlist" :navActive="3"></Tabbar> -->
	</view>
</template>

<script>
	import Vue from 'vue'
	import api from '../../components/url.js';
	   import Tabbar from '../../components/tabBar/tabBar.vue'
	import service from '../../service.js';
	var that
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				tabbarlist:[
					{
						txt: '访客预约',
						img: '/static_xcx/gou_03.png',
					},{
						txt: '自然课堂',
						img: '/static_xcx/gou_05.png',
					},{
						txt: '商城',
						img: '/static_xcx/chd_05.png',
					},{
						txt: '购物车',
						img: '/static_xcx/gh_05.png',
					},{
						txt: '我的',
						img: '/static_xcx/wode_06.png',
					}
				],
				leftStyle: 0,
				startX: 0,
				hiddenFlag: true,
				delBtnWidth: 90,
				ifOnShow: false,
				selectId: [],
				allchecked: false,
				allprice:0,
				num:'',
				
				
				datas:[],
				page:1,
				data_last:false
			}
		},
		
		components: {
			Tabbar,
		},
		onHide() {
			console.log('this.ifOnShow=true')
			this.ifOnShow = true
			that.allchecked = false
			that.allprice=0
		},
		onLoad(option) {
			that = this
			// that.id=option.id
			that.onRetry()
		},
		onShow() {
			if (that.hasLogin) {
				if (this.ifOnShow) {
					this.getdata()
				}
		
			} else {}
		
		},
		// onReachBottom() {
		// 	that.getdata()
		// },
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo','addmsg'])
		},
		methods: {
			js_fuc(){
				let xuanG = that.datas
				let idG = []
				var xzarr = []
				var kc_tip=false
				// for (let i in xuanG) {
				for(var i=0; i<xuanG.length;i++){
				  if (xuanG[i].statusy) {
						idG.push(xuanG[i].id)
						
				  }
							
				  // console.log(idG)
				}
				idG=idG.join(',')
				if (idG !== '') {
					wx.navigateTo({
						 url: '/pagesA/shopping_order/shopping_order?type=2&ids='+idG
					})
				}else{
					uni.showToast({
						icon:'none',
						title:'请选择商品'
					})
					
				}
			},
			onRetry(){
				that.page=1
				that.data_last=false
				that.btn_kg=0
				that.selectId=[]
				that.allchecked=false
				that.getdata()
			},
			getdata(){
				var jkurl='/car/detail'
				var data={
					page:that.page,
					limit:20
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
						// that.$refs.htmlLoading.htmlReset_fuc(0)
						var datas = res.data
						console.log(typeof datas)
				
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						that.datas = datas
						return
						if (page_now == 1) {
						
							that.datas = datas.data
						
						} else {
							if (datas.data.length == 0) {
								that.data_last = true
								return
							}
							that.data_last = false
							that.datas = that.datas.concat(datas.data)
						}
						that.page++
						console.log(that.datas)
				
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
								title: '获取失败'
							})
						}
					}
				}).catch(e => {
					
					// that.$refs.htmlLoading.htmlReset_fuc(1)
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
			shanc(item) {
				uni.showModal({
					title: '提示',
					content: '确定删除商品吗',
					success: function(res) {
						uni.showLoading({
							mask:true,
							title:'正在删除'
						})
						var  jkurl='/car/del'
						 var data={
							 id:item.id
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
								
								that.onRetry()
							} else {
								that.btn_kg = 0
									// that.$refs.htmlLoading.htmlReset_fuc(1)
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
							that.btn_kg = 0
							// that.$refs.htmlLoading.htmlReset_fuc(1)
							console.log(e)
							uni.showToast({
								icon: 'none',
								title: '系统错误'
							})
						})
						if (res.confirm) {
							uni.showToast({
								title: '删除商品成功',
								icon: 'none',
							});
						} else if (res.cancel) {
							uni.showToast({
								title: '删除商品失败',
								icon: 'none',
							});
						}
					}
				});
			},
			// 全选
			allchange() {
				if (that.datas == [] || that.datas.length == 0) {
					uni.showToast({
						title: '没有数据',
						icon: 'none',
					});
					return
				} else {
					this.allchecked = !this.allchecked
					if (this.allchecked) {
						var xunjia = uni.getStorageSync('xunjia');
						that.item = xunjia
						this.datas.map(item => {
							item.statusy = true

						})
					} else {
						this.datas.map(item => {
							item.statusy = false

						})
					}
					for (var i = 0; i < this.datas.length; i++) {
						if (this.allchecked) {

							this.datas.statusy = true


						} else {
							this.datas.statusy = false

						}
					}
					this.hh();
				}
			},
			ststts(item, index) {
				console.log(index)
				if (this.datas[index].statusy == true) {
					this.datas[index].statusy = false;
					that.allchecked = false
					//取消选中时删除数组中的值
					for (var i = 0; i < this.selectId.length; i++) {
						if (this.selectId[i] === this.datas[index].course_id) {
							this.selectId.splice(i, 1);
						}
					}
					console.log("选中的值", this.selectId)
				} else {
					this.datas[index].statusy = true;
					this.selectId.push(this.datas[index].course_id)
					console.log("选中的值", this.selectId)
					console.log(this.datas.length)
					console.log(this.selectId.length)
					if (this.datas.length == this.selectId.length) {
						that.allchecked = true
					} else {
						console.log(false)
						that.allchecked = false
					}


				}
				this.hh();
			},
			// 总价总数量方法
			hh() {
				// console.log(index)
				var price = 0;
				var numb = 0;
				var detriment = this.datas;
				for (var i = 0; i < detriment.length; i++) {
					if (detriment[i].statusy == true) {
						price += detriment[i].spec_price*1 * detriment[i].goods_num;
						numb += parseInt(detriment[i].goods_num);
					}
				}
				that.allprice = price.toFixed(2);
				that.num = numb;


				console.log(that.num );
				console.log(that.allprice);
			},
			//减去
			btn_minute: function(index) {
				var detriment = this.datas;
				var num = JSON.parse(JSON.stringify(detriment[index].goods_num));
				if (that.btn_kg == 1) {
					return
				}
				that.btn_kg = 1
				if (num > 1) {
					var  jkurl='/car/save'
					 var data={
						 id:detriment[index].id,
						 type:2,
						 number:1
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
							num--
							Vue.set(that.datas[index],'goods_num',num)
							that.hh()
						} else {
							that.btn_kg = 0
								// that.$refs.htmlLoading.htmlReset_fuc(1)
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
						that.btn_kg = 0
						// that.$refs.htmlLoading.htmlReset_fuc(1)
						console.log(e)
						uni.showToast({
							icon: 'none',
							title: '系统错误'
						})
					})
					
				} else {
					that.btn_kg = 0
					uni.showToast({
						title: '再减就没有商品啦',
						icon: 'none',
					});
				}
				// this.hh();
			},
			//添加
			btn_add: function(index) {
				console.log(index)

				var detriment = this.datas;
				// 强转int类型
				var num = JSON.parse(JSON.stringify(detriment[index].goods_num));
				var  jkurl='/car/save'
			 var data={
				 id:detriment[index].id,
				 type:1,
				 number:1
			 }
			 if (that.btn_kg == 1) {
			 	return
			 }
			 that.btn_kg = 1
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
						
						num++
						Vue.set(that.datas[index],'goods_num',num)
						that.hh()
					} else {
						that.btn_kg = 0
							// that.$refs.htmlLoading.htmlReset_fuc(1)
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
					that.btn_kg = 0
					// that.$refs.htmlLoading.htmlReset_fuc(1)
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '系统错误'
					})
				})
				// this.hh(index);

			},
			input_num(num) {
				console.log(num)
				if (num > 10) {
					uni.showToast({
						title: '商品仅限购买10件',
						icon: 'none',
					});
				} else if (num <= 0) {
					uni.showToast({
						title: '不能低于1件商品',
						icon: 'none',
					});

				} else {
					// 		var datau = {
					// 			member_cart_id: member_cart_id,
					// 			goods_sum: num,
					// 		} 
					// 		api.P_post('Member.MemberCart/setSum', datau).then(res => {
					// 			console.log(res)
					// 			if (res.status == 200) {
					// 				that.getmyxu()
					// 			} else {
					// 				if (!res.msg) {
					// 					uni.showToast({
					// 						title: '请求失败',
					// 						icon: 'none',
					// 					});
					// 				} else {
					// 					uni.showToast({
					// 						title: res.msg,
					// 						icon: 'none',
					// 					});
					// 				}

					// 			}
					// 		}).catch(e => {
					// 			console.log(e)
					// 		})
				}

			},
			drawStart(e) {
				console.log("开始触发");
				var touch = e.touches[0];
				console.log(touch)
				this.startX = touch.clientX;
			},
			//触摸滑动
			drawMove(e) {
				console.log("滑动");
				for (var index in this.datas) {
					this.$set(this.datas[index], 'right', 0);
				}
				var touch = e.touches[0];
				var item = this.datas[e.currentTarget.dataset.index];
				var disX = this.startX - touch.clientX;
				if (disX >= 0) {
					if (disX > this.delBtnWidth) {
						disX = this.delBtnWidth;
					}
					this.$set(this.datas[e.currentTarget.dataset.index], 'right', disX);
				} else {
					this.$set(this.datas[e.currentTarget.dataset.index], 'right', 0);
				}
			},
			//触摸滑动结束
			drawEnd(e) {
				console.log("滑动结束");
				var item = this.datas[e.currentTarget.dataset.index];
				if (item.right >= this.delBtnWidth / 2) {
					this.$set(this.datas[e.currentTarget.dataset.index], 'right', this.delBtnWidth);
				} else {
					this.$set(this.datas[e.currentTarget.dataset.index], 'right', 0);
				}
			},
			//删除方法
			delData(item) {
				console.log("删除")
				uni.showModal({
					title: '提示',
					content: "确认注销该人员？",
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			editData(item) {
				uni.showModal({
					title: '提示',
					content: "确认编辑该项目？",
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			}

		}
	}
</script>

<style>
	/* Tabbar组件的样式   开始 */
	 /deep/.tabBar{
	  background-color: #FECE0A;
	 }
	 /deep/.tabbartxt{
	  color: #fff;
	 }
	 /deep/.nav{
	  opacity: 0.7;
	 }
	 /deep/.nav_activt{
	  opacity: 1;
	 }
	 /* Tabbar组件的样式   结束 */
	.status_title {
		font-size: 34rpx;
		font-family: PingFang;
		font-weight: bold;  
	}
	.typeadd {
		position: fixed;
		width: 100%;
		position: fixed;
		bottom: 20rpx;
		padding-bottom: 0;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
	}

	.dibu {
		width: 48rpx;
		height: 48rpx;
	}

	.dibus {
		width: 50rpx;
		height: 50rpx;
	}

	.fun {
		width: 100%;
		position: fixed;
		padding-top: 9rpx;
		bottom: 0;
		z-index: 999;
		padding-bottom: 0;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		background-color: #FECE0A;
	}

	.heji {
		width: 178upx;
		height: 60upx;
		background: #FECE0A;
		border-radius: 30upx;
	}

	/* 数量加减 */
	.shoppingNumber {
		width: 200upx;
		height: 50upx;
		border: 1px solid #999999;
		border-radius: 12upx;
		justify-content: space-between;
	}


	/* 减去商品数量 */
	.minute {
		width: 55rpx;
		text-align: center;
		line-height: 50rpx;
		font-size: 40rpx;
		border-right: 1px solid #929292;
	}

	/*文本框*/
	.input {
		width: 55rpx;
		height: 50upx;
		text-align: center;
		font-size: 25rpx;
		min-height: 0;
		/* margin-top: -5rpx; */
	}

	/* 添加商品数量 */
	.add {
		width: 55rpx;
		border-left: 1px solid #929292;
		line-height: 50rpx;
		text-align: center;
		font-size: 35rpx;
	}

	.hui {
		background: rgba(153,153,153,.1);
		border-radius: 3upx;
		padding: 0 12rpx;
		border-radius: 5rpx;
		color: rgba(153,153,153,.8);
	}

	.logepic {
		width: 160upx;
		height: 160upx;
		border-radius: 8upx;
	}

	.wiimim {
		width: 40rpx;
		height: 40rpx;
	}

	.mia {
		background: #FFFFFF;
		box-shadow: 0px 10rpx 19rpx 3px rgba(153, 153, 153, 0.08);
		border-radius: 8rpx;
		position: relative;
		margin-top: 26rpx;
	}

	page {
		background-color: #fff;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
	}

	.dai {
		color: #FA3117;
	}

	.content {
		background-color: #fff;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		overflow-x: hidden;
	}

	.container {}

	.delete-icon {
		position: absolute;
		top: 50%;
		-webkit-transform: translateY(-50%);
		transform: translateY(-50%);
		right: -184rpx;
		width: 161upx;
		height: 230upx;
		background: #FA3117;
		border-radius: 8rpx;
		font-weight: 500;
		font-size: 28rpx;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
