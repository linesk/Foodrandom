import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

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
  const user = firebase.auth().currentUser

  if (requiresAuth && !user) next('/signin')
  else if (!requiresAuth && user) next('/home')
  else next()
})

export default router
