// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import less from 'less'
import 'jquery'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import VueScroller from "vue-scroller"
import elTableInfiniteScroll from
  'el-table-infinite-scroll';

import VueAwesomeSwiper from 'vue-awesome-swiper'

import 'swiper/swiper-bundle.css'

Vue.use(VueAwesomeSwiper, /* { default options with global component } */)

Vue.use(elTableInfiniteScroll);
Vue.use(VueScroller);
Vue.use(less)
Vue.use(ElementUI)
Vue.use(mavonEditor)
import { checksign } from "@/api";
import { getCookie } from "@/utils";
// import { checkSign } from "#/js/public";

import { Pagination, Swipe, SwipeItem, Lazyload, Loading, Empty } from "vant";
Vue.use(Empty);
Vue.use(Loading);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Pagination);
Vue.use(Lazyload);
Vue.config.productionTip = false

import Router from 'vue-router'
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
  methods: {
    async checkSign() {
      let user_name = localStorage.getItem("u_n");
      let token = getCookie("_t");
      let res = await checksign({ username: user_name, token: token })
      // console.log(res)
      if (res.data.status == 0) {
        this.$store.commit("changeIsSignIn", 0);
        deleteCookie("_t")
        localStorage.clear();
      } else {
        this.$store.commit("changeIsSignIn", 1);
      }
    }
  },
  mounted() {
    this.checkSign()
  }
  // mounted() {
  //   if(document.body.clientWidth<787){
  //     window.location.href='https://www.bilibili.com/'
  //   }
  //   window.addEventListener('resize',()=>{
  //     if(document.body.clientWidth<787){
  //       window.location.href='https://www.bilibili.com/'
  //     }
  //   })
  // }
})
