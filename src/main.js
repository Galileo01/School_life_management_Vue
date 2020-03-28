import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import BreadNav from 'components/com/BreadNav'
Vue.config.productionTip = false

Vue.component('BreadNav',BreadNav)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
