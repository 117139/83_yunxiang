<template>
	<view class="content ">
		<!-- <image :src="getimg('/static_xcx/lofin.png')" mode="" class="img"></image> -->
		<htmlLoading ref="htmlLoading" @Retry='onRetry'>
			<view v-if="datas" class="xcx_fwb_img" v-html="datas.content"></view>
			<block v-else>
				<view class="" v-if="id==1">
					<image :src="getimg('/static_xcx/lofin.png')" mode="aspectFill" class="img mt30"></image>
					<view class="text-center pt15 fs17 fwb ">云享自然</view>
				
					<view class=" flex text-center flex-col fwb fs14 pt20 p10">
						<text class="pb5">客服电话：0351-5683426</text>
				
				
						联系电话：0351-5689652
				
					</view>
				</view>
				<view class="" v-if="id==2">
					<image :src="getimg('/static_xcx/lofin.png')" mode="aspectFill" class="img mt30"></image>
					<view class="text-center pt15 fs17 fwb ">云享自然</view>
				
					<view class="   fs14 pt20 p15 lh15" style="text-indent:2em;">
						<view class="pb5"> 云享自然，为您的法律困惑问诊，为您提供法律保护防控风险，为您所处的提供定制化的最优解。
						</view>
						</br>
						<view class="pb12">
							云享自然成立于2012年，是购物商城购物商城购物商城购物商城购物商城购物商城购物商城购物商城购物商城购物商城物商城购物商城购物商城。北京依辈通自成立以来坚持“细心钻研以寻突破口，精心策划以达精益求精，拼尽全力为当事人争取最大合法利益”的办案精神，竭诚为客户提供专业、高效、高品质的法律服务。
						</view>
				
						地址：北京市西城区西环广场T2座8层 </br>
						邮箱：暂时未定 </br>
						电话：010-58301068 </br>
					</view>
				</view>
				<view class="" v-if="id==3" >
					<view class="text-center fwb fs17 mt35"> “云享自然”隐私政策</view>
					<view class="fs14 p15 lh15">
						<view class="pb8 pt15">欢迎您使用“云享自然”软件及相关服务</view> <br>
				
						用户须知：在此特别提醒各位用户认真阅读、充分理解本《软件许可及安装协议》（下称《协议》）——用户应认真阅读充分理解本《协议》中各条款。您的安装、使用、获取和登XXXapp等行为将视为对本《协议》的接受，并同意接受本《协议》各项条款的约束。
						本《协议》是您（下称“用户”）与公司之间关于用户安装、使用软件，注册、使用、管理软件；以及使用公司公司提供的相关服务所订立的协议。本《协议》描述公司与用户之间关于“软件”许可使用及服务相关方面的权利义务。“用户”是指通过公司提供的获取软件授权和XXX注册的途径获得软件产品及号码授权许可以及使用公司公司提供的相关服务的个人或组织。本《协议》可由公司随时更新，更新后的协议条款一旦公布即代替原来的协议条款，恕不再另行通知。用户可重新下载安装本软件或网站查阅最新
						版协议条款。在公司修改《协议》条款后，如果用户不接受修改后的款，请立即停止使用公司提供的软件和服务，用户继续使用公司提供的软件和服务将被视为已接受了修改后的协议。
						除本《协议》有明确规定外，本《协议》并未对利用本“软件”使用的公司或合作单位的其他服务规定
						相关的服务条款。对于这些服务，一般有单独的服务条款加以规范，用户须在使用有关服务时另行了解与确认。单独的服务条款与本协议有冲突的地方，以单独的服务条款为准。如用户使用该服务，视为对相关服务条款的接受
				
						本《协议》是您（下称“用户”）与公司之间关于用户安装、使用软件，注册、使用、管理软件；以及使用公司公司提供的相关服务所订立的协议。本《协议》描述公司与用户之间关于“软件”许可使用及服务相关方面的权利义务。“用户”是指通过公司提供的获取软件授权和XXX注册的途径获得软件产品及号码授权许可以及使用公司公司提供的相关服务的个人或组织。本《协议》可由公司随时更新，更新后的协议条款一旦公布即代替原来的协议条款，恕不再另行通知。用户可重新下载安装本软件或网站查阅最新
						版协议条款。在公司修改《协议》条款后，如果用户不接受修改后的款，请立即停止使用公司提供的软件和服务，用户继续使用公司提供的软件和服务将被视为已接受了修改后的协议。
						除本《协议》有明确规定外，本《协议》并未对利用本“软件”使用的公司或合作单位的其他服务规定
						相关的服务条款。对于这些服务，一般有单独的服务条款加以规范，用户须在使用有关服务时另行了解与确认。单独的服务条款与本协议有冲突的地方，以单独的服务条款为准。如用户使用该服务，视为对相关服务条款的接受
					</view>
				</view>
				<view class="" v-if="id==4">
					<view class="text-center fwb fs17 mt35">“云享自然”用户协议</view>
					<view class="fs14 p15 lh15">
						<view class="pb8 pt15">欢迎您使用“云享自然”软件及相关服务</view> <br>
				
						用户须知：在此特别提醒各位用户认真阅读、充分理解本《软件许可及安装协议》（下称《协议》）——用户应认真阅读充分理解本《协议》中各条款。您的安装、使用、获取和登XXXapp等行为将视为对本《协议》的接受，并同意接受本《协议》各项条款的约束。 <br>
						本《协议》是您（下称“用户”）与公司之间关于用户安装、使用软件，注册、使用、管理软件；以及使用公司公司提供的相关服务所订立的协议。本《协议》描述公司与用户之间关于“软件”许可使用及服务相关方面的权利义务。“用户”是指通过公司提供的获取软件授权和XXX注册的途径获得软件产品及号码授权许可以及使用公司公司提供的相关服务的个人或组织。本《协议》可由公司随时更新，更新后的协议条款一旦公布即代替原来的协议条款，恕不再另行通知。用户可重新下载安装本软件或网站查阅最新 <br>
						版协议条款。在公司修改《协议》条款后，如果用户不接受修改后的款，请立即停止使用公司提供的软件和服务，用户继续使用公司提供的软件和服务将被视为已接受了修改后的协议。
						除本《协议》有明确规定外，本《协议》并未对利用本“软件”使用的公司或合作单位的其他服务规定
						相关的服务条款。对于这些服务，一般有单独的服务条款加以规范，用户须在使用有关服务时另行了解与确认。单独的服务条款与本协议有冲突的地方，以单独的服务条款为准。如用户使用该服务，视为对相关服务条款的接受
				
						本《协议》是您（下称“用户”）与公司之间关于用户安装、使用软件，注册、使用、管理软件；以及使用公司公司提供的相关服务所订立的协议。本《协议》描述公司与用户之间关于“软件”许可使用及服务相关方面的权利义务。“用户”是指通过公司提供的获取软件授权和XXX注册的途径获得软件产品及号码授权许可以及使用公司公司提供的相关服务的个人或组织。本《协议》可由公司随时更新，更新后的协议条款一旦公布即代替原来的协议条款，恕不再另行通知。用户可重新下载安装本软件或网站查阅最新
						版协议条款。在公司修改《协议》条款后，如果用户不接受修改后的款，请立即停止使用公司提供的软件和服务，用户继续使用公司提供的软件和服务将被视为已接受了修改后的协议。
						除本《协议》有明确规定外，本《协议》并未对利用本“软件”使用的公司或合作单位的其他服务规定
						相关的服务条款。对于这些服务，一般有单独的服务条款加以规范，用户须在使用有关服务时另行了解与确认。单独的服务条款与本协议有冲突的地方，以单独的服务条款为准。如用户使用该服务，视为对相关服务条款的接受
					</view>
				</view>
			</block>
			
		</htmlLoading>
	</view>
</template>

<script>
	import api from '../../components/url.js';
	
	import service from '../../service.js';
	var that
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				id: '',
				key:'',
				datas:''
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo'])
		},
		onLoad(option) {
			that = this
			console.log(option)
			that.id = option.id
			if (option.id == 1) {

				that.title = '联系客服'
				that.key='lxkf'

			} else if (option.id == 3) {
				that.title = '隐私政策'
				that.key='ysxy'
			} else if (option.id == 2) {
				that.title = '关于我们'
				that.key='gywm'
			} else if (option.id == 4) {
				that.title = '用户协议'
				that.key='yhxy'
			}else if (option.id == 7) {
				that.title = '服务协议'
				that.key='fwxy'
			}

			that.onRetry()

			uni.setNavigationBarTitle({
				title: that.title
			});
		},
		methods: {
			...mapMutations(['logout', 'login']),
			onRetry(){
				that.getdata(that.key)
			},
			getdata(key){
				var jkurl='/info/detail'
				var data={
					key:key
				}
				service.P_post(jkurl, data).then(res => {
					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						that.$refs.htmlLoading.htmlReset_fuc(0)
						var datas = res.data
						console.log(typeof datas)
				
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						that.datas=datas
					} else {
				
						that.$refs.htmlLoading.htmlReset_fuc(1)
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
			
			getimg(img) {
				return api.getimg(img)
			},
			tiaozhuan(e) {
				return api.tiaozhuan(e)
			},


		}
	}
</script>

<style>
	.img {
		width: 92rpx;
		height: 111rpx;
		margin-left: 330rpx;
	}

	page {
		background-color: #fff;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
	}

	.dai {
		color: #EB4C50;
	}

	.content {
		background-color: #fff;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		overflow-x: hidden;
	}
	.xcx_fwb_img{
		padding: 0 30upx;
	}
</style>
