<template>
	<view class="my-fav">
		<!-- 商品列表主体部分 -->
		<view class="goods-box-main">
			<!-- 单个商品详情 -->
			<view class="goods-box" v-for="(item,index) in goodsList" :key="item.id" @click="gotoXiangqing(item.id)">
				<view class="goods-img">
					<image :src="item.image[0]"></image>
				</view>
				<view class="goods-info">
					<text>{{item.title}}</text>
					<view><text>￥{{item.price}}</text><text>已售 {{item.on_sale}}</text></view>
				</view>
			</view>
		</view>
		
		<!-- 没有更多了 -->
		<view class="tips">
			———— 没有更多了 ————
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				is_like:false,
				goodsList:[]
			}
		},
		onLoad() {
			this.getLike();
		},
		onShow() {
			this.getLike();
		},
		onHide() {
			this.getLike();
		},
		onPullDownRefresh() {
			this.getLike();
			setTimeout(()=>{
				uni.stopPullDownRefresh();
			},1000)
		},
		methods:{
			getLike(){
				this.$http.get('user.favorite').then(res=>{
					this.goodsList = [];
					console.log(res.data);
					// this.goodsList = res.data;
					// console.log(this.goodsList[0].product.id);
					for(let i = 0;i < res.data.length;i++){
						if(res.data[i].product != undefined){
							this.goodsList.push(res.data[i].product);
						}
					}
					console.log(this.goodsList);
				})
			},
			//跳转到商品详情
			gotoXiangqing(id){
				uni.navigateTo({
					url:'../xiangqing/xiangqing?id=' + id
				})
			}
		}
	}
</script>

<style scoped>
	.goods-box-main{
		width: 100%;
		box-sizing: border-box;
		display: flex;
		padding: 10px;
		background-color: white;
		margin-top: 10px;
		flex-wrap: wrap;
	}
	.goods-box{
		width: 50%;
		height: 30vh;
		/* border: 1px solid red; */
		display: flex;
		flex-direction: column;
		margin-bottom: 10px;
		box-sizing: border-box;
		padding: 5px;
	}
	.goods-img{
		/* border: 1px solid red; */
		height: 75%;
	}
	.goods-img>image{
		width: 100%;
		height: 100%;
	}
	.goods-info{
		height: 25%;
		/* border: 1px solid red; */
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.goods-info>text{
		font-size: 18px;
		margin-top: 5px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.goods-info>view{
		/* border: 1px solid red; */
		display: flex;
		justify-content: space-between;
	}
	.goods-info>view>text:nth-of-type(1){
		color: red;
		font-size: 17px;
	}
	.goods-info>view>text:nth-of-type(2){
		color: #AAAAAA;
	}
	.tips{
		width: 100%;
		text-align: center;
		margin-top: 20px;
		color: #BBBBBB;
	}
</style>
