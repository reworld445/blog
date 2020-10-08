import Vue from 'vue'
import Router from 'vue-router'
import home from '../page/home.vue'
import categorise from '../page/categories.vue'
import search from '../page/search.vue'
import vue from '../components/vue/vue.vue'
import html from '../components/html/html.vue'
import javascript from '../components/javascript/javascript.vue'
import blog from '../page/blog.vue'
import tag from '../page/tag.vue'
import vuetag from '../components/vue/vuetag.vue'
import htmltag from '../components/html/htmltag.vue'
import javascripttag from '../components/javascript/javascripttag.vue'

//导入
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'



Vue.use(Router)

const router =  new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
    },
    {
      path: '/categories',
      name: 'categories',
      component: categorise,
      children: [
        { path: 'VUE', name: 'VUE', component: vue},
        { path: 'HTML', name: 'HTML', component: html },
        { path: 'javascript', name: 'javascript', component: javascript }
      ]
    },
    {
      path:'/search',
      name:'search',
      component:search
    },
    {
      path: '/blog',
      name: 'blog',
      component: blog
    },
    {
      path:'/tag',
      name:'tag',
      component:tag,
      children:[
        { path: 'VUE', name: 'vue', component: vuetag},
        { path: 'HTML', name: 'html', component: htmltag },
        { path: 'javascript', name: 'javascript', component: javascripttag }
      ]
    }
  ],
})

// router.beforeEach(transition => {
//   NProgress.start();
// });

// router.afterEach((to,from,next) => {
//   NProgress.done();
//   window.scrollTo(0,0);
// })

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})


export default router
