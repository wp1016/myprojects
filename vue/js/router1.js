import Vue from 'vue.js';
import VueRouter from 'vue-router.js';
import axios from 'axios.min.js';

import App from './App';
import Home from './components/Home';

Vue.use(VueRouter);
Vue.use(axios);

var routes=[{
    path:'/',
    component:Home
},{
    path:'/home',
    component:Home
}];
var router=new VueRouter({
    routes
})
new Vue({
    el:'#app',
    router,
    ...App
}).$mount('#app')