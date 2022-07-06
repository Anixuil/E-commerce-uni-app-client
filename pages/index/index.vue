<template>
	<view class="content">
		<!-- 轮播 -->
		<view class="uni-padding-wrap">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
						:duration="duration">
						<swiper-item v-for="(item) in nav_swiper" :key="item.id">
							<image class="swiper-img" :src="item.image"></image>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		
		<!-- 标签 -->
		<view class="tag-box">
			<view class="tag" v-for="(item) in nav_banner" :key="item.id" @click="gotoKindxiangqing(item.target)">
				<image class="banner-img" :src="item.image"></image>
				<text>{{item.title}}</text>
			</view>
		</view>
		
		<!-- 广告 -->
		<view class="guanggao">
			<image class="guanggao-img" :src="guanggao.image"></image>
		</view>
		
		<!-- 首页推荐产品 -->
		<view class="por-box" v-for="(item) in proList" :key="item.id">
			<view class="pro-title">
				{{item.title}}
			</view>
			<view class="pro-wrap">
				<view class="pro-ul">
					<view class="pro-li" v-for="(item) in item.products" :key="item.id" @click="handlePro(item.id)">
						<image style="" :src="item.image[0]"></image>
						<text class="pro-li-title">{{item.title}}</text>
						<text class="pro-li-price">￥{{item.price}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: ['color1', 'color2', 'color3'],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				nav_swiper: [],
				nav_banner: [],
				guanggao: [],
				//首页商品数据
				proList:[]
			}
		},
		onLoad() {
			this.getAjaxData();
			this.getHttppro();
		},
		onPullDownRefresh() {
			setTimeout(()=>{
				this.getAjaxData();
				this.getHttppro();
				uni.stopPullDownRefresh({
					
				})
			})
		},
		methods: {
			//请求轮播数据
			getAjaxData() {
				this.$http.post('nav', {
					nav_type: [0, 1, 2]
				}).then(res => {
					// console.log(res);
					this.nav_swiper = res.data[0];
					this.nav_banner = res.data[1];
					this.guanggao = res.data[2][0];
				})
			},
			//请求首页产品数据
			getHttppro(){
				this.$http.get('home.products')
				.then(res=>{
					// console.log(res);
					this.proList = res.data.home_recommend_products;
				})
			},
			//跳转商品详情页
			handlePro(id){
				// console.log(id);
				uni.navigateTo({
					url:'../xiangqing/xiangqing?id=' + id
				})
			},
			//跳转到分类商品列表
			gotoKindxiangqing(cat_id){
				uni.navigateTo({
					url:'../goodsList/goodsList?cat_id='+cat_id
				})
			}
			
		}
	}
</script>

<style scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		padding-bottom: 25px;
	}
	.swiper-img{
		width: 100%;
		height: 100%;
	}
	.uni-padding-wrap {
		width: 100%;
	}
	.swiper{
		height: 25vh;
	}
	.tag-box{
		width: 100%;
		background-color: white;
		box-sizing: border-box;
		padding: 3vh 3vw;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	.tag{
		width: 25%;
		display: flex;
		flex-direction: column;
		align-items: center;
		/* border: 1px solid red; */
	}
	.banner-img{
		width: 70%;
		height: 70px;
		/* border: 1px solid red; */
	}
	.guanggao{
		width: 100%;
		height: 12vh;
	}
	.guanggao-img{
		width: 100%;
		height: 100%;
	}
	.por-box{
		width: 100%;
		box-sizing: border-box;
		padding: 1vh 3vw;
		background-color: white;
	}
	.pro-title{
		font-size: 20px;
		font-weight: bold;
		box-sizing: border-box;
		padding-bottom: 1vh;
		border-bottom: 1px solid lightgray;
	}
	.pro-wrap{
		width: 100%;
		position: relative;
		white-space: nowrap;
		display: flex;
		justify-content: flex-start;
		overflow-x: auto;
	}
	.pro-ul{
		box-sizing: border-box;
		padding: 1vh 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.pro-li{
		width: 32vw;
		/* height: 20vh; */
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		padding: 10px;
	}
	.pro-li image{
		height: 13vh;
		width: 100%;
	}
	.pro-li-title{
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.pro-li-price{
		color: red;
	}
</style>
