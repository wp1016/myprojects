// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'

Vue.use(VueAwesomeSwiper);
Vue.use(VueRouter)
Vue.config.productionTip = false
const router=new VueRouter({
  routes:routes
})
/* eslint-disable no-new */
new Vue({
  router,
}).$mount('#app')
