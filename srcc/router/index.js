import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index/index'
import CommonLayout from '@/components/commonLayout'
import Blog from '@/pages/Blog/blog'
import Home from '@/pages/Home/home'
import About from '@/pages/About/about'
import Signin from '@/pages/Signin/signin'
import Admin from '@/pages/Admin/admin'
import Studylog from '@/pages/Studylog/studylog'
import StudylogDetail from '@/pages/Studylog/studyDetail'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/home',
      name: 'commonLayout',
      component: CommonLayout,
      children: [
        {
          path: '/home',
          name: 'home',
          component: Home
        },
        {
          path: '/blog',
          name: 'blog',
          component: Blog
        },
        {
          path: '/studylog',
          name: 'studylog',
          component: Studylog,
        },
        {
          path: '/about',
          name: 'about',
          component: About
        }
      ]
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    },
    {
      path: '/studylogDetail',
      name: 'studylogDetail',
      component: StudylogDetail
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
