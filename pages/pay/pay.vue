<template>
	<view class="pay-box">
		<lx-message ref="lxmessage"></lx-message>
		<view class="pay-price">
			<text>支付金额</text>
			<text>￥{{order_info.order_price}}</text>
		</view>
		<view class="pay-methods">
			<view class="pay-methods-left">
				<image src="https://zhengxin-pub.cdn.bcebos.com/logopic/a9936a369e82e0c6c42112674a5220e8_fullsize.jpg?x-bce-process=image/resize,m_lfit,w_200" mode=""></image>
				<text>支付宝支付</text>
			</view>
			<label>
				<checkbox value="true" /><text></text>
			</label>
		</view>
		<view class="enterBtn" @click="pay">确定支付</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				order_info:{
					order_price:null,
					order_sn:null
				}
			}
		},
		onLoad(option) {
			// console.log(option)
			this.getAllPrice(option.page);
		},
		onUnload() {
			uni.removeStorageSync('order-sn');
		},
		methods:{
			getPrice(){
				let order_sn = uni.getStorageSync('order-sn');
				this.$http.get('order.info',{order_sn}).then(res=>{
					// console.log(res.data.order_price);
					this.order_info.order_price = res.data.order_price;
				})
			},
			getAllPrice(page){
				this.$http.get('order.list').then(res=>{
					if(page || page==0){
						uni.setStorageSync('order-sn',res.data.data[page].order_sn)
					}
					this.getPrice();
				})
			},
			pay(){
				// this.$http.post('pay',{})
				this.$refs.lxmessage.show({
					type:'error',
					msg:'您的支付宝余额已不足,支付失败',
					direction:'top',
					time:1000
				})
				setTimeout(()=>{
					uni.reLaunch({
						url:'../my/my'
					})
				},1000)
			}
		}
	}
</script>

<style scoped>
	.pay-box{
		height: 100%;
		background-color: white;
	}
	.pay-price{
		/* border: 1px solid red; */
		height: 20%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	.pay-price>text:nth-child(1){
		color: #909399;
		font-size: 14px;
	}
	.pay-price>text:nth-child(2){
		font-size: 25px;
		margin-top: 10px;
	}
	.pay-methods{
		/* border: 1px solid red; */
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 10px 20px;
		border-bottom: 1px solid lightgray;
	}
	.pay-methods-left{
		/* border: 1px solid red; */
		width: 50%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.pay-methods-left>image{
		width: 40px;
		height: 40px;
	}
	.enterBtn{
		width: 90%;
		margin: 20px auto;
		background-color: rgb(250,67,106);
		text-align: center;
		line-height: 50px;
		color: white;
		font-size: 17px;
		border-radius: 5px;
	}
</style>
