<!-- 详情页 -->
<template>
	<view class="detail">
		<!-- 自定义导航 -->
		<uni-nav-bar fixed statusBar :title="title" class="status-title" @clickLeft="back">
			<uni-icons slot="left" type="arrowleft" class="status-icon"></uni-icons>
		</uni-nav-bar>
		<htmlLoading ref="htmlLoading" @Retry='getdata' :bj_show="false">
			<view class="banner">
				<!-- 轮播 -->
				<uni-swiper-dot :info="datas.banner_url" :current="current" :field="content" :mode="mode" class="swiper"
					:dotsStyles="dotsStyles">
					<swiper class="swiper-box" @change="changeSwiper" circular>
						<swiper-item v-for="(item ,index) in datas.banner_url" :key="index" @click="pveimg" :data-src="item" :data-array="datas.banner_url">
							<view class="swiper-item">
								<image :src="getimg(item)" mode="aspectFill" lazy-load>
								</image>
							</view>
						</swiper-item>
					</swiper>
				</uni-swiper-dot>
			</view>
			<!-- 详情表1 -->
			<view class="detail-box">
				<!-- 第一行 -->
				<view class="detail-box-first-line">
					<view class="detail-box-first-line-left">
						<text class="price-icon">￥<text class="price">{{ datas.price }}</text><text
								class="price-company">元</text></text>
					</view>
					<view class="detail-box-first-line-right">
						<text>
							<!-- 月销 -->
							销售量
							<text class="number" style="margin-left: 8upx;">
								{{ datas.sales>=10000?parseInt(datas.sales/10000)+'w+':datas.sales}}
							</text>
						</text>
					</view>
				</view>
				<!-- 第二行 -->
				<view class="detail-box-second-line">
					<view class="detail-box-second-line-left">
						<text class="name go-beyond-no-flex">{{datas.title}}</text>
					</view>
					<view class="detail-box-second-line-right">

						<button plain open-type="share"
							style="border: none;width: 40rpx;height: 40rpx;display: flex;justify-content: center;align-items: center;">
							<text class="iconfont icon-share" style="font-size: 40rpx;"></text>
						</button>
					</view>
				</view>
				<!-- 第三行 -->
				<view class="detail-box-third-line">
					<text class="pin">{{ datas.subtitle }}</text>
				</view>
			</view>
			<!-- 规格 -->
			<view class="Specifications">
				<!-- 第一行 -->
				<view class="Specifications-first-line"  @click="MyPopupShow1">
					<view class="Specifications-first-line-first-column">
						<text>选择</text>
					</view>
					<view class="Specifications-first-line-second-column">
						<text v-if="ggshow1">已选：{{ggshow1?ggshow1+',':''}}{{cnum>0?'X'+cnum:''}}</text>
					</view>
					<view class="Specifications-first-line-third-column">
						<image :src="getimg('/static_xcx/jiantoi_07.png')" mode="aspectFit"></image>
					</view>
				</view>
				<!-- 第二行 -->
				<view class="Specifications-second-line">
					<view class="Specifications-second-line-first-column">
						<text>运费</text>
					</view>
					<view class="Specifications-second-line-second-column">
						<text v-if="datas.post_type==1">包邮 </text>
						<text v-if="datas.post_type==2">自提</text>
						<text v-if="datas.post_type==3">在线支付运费(以实际支付为准)</text>
					</view>
				</view>
			</view>
			<!-- 评价 -->
			<view class="evaluate">
				<!-- 第一行 -->
				<view class="evaluate-first-line" v-if="isEvaluate">
					<!-- 第一行 左-->
					<view class="evaluate-first-line-left">
						<text class="evaluate-first-line-left-title">商品评价({{ g_datas.comment_count }})</text>
					</view>
					<!-- 第一行 右-->
					<view class="evaluate-first-line-right">
						<view class="evaluate-first-line-right-more" @click="jump" :data-url="'/pagesA/evaluate/evaluate?id='+id"><text class="">查看更多</text>
							<image :src="getimg('/static_xcx/jiantoi_07.png')" mode="aspectFit"></image>
						</view>
					</view>
				</view>
				<!-- 第二行 -->
				<view class="evaluate-second-line" v-for="(item,index) in comment" :key="index">
					<!-- 第二行 第一行-->
					<view class="evaluate-second-line-first">
						<!-- 第二行 第一行 左-->
						<view class="evaluate-second-line-first-left ">
							<image :src="getimg(item.user_Info.img)" mode="aspectFill" class="br25"></image>
						</view>
						<!-- 第二行 第一行 右-->
						<view class="evaluate-second-line-first-right">
							<!-- 昵称 -->
							<view class="evaluate-second-line-first-right-nick">
								<text>{{ item.user_Info.nick }}</text>
							</view>
							<!-- 时间 -->
							<view class="evaluate-second-line-first-right-time">
								<text>{{ item.add_time}}</text>
							</view>
						</view>
					</view>
					<!-- 第二行 第二行-->
					<view class="evaluate-second-line-second">
						<text>{{item.content}}</text>
					</view>
				</view>
			</view>
			<!-- 宝贝详情 -->
			<view class="BabyDetails">
				<!-- 标题 -->
				<view class="BabyDetails-title">
					<view class="BabyDetails-title-left"></view>
					<view class="BabyDetails-title-center">
						<text>宝贝详情</text>
					</view>
					<view class="BabyDetails-title-right"></view>
				</view>
				<view class="BabyDetails-body xmfwb_box" v-html="getfwb(datas.content)">
					<!-- <image :src="getimg(detailImg)" mode="widthFix"></image> -->
				</view>
			</view>
			<view class="" style="width: 690rpx;height: 50rpx;margin-bottom:120rpx;"></view>
			
			<!-- 加入购物车 -->
			<view class="ShoppingCart compatibleProcessing">
				<view class="ShoppingCartLeft">
					<view class="ShoppingCartLeftC" @click="clickSCLeft(1,2)">
						<button class="ShoppingCartLeftItem" open-type="contact">
							<text class="iconfont icon-kefu"></text>
							<text>客服</text>
						</button>
					</view>
					<view class="ShoppingCartLeftC" @click="jump" :data-url="'/pagesA/jubao/jubao?id='+id"  :data-login="true" :data-haslogin="hasLogin">
						<button class="ShoppingCartLeftItem" >
							<text class="iconfont icon-jubao"></text>
							<text>举报</text>
						</button>
					</view>
					<view v-if="g_datas.user_collection==2" class="ShoppingCartLeftC" @click="shoucang(id)">
						<button class="ShoppingCartLeftItem" >
							<text class="iconfont icon-shoucang"></text>
							<text>收藏</text>
						</button>
					</view>
					<view v-if="g_datas.user_collection==1" class="ShoppingCartLeftC" @click="shoucang(id)">
						<button class="ShoppingCartLeftItem" >
							<text class="iconfont icon-shoucang1"></text>
							<text>已收藏</text>
						</button>
					</view>
				</view>
				<view class="ShoppingCartRight">
					<button class="ShoppingCartRightC dis_flex aic ju_c" :style="{'background-color':item.color}"
						v-for="(item,index) in ShoppingCartData.right" :key="index" @click="clickSCRight(index,item)">
						<text>{{ item.text }}</text>
					</button>
				</view>
			</view>



			<!-- 弹出层 -->
			<view class="MyPopup" v-if="SCPopupShow">
				<view class="MyPopupBox compatibleProcessing">
					<view class="MyPopupBox-first-line">
						<view class="MyPopupBox-first-line-first-clum">
							<image :src="getimg(show_img)" mode="aspectFill"></image>
						</view>
						<view class="MyPopupBox-first-line-second-clum">
							<view class="MyPopupBox-first-line-second-clum-item">
								<view class="price"><text>￥</text><text>{{show_pri}}</text></view>
								<view class="num"><text>库存</text><text>{{show_num}}</text></view>
							</view>
							<image :src="getimg('/static_xcx/image/shoppingMall/delete_icon.png')" mode="heightFix"
								@click="closeSC"></image>
						</view>
					</view>
					<scroll-view scroll-y="true" class="flavor">
						<!-- <view class="" v-for="(attribute,aIndex) in datas.spec_arr" :key="aIndex">
							<view class="flavor-title">
								{{attribute.type}}:
							</view>
							<view class="flavor-body">
								<view class="item" v-for="(clazz,index1) in attribute.clazz" :key="clazzIndex"
									@click="choiceClazz(clazzIndex,attribute.type,aIndex,clazz)"
									:class="{'flavor-item-active':clazz.active,'flavor-item':clazz.active==false&&clazz.IsItInStock==false,'noSelect':clazz.active==false&&clazz.IsItInStock==true}">
									<text>{{ clazz.text }}</text>
								</view>
							</view>
						</view> -->
						
						<view class="" v-for="(item,idx) in guige_arr" :key="idx">
							<view class="flavor-title">
								{{item.title}}:
							</view>
							<view class="flavor-body">
								<block  v-for="(item1,idx1) in item.child" :key="idx1">
									<view class="item flavor-item"
										v-if="ggShow(item.title,item1,idx)"
										:class="{ 'flavor-item-active': guige_select[idx]&&guige_select[idx].id==item1.id,'noSelect':!ggShow(item.title,item1,idx)}"
										:data-ggidx="idx"
										:data-name="item.title"
										:data-value="item1" 
										@tap="selegg">
										<!-- <text>{{ item1.title }}{{ggShow(item.title,item1,idx)}}</text> -->
										<text>{{ item1.title }}</text>
									</view>
									<view class="item flavor-item"
										v-else
										:class="{ 'flavor-item-active': guige_select[idx]&&guige_select[idx].id==item1.id,'noSelect':!ggShow(item.title,item1,idx)}"
										:data-ggidx="idx"
										:data-name="item.title"
										:data-value="item1">
										<text>{{ item1.title }}</text>
									</view>
								</block>
							</view>
						</view>
						
						
						<view class="MyPopupBox-third-line">
							<view class="SelectQuantityLeft">
								<text>选择数量:</text>
							</view>
							<view class="SelectQuantityRight">
								<view class="SelectQuantityRightLeft" @tap="goods_num(1)">
									<text>-</text>
								</view>
								<view class="center">
									<text>{{ cnum }}</text>
								</view>
								<view class="SelectQuantityRightRight" @tap="goods_num(2)">
									<text>+</text>
								</view>
							</view>
						</view>
					</scroll-view>
					
					<view class="MyPopupBox-fourth-line" @click="qx">
						<text>确定</text>
					</view>
				</view>
			</view>
		</htmlLoading>
	</view>
</template>

<script>
	import Vue from 'vue'
	import api from '@/components/url.js';
	import date from '@/components/getDate.js'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import service from '../../service.js';
	var that
	export default {
		data() {
			return {
				
				title: '商品详情',
				none: true,
				current: 0,
				mode: 'nav',
				swiperCurrent: 0,
				swiperImg: [
					'/static_xcx/index/banner.png',
					'/static_xcx/tui.png'
				],
				dotsStyles: {
					color: ''
				},
				
				Specifications: {
					Specification: '五香味500g【收藏加购送奶片】'
				},
				isEvaluate: true,
				
				detailImg: '/static_xcx/image/shoppingMall/commodity1.png',
				ShoppingCartData: {
					right: [{
							color: '#FA3117',
							text: '加入购物车'
						},
						{
							color: '#FECE0A',
							text: '立即购买'
						}
					]
				},
			
				//弹出框动态样式
				SCPopupStyle: {
					//屏幕高度
					windowHeight: ''
				},
				//是否显示弹出层
				SCPopupShow: false,
				isGou: false,
				
				
				
				id:'',
				g_datas:'',
				datas:'',
				comment:'',
				
				guige_arr:[],
				
				guige_arr_show:[],
				guige_select:[],
				guige: [],  //规格
				show_pri:0,
				show_img:0,
				show_num:0,
				//选择数量
				cnum: 0,
				spec_id:'' ,     //sku_id
			};
		},
		onLoad(option) {
			uni.getSystemInfo({
				success: (res) => {
					this.SCPopupStyle.windowHeight = res.windowHeight * 2 + 'rpx';
				}
			});
			
			that=this
			that.id=option.id
			that.getdata()
		},
		onHide() {
			// uni.clearStorage();
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo']),
			ggshow1(){
				var arr=this.guige_select
				if(!arr){
					return
				}
				var  newarr=[]
				for(var i=0;i<arr.length;i++){
					if(arr[i]&&arr[i].title){
						newarr.push(arr[i].title)
					}
						
					
				}
				console.log(newarr.join(','))
				return newarr.join(',')
			}
		},
		methods: {
			...mapMutations(['logout', 'login']),
			getfwb(str){
				return service.get_fwb(str)
			},
			ggShow(name,value,idx){
				var that =this
				var newselect=value.id
				// var show_select=JSON.parse(JSON.stringify(that.guige_select))
				// show_select[idx]=newselect
				
				
				// console.log(newselect,newselect)
				
				var show_arr=[]
				for(var i=0;i<that.guige.length;i++){
					var id_arr='_'+that.guige[i].spec_id+'_'  //获取规格sku的id数组
				
					var push_type=true
					for(var s=0;s<that.guige_arr.length;s++){
						var a=false
						if(that.guige_select[s]){
							a='_'+that.guige_select[s].id+'_'
						}
						if(s==idx){
							a='_'+newselect+'_'
						}
							// console.log(id_arr,a)
						// console.log(a=='false')
						if(!a||a=='false'){
							push_type=true
							// console.log('跳过'+a)
						}else if(id_arr.indexOf(a)==-1){
							// console.log(that.guige[i].sku)
							// console.log('-1'+a)
							push_type=false
							break
						}
					
					}
					// console.log(a,push_type)
					if(push_type){
						if(that.guige[i].num>0){
							show_arr.push(that.guige[i])
						}
						
					}
					
				}
				// console.log(show_arr)
				// console.log(value,show_arr)
				if(show_arr.length>0){
					return true
				}
				return false
				// var str=that.guige_arr_show[idx].value
				// var a=value
				// if(str.indexOf(a)!=-1){
				// 	return true
					
				// }
				// return false
			},
			
			//选择规格
			selegg(e) {
				var that=this
			  // console.log(e.currentTarget.dataset.name)
			  console.log(e.currentTarget.dataset.value)
			  // console.log(e.currentTarget.dataset.ggidx)
				
				var newselect=e.currentTarget.dataset.value
				 var str=JSON.stringify(that.guige_select)
				 var a=JSON.stringify(newselect)
				
				 var id_kg=false
				 if(str.indexOf(a)==-1){
				 	 Vue.set(that.guige_select,e.currentTarget.dataset.ggidx,newselect)
				 	
				 }else{
					 // console.log(str.indexOf(a)==-1)
					 Vue.set(that.guige_select,e.currentTarget.dataset.ggidx,false)
						id_kg=true
						// console.log(that.guige_select)
				 }
				 // console.log(str.indexOf(a)==-1)
			  // console.log(a,str)
				var show_arr=[]
				for(var i=0;i<that.guige.length;i++){
					var id_arr='_'+that.guige[i].spec_id+'_'  //获取规格sku的id数组
					var push_type=true
					for(var s=0;s<that.guige_select.length;s++){
						
						if(!that.guige_select[s]){
							push_type=true
						}else{
							// var a=JSON.stringify(that.guige_select[s])
							var a='_'+that.guige_select[s].id+'_'
							if(a.length>0&&id_arr.indexOf(a)==-1){
								// console.log(that.guige[i].sku)
								push_type=false
								break
								
							}
						}
						
					}
					if(push_type){
						show_arr.push(that.guige[i])
					}
					
				}
				console.log('show_arr---------------------->')
				console.log(show_arr)
				var idx=e.currentTarget.dataset.ggidx
				var kucun_num=0
				var pri=0
				var sku_img=''
				for	(var i=0;i<show_arr.length;i++){
					kucun_num+=show_arr[i].num
					if(pri==0){
						that.spec_id=show_arr[i].spec_id
						if(id_kg){
							that.spec_id=0
						}
						pri=show_arr[i].price
					}
					if(sku_img==""){
						// sku_img=show_arr[i].v_img
					}
				}
				
				
				that.show_pri=pri
				that.show_num=kucun_num
				if(kucun_num<that.cnum){
					that.cnum=kucun_num
				}
				if(kucun_num>0&&that.cnum==0){
					that.cnum=1
				}
				that.show_img=sku_img
				if(that.show_img.length==0){
					that.show_img=that.datas.banner_url[0]
				}
				if(that.show_pri==0){
					that.show_pri=that.datas.price
				}
				
			},
			
			shoucang(id){
				var jkurl="/shop/collection"
				var data={
					cid:that.id,
					status:1	  //收藏类型 1、商品 2、景区活动
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
						that.getdata()
				
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
								title: '获取失败'
							})
						}
					}
				}).catch(e => {
					
					that.$refs.htmlLoading.htmlReset_fuc(1)
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '系统错误'
					})
				})
			},
			getdata(){
				var jkurl="/shop/goods_detail"
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
						that.g_datas=datas
						that.datas=datas.goods_info
						that.comment=datas.comment
						var guige_sku=JSON.stringify(datas.goods_info.spec_info)
						var guige_skuarr=JSON.stringify(datas.goods_info.spec_arr)
						console.log(guige_sku)
						that.guige=JSON.parse(guige_sku)
						that.guige_arr_show=JSON.parse(guige_skuarr)
						that.guige_arr=datas.goods_info.spec_arr
						
						that.show_img=datas.goods_info.banner_url[0]
						that.show_pri=datas.goods_info.price
						that.show_num=''
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
								title: '获取失败'
							})
						}
					}
				}).catch(e => {
					
					that.$refs.htmlLoading.htmlReset_fuc(1)
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '系统错误'
					})
				})
			},
			contactView(e) {
				console.log(e)
			},
			pveimg(e){
				service.pveimg(e)
			},
			jump(e){
				service.jump(e)
			},
			//选择规格 显示弹出层
			MyPopupShow1() {
				this.SCPopupShow = true;
			},
			changeSwiper(e) {
				// console.log(e.detail);
				this.current = e.detail.current;
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			
			//点击商品导航左
			clickSCLeft(index, item) {
				let ShoppingCartData = this.ShoppingCartData;
				//点击客服
				if (item.text == '客服') {
					console.log(123)
				}
				//点击举报
				if (item.text == '举报') {
					this.contact = '';
					uni.navigateTo({
						url: '../jubao/jubao'
					})
				}
				//点击收藏
				if (item.text == '收藏') {
					ShoppingCartData.left[index].isShow = false;
					ShoppingCartData.left[index + 1].isShow = true;
				}
				//点击已收藏
				if (item.text == '已收藏') {
					ShoppingCartData.left[index].isShow = false;
					ShoppingCartData.left[index - 1].isShow = true;
				}
			},
			//点击商品导航右
			clickSCRight(index, item) {
				//点击加入购物车
				if (item.text == '加入购物车') {
					this.SCPopupShow = true;
				}
				//点击立即购买
				if (item.text == '立即购买') {
					this.SCPopupShow = true;
					this.isGou = true;
				}
			},

			//选择属性
			choiceClazz(cIndex, type, aIndex, clazz) {
				let attributeList = this.attributeList;
				let cnum = this.cnum;
				let attribute = attributeList[aIndex].clazz;
				this.stock = this.attributeList[aIndex].clazz[cIndex].num - cnum;
				this.aIndex = aIndex;
				if (cnum * clazz.num == 0) {
					this.attributeList[aIndex].clazz[cIndex].IsItInStock = true;
					this.stock = attribute[cIndex].num - this.cnum;
					if(this.stock<0){
						this.stock = 0;
					}
					uni.showToast({
						icon: 'none',
						title: '该口味没有库存了'
					})
				} else {
					for (var i = 0; i < attribute.length; i++) {
						if (i == cIndex) {
							attribute[i].active = true;
							this.retailPrice = attribute[i].retailPrice;
							this.stock = attribute[i].num - this.cnum;
							if(this.stock<0){
								this.stock = 0;
							}
							uni.setStorageSync(type, attribute[i].text)
							let price = 0;
							for (var j = 0; j < this.attributeList.length; j++) {
								price += uni.getStorageSync(uni.getStorageSync(this.attributeList[j].type));
							}
							this.TotalPrice = price * cnum;
						} else {
							attribute[i].active = false;
						}
					}
				}
			},
			//选择数量减
			goods_num(type){
				if (that.guige_select.length == 0) {
					uni.showToast({
						icon: 'none',
						title: '请先选择规格'
					})
					this.cnum = 0
					return
				}
				console.log(type)
				console.log(this.show_num)
				if(that.cnum==1&&type==1){
					return
				}else if (that.cnum == this.show_num&&type==2) {
					this.cnum = this.show_num
					return
				}else if(type==1){
					that.cnum--
				}else{
					that.cnum++
				}
			},
			//确定选择
			qx() {
				// let str = '';
				// for (var i = 0; i < this.attributeList.length; i++) {
				// 	str += `${this.attributeList[i].type}:${uni.getStorageSync(this.attributeList[i].type)}`
				// }
				// this.Specifications.Specification = `${str}*${this.cnum}`;
				if (!that.spec_id || that.guige_select.length != that.guige_arr.length) {
					uni.showToast({
						icon: 'none',
						title: '请选择规格'
					})
					return
				}
				for (var i=0; i < that.guige_arr.length; i++) {
					console.log('that.guige_select[i]----------------------------------->')
					console.log(that.guige_select[i] == "false")
					console.log(that.guige_select[i] , 'false')
					console.log('that.guige_select[i]----------------------------------->')
					if (!that.guige_select[i].id||that.guige_select[i] == 'false') {
						uni.showToast({
							icon: 'none',
							title: '请选择' + that.guige_arr[i].title
						})
						return
					}
				}
				if (that.cnum == 0) {
					uni.showToast({
						icon: 'none',
						title: '请添加数量'
					})
					return
				}
				var jkurl="/car/add"
				var data={
					goods_id:that.id,
					spec_id:that.spec_id,
					goods_num:that.cnum,
					type:this.isGou == true?2:1
				}
				uni.showLoading({
					mask:true,
					title:'正在提交'
				})
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
						if (that.isGou == true) {
							uni.navigateTo({
								url: '/pagesA/shopping_order/shopping_order'
							})
						} else {
							uni.showToast({
								title: '加入购物车成功',
								success: () => {
									that.SCPopupShow = false;
									// setTimeout(() => {
									// 	uni.redirectTo({
									// 		url: '/pagesA/Settlement_desk/Settlement_desk'
									// 	})
									// }, 2000)
								}
							})
						}
				
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
								title: '获取失败'
							})
						}
					}
				}).catch(e => {
					
					that.$refs.htmlLoading.htmlReset_fuc(1)
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '系统错误'
					})
				})
				return
				console.log('that.guige_select----------------------------------->')
				// console.log(that.guige_select)
				// console.log(that.spec_id)
				console.log('that.guige_select----------------------------------->')
				if (this.isGou == true) {
					setTimeout(() => {
						// uni.redirectTo({
						// 	url: '/pagesA/Settlement_desk/Settlement_desk'
						// })
						uni.navigateTo({
							url: '/pagesA/shopping_order/shopping_order'
						})
					}, 2000)
				} else {
					uni.showToast({
						title: '加入购物车成功',
						success: () => {
							this.SCPopupShow = false;
							// setTimeout(() => {
							// 	uni.redirectTo({
							// 		url: '/pagesA/Settlement_desk/Settlement_desk'
							// 	})
							// }, 2000)
						}
					})
				}



			},
			//关闭弹出层
			closeSC() {
				this.SCPopupShow = false;
			},
			getimg(img) {
				return api.getimg(img)
			},
			getDate(time) {
				return date.getDate(time)
			}

		}
	}
</script>

<style lang="scss" scoped>
	.detail {
		padding: 0 30rpx;

		.status-title {
			font-size: 34rpx;
			font-family: PingFang;
			font-weight: bold;
			color: #000000;

			.status-icon {
				font-size: 30rpx;
			}
		}

		//banner
		.banner {
			width: 690rpx;
			height: 750rpx;

			// margin-top: 15rpx;
			swiper {
				height: 750rpx;
			}

			image {
				width: 690rpx;
				height: 750rpx;
				display: block;
				box-sizing: border-box;
				border-radius: 6rpx;
			}

			.swiper {
				width: 690rpx;
				height: 750rpx;
				border-radius: 16rpx;
				overflow: hidden;

				.swiper-item {
					width: 690rpx;
					height: 750rpx;
					// position: relative;

					.CornerMarker {
						width: 70rpx;
						height: 30rpx;
						position: relative;
						right: 30rpx;
						bottom: 30rpx;
						background: #000000;
						opacity: 0.5;
						border-radius: 15rpx;
						font-size: 20rpx;
						font-family: PingFang;
						font-weight: 400;
						color: #FFFFFF;
						display: flex;
						justify-content: center;
						align-items: center;
						z-index: 99;
					}

				}
			}
		}

		// 详情
		.detail-box {
			width: 690rpx;
			height: 250rpx;
			background-color: #fff;
			box-sizing: border-box;
			padding: 25rpx 19rpx 4rpx 19rpx;
			margin-top: 26rpx;
			box-shadow: 0 10rpx 19rpx 3rpx rgba(153, 153, 153, 0.08);
			margin-bottom: 27rpx;

			.detail-box-first-line {
				width: 100%;
				height: 43rpx;
				// background-color: red;
				display: flex;
				justify-content: space-between;

				.detail-box-first-line-left {
					width: 544rpx;
					height: 100%;
					// background-color: #4CD964;

					.price-icon {
						font-size: 22rpx;
						font-family: PingFang;
						font-weight: bold;
						// color: #FA3117;
						line-height: 38rpx;

						.price {
							font-size: 60rpx;
							font-family: DINCond;
							font-weight: bold;
							color: #FA3117;
							line-height: 38rpx;

							.price-company {
								font-size: 22rpx;
								font-family: PingFang;
								font-weight: 400;
								color: #333333;
								line-height: 38rpx;
							}
						}
					}

				}

				.detail-box-first-line-right {
					width: 127rpx;
					height: 100%;
					display: flex;
					justify-content: flex-end;

					// justify-content: center;
					// align-items: center;
					text:nth-child(1) {
						font-size: 22rpx;
						font-family: PingFang;
						font-weight: 400;
						color: #333333;
						line-height: 38rpx;

						.number {}
					}
				}
			}

			.detail-box-second-line {
				width: 100%;
				// height: 74rpx;
				// background-color: #795DA3;
				margin-top: 27rpx;
				margin-bottom: 27rpx;
				position: relative;

				.detail-box-second-line-left {
					width: 538rpx;
					height: 100%;
					// background-color: #9A6E3A;

					.name {
						font-size: 30rpx;
						font-family: PingFang;
						font-weight: bold;
						color: #333333;
						line-height: 46rpx;
					}
				}

				.detail-box-second-line-right {
					width: 44rpx;
					height: 100%;
					position: absolute;
					right: 0;
					top: 0;

					// background-color: #A71D5D;
					image {
						width: 40rpx;
						height: 40rpx;
					}
				}
			}

			.detail-box-third-line {
				width: 435rpx;
				height: 22rpx;
				// background-color: #9A6E3A;
				display: flex;
				align-items: center;

				.pin {
					font-size: 22rpx;
					font-family: PingFang;
					font-weight: 400;
					color: #666666;
					line-height: 38rpx;
					// margin-right: 10rpx;
					// max-width: 100rpx;
				}
			}
		}

		// 规格
		.Specifications {
			width: 690rpx;
			height: 150rpx;
			// background-color: #795DA3;
			box-sizing: border-box;
			padding: 37rpx 19rpx 11rpx 19rpx;
			background: #FDFDFD;
			box-shadow: 0px 10px 19px 3px rgba(153, 153, 153, 0.08);
			border-radius: 8px;
			margin-bottom: 27rpx;

			.Specifications-first-line {
				width: 100%;
				height: 25rpx;
				// background-color: #669900;
				display: flex;
				position: relative;

				.Specifications-first-line-first-column {
					width: 60rpx;
					height: 100%;
					// background-color: #79C2EF;
					display: flex;
					align-items: center;

					text {
						font-size: 26rpx;
						font-family: PingFang;
						font-weight: bold;
						color: #333333;
						line-height: 38rpx;
					}
				}

				.Specifications-first-line-second-column {
					width: 500rpx;
					height: 100%;
					// background-color: #666666;
					display: flex;
					margin-left: 36rpx;
					max-width: 500rpx;
					align-items: center;

					text {
						font-size: 24rpx;
						font-family: PingFang;
						font-weight: 400;
						color: #333333;
						line-height: 38rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}

				.Specifications-first-line-third-column {
					width: 20rpx;
					height: 100%;
					// background-color: #990055;
					position: absolute;
					right: 0;
					top: 0;

					image {
						width: 20rpx;
						height: 20rpx;
						position: absolute;
						right: 0;
						top: 0;
					}
				}
			}

			.Specifications-second-line {
				width: 100%;
				height: 25rpx;
				// background-color: #669900;
				display: flex;
				position: relative;
				margin-top: 26rpx;

				.Specifications-second-line-first-column {
					width: 60rpx;
					height: 100%;
					// background-color: #79C2EF;
					display: flex;
					align-items: center;

					text {
						font-size: 26rpx;
						font-family: PingFang;
						font-weight: bold;
						color: #333333;
						line-height: 38rpx;
					}
				}

				.Specifications-second-line-second-column {
					width: 420rpx;
					height: 100%;
					// background-color: #666666;
					display: flex;
					margin-left: 36rpx;
					max-width: 420rpx;
					align-items: center;

					text {
						font-size: 24rpx;
						font-family: PingFang;
						font-weight: 400;
						color: #333333;
						line-height: 38rpx;
					}
				}
			}
		}

		/* 评价 */
		.evaluate {
			width: 690rpx;
			// height: 467rpx;
			box-sizing: border-box;
			padding: 35rpx 19rpx 34rpx 20rpx;
			background: #FDFDFD;
			box-shadow: 0px 10px 19px 3px rgba(153, 153, 153, 0.08);
			border-radius: 8px;

			// background-color: #0077AA;
			.evaluate-first-line {
				width: 100%;
				height: 29rpx;
				// background-color: #55A532;
				display: flex;
				justify-content: space-between;

				.evaluate-first-line-left {
					width: 547rpx;
					height: 100%;
					// background-color: #990055;
					display: flex;
					align-items: center;

					.evaluate-first-line-left-title {
						font-size: 30rpx;
						font-family: PingFang;
						font-weight: bold;
						color: #333333;
						line-height: 38rpx;
					}
				}

				.evaluate-first-line-right {
					width: 143rpx;
					height: 100%;
					// background-color: #666666;
					display: flex;
					justify-content: center;
					align-items: center;

					.evaluate-first-line-right-more {
						display: flex;
						justify-content: flex-end;
						align-items: center;

						text {
							font-size: 24rpx;
							font-family: PingFang;
							font-weight: 400;
							color: #999999;
							line-height: 38rpx;
						}

						image {
							width: 20rpx;
							height: 20rpx;
							margin-left: 19rpx;
						}

					}
				}

			}

			.evaluate-second-line {
				width: 100%;
				// height: 300rpx;
				// background-color: #1961B6;
				margin-top: 44rpx;

				.evaluate-second-line-first {
					width: 100%;
					height: 70rpx;
					// background-color: #795DA3;
					display: flex;
					flex-direction: row;

					.evaluate-second-line-first-left {
						width: 70rpx;
						height: 70rpx;

						image {
							width: 70rpx;
							height: 70rpx;
						}
					}

					.evaluate-second-line-first-right {
						width: 620rpx;
						height: 100%;
						margin-left: 23rpx;
						// background-color: #9A6E3A;
						display: flex;
						flex-direction: column;

						.evaluate-second-line-first-right-nick {
							display: flex;
							align-items: center;

							text {
								font-size: 24rpx;
								font-family: PingFang;
								font-weight: bold;
								color: #333333;
								line-height: 38rpx;
							}
						}

						.evaluate-second-line-first-right-time {
							display: flex;
							align-items: center;

							text {
								font-size: 22rpx;
								font-family: PingFang;
								font-weight: 400;
								color: #999999;
								line-height: 38rpx;
							}
						}
					}
				}

				.evaluate-second-line-second {
					text {
						font-size: 24rpx;
						font-family: PingFang;
						font-weight: 400;
						color: #333333;
						line-height: 38rpx;
					}
				}
			}
		}

		/* 宝贝详情 */
		.BabyDetails {
			width: 690rpx;
			// background-color: #F0AD4E;
			margin-top: 64rpx;
			box-sizing: border-box;

			.BabyDetails-title {
				box-sizing: border-box;
				padding: 0 84rpx;
				width: 100%;
				height: 28rpx;
				// background-color: #DF5000;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.BabyDetails-title-left {
					width: 180rpx;
					height: 1px;
					background: #999999;

				}

				.BabyDetails-title-center {
					text {
						font-size: 30rpx;
						font-family: PingFang;
						font-weight: bold;
						color: #333333;
						line-height: 38rpx;
					}
				}

				.BabyDetails-title-right {
					width: 180rpx;
					height: 1px;
					background: #999999;
				}
			}

			.BabyDetails-body {
				width: 100%;
				margin-top: 35rpx;

				image {
					max-width: 100%;
				}
			}
		}

		//商品导航
		.ShoppingCart {
			// width: 690rpx;
			width: 100%;
			height: 120rpx;
			padding: 0 30upx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			position: fixed;
			bottom: 0;
			background-color: #fff;
			left: 0;

			.ShoppingCartLeft {
				width: 230rpx;
				height: 100%;
				display: flex;
				align-items: center;

				.ShoppingCartLeftC {
					width: 100%;
					height: 100%;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;

					button {
						margin: 0 !important;
						display: flex;
						line-height: 38rpx !important;
						padding: 0 !important;
						font-size: 22rpx !important;
						background-color: #fff !important;
						display: flex;
						flex-direction: column;
						justify-content: center;
					}
				}

			}

			.ShoppingCartRight {
				width: 492rpx;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.ShoppingCartRightC {
					width: 220rpx;
					height: 80rpx;
					border-radius: 40rpx;
					font-size: 30rpx;
					font-family: PingFang;
					font-weight: bold;
					color: #FFFFFF;
					line-height: 38rpx;

				}
			}
		}

		.MyPopup {
			width: 750rpx;
			height: 100%;
			background-color: rgba(0, 0, 0, 0.4);
			position: fixed;
			top: 0;
			left: 0;
			z-index: 99;

			.MyPopupBox {
				width: 750rpx;
				height: 834rpx;
				position: absolute;
				bottom: 0;
				background-color: #FFFFFF;
				box-sizing: border-box;
				padding: 43rpx 30rpx 20rpx 30rpx;

				.MyPopupBox-first-line {
					width: 100%;
					height: 200rpx;
					// background-color: #145236;
					display: flex;

					.MyPopupBox-first-line-first-clum {
						width: 200rpx;
						height: 200rpx;

						image {
							width: 100%;
							height: 100%;
							border-radius: 8px;
						}
					}

					.MyPopupBox-first-line-second-clum {
						width: 521rpx;
						height: 100%;
						// background-color: #1961B6;
						box-sizing: border-box;
						padding: 0 30rpx 0 45rpx;
						position: relative;

						image {
							width: 30rpx;
							height: 30rpx;
							position: absolute;
							top: 0;
							right: 0;
						}

						.MyPopupBox-first-line-second-clum-item {
							display: flex;
							flex-direction: column;

							.price {
								font-weight: bold;
								color: #FA3117;
								height: 100%;
								height: 43rpx;
								margin-top: 5rpx;
								// position: relative;

								text:nth-child(1) {
									font-size: 22rpx;
									font-family: PingFang;
									line-height: 38rpx;
								}

								text:nth-child(2) {
									font-size: 60rpx;
									font-family: DINCond;
									line-height: 38rpx;
								}
							}

							.num {
								font-size: 24rpx;
								font-family: PingFang;
								font-weight: 500;
								color: #999999;
								margin-top: 27rpx;

								text:nth-child(1) {
									margin-right: 0.75em;
								}
							}
						}
					}
				}

				.flavor {
					// width: auto;
					margin-top: 28rpx;
					height: 400rpx;
				
					.flavor-title {
						height: 26rpx;
						font-size: 28rpx;
						font-family: PingFang;
						font-weight: 400;
						color: #333333;
					}
				
					.flavor-body {
						margin-top: 47rpx;
				
						.item {
							min-width: 50rpx;
							height: 56rpx;
							margin-bottom: 20rpx;
							box-sizing: border-box;
							display: inline-block;
							text-align: center;
							line-height: 56rpx;
							box-sizing: border-box;
							padding: 0rpx 10rpx;
							border-radius: 8rpx;
							margin-right: 20rpx;
						
							text {
								display: flex;
								justify-content: center;
								align-items: center;
								font-size: 22rpx;
								font-family: PingFang;
								font-weight: 400;
							}
						}
				
						.flavor-item {
							max-width: 100%;
							min-width: 50rpx;
							height: 56rpx;
							margin-bottom: 20rpx;
							box-sizing: border-box;
							display: inline-block;
							text-align: center;
							line-height: 56rpx;
							box-sizing: border-box;
							padding: 0rpx 21rpx;
							border-radius: 8rpx;
							margin-right: 20rpx;
				
							text {
								display: flex;
								justify-content: center;
								align-items: center;
								font-size: 22rpx;
								font-family: PingFang;
								font-weight: 400;
							}
				
						}
					}
				
				
				}
				.MyPopupBox-third-line {
					width: 100%;
					height: 50rpx;
					// background-color: #123456;
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-top: 52rpx;

					.SelectQuantityLeft {
						width: 112rpx;
						height: 25rpx;
						// background-color: #654321;
						font-size: 26rpx;
						font-family: PingFang;
						font-weight: 500;
						color: #999999;
						display: flex;
						align-items: center;
					}

					.SelectQuantityRight {
						width: 200rpx;
						height: 100%;
						border: 1rpx solid #999999;
						border-radius: 12rpx;
						// background-color: #142536;
						display: flex;
						justify-content: space-between;

						.SelectQuantityRightLeft,
						.SelectQuantityRightRight {
							width: 50rpx;
							height: 100%;
							display: flex;
							align-items: center;
							justify-content: center;
						}

						.center {
							width: 98rpx;
							height: 100%;
							display: flex;
							align-items: center;
							justify-content: center;
							border-left: 1rpx solid #999999;
							border-right: 1rpx solid #999999;
							font-size: 24rpx;
							font-family: PingFang;
							font-weight: bold;
							color: #333333;
						}

					}
				}

				.MyPopupBox-fourth-line {
					margin-top: 67rpx;
					width: 690rpx;
					height: 80rpx;
					background: #FECE0A;
					border-radius: 40rpx;
					font-size: 30rpx;
					font-family: PingFang;
					font-weight: bold;
					color: #FFFFFF;
					line-height: 38rpx;
					display: flex;
					justify-content: center;
					align-items: center;

				}
			}
		}

		.compatibleProcessing {
			background-color: #fff;
		}

		//修改第三方组件样式
		/deep/ .uni-navbar--border.data-v-6bda1a90 {
			border: none !important;
		}
	}


	.flavor-item-active {
		background-color: rgba(250, 49, 23, 1)!important;
		color: rgba(255, 255, 255, 0.8)!important;
		// min-width: 50rpx;
		height: 56rpx;
		margin-bottom: 20rpx;
		box-sizing: border-box;
		display: inline-block;
		text-align: center;
		line-height: 56rpx;
		box-sizing: border-box;
		// padding: 0rpx 21rpx;
		border-radius: 8rpx;
		margin-right: 20rpx;
		font-size: 22rpx;
	}

	.noSelect {
		background-color: rgba(153, 153, 153, 0.3)!important;
		color: rgba(153, 153, 153, 0.5)!important;
		// min-width: 50rpx;
		height: 56rpx;
		margin-bottom: 20rpx;
		box-sizing: border-box;
		display: inline-block;
		text-align: center;
		line-height: 56rpx;
		box-sizing: border-box;
		// padding: 0rpx 21rpx;
		border-radius: 8rpx;
		margin-right: 20rpx;
		font-size: 22rpx;

	}

	.flavor-item {
		background-color: rgba(153, 153, 153, 0.2);
		color: #333333;
	}

	.icon-shoucang1 {
		color: rgba(250, 49, 23, 1);
	}

	/deep/.uni-swiper__dots-nav.data-v-77b53eff {
		width: 70rpx !important;
		height: 30rpx !important;
		position: absolute !important;
		background: #000000 !important;
		opacity: 0.5 !important;
		border-radius: 15rpx !important;
		// font-size: 20rpx !important;
		font-family: PingFang !important;
		font-weight: 400 !important;
		color: #FFFFFF !important;
		display: flex !important;
		justify-content: center !important;
		align-items: center !important;
	}

	/deep/.uni-swiper__dots-nav-item.data-v-77b53eff {
		font-size: 20rpx !important;
		margin: 0 !important;
	}

	/deep/.uni-swiper__dots-box.data-v-77b53eff {
		position: absolute !important;
		// right:60rpx !important;
		bottom: 30rpx !important;
		left: 600rpx !important;
	}

	button {
		display: flex;
		margin: 0;
		line-height: 0;
	}

	button:after {
		border: none;
	}
</style>
