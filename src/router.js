import Vue from 'vue'
import Router from 'vue-router'
const firebase = require('./plugins/firebase.js')

const routerOptions = [
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/',
    component: 'Landing'
  },
  {
    path: '/signin',
    component: 'SignIn'
  },
  {
    path: '/signup',
    component: 'SignUp'
  },
  {
    path: '/about',
    component: 'About'
  },
  {
    path: '/home',
    component: 'Home',
    meta: {
      requiresAuth: true
    }
  }
]

const routes = routerOptions.map(route => {
  return {
    ...route,
    component: () => import(`./views/${route.component}.vue`),
    meta: route.meta
  }
})

Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !firebase.auth.currentUser) next('/signin')
  else next()
})

export default router
