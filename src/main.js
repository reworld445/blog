// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUi from 'Element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'vant/lib/index.css'
import mavonEditor from 'mavon-editor'
import less from 'less'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'




Vue.use(less)
Vue.config.productionTip = false
Vue.use(ElementUi)
Vue.use(mavonEditor)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  less,
  components: { App },
  template: '<App/>'
})
