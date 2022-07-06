<template>
	<view class="dingdan-xiangqing-box">
		<view class="dingdanxiangqing-top">
			<view class="dingdanxiangqing-item" v-for="(item) in goodsList" :key='item.id'>
				<view class="dingdanxiangqing-item-left">
					<view class="dingdanxiangqing-img">
						<image :src="item.images[0]" mode=""></image>
					</view>
					<view class="dingdanxiangqing-goods-info">
						<view>{{item.title}}</view>
						<text>{{item.attributes}}</text>
					</view>
				</view>
				<view class="dingdanxiangqing-goods-right">
					<text>￥{{item.price}}</text>
					<text>x {{item.quantity}}</text>
				</view>
			</view>
		</view>
		
		<view class="dingdanxiangqing">
			<view class="dingdan-info">
				<view class="dingdan-info-item">
					<text>订单编号</text>
					<text>{{dingdan_info.order_sn}}</text>
				</view>
				<view class="dingdan-info-item">
					<text>订单状态</text>
					<text>{{dingdan_info.state_tip}}</text>
				</view>
				<view class="dingdan-info-item">
					<text>商品总价</text>
					<text>￥{{dingdan_info.products_price}}</text>
				</view>
				<view class="dingdan-info-item">
					<text>运费</text>
					<text>￥{{dingdan_info.payed_price}}</text>
				</view>
				<view class="dingdan-info-item dingdan-youhui">
					<text>优惠</text>
					<text>- ￥{{dingdan_info.payed_price}}</text>
				</view>
				<view class="dingdan-info-item dingdan-price">
					<text>订单总价</text>
					<text>￥{{dingdan_info.order_price}}</text>
				</view>
				<view class="dingdan-payprice">
					<text>实付款</text>
					<text>￥{{dingdan_info.pay_price}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				goodsList:[],
				dingdan_info:[]
			}
		},
		onLoad(option) {
			this.getXiangqing(option.order_sn)
		},
		methods:{
			getXiangqing(order_sn){
				this.$http.get('order.info',{order_sn}).then(res=>{
					console.log(res);
					this.goodsList = res.data.products;
					this.dingdan_info = res.data;
				})
			}
		}
	}
</script>

<style scoped>
	.dingdan-xiangqing-box{
		width: 100%;
		height: 100%;
		background-color: white;
		box-sizing: border-box;
		padding: 5px;
	}
	.dingdanxiangqing-top{
		width: 100%;
	}
	.dingdanxiangqing-item{
		width: 100%;
		display: flex;
		justify-content: space-between;
	}
	.dingdanxiangqing-item-left{
		width: 70%;
		display: flex;
		/* border: 1px solid red; */
	}
	.dingdanxiangqing-img{
		width: 65%;
		height: 12vh;
	}
	.dingdanxiangqing-img>image{
		width: 100%;
		height: 100%;
	}
	.dingdanxiangqing-goods-info{
		width: 100%;
		margin-left: 5px;
		/* border: 1px solid red; */
	}
	.dingdanxiangqing-goods-info>view{
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		font-size: 14px;
		color: #555555;
		font-family: '微软雅黑';
		line-height: 23px;
	}
	.dingdanxiangqing-goods-info>text{
		color: #808080;
		font-size: 14px;
	}
	.dingdanxiangqing-goods-right{
		width: 25%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: #808080;
	}
	.dingdanxiangqing-goods-right>text:nth-child(1){
		color: #555555;
	}
	.dingdanxiangqing{
		width: 100%;
	}
	.dingdan-info{
		
	}
	.dingdan-info-item{
		display: flex;
		justify-content: space-between;
		line-height: 30px;
		font-size: 14px;
		color: #666666;
	}
	.dingdan-youhui{
		color: red;
	}
	.dingdan-price{
		line-height: 40px;
		font-size: 16px;
		border-bottom: 1px solid lightgray;
	}
	.dingdan-payprice{
		color: #000000;
		font-size: 16px;
		line-height: 40px;
		display: flex;
		justify-content: space-between;
		font-weight: bold;
	}
</style>
