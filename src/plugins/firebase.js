import Vue from 'vue'
import VueFire from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { firebaseConfig } from './config'

Vue.use(VueFire)
firebase.initializeApp(firebaseConfig)
const auth = firebase.auth()

const db = firebase.firestore()
db.settings({
  timestampsInSnapshots: true
})

export { db, auth }
