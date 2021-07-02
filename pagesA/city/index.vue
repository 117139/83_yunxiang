<template>
	<view>
		<ss-select-city
		  v-model="value"
		  @on-select="City"
		/>
	</view>
</template>

<script>
	var that
	import ssSelectCity from '@/components/ss-select-city/index.vue'
	export default {
		components:{
			ssSelectCity
		},
		data() {
			return {
				value: '杭州'
			}
		},
		onLoad(option) {
			that = this
			that.value = option.city
		},
		methods: {
			City(city) {
				console.log(city)
				uni.reLaunch({
					url: '../../pages/index/index?city='+city
				})
			}
		}
	}
</script>

<style>
</style>
