<template>
	<view>
		<lx-message ref="lxmessage"></lx-message>
		<!-- 标签导航 -->
		<lx-nav :navList="navList" @navChange="navChange" :navIndex="navIndex"></lx-nav>
		<!-- <view class="view-tag">
			<view v-for="(item,index) in navList" ref='nav_list' :key="index" @click="nav_click(index)" :class="navIndex == index ? 'navSelected' : ''">
				{{item.title}}
			</view>
			<view class="scroll-view" :style="{'width':scroll_div.width + 'px','left':scroll_div.left + 'px'}"></view>
		</view> -->
		
		<!-- 主体区域 -->
		<view class="order-box">
			<view class="order-box-item" v-for="(item,index) in orderList" :key="index">
				<view class="order-box-item-top">
					<text>{{item.create_time_text}}</text>
					<view>
						<text>{{item.state_tip}}</text>
						<text v-if="item.status==-1" @click="cancelOrDel(item.order_sn,0)">
							| <lx-icons type="delete" size="14px" color="gray"></lx-icons>
						</text>
						
					</view>
				</view>
				<view class="order-box-item-contain" @click="gotoDingdanxiangqing(index)">
					<view class="order-box-item-contain-left" :style="{'width':'25' * item.products.length + '%'}">
						<image v-for="(img,i) in item.products" :key="i" :src="img.images[0]"></image>
					</view>
					<view class="order-box-item-contain-right" v-if="(item.products.length == 1)">
						<view class="order-box-item-contain-right-titile">
							{{item.products[0].title}}
						</view>
						<view class="order-box-item-contain-right-info">
							{{item.products[0].attributes}} x {{item.products[0].quantity}}
						</view>
						<view class="order-box-item-contain-right-price">
							￥ {{item.products[0].price}}
						</view>
					</view>
				</view>
				<view class="order-box-item-footer">
					共 <text>{{item.products.length}}</text> 件商品 实付款 <text>￥{{item.order_price}}</text>
				</view>
				<view class="order-box-item-control" v-if="item.status == 0">
					<view @click="cancelOrDel(item.order_sn,1)">取消订单</view>
					<view @click="gotopay(item.order_sn)">立即支付</view>
				</view>
			</view>
		</view>
		
		 <!-- 没有订单显示 -->
		 <view class="no-dingdan" v-show="!is_dingdan">
			 没有{{navList[navIndex].title}}订单
		 </view>
		
		<!-- 自定义对话框 -->
		<lx-dialog type="tips" title="提示" :content="dialogContent" :dialogFlag="dialogflag" @close="close" :data="dialogData"></lx-dialog>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				navList:[
					{title:'全部'},
					{title:'待付款'},
					{title:'待收货'},
					{title:'待评价'}
				],
				navIndex:0,
				orderList:[],//订单列表
				dialogflag:false,//对话框状态
				dialogData:{},//传给对话框的数据
				dialogContent:'是否取消订单？',//对话框提示内容
				page:0,
				last_page:0,//页数
				is_dingdan:false,//是否有订单
			}
		},
		onLoad() {
			this.navIndex = uni.getStorageSync('dingdan-nav-index');
		},
		mounted() {
			
		},
		//监听是否达到最下面
		onReachBottom() {
			this.page++;
			if(this.last_page > this.page){
				this.getOrderList(this.navIndex,this.page);
			}else{
				this.page = this.last_page;
				this.$refs.lxmessage.show({
					type: 'warning',
					msg: '真的一滴都没有了',
					direction: 'top',
					time: 1000
				})
			}
		},
		methods:{
			getOrderList(state = 0,page = 1){
				this.$http.get('order.list',{state,page}).then(res=>{
					// console.log(res);
					if(res.data.data.length != 0){
						this.is_dingdan = true;
					}else{
						this.is_dingdan = false;
					}
					this.last_page = res.data.last_page;
					// this.orderList = res.data.data;
					for(let i = 0;i < res.data.data.length;i++){
						this.orderList.push(res.data.data[i]);
					}
				})
				.catch(err=>{
					console.log(err);
				})
			},
			navChange(res){
				// console.log(res);
				this.orderList = [];
				this.navIndex = res;
				let index = res;
				if(index == 0){
					this.getOrderList();
				}
				if(index == 1){
					this.getOrderList(1);
				}
				if(index == 2){
					this.getOrderList(2);
				}
				if(index == 3){
					this.getOrderList(3);
				}
			},
			// nav_click(index){
			// 	if(index || index == 0){
			// 		this.navIndex = index;
			// 		uni.setStorageSync('dingdan-nav-index',this.navIndex);
			// 		// console.log(uni.getStorageSync('dingdan-nav-index'));
			// 		if(index == 0){
			// 			this.getOrderList();
			// 		}
			// 		if(index == 1){
			// 			this.getOrderList(1);
			// 		}
			// 		if(index == 2){
			// 			this.getOrderList(2);
			// 		}
			// 		if(index == 3){
			// 			this.getOrderList(3);
			// 		}
			// 	}else{
					
			// 	}
			// 	this.scroll_div.left = this.$refs.nav_list[this.navIndex].$el.offsetLeft + this.$refs.nav_list[this.navIndex].$el.offsetWidth*0.5*0.5;
			// 	this.scroll_div.width = this.$refs.nav_list[this.navIndex].$el.offsetWidth * 0.5;
			// },
			//取消订单
			cancelOrDel(order_sn,id){
				this.dialogflag = true;
				this.dialogData={
					order_sn,
					id
				};
				if(id == 0){
					//删除订单
					this.dialogContent = '是否删除该订单？'
				}else if(id == 1){
					//取消订单
					this.dialogContent = '是否取消该订单？'
				}
			},
			close(res){
				this.dialogflag = res.flag;
				if(res.mode == 1){
					let data = res.data;
					this.orderList = [];
					if(data.id == 0){
						//删除订单
						this.$http.post('order.del',{order_sn:data.order_sn}).then(res=>{
							this.getOrderList(this.navIndex);
						})
					}else if(data.id == 1){
						//取消订单
						this.$http.post('order.cancel',{order_sn:data.order_sn}).then(res=>{
							this.getOrderList(this.navIndex);
						})
					}
					
				}
			},
			gotopay(order_sn){
				uni.setStorageSync('order-sn',order_sn);
				uni.navigateTo({
					url:'../pay/pay'
				})
			},
			gotoDingdanxiangqing(index){
				// console.log(this.orderList[index]);
				uni.navigateTo({
					url:'../dingdanxiangqing/dingdanxiangqing?order_sn='+this.orderList[index].order_sn
				})
			}
		}
	}
</script>

<style scoped>
	.view-tag{
		width: 100%;
		/* border: 1px solid red; */
		display: flex;
		position: relative;
		background-color: white;
	}
	.view-tag>view{
		width: 33%;
		text-align: center;
		line-height: 40px;
		font-size: 15px;
		transition: 0.4s ease-in-out;
	}
	.navSelected{
		color: red;
	}
	.scroll-view{
		position: absolute;
		height: 4px;
		background-color: red;
		bottom: 0;
	}
	.order-box{
		/* border: 1px solid red; */
		width: 100%;
		margin-top: 10px;
	}
	.order-box-item{
		background-color: white;
		box-sizing: border-box;
		padding: 0 10px;
		margin-bottom: 10px;
	}
	.order-box-item-top{
		line-height: 30px;
		border-bottom: 1px solid lightgrey;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
		color: #999999;
	}
	.order-box-item-top>text:nth-of-type(1){
		color: black;
	}
	.order-box-item-top>view{
		display: flex;
		align-items: center;
		/* border: 1px solid red; */
		width: 20%;
		justify-content: space-around;
	}
	.order-box-item-contain{
		display: flex;
		height: 12vh;
		box-sizing: border-box;
		padding: 7px 0;
		justify-content: space-between;
	}
	.order-box-item-contain-left{
		width: 25%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.order-box-item-contain-left>image{
		width: 95%;
		height: 95%;
	}
	.order-box-item-contain-right{
		width: 70%;
	}
	.order-box-item-contain-right-titile{
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		color: #303133;
		font-size: 15px;
	}
	.order-box-item-contain-right-info{
		color: #999999;
		font-size: 14px;
		line-height: 30px;
	}
	.order-box-item-contain-right-price{
		/* border: 1px solid red; */
		line-height: 30px;
	}
	.order-box-item-footer{
		/* border: 1px solid red; */
		width: 100%;
		text-align: end;
		line-height: 30px;
		font-size: 14px;
		color: #999999;
		box-sizing: border-box;
		padding: 0 10px;
		border-bottom: 1px solid lightgrey;
	}
	.order-box-item-footer>text{
		color: black;
	}
	.order-box-item-control{
		display: flex;
		width: 100%;
		justify-content: flex-end;
		height: 50px;
		align-items: center;
	}
	.order-box-item-control>view{
		margin: 0 5px;
		border: 1px solid lightgrey;
		box-sizing: border-box;
		padding: 5px 10px;
		border-radius: 20px;
		font-size: 14px;
	}
	.order-box-item-control>view:nth-of-type(2){
		color: red;
		border-color: rgb(253,233,237);
		background-color: rgb(255,249,249);
	}
	.no-dingdan{
		position: absolute;
		width: 100%;
		top: 48%;
		text-align: center;
		box-sizing: border-box;
		font-size: 18px;
		color: red;
	}
</style>
