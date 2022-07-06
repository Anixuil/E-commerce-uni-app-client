<template>
	<view class="box">
		<lx-message ref="lxmessage"></lx-message>
		<view class="mengban" v-show="dialogflag" @click="closeDialog"></view>
		<view @click="openDialog(0)">
			<text>修改昵称</text>
			<text>&gt;</text>
		</view>
		<view @click="openDialog(1)">
			<text>修改密码</text>
			<text>&gt;</text>
		</view>
		
		<!-- 修改对话框 -->
		<view class="dialog" v-show="dialogflag">
			<view class="dialog-title">{{title}}</view>
			<input type="text" v-model="nickname" v-show="dialogFlag">
			<input type="text" v-model="password" v-show="!dialogFlag">
			<view class="dialog-control">
				<text @click="closeDialog">取消</text>
				<text @click="checkDialog">确定</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nickname:'',
				password:'',
				dialogFlag:true,
				dialogflag:false,
				title:'修改昵称',
				dialogId:0
			}
		},
		onLoad() {
			
		},
		methods: {
			openDialog(id){
				this.dialogId = id;
				if(id == 0){
					this.dialogFlag = true;
					this.title = '修改昵称';
				}else if(id == 1){
					this.title = '修改密码';
					this.dialogFlag = false;
				}
				this.dialogflag = true;
				
			},
			closeDialog(){
				this.dialogflag = false;
				this.clearInput();
			},
			checkDialog(){
				if(this.dialogId == 0){
					console.log(this.nickname);
					this.$http.post('user.info.edit',{nickname:this.nickname}).then(res=>{
						console.log(res);
						this.$refs.lxmessage.show({
							type:'success',
							msg:'修改昵称成功',
							direction:'top',
							time:1000
						})
					}).catch(err=>{
						this.$refs.lxmessage.show({
							type:'error',
							msg:'修改昵称失败',
							direction:'top',
							time:1000
						})
					})
				}else if(this.dialogId == 1){
					console.log(this.password);
					this.$http.post('user.info.edit',{password:this.password}).then(res=>{
						// console.log(res);
						this.$refs.lxmessage.show({
							type:'success',
							msg:'修改密码成功',
							direction:'top',
							time:1000
						})
					}).catch(err=>{
						this.$refs.lxmessage.show({
							type:'error',
							msg:'修改密码失败',
							direction:'top',
							time:1000
						})
					})
				}
				this.closeDialog();
				this.clearInput();
			},
			clearInput(){
				this.nickname = '';
				this.password = '';
			}
		}
	}
</script>

<style scoped>
	.box{
		width: 100%;
		background-color: white;
	}
	.box>view{
		line-height: 50px;
		border-bottom: 1px solid lightgray;
		box-sizing: border-box;
		padding: 0 20px;
		display: flex;
		justify-content: space-between;
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
	.dialog input{
		margin: 20px 0;
		border: 1px solid lightgray;
		font-size: 20px;
		height: 40px;
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
