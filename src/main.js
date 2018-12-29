import Vue from 'vue'
import './plugins/vuetify'
import './plugins/firebase'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'

let app = ''

Vue.config.productionTip = false

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
