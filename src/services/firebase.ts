import firebaseApp from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import { firebaseConfig } from '@config'

if (!firebaseApp.apps.length) {
  try {
    firebaseApp.initializeApp(firebaseConfig)
  } catch (err) {
    console.log(err)
  }
}

export const firebaseAuth = firebaseApp.auth()
export const firestore = firebaseApp.firestore()
export const storage = firebaseApp.storage()

export default firebaseApp
