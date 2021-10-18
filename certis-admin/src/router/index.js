import Vue from 'vue'
import VueRouter from 'vue-router'
import Author from '../views/Author.vue'
import Admin from '../views/Admin.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Author
  },
  {
    path: '/admin',
    component: Admin
  },
  {
    path: '/login',
    component: Login
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
