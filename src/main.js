import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './VueComponent.js'
import directiveObj from './utils/directive'

Vue.use(directiveObj)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
