import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appTitle: 'Bridge Club MDKKU',
    user: null,
    userProfile: {},
    error: null,
    loading: false
  },
  mutations: {
    setUser(state, payload) {
      if (payload == null) state.user = null
      else
        state.user = {
          displayName: payload.displayName,
          email: payload.email,
          emailVerified: payload.emailVerified,
          photoURL: payload.photoURL,
          isAnonymous: payload.isAnonymous,
          uid: payload.uid,
          providerData: payload.providerData
        }
    },
    setUserProfile(state, payload) {
      state.userProfile = payload
    },
    setError(state, payload) {
      state.error = payload
    },
    setLoading(state, payload) {
      state.loading = payload
    }
  },
  getters: {
    appTitle(state) {
      return state.appName
    },
    getUser(state) {
      return state.user
    },
    getUserProfile(state) {
      return state.userProfile
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
