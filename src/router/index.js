import Vue from 'vue'
import VueRouter from 'vue-router'
import { axios } from 'vue/types/umd'
import dashboard from '../components/dashboard.vue'
import login from '../components/auth/login.vue'
import { url } from '../store/url'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path:'/dashboard',
    name:'dashboard',
    component: dashboard,
    beforeEnter: async (to, from , next) =>{
      const ACCESS_TOKEN = localStorage.getItem('access_token');
      const LOGIN_STATUS = localStorage.getItem('loginStatus');

      if(ACCESS_TOKEN && ACCESS_TOKEN.length > 0 && LOGIN_STATUS){
        try{
          let result = await axios.get(`${url}/admin/profile`,{headers:{'Authorization': `Bearer ${ACCESS_TOKEN}`}})

          if(result.data.success && result.data.data.role_name == 3){
            if(ACCESS_TOKEN && LOGIN_STATUS){
              return (next(true))
            }
          }else{
            localStorage.removeItem('access_token')
            localStorage.removeItem('loginStatus')
            return next('/login')
          }
        }
        catch(err){
          if(err.response){
            localStorage.removeItem('access_token')
            localStorage.removeItem('loginStatus')
            return next('/login')
          }
        }
      }
      else{
        return next('/login')
      }
    }
  },

  {
    path: '/login',
    name: 'login',
    component: login,
    beforeEnter: (to, from, next) => {
      const ACCESS_TOKEN = localStorage.getItem('access_token') ?? '';
      const LOGIN_STATUS = localStorage.getItem('loginStatus') ?? '';
      if (ACCESS_TOKEN.length <= 0 && LOGIN_STATUS == false) { return next(true) }
      return next('/dashboard')

  }
},

  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
