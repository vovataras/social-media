import { toast } from 'react-toastify'
import action from '@redux/action'
import { firebaseAuth } from '@services/firebase'
import { createUser } from '@services/auth'
import { AppThunk } from '@typings'
import ActionType from './types'

const signIn = (
  email: string,
  password: string,
  onSuccess?: (user: firebase.default.User) => void,
  onError?: (error: string) => void
): AppThunk => async (dispatch) => {
  dispatch(action(ActionType.SIGN_IN_BEGIN))

  try {
    const response = await firebaseAuth.signInWithEmailAndPassword(
      email,
      password
    )

    onSuccess?.(response.user)
    dispatch(action(ActionType.SIGN_IN_SUCCESS, response.user))
    toast('Successfully logged in', { type: 'success' })
  } catch (error) {
    dispatch(action(ActionType.SIGN_IN_ERROR, error.message))
    toast(error.message, { type: 'error' })
    onError?.(error)
  }
}

const signUp = (
  username: string,
  email: string,
  password: string,
  onSuccess?: (user: firebase.default.User) => void,
  onError?: (error: string) => void
): AppThunk => async (dispatch) => {
  dispatch(action(ActionType.SIGN_UP_BEGIN))

  try {
    const response = await createUser(username, email, password)

    onSuccess?.(response.user)
    dispatch(action(ActionType.SIGN_UP_SUCCESS, response.user))
    toast('You have successfully registered', { type: 'success' })
  } catch (error) {
    dispatch(action(ActionType.SIGN_UP_ERROR, error.message))
    toast(error.message, { type: 'error' })
    onError?.(error)
  }
}

const signOut = (): AppThunk => async (dispatch) => {
  dispatch(action(ActionType.SIGN_OUT_BEGIN))

  try {
    await firebaseAuth.signOut()

    dispatch(action(ActionType.SIGN_OUT_SUCCESS))
  } catch (error) {
    dispatch(action(ActionType.SIGN_OUT_ERROR, error.message))
    toast(error.message, { type: 'error' })
  }
}

const verifyAuth = (user: firebase.default.User | null): AppThunk => (
  dispatch
) => {
  if (user) {
    dispatch(action(ActionType.SIGN_IN_SUCCESS, user))
  } else {
    dispatch(action(ActionType.SIGN_OUT_SUCCESS))
  }
}

export { verifyAuth, signIn, signUp, signOut }

const authActions = {
  verifyAuth,
  signIn,
  signUp,
  signOut
}

export default authActions
