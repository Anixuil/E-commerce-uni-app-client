<template>
	<view>
		<view class="mengban" v-show="dialogflag" @click="closeDialog"></view>
		<lx-message ref="lxmessage"></lx-message>
		<view class="address-box" v-for="(item,index) in addressList" :key="item.id" >
			<view class="address-box-left" @click.stop="changeAddress(index)">
				<view><text class="tags" v-show="item.is_default == 1 ? true : false">默认</text>{{item.address}}  {{item.street}}</view>
				<view>
					<text>{{item.contactor_name}}</text>
					<text>{{item.phone}}</text>
				</view>
			</view>
			<view class="address-box-right">
				<text @click="edit(index)">
					<lx-icons type="edit" size="25px" color="gray"></lx-icons>
				</text>
				<text @click="del(index)">
					<lx-icons type="delete" size="25px" color="red"></lx-icons>
				</text>
			</view>
		</view>
		
		<!-- 新增地址 -->
		<view class="addbtn" @click="addbtn">新增地址</view>
		
		<!-- 对话框-->
		<view class="dialog" v-show="dialogflag">
			<view class="dialog-title">{{title}}</view>
			<text>确定删除地址吗？</text>
			<view class="dialog-control">
				<text @click="closeDialog">取消</text>
				<text @click="checkDialog">确定</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				addressList:[],
				address_info:{
					address:'',
					address_id:0,
					contactor_name:'',
					id:0,
					is_default:'',
					phone:'',
					street:'',
					user_id:0
				},
				dialogflag:false,
				title:'提示',
				dialogId:0,
				is_cometo:false//是否从订单页跳转过来
			}
		},
		onLoad(option) {
			if(option.mode){
				// console.log(option.mode);
				this.is_cometo = true;
			}else{
				this.is_cometo = false;
			}
			this.getAddress();
		},
		onShow(){
			uni.startPullDownRefresh({
				
			})
		},
		onPullDownRefresh() {
			this.getAddress();
			setTimeout(()=>{
				uni.stopPullDownRefresh();
			},500)
		},
		methods:{
			getAddress(){
				this.$http.get('user.address').then(res=>{
					// console.log(res);
					this.addressList = res.data;
				})
			},
			// 修改地址
			edit(i){
				uni.navigateTo({
					url:'../editAddress/editAddress?index=' + i
				})
				// console.log({...this.addressList[i]})
				// this.$http.post('user.address.edit',{...this.addressList[i]}).then(res=>{
				// 	console.log(res);
				// })
			},
			//新增地址
			addbtn(){
				uni.navigateTo({
					url:'../addAddress/addAddress'
				})
				// this.$http.post('user.address.edit',{...this.address_info}).then(res=>{
				// 	console.log(res);
				// })
			},
			//删除地址
			del(index){
				this.address_info = this.addressList[index];
				// console.log(this.address_info);
				this.dialogflag = true;
			},
			//确定删除地址
			checkDialog(){
				this.$http.post('user.address.del',{address_id:this.address_info.id}).then(res=>{
					// console.log(res);
					if(res.data != 1){
						return this.$refs.lxmessage.show({
						type:'error',
						msg:'删除地址失败',
						direction:'top',
						time:1000
					})
					}
					this.dialogflag = false;
					this.$refs.lxmessage.show({
						type:'success',
						msg:'删除地址成功',
						direction:'top',
						time:1000
					})
					// uni.startPullDownRefresh({})
					this.getAddress();
				}).catch(err=>{
					this.$refs.lxmessage.show({
						type:'error',
						msg:'删除地址失败',
						direction:'top',
						time:1000
					})
				})
			},
			//关闭删除对话框
			closeDialog(){
				this.dialogflag = false;
			},
			//选择地址跳转订单界面
			changeAddress(index){
				// console.log(index);
				if(this.is_cometo){
					uni.setStorageSync('address-change',index);
					uni.redirectTo({
						url:'../dingdan/dingdan?add_index=' + index
					})
					return;
				}
			}
		}
	}
</script>

<style scoped>
	.address-box{
		/* border: 1px solid red; */
		width: 100%;
		box-sizing: border-box;
		padding: 10px 20px;
		display: flex;
		border-bottom: 1px solid lightgray;
		font-size: 15px;
		background-color: white;
	}
	.address-box-left{
		/* border: 1px solid red; */
		width: 80%;
		display: flex;
		flex-direction: column;
	}
	.address-box-left>text:nth-of-type(2){
		color: #999999;
		font-size: 14px;
	}
	.address-box-left>view:nth-of-type(1){
		width: 100%;
		display: inline-block;
		line-height: 30px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.address-box-left>view:nth-of-type(2){
		display: flex;
		justify-content: space-between;
	}
	.tags{
		border: 1px solid red;
		color: red;
		box-sizing: border-box;
		padding: 0 5px;
		margin-right: 5px;
	}
	.address-box-left>view:nth-of-type(2)>text{
		color: #999999;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.address-box-left>view:nth-of-type(2)>text:nth-of-type(2){
		width: 75%;
	}
	.address-box-right{
		width: 20%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.addbtn{
		position: fixed;
		bottom: 10px;
		border: 1px solid red;
		width: 90%;
		left: 5%;
		text-align: center;
		box-sizing: border-box;
		padding: 10px 0;
		background-color: red;
		color: white;
		font-size: 18px;
	}
	.dialog{
		position: fixed;
		width: 90%;
		/* border: 1px solid red; */
		left: 5%;
		top: 35%;
		z-index: 99;
		background-color: white;
		box-sizing: border-box;
		padding: 10px 5px;
		display: flex;
		flex-direction: column;
	}
	.dialog-title{
		text-align: center;
		width: 100%;
	}
	.dialog>text{
		/* border: 1px solid red; */
		box-sizing: border-box;
		padding: 15px 0;
		text-align: center;
		line-height: 50px;
		color: #D3D3D3;
	}
	.mengban{
		width: 100%;
		height: 800px;
		background: rgba(1,1,1,0.3);
		position: absolute;
		top: 0;
		left: 0;
		z-index: 98;
	}
	.dialog-control{
		/* border: 1px solid red; */
		/* text-align: center; */
		display: flex;
		justify-content: space-between;
	}
	.dialog-control>text{
		width: 50%;
		text-align: center;
	}
	.dialog-control>text:nth-of-type(2){
		color: gold;
	}
</style>
