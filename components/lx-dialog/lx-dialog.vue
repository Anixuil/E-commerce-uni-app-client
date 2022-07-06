<template>
	<view v-show="dialogFlag">
		<view class="lxmengban" v-show="dialogFlag"></view>
		<!-- 对话框-->
		<view class="dialog" v-show="dialogFlag">
			<view class="dialog-title">{{title}}</view>
			<text>{{content}}</text>
			<input type="text" value="" v-if="type == 'input'"/>
			<view class="dialog-control">
				<text @click="_closeDialog">取消</text>
				<text @click="_checkDialog(data)">确定</text>
			</view>
		</view>
	</view>
	
</template>

<script>
	export default {
		name:"lx-dialog",
		props:{
			type:{
				type:String,
				default:'tips'
			},
			title:{
				type:String,
				default:'提示'
			},
			content:{
				type:String,
				default:'是否确定'
			},
			dialogFlag:{
				type:Boolean,
				default:false
			},
			data:{
				default:''
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			//关闭删除对话框
			_closeDialog(){
				// console.log('取消');
				this.$emit('close',{flag:false,mode:0});
			},
			//确定删除商品
			_checkDialog(data) {
				// console.log('确定');
				this.$emit('close',{flag:false,mode:1,data});
			},
		}
	}
</script>

<style scoped>
/* 遮罩层 */
	.lxmengban{
		position: fixed;
		background-color: rgba(1,1,1,0.4);
		width: 100%;
		height: 100%;
		top: 0.1%;
		left: 0.1%;
		z-index: 98;
	}
/* 对话框 */
	.dialog {
		position: fixed;
		width: 90%;
		left: 5%;
		top: 35%;
		z-index: 99;
		background-color: white;
		box-sizing: border-box;
		padding: 10px 5px;
		display: flex;
		flex-direction: column;
	}

	.dialog-title {
		text-align: center;
		width: 100%;
	}

	.dialog>text {
		/* border: 1px solid red; */
		box-sizing: border-box;
		padding: 15px 0;
		text-align: center;
		line-height: 50px;
		color: #D3D3D3;
	}

	.mengban {
		width: 100%;
		height: 800px;
		background: rgba(1, 1, 1, 0.3);
		position: absolute;
		top: 0;
		left: 0;
		z-index: 98;
	}

	.dialog-control {
		display: flex;
		justify-content: space-between;
	}

	.dialog-control>text {
		width: 50%;
		text-align: center;
	}

	.dialog-control>text:nth-of-type(2) {
		color: gold;
	}
	.tips{
		width: 100%;
		text-align: center;
		margin-top: 20px;
		color: #BBBBBB;
	}
</style>
