import Vue from 'vue'
import VueFire from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { firebaseConfig } from './config'

Vue.use(VueFire)
firebase.initializeApp(firebaseConfig)

// Auth
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()
const user = firebase.auth().currentUser

// Firestore
const db = firebase.firestore()
db.settings({
  timestampsInSnapshots: true
})
const userCollection = db.collection('users')

export { db, userCollection, auth, provider, user }
