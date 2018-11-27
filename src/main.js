import Vue from 'vue';
import App from './App.vue';
import BootstrapVue from 'bootstrap-vue';
import MainCSS from './assets/MainCSS.css';
import VueRouter from 'vue-router';
import { routes } from './routes'
import axios from 'axios';
import store  from './State/store.js';
// import AnimatedVue from 'animated-vue'
 


Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(MainCSS);


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

axios.defaults.baseURL = "http://localhost:8081";

const router = new VueRouter({
  mode: 'history',
  routes
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
