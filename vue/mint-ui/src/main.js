// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import routes from './router'
import MintUi from 'mint-ui'
import 'mint-ui/lib/style.css'


Vue.use(VueRouter);
Vue.use(MintUi);
Vue.config.productionTip = false

const router= new VueRouter({
  routes
})
/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
