<template>
	<view class="box">
		<view>
			<text>联系人</text>
			<input type="text" v-model="addressList.contactor_name">
		</view>
		<view>
			<text>手机号</text>
			<input type="number" v-model="addressList.phone">
		</view>
		<view>
			<text>地址</text>
			<input type="text" v-model="addressList.address">
		</view>
		<view>
			<text>街道</text>
			<input type="text" v-model="addressList.street">
		</view>
		<view>
			<text>设为默认</text>
			<switch @change="switchChange" :checked="addressList.is_default == 1 ? true : false"></switch>
		</view>
		<view class="submit" @click="submitAddress">提交</view>
		<lx-message class="lx-message" ref="lxmessage"></lx-message>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				addressList:[]
			}
		},
		onLoad(option) {
			this.getEditAddress(option);
		},
		methods:{
			getEditAddress(option){
				this.$http.get('user.address').then(res=>{
					this.addressList = res.data[option.index];
				})
			},
			switchChange(){
				// console.log(this.addressList.is_default);
				if(this.addressList.is_default == 1){
					this.addressList.is_default = 0;
				}else{
					this.addressList.is_default = 1;
				}
			},
			submitAddress(){
				this.$http.post('user.address.edit',{...this.addressList}).then(res=>{
					console.log(res);
					this.$refs.lxmessage.show({
						type: 'success',
						msg: '修改地址成功',
						direction: 'top',
						time: 1000
					})
					setTimeout(()=>{
						uni.navigateBack({
							url:'../address/address'
						})
					},1000);
				})
			}
		}
	}
</script>

<style scoped>
	uni-page-wrapper{
		background-color: white;
		border: 1px solid red;
		height: 100%;
	}
	.box{
		/* border: 1px solid red; */
		width: 100%;
		background-color: white;
	}
	.box>view:not(.lx-message){
		display: flex;
		box-sizing: border-box;
		padding: 0 10px;
		line-height: 50px;
		border-bottom: 1px solid lightgray;
		align-items: center;
	}
	.box>view>text{
		/* border: 1px solid red; */
		width: 80px;
	}
	.box>view>input{
		/* width: 80px; */
		width: 100%;
	}
	.box>view:nth-of-type(5){
		display: flex;
		justify-content: space-between;
		padding: 0 30px 0 10px;
	}
	.box>view:nth-of-type(6){
		display: block;
		text-align: center;
		background-color: red;
		color: white;
		width: 90%;
		line-height: 50px;
		margin: 70px auto;
	}
</style>
