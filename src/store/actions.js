import router from '@/router'
const firebase = require('../plugins/firebase.js')

export default {
  setError({ commit }, payload) {
    commit('setError', payload)
  },
  // Authentication
  userSignUp({ commit }, payload) {
    commit('setLoading', true)
    firebase.auth
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(firebaseUser => {
        firebaseUser.user.sendEmailVerification()
        firebaseUser.user.updateProfile({
          displayName: payload.firstname + ' ' + payload.lastname
        })
        firebase.userCollection.doc(firebaseUser.user.uid).set({
          firstname: payload.firstname,
          lastname: payload.lastname
        })
        router.push('/home')
        commit('setLoading', false)
        commit('setError', null)
      })
      .catch(error => {
        commit('setError', error.message)
        commit('setLoading', false)
      })
  },
  userSignIn({ commit }, payload) {
    commit('setLoading', true)
    firebase.auth
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(() => {
        router.push('/home')
        commit('setLoading', false)
        commit('setError', null)
      })
      .catch(error => {
        commit('setError', error.message)
        commit('setLoading', false)
      })
  },
  autoSignIn({ commit }, payload) {
    commit('setLoading', true)
    commit('setUser', payload)
    if (payload) {
      firebase.userCollection
        .doc(payload.uid)
        .get()
        .then(userdoc => {
          if (userdoc.exists) commit('setUserProfile', userdoc.data())
          commit('setLoading', false)
        })
    } else {
      commit('setUserProfile', {})
      commit('setLoading', false)
    }
  },
  userSignOut({ commit }) {
    commit('setLoading', true)
    firebase.auth.signOut()
    router.push('/signin')
    commit('setLoading', false)
    commit('setError', null)
  }
}
