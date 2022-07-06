<template>
	<view>
		<lx-message ref="lxmessage"></lx-message>
		<view class="mengban" @click="open" v-show="show"></view>
		<!-- 轮播 -->
		<view class="uni-padding-wrap">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
						:duration="duration">
						<swiper-item v-for="(item,index) in swiper_img" :key="index">
							<image class="swiper-img" :src="item"></image>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>

		<!-- 商品信息 -->
		<view class="goods-info">
			<view class="goods-title">{{goods_title}}</view>
			<view class="goods-price">
				<text>￥{{goods_info.price}}</text>
				<text>￥{{goods_info.market_price}}</text>
			</view>
			<view class="goods-sale">
				<text>销量：{{goods_info.sold_count}}</text>
				<text>库存：{{goods_info.stock}}</text>
			</view>
			<view class="goods-skus" @click="open">
				<text>购买类型</text>
				<text>{{goods_info.value}}</text>
				<text>&gt;</text>
			</view>
			<view class="goods-num">
				<text>数量</text>
				<text><text class="goods-num-control">-</text><text class="goods-number" @click="goods_num_del">{{goods_info.num}}</text><text @click="goods_num_add" class="goods-num-control">+</text></text>
			</view>
			<view class="goods-service">
				<text>服务</text>
				<text v-for="(item,index) in goods_info.service_tags" :key='index'>{{item}}</text>
			</view>
			
			<!-- 评论 -->
			<view class="goods-content">
				<view class="goods-content-top">
					<text class="goods-content-title">评论({{goods_info.goods_content.length}})</text>
					<text class="goods-content-good">好评率：{{goods_info.good_review}}</text>
				</view>
				<view class="goods-content-main">
					<text>没有了</text>
				</view>
			</view>
			
			<!-- 图文详情 -->
			<view class="goods-imgtext-box">
				<view class="goods-imgtext-top">
					-----  图文详情  -----
				</view>
			</view>
		</view>
		
		<!-- 商品详情页悬浮导航 -->
		<view class="goods-control-box">
			<view class="goods-control">
				<view class="goods-control-left">
					<text @click="gotoIndex">
						<uni-icons type="home" color="red" size="20"></uni-icons>
						<view>首页</view>
					</text>
					<text @click="gotoShopping">
						<uni-icons type="cart-filled" color="red" size="20"></uni-icons>
						<view>购物车</view>
					</text>
					<text @click="mylike">
						<uni-icons color="red" :type="goods_info.like ? 'star-filled' : 'star'" size="20"></uni-icons>
						<view>收藏</view>
					</text>
				</view>
				<view class="goods-control-right">
					<text @click="gotoDingdan">立即购买</text>
					|
					<text @click="addCart">加入购物车</text>
				</view>
			</view>
		</view>
		
		<!-- 商品规格选择 -->
		<uni-transition :mode-class="['slide-bottom','fade']" custom-class="goods_change" :show="show">
			<view class="goods-imgbox">
				<image :src="goods_info.image"></image>
			</view>
			<view class="goods-xiangqing-info">
				<view class="goods-xiangqing-price">￥{{goods_info.price}}</view>
				<view class="goods-xiangqing-stock">库存：{{goods_info.stock}}</view>
				<view class="goods-xiangqing-select">已选：{{goods_info.value}}</view>
			</view>
			<view class="goods-select-box">
				<view class="goods-select" v-for="(item,index) in goods_skusGroup" :key="index">
					<view class="goods-select-title" >{{item}}</view>
					<view class="goods-select-itembox">
						<text :class="selectId[index] == i ? 'goods-select-items selectActive' : 'goods-select-items'" v-for="(items,i) in goods_skusItems[index]" :key='i' @click="selectItems(index,i)">
							{{items}}
						</text>
					</view>
				</view>
			</view>
		</uni-transition>
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
				show: false, //过度
				modeClass:[],//多种一起过度
				swiper_img: [], //商品轮播图
				goods_title: '', //商品标题
				goods_info: {
					id: 0,//商品id
					market_price: 0,
					price: 0,
					stock: 0, //库存
					sold_count: 0, //销量
					value: '', //商品规格
					image: '' ,//商品图片
					num:1,//商品购买数量
					good_review:'',//好评率
					goods_content:[],//商品评论
					service_tags:[],//服务
					like:false,//商品是否收藏
					state:0,
					skus_id:1
				},
				goods_skusGroup:[],//商品规格
				goods_skusItems:[],//商品规格详细
				selectValue:['',''],//规格选中数组
				selectId:[0,0],//选中的规格
			}
		},
		onLoad(option) {
			this.getGoods(option);
		},
		methods: {
			open(mode) {
				this.show = !this.show
			},
			//获取商品详情数据和商品评论
			getGoods(id) {
				// console.log(id)
				this.$http.get('product.info', id).then(res => {
					// console.log(res);
					if(typeof res.data.favorite == 'object'){
						this.goods_info.state = 0;
						this.goods_info.like = true;
					}else{
						this.goods_info.state = 1;
					}
					this.goods_info.id = res.data.id;
					this.swiper_img = res.data.image;
					this.goods_info.image = res.data.image[0];
					this.goods_title = res.data.title;
					this.goods_skus = res.data.skus;
					this.goods_skusGroup = res.data.attrGroup;
					this.goods_skusItems = res.data.attrItems;
					this.goods_info.service_tags = res.data.service_tags;
					this.selectValue = this.goods_skus[0].value.split(',');
					this.goods_change();
				});
				this.$http.get('product.reviews',{...id,page:1}).then(res=>{
					// console.log(res);
					this.goods_info.good_review = res.data.good_review;
					this.goods_info.goods_content = res.data.data;
				})
			},
			//商品规格选择 默认为0
			goods_change(index) {
				index = index || 0;
				this.goods_info.market_price = this.goods_skus[index].market_price;
				this.goods_info.price = this.goods_skus[index].price;
				this.goods_info.stock = this.goods_skus[index].stock;
				this.goods_info.sold_count = this.goods_skus[index].sold_count;
				this.goods_info.value = this.goods_skus[index].value;
				this.goods_info.skus_id = this.goods_skus[index].id;
			},
			//商品规格选中颜色变化
			selectItems(index,i){
				this.selectId[index] = i;
				this.selectValue.splice(index,1,this.goods_skusItems[index][i]);
				if(this.goods_skusGroup.length == 1){
					this.goods_info.value = this.selectValue.splice(0,1).join(',');
				}else{
					this.goods_info.value = this.selectValue.join(',');
				}
				let a = this.goods_skus.findIndex((item,index)=>{
					return item.value == this.goods_info.value;
				})
				this.goods_change(a)
			},
			//商品购买数量加减
			goods_num_del(){
				this.goods_info.num--;
				if(this.goods_info.num <= 1){
					this.goods_info.num = 1;
				}
			},
			goods_num_add(){
				this.goods_info.num++;
			},
			//商品详情导航跳转
			gotoIndex(){
				uni.switchTab({
					url:'../index/index'
				})
			},
			gotoShopping(){
				uni.switchTab({
					url:'../shopping/shopping'
				})
			},
			mylike(){
				if(uni.getStorageSync('token')){
					this.$http.post('product.favorite',{id:this.goods_info.id,state:this.goods_info.state}).then(res=>{
						// console.log(res);
						this.goods_info.like = !this.goods_info.like;
						let msg = '';
						if(this.goods_info.like){
							msg = '收藏成功';
						}else{
							msg = '取消收藏'
						}
						this.$refs.lxmessage.show({
							type:'success',
							msg,
							direction:'center',
							time:1000
						})
						this.getGoods({id:this.goods_info.id});
					})
				}else{
					this.$refs.lxmessage.show({
						type:'warning',
						msg:'您未登录，请先登录',
						direction:'center',
						time:1000
					})
					setTimeout(()=>{
						uni.navigateTo({
							url:'../login/login'
						})
					},1000)
				}
			},
			// 加入购物车
			addCart(){
				if(!uni.getStorageSync('token')){
					this.$refs.lxmessage.show({
						type:'warning',
						msg:'您未登录，请先登录',
						direction:'center',
						time:1000
					})
					setTimeout(()=>{
						uni.navigateTo({
							url:'../login/login'
						})
					},1000)
				}
				this.$http.post('cart.add',{sku_id:this.goods_info.skus_id,quantity:this.goods_info.num}).then(res=>{
					// console.log(res);
					this.$refs.lxmessage.show({
						type:'success',
						msg:'成功加入购物车',
						direction:'center',
						time:1000
					})
				})
			},
			//立即购买
			gotoDingdan(){
				if(uni.getStorageSync('token')){
					uni.setStorageSync('dingdan-page',0);
					uni.setStorageSync('dingdan-id',this.goods_info.skus_id),
					// console.log(uni.getStorageSync('dingdan-id'))
					uni.setStorageSync('dingdan-num',this.goods_info.num)
					uni.navigateTo({
						url:'../dingdan/dingdan?page=' + 0 + '&sku_id=' + this.goods_info.skus_id + '&quantity=' + this.goods_info.num
					})
				}else{
					this.$refs.lxmessage.show({
						type:'warning',
						msg:'您未登录，请先登录',
						direction:'center',
						time:1000
					})
					setTimeout(()=>{
						uni.navigateTo({
							url:'../login/login'
						})
					},1000)
				}
				
			}
		}
	}
</script>

<style scoped>
	.swiper {
		width: 100%;
		height: 70vh;
	}
	image{
		width: 100%;
		height: 100%;
	}
	.goods-info {
		width: 100%;
		box-sizing: border-box;
		padding: 1vh 3vw;
		background-color: white;
	}

	.goods-title {
		width: 100%;
		font-weight: bold;
		font-size: 19px;
	}

	.goods-price {
		width: 100%;
		color: red;
		font-size: 18px;
		font-weight: bold;
		line-height: 50px;
	}

	.goods-price>text:nth-of-type(2) {
		margin-left: 3vw;
		color: lightgray;
		text-decoration: line-through;
		font-size: 16px;
	}

	.goods-sale {
		width: 100%;
		display: flex;
		justify-content: space-between;
		color: #808080;
	}

	.goods-sale text {
		width: 50%;
	}

	.goods-skus {
		box-sizing: border-box;
		padding: 2vh 0;
		display: flex;
		justify-content: space-between;
	}

	.goods-skus text:nth-of-type(1) {
		width: 20%;
	}

	.goods-skus text:nth-of-type(2) {
		width: 30%;
		text-align: start;
	}

	.goods-skus text:nth-of-type(3) {
		width: 50%;
	}

	.mengban {
		width: 100%;
		height: 1000px;
		background: rgba(1, 1, 1, 0.4);
		position: absolute;
		z-index: 98;
	}

	.goods_change{
		width: 100%;
		height: 40vh;
		position: fixed;
		bottom: 0;
		background-color: white;
		z-index: 99;
	}

	.goods-imgbox {
		width: 150px;
		height: 150px;
		position: absolute;
		top: 0;
		margin-top: -60px;
		left: 20px;
	}

	.goods-imgbox cover-image {
		width: 100%;
		height: 100%;
	}
	.goods-xiangqing-info{
		position: absolute;
		top:0;
		left: 50%;
		box-sizing: border-box;
		padding: 1vh 0;
		color: gray;
	}
	.goods-xiangqing-price{
		color: red;
		font-size: 20px;
		font-weight: bold;
	}
	.goods-select-box{
		position: absolute;
		top: 30%;
		left: 0;
		box-sizing: border-box;
		padding: 1vh 5vw;
		width: 100%;
	}
	.goods-select-title{
		font-size: 18px;
	}
	.goods-select-items{
		box-sizing: border-box;
		padding: 3px 2vw;
		display: inline-block;
		background-color: rgba(1,1,1,0.1);
		overflow: hidden;
		border-radius: 35%;
		margin: 1vh 2vw;
	}
	.selectActive{
		background-color: pink;
		color: white;
	}
	.goods-num{
		line-height: 40px;
		font-size: 17px;
		display: flex;
		justify-content: space-between;
	}
	.goods-num>text:nth-of-type(2){
		width: 30vw;
		text-align: center;
	}
	.goods-number{
		box-sizing: border-box;
		padding: 0 10px;
	}
	.goods-num-control{
		border: 1px solid red;
		box-sizing: border-box;
		padding: 0 1.5vw;
		border-radius: 50%;
		background-color: red;
		color: white;
		font-size: 18px;
	}
	.goods-service{
		line-height: 40px;
		display: flex;
		font-size: 17px;
		width: 100%;
	}
	.goods-service>text:nth-of-type(1){
		width: 20%;
	}
	.goods-content{
		width: 100%;
		line-height: 40px;
		margin-top: 20px;
	}
	.goods-content-top{
		width: 100%;
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid lightgray;
	}
	.goods-content-top>text:nth-of-type(2){
		color: #C0C0C0;
		margin-right: 20px;
		font-size: 15px;
	}
	.goods-content-main{
		text-align: center;
		width: 100%;
		font-size: 14px;
		line-height: 40px;
	}
	.goods-imgtext-box{
		border-top: 1px solid lightgray;
		width: 100%;
		margin-top: 30px;
		margin-bottom: 70px;
	}
	.goods-imgtext-top{
		width: 100%;
		text-align: center;
		line-height: 50px;
	}
	.goods-control-box{
		position: fixed;
		z-index: 97;
		bottom: 20px;
		width: 100%;
		display: flex;
		justify-content: center;
	}
	.goods-control{
		width: 95%;
		box-sizing: border-box;
		padding: 5px;
		font-size: 13px;
		display: flex;
		border-radius: 10px;
		background-color: white;
		box-shadow: 0 0 10px 5px lightgray;
	}
	.goods-control-left{
		width: 45%;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	.goods-control-left>text{
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		padding: 0 3px;
		text-align: center;
	}
	.goods-control-right{
		width: 55%;
		box-sizing: border-box;
		padding: 0 10px;
		display: flex;
		justify-content: space-between;
		border-radius: 10px;
		background: linear-gradient(to right,orange ,red);
		align-items: center;
		color: white;
	}
	.goods-control-right>text{
		width: 45%;
		text-align: center;
		font-size: 15px;
	}
</style>
