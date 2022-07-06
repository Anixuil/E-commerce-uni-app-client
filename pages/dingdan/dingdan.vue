<template>
	<view class="dingdan">
		<lx-message ref="lxmessage"></lx-message>
		<!-- 地址模块 -->
		<view class="address-box" @click="gotoChangeAddress">
			<view class="address-box-left">
				<view class="address-box-left-icon">
					<lx-icons type="location" size="25px" color="gray"></lx-icons>
				</view>
				<view class="address-box-left-right">
					<view class="address-box-right-userInfo">
						<text>{{address_info.contactor_name}}</text>
						<text>{{address_info.phone}}</text>
					</view>
					<view class="address-box-right-address">
						{{address_info.address}}  {{address_info.street}}
					</view>
				</view>
			</view>
			<view class="address-box-right">
				<text>&gt;</text>
			</view>
			<image class="dosh" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAAFCAYAAAAaAWmiAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Rjk3RjkzMjM2NzMxMTFFOUI4RkU4OEZGMDcxQzgzOEYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Rjk3RjkzMjQ2NzMxMTFFOUI4RkU4OEZGMDcxQzgzOEYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGOTdGOTMyMTY3MzExMUU5QjhGRTg4RkYwNzFDODM4RiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGOTdGOTMyMjY3MzExMUU5QjhGRTg4RkYwNzFDODM4RiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrEOZlQAAAiuSURBVHjazJp7bFvV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" mode=""></image>
		</view>
		<!-- 商品信息模块 -->
		<view class="goods-box" v-for="(item) in payGoods" :key='item.product.id'>
			<view class="goods-box-left">
				<image :src="item.product.image[0]" ></image>
			</view>
			<view class="goods-box-right">
				<view class="goods-box-right-title">
					{{item.product.title}}
				</view>
				<view class="goods-box-right-skus">
					{{item.sku.value}}
				</view>
				<view class="goods-box-right-info">
					<text>
						￥{{item.sku.price}}
					</text>
					<text>
						x {{item.quantity}}
					</text>
				</view>
			</view>
		</view>
		<!-- 订单详情 -->
		<view class="dingdan-box">
			<view class="dingdan-item">
				<text class="dingdan-left">
					商品金额
				</text>
				<text>
					￥ {{dingdanPrice.toFixed(2)}}
				</text>
			</view>
			<view class="dingdan-item">
				<text>优惠金额</text>
				<text>- ￥ {{delPrice}}</text>
			</view>
			<view class="dingdan-item">
				<text>运费</text>
				<text>￥ 免运费</text>
			</view>
			<view class="dingdan-item">
				<text>备注</text>
				<input type="text" placeholder="请填写备注信息" placeholder-style="color:#999" v-model="address_info.remark">
			</view>
		</view>
		
		<!-- 提交订单 -->
		<view class="footer-box">
			<view class="footer-box-left">
				<text>实付款</text>
				<text>￥ {{(dingdanPrice - delPrice).toFixed(2)}}</text>
			</view>
			<view class="dingdan-submit" @click="submitDingdan">提交订单</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				address_list:[],//地址集合
				address_info:{},//选中的地址信息
				payGoods:[],//需要买的商品
				dingdanPrice:0,//订单总价格
				delPrice: 0,//优惠
				selectedAddress:null,
				dingdan_info:{
					address_id:null,
					sku_id:null,
					quantity:null,
					remark:''//备注
				},
				sku_id:null,
				quantity:1
			}
		},
		onLoad(option) {
			uni.startPullDownRefresh({});
			if(option.add_index && option.page == 1 || uni.getStorageSync('dingdan-page')){
				this.getCartGoods();
				return this.getAddress(option.add_index);
			}
			if(option.page == 0 || uni.getStorageSync('dingdan-page') == 0){
				//地址获取方式
				if(option.add_index){
					this.getAddress(option.add_index);
				}else{
					this.getAddress();
				}
				this.sku_id = option.sku_id || uni.getStorageSync('dingdan-id');
				this.quantity = option.quantity || uni.getStorageSync('dingdan-num');
				this.getGoods();
			}
			this.getAddress();
		},
		onPullDownRefresh() {
			this.getAddress()
			setTimeout(()=>{
				uni.stopPullDownRefresh({})
			},500)
		},
		onUnload(){
			uni.removeStorageSync('address-change');
			uni.removeStorageSync('dingdan-id');
			uni.removeStorageSync('dingdan-num');
		},
		methods:{
			getAddress(i){
				this.$http.get('user.address').then(res=>{
					// console.log(res);
					if(res.data.length != 0){
						let index = res.data.findIndex((item)=>{
							return item.is_default == 1;
						})
						if(uni.getStorageSync('address-change') != '' || typeof uni.getStorageSync('address-change') != 'string'){
							// console.log(1);
							// console.log(typeof uni.getStorageSync('address-change') == 'number');
							// console.log(typeof uni.getStorageSync('address-change'));
							this.address_info = res.data[uni.getStorageSync('address-change')];
						}else{
							//如果没有选择地址的话按照默认的来，如果没有默认地址则选择第一个地址
							if(typeof (i-0) == 'number' && typeof i != 'undefined'){
								this.address_info = res.data[i];
							}else if(index > -1 && index != 'undefined'){
								// console.log(index);
								this.address_info = res.data[index];
							}else{
								this.address_info = res.data[0];
							}
						}
						//将地址的id存储好方便提交
						this.dingdan_info.address_id = this.address_info.id;
					}else{
						this.$refs.lxmessage.show({
							type:'warning',
							msg:'您还没有地址,请先添加地址',
							direction:'center',
							time:1000
						})
						setTimeout(()=>{
							uni.navigateTo({
								url:'../address/address'
							})
						},1000)
					}
				})
			},
			//前往地址页面选择地址
			gotoChangeAddress(){
				uni.navigateTo({
					url:'../address/address?mode=' + 1
				})
			},
			//从vuex里取出在购物车里被选中需要结算的商品信息
			getCartGoods(){
				let cart_list = uni.getStorageSync('cart-list');
				for(let i in cart_list){
					if(cart_list[i].is_selected == 1){
						this.payGoods.push(cart_list[i]);
					}
				}
				// console.log(this.payGoods);
				//算好总价
				for (let i = 0; i < this.payGoods.length; i++) {
					//计算价格 数量乘以单价
					this.dingdanPrice += this.payGoods[i].sku.price * this.payGoods[i].quantity;
				}
			},
			//提交订单
			submitDingdan(){
				console.log(this.dingdan_info);
				this.$http.post('order.create',{address_id:this.dingdan_info.address_id,sku_id:this.dingdan_info.sku_id,quantity:this.dingdan_info.quantity}).then(res=>{
					// console.log(res);
					this.$refs.lxmessage.show({
						type:'success',
						msg:'添加订单成功',
						direction:'center',
						time:1000
					})
					setTimeout(()=>{
						uni.navigateTo({
							url:'../pay/pay?page=' + 0
						})
					},1000);
				})
			},
			//立即购买获取商品的方式
			getGoods(){
				this.$http.get('cart.list',{sku_id:this.sku_id,quantity:this.quantity}).then(res=>{
					console.log(res);
					this.payGoods.push(res.data[0]);
					this.dingdan_info.sku_id = res.data[0].sku.id;
					this.dingdan_info.quantity = res.data[0].quantity;
					//算好总价
					for (let i = 0; i < this.payGoods.length; i++) {
						//计算价格 数量乘以单价
						this.dingdanPrice += this.payGoods[i].sku.price * this.payGoods[i].quantity;
					}
				})
			}
		}
	}
</script>

<style scoped>
	.dingdan{
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	.address-box{
		box-sizing: border-box;
		padding: 10px;
		display: flex;
		position: relative;
		background-color: white;
		margin-bottom: 10px;
	}
	.address-box-left{
		display: flex;
		width: 80%;
	}
	.address-box-left-icon{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 14%;
	}
	.address-box-left-right{
		box-sizing: border-box;
		padding: 10px 5px;
		width: 86%;
	}
	.address-box-right-userInfo{
		font-size: 17px;
	}
	.address-box-right-userInfo>text:nth-of-type(2){
		margin-left: 20px;
	}
	.address-box-right-address{
		font-size: 15px;
		color: #999999;
	}
	.address-box-right{
		width: 20%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 20px;
		color: #AAAAAA;
	}
	.dosh{
		/* border: 1px solid red; */
		width: 100%;
		position: absolute;
		bottom: 0;
		height: 3px;
	}
	.goods-box{
		width: 100%;
		display: flex;
		justify-content: space-between;
		background-color: white;
		box-sizing: border-box;
		padding: 5px 10px;
		height: 13vh;
	}
	.goods-box-left{
		width: 25%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.goods-box-left>image{
		width: 95%;
		height: 95%;
	}
	.goods-box-right{
		width: 70%;
	}
	.goods-box-right-title{
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		line-height: 30px;
	}
	.goods-box-right-skus{
		line-height: 30px;
		font-size: 14px;
		color: #999999;
	}
	.goods-box-right-info{
		line-height: 30px;
	}
	.goods-box-right-info>text:nth-of-type(2){
		margin-left: 10px;
		font-size: 14px;
		color: #999999;
	}
	.dingdan-box{
		width: 100%;
		box-sizing: border-box;
		margin-top: 10px;
		background-color: white;
	}
	.dingdan-item{
		/* border: 1px solid red; */
		font-size: 15px;
		box-sizing: border-box;
		padding: 15px 10px;
		display: flex;
		justify-content: space-between;
		color: #999999;
		box-shadow: 0 1px 1px lightgray;
	}
	.dingdan-item>text:nth-of-type(2){
		color: black;
	}
	.dingdan-item:nth-of-type(2)>text:nth-of-type(2){
		color: red;
	}
	.dingdan-item>input{
		width: 85%;
		color: black;
		font-size: 15px;
	}
	.footer-box{
		width: 100%;
		position: fixed;
		bottom: 0;
		background-color: white;
		height: 7vh;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		padding: 0 0 0 10px;
		box-shadow: 0 0 5px 1px lightgray;
	}
	.footer-box-left{
		font-size: 17px;
	}
	.footer-box-left>text:nth-of-type(2){
		color: red;
		margin-left: 10px;
	}
	.dingdan-submit{
		height: 100%;
		display: flex;
		align-items: center;
		width: 40%;
		justify-content: center;
		background-color: rgb(250,67,106);
		color: white;
	}
</style>
