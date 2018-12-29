import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appTitle: 'Food Random app',
    user: null,
    error: null,
    loading: false
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    },
    setError(state, payload) {
      state.error = payload
    },
    setLoading(state, payload) {
      state.loading = payload
    }
  },
  actions: {
    userSignUp({ commit }, payload) {
      commit('setLoading', true)
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(firebaseUser => {
          commit('setUser', firebaseUser)
          commit('setLoading', false)
          router.push('/')
        })
        .catch(error => {
          commit('setError', error.message)
          commit('setLoading', false)
        })
    },
    userSignIn({ commit }, payload) {
      commit('setLoading', true)
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(firebaseUser => {
          commit('setUser', firebaseUser)
          commit('setLoading', false)
          commit('setError', null)
          router.push('/home')
        })
        .catch(error => {
          commit('setError', error.message)
          commit('setLoading', false)
        })
    },
    autoSignIn({ commit }, payload) {
      commit('setUser', payload)
    },
    userSignOut({ commit }) {
      firebase.auth().signOut()
      commit('setUser', null)
      router.push('/signin')
    }
  },
  getters: {
    appTitle(state) {
      return state.appName
    },
    getUser(state) {
      return state.user
    },
    getError(state) {
      return state.error
    },
    getLoading(state) {
      return state.loading
    }
  }
})
