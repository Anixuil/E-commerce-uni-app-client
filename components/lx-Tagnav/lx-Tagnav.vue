<template>
	<!-- 标签导航 -->
	<view class="view-tag">
		<view v-for="(item,index) in navList" ref='nav_list' :key="index" @click="nav_click(index)" :class="lxnavIndex == index ? 'navSelected' : ''">
			{{item.title}}
		</view>
		<view class="scroll-view" :style="{'width':scroll_div.width + 'px','left':scroll_div.left + 'px'}"></view>
	</view>
</template>

<script>
	export default {
		name:"lx-Tagnav",
		props:{
			navList:{
				default: function () {
					return [
					{title:'全部'},
					{title:'待付款'},
					{title:'待收货'},
					{title:'待评价'}
				]}
			},
			navIndex:{
				default:0
			}
		},
		data() {
			return {
				lxnavIndex:0,
				scroll_div:{
					width:0,
					left:0
				},
			};
		},
		onLoad() {
			
		},
		mounted() {
			this.nav_click(this.navIndex);
		},
		methods:{
			nav_click(index){
				if(index || index == 0){
					this.lxnavIndex = index;
					uni.setStorageSync('dingdan-nav-index',this.lxnavIndex);
				}else{
					
				}
				this.$emit('navChange',this.lxnavIndex);
				// console.log(this.$refs);
				this.scroll_div.left = this.$refs.nav_list[this.lxnavIndex].$el.offsetLeft + this.$refs.nav_list[this.lxnavIndex].$el.offsetWidth*0.5*0.5;
				this.scroll_div.width = this.$refs.nav_list[this.lxnavIndex].$el.offsetWidth * 0.5;
			},
		}
	}
</script>

<style scoped>
.view-tag{
		width: 100%;
		display: flex;
		position: relative;
		background-color: white;
	}
	.view-tag>view{
		width: 33%;
		text-align: center;
		line-height: 40px;
		font-size: 15px;
		transition: 0.4s ease-in-out;
	}
	.navSelected{
		color: red;
	}
	.scroll-view{
		position: absolute;
		height: 4px;
		background-color: red;
		bottom: 0;
	}
</style>
