<template>
	<view class="box">
		<view>
			<text>联系人</text>
			<input type="text" v-model="address_info.contactor_name">
		</view>
		<view>
			<text>手机号</text>
			<input type="number" v-model="address_info.phone">
		</view>
		<view>
			<text>地址</text>
			<input type="text" v-model="address_info.address">
		</view>
		<view>
			<text>街道</text>
			<input type="text" v-model="address_info.street">
		</view>
		<view>
			<text>设为默认</text>
			<switch @change="switchChange" :checked="address_info.is_default == 1 ? true : false"></switch>
		</view>
		<view class="submit" @click="submitAddress">提交</view>
		<lx-message class="lx-message" ref="lxmessage"></lx-message>
		<!-- <view class="address-selectd-box">
			<picker-view class="uni-picker-view-wrapper" indicator-style="height: 50px;" @change="bindChange">
				<picker-view-column class="uni-picker-view-column">
					<view v-for="(item,index) in ChinaAddress" :key="item.id">
						{{item}}
					</view>
				</picker-view-column>
				<picker-view-column>
					
				</picker-view-column>
				<picker-view-column>
					
				</picker-view-column>
			</picker-view>
		</view> -->
	</view>
</template>

<script>
	import lotusAddress from "../../components/Winglau14-lotusAddress/Winglau14-lotusAddress.vue";
	export default {
		data() {
			return {
				address_info: {
					address: '',
					address_id: 0,
					contactor_name: '',
					is_default: 0,
					phone: '',
					street: '',
				},
				//省市级地址选择
				ChinaAddress: [],
			}
		},
		onLoad() {
			this.getChinaAddress();
		},
		components: {
			"lotus-address": lotusAddress
		},
		methods: {
			getChinaAddress() {
				console.log(1);
				this.$http.get('index.areas').then(res => {
					console.log(res);
					this.ChinaAddress = res.data;
					this.choseValue(res.data);
				})
			},
			switchChange() {
				// qdconsole.log(this.address_info.is_default);
				if (this.address_info.is_default == 1) {
					this.address_info.is_default = 0;
				} else {
					this.address_info.is_default = 1;
				}
			},
			submitAddress() {
				this.$http.post('user.address.edit', {
						...this.address_info
					}).then(res => {
						// console.log(res);
						if (res.data != 1) {
							return this.$refs.lxmessage.show({
								type: 'error',
								msg: '新增地址失败',
								direction: 'top',
								time: 1000
							})
						}
						this.$refs.lxmessage.show({
							type: 'success',
							msg: '新增地址成功',
							direction: 'top',
							time: 1000
						})
						setTimeout(() => {
							uni.navigateBack({
								url: '../address/address'
							})
						}, 1000);
					})
					.catch(err => {
						this.$refs.lxmessage.show({
							type: 'success',
							msg: '新增地址失败',
							direction: 'top',
							time: 1000
						})
					})
			},
		},
	}
</script>

<style scoped>
	.box {
		/* border: 1px solid red; */
		width: 100%;
	}

	.box>view:not(.lx-message) {
		display: flex;
		box-sizing: border-box;
		padding: 0 10px;
		line-height: 50px;
		border-bottom: 1px solid lightgray;
		align-items: center;
		background-color: white;
	}

	.box>view>text {
		/* border: 1px solid red; */
		width: 80px;
	}

	.box>view>input {
		/* width: 80px; */
		width: 100%;
	}

	.box>view:nth-of-type(5) {
		display: flex;
		justify-content: space-between;
		padding: 0 30px 0 10px;
	}

	.box>view:nth-of-type(6) {
		display: block;
		text-align: center;
		background-color: red;
		color: white;
		width: 90%;
		line-height: 50px;
		margin: 70px auto;
	}
	.address-selectd-box{
		width: 100%;
		border: 1px solid red;
		position: fixed;
		bottom: 0px;
		height: 50vh;
	}
	.uni-picker-view-wrapper{
		display: flex;
		position: relative;
		overflow: hidden;
		height: 100%;
	}
	.uni-picker-view-column{
		flex: 1;
		position: relative;
		height: 100%;
		overflow: hidden;
	}
</style>
