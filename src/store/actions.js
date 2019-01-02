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
        fb.userCollection
          .doc(firebaseUser.user.uid)
          .set({
            firstname: payload.firstname,
            lastname: payload.lastname
          })
          .then(() => {
            router.push('/home')
          })
          .catch(error => {
            commit('setError', error.message)
            commit('setLoading', false)
          })
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
      .then(() => {
        router.push('/home')
      })
      .catch(error => {
        commit('setError', error.message)
        commit('setLoading', false)
      })
  },
  autoSignIn({ commit, state }, payload) {
    commit('setUser', payload)
    if (state.user) {
      fb.userCollection
        .doc(state.user.uid)
        .get()
        .then(userdoc => {
          if (userdoc.exists) commit('setUserProfile', userdoc.data())
          commit('setLoading', false)
          commit('setError', null)
        })
    }
  },
  userSignOut({ commit }) {
    fb.auth.signOut()
    commit('setUserProfile', {})
    router.push('/signin')
  }
}
