import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'
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
      },
      {
        path: ':id/edit',
        component: Modal
      }
    ],
    meta: {
      requiresAuth: true
    }
  },

  {
    path: '/login',
    component: Auth
  },

  {
    path: '/registration',
    component: Auth
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    if (store.getters.isLoggedIn) {
      next('products')
      return
    } else {
      if (to.path !== '/login' && to.path !== '/registration') {
        next('/login')
      }
    }
    next()
  }
})

export default router
