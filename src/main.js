import Vue from 'vue'
import VueRouter from "vue-router"
import App from './App.vue'
import './quasar'

// router setup
import routes from './configs/router'
//store setup
import store from './configs/store'

//import './scss/print.min.css'
import print from 'print-js'
//import print from './configs/print.min'

// configure router
const router = new VueRouter({
  //mode: 'history',
  //history: true,
  //root: "/",
  routes, // short for routes: routes
});

Vue.use(VueRouter);

import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/es'
import 'element-ui/lib/theme-chalk/display.css';
//import 'element-ui/lib/theme-chalk/index.css';
import './scss/main.scss'
Vue.use(ElementUI, { locale })

import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)

// Importamos JQuery
const $ = require('jquery')
// Lo declaramos globalmente
window.$ = $

Vue.config.productionTip = false

new Vue({
  el: "#app",
  render: h => h(App),
  router,
  store,
})//.$mount('#app')
