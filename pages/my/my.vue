<template>
	<view>
		<lx-message ref="lxmessage"></lx-message>
		<view class="my-box">
			<view class="my-info-box">
				<view class="my-info-top">
					<image :src="user_info.image"></image>
					<text @click="gotoLogin">{{user_info.name}}</text>
				</view>
			</view>

			<!-- 订单管理 -->
			<view class="manager-box">
				<view @click="gotomyDingdan(0)">
					<lx-icons type="form" size="25px" color="red"></lx-icons>
					<text>全部订单</text>
				</view>
				<view @click="gotomyDingdan(1)">
					<lx-icons type="pay" size="25px" color="red"></lx-icons>
					<text>待付款</text>
				</view>
				<view @click="gotomyDingdan(2)">
					<lx-icons type="present" size="25px" color="red"></lx-icons>
					<text>待收货</text>
				</view>
				<view @click="gotomyDingdan(3)">
					<lx-icons type="community" size="25px" color="red"></lx-icons>
					<text>待评价</text>
				</view>
			</view>

			<!-- 我的设置 -->
			<view class="setting-box">
				<view @click="gotoAddress">
					<text>
						<lx-icons type="location" size="25px" color="green"></lx-icons>
						<text>地址管理</text>
					</text>
					<text>&gt;</text>
				</view>
				<view @click="gotoMylike">
					<text>
						<uni-icons type="star-filled" color="deepskyblue" size="25"></uni-icons>
						<text>我的收藏</text>
					</text>
					<text>&gt;</text>
				</view>
				<view @click="gotoSet">
					<text>
						<lx-icons type="settings" size="25px" color="red"></lx-icons>
						<text>设置</text>
					</text>
					<text>&gt;</text>
				</view>
			</view>

			<!-- 退出登录 -->
			<view class="outLogin" @click="outLogin" v-show="isLogin">注销</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user_info: {
					name: '未登录，点击登录',
					image: '../../static/my/orry-lee-02-2s.jpg'
				},
				isLogin: false,
			}
		},
		onLoad() {
			// console.log(1);
			this.checkLogin();
		},
		onShow() {
			uni.startPullDownRefresh({

			})
		},
		onPullDownRefresh() {
			this.checkLogin();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 500);
		},
		methods: {
			checkLogin() {
				if (uni.getStorageSync('token')) {
					// console.log(1);
					this.$http.get('user.info').then(res => {
						// console.log(res);
						this.isLogin = true;
						this.user_info.name = res.data.nickname;
						this.user_info.image = res.data.avatar;
					})
				} else {
					this.isLogin = false;
					this.user_info.name = '未登录，点击登录';
					this.user_info.image = '../../static/my/orry-lee-02-2s.jpg';
				}

			},
			gotoLogin() {
				if (this.isLogin) {
					return;
				}
				uni.navigateTo({
					url: "../login/login"
				})
			},
			// 注销账号
			outLogin() {
				this.$http.post('logout').then(res => {
					// console.log(res);
					uni.removeStorageSync('token');
					this.$refs.lxmessage.show({
						type: 'success',
						msg: '账号注销成功',
						direction: 'top',
						time: 1000
					})
					uni.reLaunch({
						url: '../index/index'
					})
				})
			},
			//跳转到地址管理
			gotoAddress() {
				if (uni.getStorageSync('token')) {
					uni.navigateTo({
						url: '../address/address'
					})
				} else {
					this.$refs.lxmessage.show({
						type: 'warning',
						msg: '请先登录',
						direction: 'top',
						time: 1000
					})
					setTimeout(() => {
						uni.navigateTo({
							url: '../login/login'
						})
					},1000)
				}
			},
			//跳转到设置
			gotoSet() {
				if (uni.getStorageSync('token')) {
					uni.navigateTo({
						url: '../set/set'
					})
				} else {
					this.$refs.lxmessage.show({
						type: 'warning',
						msg: '请先登录',
						direction: 'top',
						time: 1000
					})
					setTimeout(() => {
						uni.navigateTo({
							url: '../login/login'
						})
					}, 500)
				}
			},
			//跳转到我的订单
			gotomyDingdan(index) {
				if (uni.getStorageSync('token')) {
					// console.log(index);
					uni.setStorageSync('dingdan-nav-index', index)
					uni.navigateTo({
						url: '../mydingdan/mydingdan'
					})
				} else {
					this.$refs.lxmessage.show({
						type: 'warning',
						msg: '您未登录，请先登录',
						direction: 'center',
						time: 1000
					})
					setTimeout(() => {
						uni.navigateTo({
							url: '../login/login'
						})
					}, 1000)
				}
			},
			//跳转到我的收藏
			gotoMylike() {
				if (uni.getStorageSync('token')) {
					uni.navigateTo({
						url: '../myFav/myFav'
					})
				} else {
					this.$refs.lxmessage.show({
						type: 'warning',
						msg: '您未登录，请先登录',
						direction: 'center',
						time: 1000
					})
					setTimeout(() => {
						uni.navigateTo({
							url: '../login/login'
						})
					}, 1000)
				}
			}
		}
	}
</script>

<style scoped>
	.my-box {
		width: 100%;
	}

	.my-info-box {
		width: 100%;
		overflow: hidden;
		background: url(../../static/my/wallhaven-6odlkq.png) no-repeat center 70%;
		background-size: 100vh;
		height: 25vh;
		position: relative;
	}

	.my-info-top {
		width: 90%;
		margin: 0 auto;
		margin-top: 70px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.my-info-top>image {
		width: 100px;
		height: 100px;
		overflow: hidden;
		border-radius: 50%;
	}

	.my-info-top text {
		width: 60%;
		font-size: 20px;
		color: white;
	}

	.manager-box,
	.setting-box {
		margin: 20px auto;
		width: 90%;
		background-color: white;
		border-radius: 5px;
		box-sizing: border-box;
		padding: 20px 15px;
		box-shadow: 0 0 10px 5px lightgray;
	}

	.manager-box {
		display: flex;
		justify-content: space-between;
	}

	.manager-box>view {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		font-size: 15px;
		height: 7vh;
	}

	.setting-box>view {
		line-height: 60px;
		display: flex;
		justify-content: space-between;
	}

	.setting-box>view:not(.setting-box>view:nth-of-type(3)) {
		border-bottom: 1px solid lightgray;
	}

	.setting-box>view>text:nth-of-type(2) {
		font-size: 20px;
	}

	.outLogin {
		border: 1px solid red;
		width: 90%;
		margin: 0 auto;
		line-height: 40px;
		text-align: center;
		border-radius: 5px;
		background-color: red;
		color: white;
		font-size: 19px;
	}
</style>
