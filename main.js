import Vue from 'vue';
import App from './App';
//引入vuex
import store from './store/index.js';
import {HttpWidget} from '@/common/request/index.js';
import message from '@/components/quick-message/quick-message.vue'
import Icons from '@/components/lz-icons/icons.vue';
// import Dialog from '@/components/luanqing-inputdialog/luanqing-inputdialog.vue';
//引入自己的组件
//对话框
import lxDialog from '@/components/lx-dialog/lx-dialog.vue';
//标签导航
import lxNav from '@/components/lx-Tagnav/lx-Tagnav.vue';
// import changeAddress from '@/components/Winglau14-lotusAddress/Winglau14-lotusAddress.vue';


Vue.component('lx-message',message);
Vue.component('lx-icons',Icons);
Vue.component('lx-dialog',lxDialog);
Vue.component('lx-nav',lxNav);
// Vue.component('lx-address',changeAddress)

Vue.use(new HttpWidget());
// console.log(HttpWidget)

//把vuex定义成全局组件
Vue.prototype.$store = store;
Vue.config.productionTip = false;

App.mpType = 'app';

const app = new Vue({
    ...App,
	store
})
app.$mount()
