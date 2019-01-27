import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appTitle: 'Bridge Club MDKKU',
    user: {
      displayName: null,
      email: null,
      emailVerified: null,
      photoURL: null,
      isAnonymous: null,
      uid: null,
      providerData: null,
      userProfile: null
    },
    error: null,
    loading: false
  },
  mutations: {
    setUser(state, payload) {
      if (!payload.user) {
        state.user = {
          displayName: null,
          email: null,
          emailVerified: null,
          photoURL: null,
          isAnonymous: null,
          uid: null,
          providerData: null,
          userProfile: null
        }
      } else {
        state.user = {
          displayName: payload.user.displayName,
          email: payload.user.email,
          emailVerified: payload.user.emailVerified,
          photoURL: payload.user.photoURL,
          isAnonymous: payload.user.isAnonymous,
          uid: payload.user.uid,
          providerData: payload.user.providerData,
          userProfile: payload.userprofile
        }
      }
    },
    setError(state, payload) {
      state.error = payload
      state.loading = false
    },
    setPass(state) {
      state.error = null
      state.loading = false
    },
    setLoading(state) {
      state.loading = true
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
  },
  actions
})
