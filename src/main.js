import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store/index'
import { auth } from './plugins/firebase'

let app

Vue.config.productionTip = false

auth.onAuthStateChanged(firebaseUser => {
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
