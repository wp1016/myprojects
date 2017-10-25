// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import routes from './router'
import VueRouter from 'vue-router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(MintUI);
Vue.use(VueRouter);
const router=new VueRouter({
  routes
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
}).$mount('#app')
