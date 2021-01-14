import Vue from 'vue'
import VueRouter from 'vue-router'
import Products from '../views/Products'
import Auth from '../views/Auth'

Vue.use(VueRouter)

const routes = [
  {
    path: '/products',
    component: Products
  },

  {
    path: '/login',
    component: Auth
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
