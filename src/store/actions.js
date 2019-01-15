import router from '@/router'
import { userCollection, auth, googleprovider } from '@/plugins/firebase'

export default {
  setError({ commit }, payload) {
    commit('setError', payload)
  },
  // Authentication
  userSignUp({ commit }, payload) {
    commit('setLoading')
    auth
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(firebaseUser => {
        firebaseUser.user.sendEmailVerification()
        firebaseUser.user.updateProfile({
          displayName: payload.firstname + ' ' + payload.lastname
        })
        router.push('/home')
        commit('setPass')
      })
      .catch(error => {
        commit('setError', error.message)
      })
  },
  userSignIn({ commit }, payload) {
    commit('setLoading')
    auth
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(() => {
        router.push('/home')
        commit('setPass')
      })
      .catch(error => {
        commit('setError', error.message)
      })
  },
  socialSignIn({ commit }) {
    commit('setLoading')
    auth.signInWithRedirect(googleprovider)
    commit('setPass')
  },
  autoSignIn({ commit }, user) {
    var userprofile
    if (user) {
      userCollection
        .doc(user.uid)
        .get()
        .then(userdoc => {
          if (userdoc.exists) userprofile = userdoc.data()
          else userprofile = null
          commit({
            type: 'setUser',
            user,
            userprofile
          })
        })
    }
  },
  userSignOut({ commit }) {
    auth.signOut().then(() => {
      commit({
        type: 'setUser',
        user: null
      })
      router.push('/')
    })
  }
}
