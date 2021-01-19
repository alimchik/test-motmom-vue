import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'
import List from '../views/products/List'
import Auth from '../views/Auth'
import New from '../views/products/New'
import Edit from '../views/products/Edit'

Vue.use(VueRouter)

const routes = [
  {
    path: '/products',
    component: List,
    children: [
      {
        path: 'new',
        name: 'product-new',
        component: New
      },
      {
        path: ':id/edit',
        name: 'product-edit',
        component: Edit
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
