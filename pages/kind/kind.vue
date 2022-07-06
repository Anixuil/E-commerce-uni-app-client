<template>
	<view class="kind-box">
		<!-- 左侧侧边栏 -->
		<view class="kind-box-left">
			<view v-for="(item,index) in tagList" :key="item.id" :class="tagIndex == index ? 'selectedActive' : ''" @click="tagSelected(index)">
				{{item.name}}
			</view>
		</view>
		<!-- 右边展示 -->
		<view class="kind-main-box">
			<!-- 二级类别 -->
			<view class="kind-two-box" v-for="(item,index) in taglist_two" :key="item.id">
				<view class="kind-two-title">{{item.name}}</view>
				<view class="kind-two-list">
					<view v-for="(son,i) in item.childlist" :key="son.id" @click="gotoGoods_list(index,i)">
						<view class="kind-img">
							<image :src="son.image"></image>
						</view>
						<text>{{son.name}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				tagIndex:0,
				tagList:[],//大类别数组
				cat_id:0,//商品id
				taglist_two:[],
			}
		},
		onLoad() {
			this.getKindList();
		},
		methods:{
			getKindList(){
				this.$http.get('category').then(res=>{
					// console.log(res);
					this.tagList = res.data;
					this.tagSelected();
				})
			},
			//选中标签
			tagSelected(index){
				let i = index || 0;
				this.tagIndex = i;
				this.taglist_two = this.tagList[this.tagIndex].childlist;
			},
			//跳转到商品列表
			gotoGoods_list(index,i){
				this.cat_id = this.tagList[this.tagIndex].childlist[index].childlist[i].id;
				uni.navigateTo({
					url:'../goodsList/goodsList?cat_id=' + this.cat_id
				})
			}
		}
	}
</script>

<style scoped>
	.kind-box{
		/* border: 1px solid red; */
		width: 100%;
		display: flex;
		justify-content: space-between;
		height: 100%;
	}
	.kind-box-left{
		width: 27%;
		height: 100%;
		background-color: white;
	}
	.kind-box-left>view{
		border-bottom: 0.1px solid lightgray;
		text-align: center;
		line-height: 50px;
		font-size: 14px;
	}
	.selectedActive{
		background-color: rgb(248,248,248);
		color: red;
		border-left: 5px solid red;
	}
	.kind-main-box{
		width: 73%;
		/* border: 1px solid red; */
		background-color: rgb(248,248,248);
		box-sizing: border-box;
		padding: 5px 0 0 10px;
	}
	.kind-two-title{
		font-size: 15px;
		/* border: 1px solid red; */
		line-height: 30px;
	}
	.kind-two-list{
		background-color: white;
		box-sizing: border-box;
		padding: 10px;
		overflow: hidden;
	}
	.kind-two-list>view{
		width: 30%;
		float: left;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 10px;
		margin-right: 8px;
	}
	.kind-img{
		width: 100%;
		height: 9vh;
	}
	.kind-img>image{
		width: 100%;
		height: 100%;
	}
</style>
