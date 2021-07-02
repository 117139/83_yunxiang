<template>

	<view class="content pt35">
		<textarea @blur="bindTextAreaBlur" auto-height placeholder="请输入举报内容" 
		 class="fs15 pl6 inpus-textarder pt10 " maxlength="-1" v-model="tuan" style="height: 280rpx; margin-left:65rpx;"/>
		<input type="text" placeholder="请输入联系方式" v-model="moder" @blur="moders" class="inpuus mt12 fs15  pl8 mt15" style=" margin-left:65rpx;" />
		<view class="okbtn " @click='fanh'>
			确认
		</view>
	</view>
</template>

<script>
	import api from '../../components/url.js';
	import Tabbar from '../../components/tabBar/tabBar.vue'
	// 底部  tabbar
	// import Tabbar from '../../components/tabBar/tabBar.vue'
	import service from '../../service.js';
	var that
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {

		data() {
			return {
				tuan: '',
				moder: '',
				id:''
			}
		},


		onLoad(option) {
			that=this
			taht.id=option.id
		},
		onShow() {
		that.btnkg =0
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
			bindTextAreaBlur: function(e) {
				console.log(e.detail.value)
			},
			moders(e) {
				that.moder = e.detail.value

			},
			fanh() {
				if(!that.tuan){
					wx.showToast({
						icon: 'none',
						title: '请输入举报内容'
					})
					return
				}
				if (that.moder == '' || !(/^1\d{10}$/.test(that.moder))) {
					wx.showToast({
						icon: 'none',
						title: '手机号有误'
					})
					return
				}
				if (that.btnkg == 1) {
					return
				} else {
					that.btnkg = 1
				}
				var jkurl="/user/complaint"
				var data={
					phone:that.moder,
					content:that.tuan	  
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
						uni.showToast({
							icon: 'none',
							title: '提交成功'
						})
						setTimeout(function() {
							wx.navigateBack({
								delta: 1
							})
						}, 1000)
				
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
		}
	}
</script>

<style scoped>
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
	}
	.inpus-textarder {
		width: 609rpx;
		height: 250rpx;
		background: #FFFFFF;  
		border: 1px solid #DEDEDE;
		border-radius: 8rpx;
	}

	.inpuus {
		width: 609rpx;
		height: 73rpx;
		background: #FFFFFF;
		border: 1px solid #DEDEDE;
		border-radius: 8rpx;
		
	}
	.okbtn{
		width: 690rpx;
		height: 80rpx;
		background: #79C2EF;
		border-radius: 40rpx;
		font-size: 30rpx;
		font-weight: bold;
		color: #FFFFFF;
		line-height: 80rpx;
		text-align: center;
		margin: 0 30rpx 0;
		position: absolute;
		bottom: 150rpx;
	}
</style>
