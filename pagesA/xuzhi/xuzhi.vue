<template>
	<view class="content p15">
		<view class="data_last" >
			{{datas}}
		</view>
		
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
				datas:'',
				title:'',
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo'])
		},
		onLoad(option) {
			that = this
			console.log(option)
			that.id = option.id
			that.datas=option.shu
			if (option.id == 1) {

				that.title = '官方须知'

			} else if (option.id == 2) {
				that.title = '购票须知'
			}


			uni.setNavigationBarTitle({
				title: that.title
			});
		},
		methods: {
			...mapMutations(['logout', 'login']),
			
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
	page {
		background-color: #fff;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
	}
</style>
