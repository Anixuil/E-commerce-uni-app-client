<template>
	<view class="cart">
		<lx-message ref="lxmessage"></lx-message>
		<view class="mengban" v-show="dialogflag" @click="closeDialog"></view>
		<!-- 购物车商品卡片 -->
		<view class="cart-box" v-for="(item,index) in cartList" :key="item.id" v-if="loginFlag">
			<view class="checkbox">
				<view :class="'circle' + (item.is_selected == 1 ? ' circleShow' : 'circleHide')"
					@click="goods_selected(index)">
					<lx-icons type="check" size="15px" color="lightgray"></lx-icons>
				</view>
			</view>
			<!-- 左边部分 -->
			<view class="cart-box-left" @click="gotoXiangqing(item.product.id)">
				<view class="cart-img-box">
					<image :src="item.product.image[0]"></image>
				</view>
			</view>
			<!-- 右边部分 -->
			<view class="cart-box-right">
				<view class="cart-box-right-title">
					<text @click="gotoXiangqing(item.product.id)">{{item.product.title}}</text>
					<lx-icons type="close" size="25px" color="lightgray" @click="delGoods(0,index)"></lx-icons>
				</view>
				<view class="cart-box-right-value">
					<text>{{item.sku.value}}</text>
				</view>
				<view class="cart-box-right-price">
					<text>￥{{item.sku.price}}</text>
				</view>
				<view class="cart-box-right-control-box">
					<view class="cart-box-right-control">
						<text @click="editGoods_cart(index,0)">-</text>
						<input type="number" :value="item.quantity">
						<text @click="editGoods_cart(index,1)">+</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 购物车结算导航 -->
		<view class="cart-nav" v-show="(loginFlag == !noGoods)">
			<view :class="'circle' + (allSelected ? ' circleShow' : ' circleHide')" @click.stop="allSelect">
				<lx-icons type="check" size="15px" color="lightgray"></lx-icons>
				<uni-transition class="cart-circle-text" :mode-class="['slide-left','fade']" :show="allSelected">
					<text @click.stop="delGoods(1)">清空</text>
				</uni-transition>
			</view>
			<view>
				<text>￥{{cartPrice.toFixed(2)}}</text>
				<text class="sumBtn" @click="gotoPay">去结算</text>
			</view>
		</view>

		<!-- 对话框-->
		<view class="dialog" v-show="dialogflag">
			<view class="dialog-title">{{title}}</view>
			<text>{{dialogTitle}}</text>
			<view class="dialog-control">
				<text @click="closeDialog">取消</text>
				<text @click="checkDialog">确定</text>
			</view>
		</view>
		
		<!-- 没有更多了 -->
		<view class="tips" v-show="(loginFlag == !noGoods)">
			———— 没有更多了 ————
		</view>
		<view class="no-login" v-show="!loginFlag">
			您还未登录，<navigator url="../login/login">立即登录</navigator>
		</view>
		
		<view class="no-goods" v-show="noGoods">
			购物车里什么都没有呢，<navigator open-type="switchTab" url="../index/index">随便逛逛</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loginFlag:false,//是否登录
				cartList: [],
				noGoods:false,//购物车没有东西
				allSelected: false, //是否全选
				cartPrice: 0, //购物车选中总价
				selectedId: [], //选中的商品id
				dialogflag: false,
				title: '提示',
				dialogId: 0,
				mode:0,//删除模式
				dialogTitle:'是否清除购物车?',
				currentGoodsID:0//当前准备删除的商品
			}
		},
		onLoad() {
			this.getCart();
		},
		onShow() {
			this.getCart();
		},
		onPullDownRefresh() {
			this.getCart();
			setTimeout(() => {
				uni.stopPullDownRefresh({});
			}, 500)
		},
		methods: {
			getCart() {
				if(uni.getStorageSync('token')){
					this.$http.post('cart.list').then(res => {
						// console.log(res);
						this.cartList = res.data;
						this.is_allSelected();
						this.loginFlag = true;
						if(this.cartList.length == 0){
							return this.noGoods = true;
						}
						this.noGoods = false;
					})
				}else{
					this.loginFlag = false;
				}
				
			},
			//选中商品
			goods_selected(index) {
				// console.log(this.cartList[index]);
				if (this.cartList[index].is_selected == 1) {
					this.cartList[index].is_selected = 0;
				} else {
					this.cartList[index].is_selected = 1;
				}
				this.is_allSelected();
			},
			//判断是否全选
			is_allSelected() {
				this.cartPrice = 0;
				let num = 0;
				for (let i = 0; i < this.cartList.length; i++) {
					if (this.cartList[i].is_selected != 1) {
						this.allSelected = false;
						continue;
					} else {
						num++;
						//选中的计算价格 数量乘以单价
						this.selectedId.push(this.cartList[i].id);
						this.cartPrice += this.cartList[i].sku.price * this.cartList[i].quantity;
						if (num == this.cartList.length) {
							this.allSelected = true;
						}
					}
				}
			},
			//一键全选
			allSelect() {
				if (this.allSelected) {
					for (let i = 0; i < this.cartList.length; i++) {
						this.cartList[i].is_selected = 0;
					}
					this.is_allSelected();
					return;
				}
				for (let i = 0; i < this.cartList.length; i++) {
					this.cartList[i].is_selected = 1;
				}
				this.is_allSelected();
			},
			//更改数量
			editGoods_cart(index, mode) {
				if (mode == 0) {
					this.cartList[index].quantity--;
					if (this.cartList[index].quantity <= 0) {
						this.checkDialog(0,index);
					}
				} else {
					this.cartList[index].quantity++;
				}
				this.setCartEdit(index);
			},
			//提交修改
			setCartEdit(index) {
				this.$http.post('cart.update', {
					sku_id: this.cartList[index].sku.id,
					quantity: this.cartList[index].quantity
				}).then(res => {
					// console.log(res);
					this.is_allSelected();
				})
			},
			delGoods(mode,index) {
				//mode为0为单个删除
				this.mode = mode;
				this.currentGoodsID = index;
				if(this.mode == 0){
					this.dialogTitle = '是否将该商品移除购物车？';
				}else{
					this.dialogTitle = '是否清空购物车？'
				}
				this.dialogflag = true;
			},
			//确定删除商品
			checkDialog(id,index) {
				this.currentGoodsID = index || this.currentGoodsID;
				if(this.mode == 0 || id == 0){
					this.$http.post('cart.delete', {
						ids: [this.cartList[this.currentGoodsID].id]
					}).then(res => {
						// console.log(res);
						this.getCart();
						// console.log(this.cartList);
						this.closeDialog();
						this.$refs.lxmessage.show({
							type: 'success',
							msg: '删除商品成功',
							direction: 'center',
							time: 1000
						})
					})
				}else{
					this.$http.post('cart.clear').then(res => {
						// console.log(res);
						this.closeDialog();
						this.$refs.lxmessage.show({
							type: 'success',
							msg: '成功清空购物车',
							direction: 'top',
							time: 1000
						})
						this.getCart();
					})
				}
				
			},
			//关闭删除对话框
			closeDialog(){
				this.dialogflag = false;
			},
			//老板结算
			gotoPay(){
				uni.setStorageSync('cart-list',{...this.cartList});
				uni.setStorageSync('dingdan-page',1);
				uni.navigateTo({
					url:'../dingdan/dingdan?page=' + 1
				})
			},
			//跳转到商品详情
			gotoXiangqing(id){
				uni.navigateTo({
					url:'../xiangqing/xiangqing?id=' + id
				})
			}
		}
	}
</script>

<style scoped>
	.cart {
		width: 100%;
		/* border: 1px solid red; */
		box-sizing: border-box;
		padding-bottom: 120px;
	}

	.cart-box {
		width: 100%;
		display: flex;
		justify-content: space-between;
		/* height: 18vh; */
		box-sizing: border-box;
		padding: 3vh 2vw;
		position: relative;
		background-color: white;
	}

	.checkbox {
		position: absolute;
		z-index: 4;
		border-radius: 50%;
		box-sizing: border-box;
		padding: 5px;
		background-color: white;
		overflow: hidden;
		top: 0;
		left: 0;
	}

	.circle {
		background-color: #AAAAAA;
		border-radius: 50%;
		box-sizing: border-box;
		width: 20px;
		height: 20px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.cart-box:not(.cart-box:last-of-type) {
		border-bottom: 1px solid lightgray;
	}

	.cart-box-left {
		width: 35%;
		/* border: 1px solid red; */
	}

	.cart-img-box {
		width: 100%;
		height: 100%;
		/* border: 1px solid red; */
	}

	.cart-img-box image {
		width: 100%;
		height: 100%;
	}

	.cart-box-right {
		width: 60%;
		/* border: 1px solid red; */
		display: flex;
		flex-direction: column;
	}

	.cart-box-right-title {
		display: flex;
		justify-content: space-between;
	}

	.cart-box-right-title>text:nth-child(1) {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-size: 18px;
	}

	.cart-box-right-value {
		/* border: 1px solid red; */
		font-size: 15px;
		line-height: 25px;
		color: #969696;
	}

	.cart-box-right-price {
		line-height: 40px;
		color: red;
		font-weight: bold;
	}

	.cart-box-right-control {
		/* border: 1px solid red; */
		display: flex;
		width: 70%;
		line-height: 35px;
		background-color: rgb(245, 245, 245);
		font-size: 30px;
	}

	.cart-box-right-control>input {
		/* border: 1px solid red; */
		height: 35px;
		text-align: center;
		font-size: 18px;
		width: 50%;
		color: black;
	}

	.cart-box-right-control>text {
		width: 25%;
		text-align: center;
		/* border: 1px solid red; */
	}

	.cart-nav {
		/* border: 1px solid red; */
		width: 100%;
		position: fixed;
		bottom: 60px;
		width: 90%;
		left: 5%;
		background-color: rgba(255, 255, 255, 0.9);
		border-radius: 10px;
		display: flex;
		box-sizing: border-box;
		padding: 10px 20px;
		justify-content: space-between;
		align-items: center;
		box-shadow: 0 0 10px 2px gray;
		overflow: hidden;
	}

	.cart-nav>view:nth-child(2) {
		/* border: 1px solid red; */
		width: 55%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 16px;
	}

	.cart-nav>.circle {
		/* border: 1px solid red; */
		position: relative;
		display: flex;
		align-items: center;
	}

	.cart-circle-text {
		z-index: -1;
		position: absolute;
		top: 0;
		display: inline-block;
		width: 34px;
		/* transition: 0.3s ease-in-out; */
		left: 6px;
		background-color: #AAAAAA;
		text-align: end;
		padding: 0px 10px 0px 18px;
		border-radius: 10px;
		color: white;
		font-size: 16px;
	}

	.circleShow {
		background: rgb(250, 67, 106);
	}

	.circleHide {
		background: #AAAAAA;
	}

	/* .clearShow {
		width: 34px;
		display: block;
	} */

	.clearHide {
		/* width: 0px; */
		opacity: 0;
	}

	.sumBtn {
		color: white;
		background-color: rgb(250, 67, 106);
		box-sizing: border-box;
		padding: 7px 10px;
		border-radius: 20px;
		box-shadow: 0 0 5px 2px rgb(250, 67, 106);
		font-size: 16px;
	}

	/* 对话框 */
	.dialog {
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
		/* border: 1px solid red; */
		/* text-align: center; */
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
	.no-login,.no-goods{
		width: 100%;
		/* border: 1px solid red; */
		display: flex;
		justify-content: center;
		position: fixed;
		top: 48%;
		font-size: 15px;
		color: #AAAAAA;
	}
	.no-login>uni-navigator,.no-goods>uni-navigator{
		color: red;
	}
</style>
