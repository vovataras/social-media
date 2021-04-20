import firebaseApp from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { firebaseConfig } from '@config'

if (!firebaseApp.apps.length) {
  try {
    firebaseApp.initializeApp(firebaseConfig)
  } catch (err) {
    console.log(err)
  }
}

export const firebaseAuth = firebaseApp.auth()

export default firebaseApp
