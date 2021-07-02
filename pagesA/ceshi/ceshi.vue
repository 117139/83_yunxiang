<template>
	<view style="height: 2000rpx;">
		<uni-nav-bar left-icon="back" left-text="返回" right-text="菜单" title="导航栏组件" fixed="true"></uni-nav-bar>
		<!-- <custom-tab-bar direction="horizontal" show-icon=false selected="0" @onTabItemTap="onTabItemTap" /> -->
		<view class="search-view">
			<uni-search-bar placeholder="搜索" radius="29" bgColor="rgba(153, 153, 153, 0.3)" class="search">
				<uni-icons slot="searchIcon" color="#999999" size="22" type="search" />
			</uni-search-bar>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
			};
		},
		methods: {
			onTabItemTap(e) {
				console.log(e)
			}
		}
	}
</script>

<style lang="scss">
	.search {
		margin-top: 300rpx;
	}
	.search-view {
		width: 580rpx; height:58rpx;
	}
</style>
