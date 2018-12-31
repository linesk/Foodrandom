import Vue from 'vue'
import Vuex from 'vuex'
import { actions } from './store/actions'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appTitle: 'Food Random app',
    user: null,
    userProfile: {},
    error: null,
    loading: false
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
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
    getError(state) {
      return state.error
    },
    getLoading(state) {
      return state.loading
    }
  },
  actions
})
