<template>
	<view>
		<htmlLoading ref="htmlLoading" @Retry='getdata' :bj_show="false">
			<view class="box">
				
				<view class="opbox" v-for="(item,index) in datas">
					<view>
						<text class="xx">*</text>
						<text class="xx tit">{{item.title}}</text>
					</view> 
					<view class="sebox">
						<view class="secon dis_flex aic" v-for="(item2,index2) in item.options_arr" @click="xz(item,item2)">
							<view v-if="!item2.select" class="kk"></view>
							<image v-else class="img" :src="getimg('/static_xcx/education/agree.png')" mode="aspectFit"></image>
							<text class="optxt">{{item2.value}}</text>
						</view>
					</view>
				</view>
				
			</view>
			
			
			<view class="bottombtnbox" @click='sub' data-url='../result/result' >
				<view class="bottombtn">提交试卷</view>
			</view>
		</htmlLoading>
	</view>
</template>

<script>
	import Vue from 'vue'
	import api from '../../components/url.js';
	import service from '../../service.js';
	   
	// 底部  tabbar
	// import Tabbar from '../../components/tabBar/tabBar.vue'
	var that
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				id:'',
				datas:[
					{
						tit:'1.下面哪种动物在黄河源园区几乎不可能看到',
						options: [
							{txt: '雪豹',select: false},
							{txt: '金钱豹',select: true},
							{txt: '兔狲',select: false},
							{txt: '藏原羚',select: false}
						]
					},{
						tit:'2.格萨尔王的象征，他的宝座、他的称号中都有一头',
						options: [
							{txt: '牦牛',select: false},
							{txt: '雪豹',select: true},
							{txt: '棕熊',select: false},
							{txt: '雄狮',select: false}
						]
					},{
						tit:'3.聪明的高原植物可以依靠____抵御强风',
						options: [
							{txt: '依托高大的树木',select: false},
							{txt: '随风而去',select: true},
							{txt: '寻找背风的山坡',select: false},
							{txt: '匍匐式求生',select: false}
						]
					},{
						tit:'4.玛多县大气含氧量约为内地的',
						options: [
							{txt: '30%',select: false},
							{txt: '70%',select: true},
							{txt: '90%',select: false},
							{txt: '50%',select: false},
						]
					},
					
				]
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo'])
		},
		onLoad(option) {
			that=this
			that.id=option.id
			// return
			that.getdata()
		},
		methods: {
			...mapMutations(['logout', 'login']),
			getdata(){
				var jkurl='/education/questions'
				var data={
					id:that.id
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
					
								
					that.$refs.htmlLoading.htmlReset_fuc(1)
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '获取数据失败'
					})
				})
			},
			getimg(img) {
				return service.getimg(img)
			},
			jump(e) {
				return service.jump(e)
			
			},
			xz(item,item2){
				if(item.type==1){
					for(var i=0;i<item.options_arr.length;i++){
						if(item.options_arr[i].title==item2.title){
							Vue.set(item.options_arr[i],'select',true)
						}else{
							Vue.set(item.options_arr[i],'select',false)
						}
					}
				}else{
					if(!item2.select){
						Vue.set(item2,'select',true)
					}else{
						Vue.set(item2,'select',false)
					}
				}
				// this.testlist[index].options[index2].select = !this.testlist[index].options[index2].select
			},
			sub(){
				var answer_arr=[]
				for(var j=0;j<that.datas.length;j++){
					var item=that.datas[j]
					var item_ans={}
					var i_answer=[]
					for(var i=0;i<item.options_arr.length;i++){
						if(item.options_arr[i].select){
							i_answer.push(item.options_arr[i].title)
						}
					}
					item_ans={
						id:item.id,
						answer:i_answer.join(',')
					}
					answer_arr.push(item_ans)
				}
				var datas={
					id:that.id,
					answer_arr:JSON.stringify(answer_arr)
				}
				var jkurl='/education/answer'
				console.log(datas)
				// return
				if(that.btn_kg==1){
					return
				}
				that.btn_kg=1
				service.P_post(jkurl, datas).then(res => {
					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)
				
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						datas=JSON.stringify(datas)
						uni.redirectTo({
							url:'../result/result?datas='+datas
						})
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
						title: '系统异常'
					})
				})
			},
			
			jump(e) {
				return service.jump(e)
			
			},
		}
	}
</script>

<style scoped>
	.box{
		padding: 20rpx 50rpx 200rpx;
	}
	.xx{
		font-size: 24rpx;
		font-weight: bold;
		color: #FF0042;
	}
	.tit{
		color: #333333;
	}
	.img{
		width: 30rpx;
		height: 30rpx;
		vertical-align: middle;
	}
	.kk{
		width: 30rpx;
		height: 30rpx;
		border: 1px solid #999999;
		border-radius: 50%;
	}
	.optxt{
		font-size: 24rpx;
		font-weight: 400;
		color: #333333;
		padding-left: 20rpx;
	}
	.opbox{
		margin-bottom: 45rpx;
	}
	.sebox{
		margin-top: 36rpx;
	}
	.secon{
		margin-bottom: 24rpx;
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
</style>
