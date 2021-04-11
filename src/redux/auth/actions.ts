import { AppThunk } from '@typings'
import ActionType from './types'
import action from '@redux/action'
import { firebaseAuth } from '@services/firebase'
import { toast } from 'react-toastify'

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
  } catch (error) {
    dispatch(action(ActionType.SIGN_IN_ERROR, error.message))
    toast(error.message, { type: 'error' })
    onError?.(error)
  }
}

const signOut = (
  onSuccess?: () => void,
  onError?: (error: string) => void
): AppThunk => async (dispatch) => {
  dispatch(action(ActionType.SIGN_OUT_BEGIN))

  try {
    await firebaseAuth.signOut()

    onSuccess?.()
    dispatch(action(ActionType.SIGN_OUT_SUCCESS))
  } catch (error) {
    dispatch(action(ActionType.SIGN_OUT_ERROR, error.message))
    toast(error.message, { type: 'error' })
    onError?.(error)
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

const authActions = {
  verifyAuth,
  signIn,
  signOut
}

export default authActions
