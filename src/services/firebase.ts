import firebaseApp from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { firebaseConfig } from '@config'

firebaseApp.initializeApp(firebaseConfig)

export const firebaseAuth = firebaseApp.auth()

export default firebaseApp
