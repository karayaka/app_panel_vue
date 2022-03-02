import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/core/Home.vue'
import Login from '../views/core/Login.vue'
import PanelDashbord from'../views/core/PanelDashbord.vue'
import Levels from '../views/quizerapp/Levels/Levels.vue'
import Topics from '../views/quizerapp/Topics/Topics.vue'
import Tests from '../views/quizerapp/Tests/Tests.vue'
import Questions from '../views/quizerapp/Questions/Questions.vue'
import LandingPage from '../views/landing_page/LandingPage.vue'
import AppPanel from '../views/panel_app/PanelAppList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/main',
    name: 'Main',
    component: Home,
    children:[
      {
        path:'/',
        name:'paneldashbord',
        component:PanelDashbord,
      },
      {
        path:'app-panel',
        name:'AppPanel',
        component:AppPanel,
      },
      {
        path:'levels',
        name:'levels',
        component:Levels,                  
      },
      {
        path:'topics',
        name:'topics',
        component:Topics,                  
      },
      {
        path:'tests',
        name:'tests',
        component:Tests,                  
      },
      {
        path:'questions:id',
        name:'questions',
        component:Questions,                  
      },
    ],
    
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'laindingPage',
    component: LandingPage
  },
  
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = [
    '/login',
    '/',
  ];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('login-user');

  if (authRequired && !loggedIn) {
    return next('/login');
  }
  next();
})

export default router
