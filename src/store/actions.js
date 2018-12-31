import router from '@/router'
const fb = require('../plugins/firebase.js')

export const actions = {
  setError({ commit }, payload) {
    commit('setError', payload)
  },
  // Authentication
  userSignUp({ commit }, payload) {
    commit('setLoading', true)
    fb.auth
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(firebaseUser => {
        commit('setUser', firebaseUser)
        commit('setError', null)
        commit('setLoading', false)
      })
      .catch(error => {
        commit('setError', error.message)
        commit('setLoading', false)
      })
  },
  userSignIn({ commit }, payload) {
    commit('setLoading', true)
    fb.auth
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
    fb.auth.signOut()
    commit('setUser', null)
    router.push('/signin')
  }
}
