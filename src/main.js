import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import './style/element-variables.scss'
import './assets/icon/iconfont.css'
import animated from 'animate.css'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(animated)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
