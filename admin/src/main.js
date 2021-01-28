import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import http from "./http";

import './style.css'

Vue.config.productionTip = false;

//引用变量
//加载在vue实例属性上，相当于全局用this.$http去引用
Vue.prototype.$http = http;

new Vue({
  router,
  http,
  render: h => h(App)
}).$mount('#app');
