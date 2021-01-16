import Vue from 'vue'
import VueRouter from 'vue-router'
import Products from '../views/Products'
import Auth from '../views/Auth'
import Modal from '../components/Modal'

Vue.use(VueRouter)

const routes = [
  {
    path: '/products',
    component: Products,
    children: [
      {
        path: 'add',
        component: Modal
      }
    ]
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
