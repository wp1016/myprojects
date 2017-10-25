// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Router from 'vue-router'
import routes from './router'

Vue.use(Router)
Vue.config.productionTip = false
const router=new Router({
  routes:routes
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
}).$mount('#app')
