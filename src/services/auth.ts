import { firebaseAuth } from './firebase'
import { usersCollection } from './database'

export const createUser = async (
  username: string,
  email: string,
  password: string
) => {
  const user = await firebaseAuth.createUserWithEmailAndPassword(
    email,
    password
  )

  await usersCollection.create({
    uid: user.user?.uid || '',
    username: username
  })

  return user
}
