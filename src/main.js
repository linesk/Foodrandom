import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
const firebase = require('./plugins/firebase.js')

let app

Vue.config.productionTip = false

firebase.auth.onAuthStateChanged(firebaseUser => {
  if (!app) {
    new Vue({
      router,
      store,
      render: h => h(App),
      created() {
        store.dispatch('autoSignIn', firebaseUser)
      }
    }).$mount('#app')
  }
})
