<template>
	<view class="goodsList-box">
		<!-- 标签导航 -->
		<lx-nav :navList="navList" @navChange="navChange" :navIndex="navIndex"></lx-nav>
		<!-- <view class="view-tag">
			<view v-for="(item,index) in navList" ref='nav_list' :key="index" @click="nav_click(index)" :class="navIndex == index ? 'navSelected' : ''">
				{{item.title}}
			</view>
			<view class="scroll-view" :style="{'width':scroll_div.width + 'px','left':scroll_div.left + 'px'}"></view>
		</view> -->
		
		<!-- 商品列表主体部分 -->
		<view class="goods-box-main">
			<!-- 单个商品详情 -->
			<view class="goods-box" v-for="(item,index) in goodsList" :key="item.id" @click="gotoXiangqing(item.id)">
				<view class="goods-img">
					<image :src="item.image[0]"></image>
				</view>
				<view class="goods-info">
					<text>{{item.title}}</text>
					<view><text>￥{{item.skus[0].price}}</text><text>已售 {{item.skus[0].sold_count}}</text></view>
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
				navList:[
					{title:'综合排序'},
					{title:'销量优先'},
					{title:'价格'}
				],
				navIndex:0,
				scroll_div:{
					width:0,
					left:0
				},
				goodsList:[],
				cat_id:0,
				upOrDown:1,//1为降序，2为升序
			}
		},
		onLoad(option){
			// console.log(option);
			this.cat_id = option.cat_id;
			this.getGoods_list(this.cat_id);
		},
		onHide() {
			uni.removeStorageSync('goods-nav-index');
		},
		onShow() {
			uni.removeStorageSync('goods-nav-index');
		},
		methods:{
			getGoods_list(cat_id,sort = 0,priceOrder = 0){
				this.$http.get('product.list',{cat_id,sort,priceOrder,kw:null}).then(res=>{
					// console.log(res);
					this.goodsList = res.data.data;
					if(typeof uni.getStorageSync('goods-nav-index') == 'number'){
						this.navIndex = uni.getStorageSync('goods-nav-index');
					}
					this.navChange();
					// this.nav_click();
				})
			},
			navChange(index){
				if(index || index == 0){
					this.navIndex = index;
					uni.setStorageSync('goods-nav-index',this.navIndex);
					// console.log(uni.getStorageSync('goods-nav-index'));
					if(index == 0){
						this.getGoods_list(this.cat_id,index);
					}
					if(index == 1){
						this.getGoods_list(this.cat_id,index);
					}
					this.navList[2].title = '价格';
					if(index == 2){
						if(this.upOrDown == 2){
							this.upOrDown = 1;
							this.navList[index].title = '价格⬆';
						}else{
							this.upOrDown = 2;
							this.navList[index].title = '价格⬇';
						}
						this.getGoods_list(this.cat_id,index,this.upOrDown);
					}
				}else{
					
				}
			},
			// nav_click(index){
			// 	if(index || index == 0){
			// 		this.navIndex = index;
			// 		uni.setStorageSync('goods-nav-index',this.navIndex);
			// 		// console.log(uni.getStorageSync('goods-nav-index'));
			// 		if(index == 0){
			// 			this.getGoods_list(this.cat_id,index);
			// 		}
			// 		if(index == 1){
			// 			this.getGoods_list(this.cat_id,index);
			// 		}
			// 		this.navList[2].title = '价格';
			// 		if(index == 2){
			// 			if(this.upOrDown == 2){
			// 				this.upOrDown = 1;
			// 				this.navList[index].title = '价格⬆';
			// 			}else{
			// 				this.upOrDown = 2;
			// 				this.navList[index].title = '价格⬇';
			// 			}
			// 			this.getGoods_list(this.cat_id,index,this.upOrDown);
			// 		}
			// 	}else{
					
			// 	}
			// 	this.scroll_div.left = this.$refs.nav_list[this.navIndex].$el.offsetLeft + this.$refs.nav_list[this.navIndex].$el.offsetWidth*0.5*0.5;
			// 	this.scroll_div.width = this.$refs.nav_list[this.navIndex].$el.offsetWidth * 0.5;
				
			// },
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
	.goodsList-box{
		width: 100%;
	}
	.view-tag{
		width: 100%;
		/* border: 1px solid red; */
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
		height: 250px;
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
