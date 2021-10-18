import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Usersearch from '../views/UserSearch.vue'
import Authorsearch from '../views/AuthorSearch.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/usersearch',
    component: Usersearch
  },
  {
    path: '/authorsearch',
    component: Authorsearch
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
