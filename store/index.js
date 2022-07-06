import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
	state:{
		cartList:[]//购物车商品 打开创建订单页面进行更新 用于订单页面判断是否选中 
	},
	mutations:{
		SAVECART:(state,payload)=>{
			state.cartList = payload;
		}
	},
	actions:{
		saveCart:({commit},payload)=>{
			return new Promise((resolve,reject)=>{
				commit('SAVECART',payload);
				resolve(payload);
			})
		}
	}
})

export default store;