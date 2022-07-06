<template>
	<view class="box">
		<lx-message ref="lxmessage"></lx-message>
		<view class="login-box">
			<view class="login-title">欢迎回来！</view>
			<view class="login-methods">
				<text @click="loginMethods(0)">账号密码登录</text>
				<text @click="loginMethods(1)">短信验证码登录</text>
			</view>
			<view class="form" v-show="login_method">
				<view>
					<label for="">账户</label>
					<input type="text" v-model="user.username" placeholder="请输入用户名/手机号码" placeholder-class="pla-tips">
				</view>
				<view>
					<label for="">密码</label>
					<input type="password" v-model="user.password" placeholder="8-18位不含特殊字符的数字" placeholder-class="pla-tips">
				</view>
			</view>
			<view class="form" v-show="!login_method">
				<view>
					<label for="">手机号</label>
					<input type="text" v-model="user.username" placeholder="请输入手机号码" placeholder-class="pla-tips">
				</view>
				<view>
					<label for="">验证码</label>
					<text class="yzmbtn">获取验证码</text>
					<input type="text" v-model="user.password" placeholder="请输入验证码" placeholder-class="pla-tips">
				</view>
			</view>
			<view class="login-btn" @click="userLogin">登录</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				user:{
					username:"",
					password:"",
					loginWay:0
				},
				login_method:true
			}
		},
		onLoad() {
			
		},
		methods:{
			loginMethods(id){
				if(id == 0){
					this.user.loginWay = 0;
					this.login_method = true;
				}else if(id == 1){
					this.user.loginWay = 1;
					this.login_method = false;
				}
			},
			userLogin(){
				// console.log({...this.user});
				this.$http.post('login',{...this.user}).then(res=>{
					// console.log(res);
					uni.setStorageSync('token',res.data.token);
					this.$refs.lxmessage.show({
						type:'success',
						msg:'登录成功',
						direction:'top',
						time:1000
					})
					setTimeout(()=>{
						uni.reLaunch({
							url:'../my/my'
						})
					},1000);
					
				}).catch(err=>{
					this.$refs.lxmessage.show({
						type:'error',
						msg:'请检查账号密码是否正确',
						direction:'top',
						time:1000
					})
				})
			}
		}
	}
</script>

<style scoped>
	.box{
		width: 100%;
		height: 810px;
		background: url(../../static/my/wallhaven-9mdoxk.jpg) no-repeat center center;
		background-size: auto 100%;
	}
	.login-box{
		/* border: 1px solid red; */
		position: absolute;
		top: 12vh;
		width: 100%;
		box-sizing: border-box;
		padding: 0 5vw;
	}
	.login-title{
		font-weight: bold;
		font-size: 30px;
	}
	.login-methods{
		display: flex;
		justify-content: space-evenly;
		margin: 20px 0;
	}
	.login-methods>text{
		box-sizing: border-box;
		padding: 10px 10px;
		border-radius: 10px;
		background: rgba(0,122,255,0.8);
		color: white;
	}
	.form{
		/* border: 1px solid red; */
		font-size: 20px;
		font-weight: bold;
	}
	.form view{
		/* border: 1px solid red; */
		background: rgba(1,1,1,0.1);
		line-height: 40px;
		box-sizing: border-box;
		padding: 0 2vw;
		position: relative;
	}
	.form view input{
		box-sizing: border-box;
		padding: 0 10px;
	}
	.pla-tips{
		color: white;
		font-weight: 100;
	}
	.yzmbtn{
		font-weight: 100;
		background: rgba(0,122,255,0.7);
		color: white;
		box-sizing: border-box;
		padding: 0px 10px;
		border-radius: 10px;
		font-size: 14px;
		position: absolute;
		right: 0;
		top: 14px;
	}
	.login-btn{
		width: 100%;
		/* border: 1px solid red; */
		margin: 40px auto;
		text-align: center;
		line-height: 40px;
		font-size: 18px;
		color: white;
		background: rgba(0,122,255,0.9);
		border-radius: 10px;
	}
</style>
