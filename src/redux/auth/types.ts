import { ReduxAction } from '@typings'

enum ActionType {
  SIGN_IN_BEGIN = 'auth/SIGN_IN_BEGIN',
  SIGN_IN_SUCCESS = 'auth/SIGN_IN_SUCCESS',
  SIGN_IN_ERROR = 'auth/SIGN_IN_ERROR',

  SIGN_UP_BEGIN = 'auth/SIGN_UP_BEGIN',
  SIGN_UP_SUCCESS = 'auth/SIGN_UP_SUCCESS',
  SIGN_UP_ERROR = 'auth/SIGN_UP_ERROR',

  SIGN_OUT_BEGIN = 'auth/SIGN_OUT_BEGIN',
  SIGN_OUT_SUCCESS = 'auth/SIGN_OUT_SUCCESS',
  SIGN_OUT_ERROR = 'auth/SIGN_OUT_ERROR'
}

type SignInBeginAction = ReduxAction<ActionType.SIGN_IN_BEGIN>
type SignInSuccessAction = ReduxAction<
  ActionType.SIGN_IN_SUCCESS,
  firebase.default.User
>
type SignInErrorAction = ReduxAction<ActionType.SIGN_IN_ERROR, string>

type SignUpBeginAction = ReduxAction<ActionType.SIGN_UP_BEGIN>
type SignUpSuccessAction = ReduxAction<
  ActionType.SIGN_UP_SUCCESS,
  firebase.default.User
>
type SignUpErrorAction = ReduxAction<ActionType.SIGN_UP_ERROR, string>

type SignOutBeginAction = ReduxAction<ActionType.SIGN_OUT_BEGIN>
type SignOutSuccessAction = ReduxAction<ActionType.SIGN_OUT_SUCCESS>
type SignOutErrorAction = ReduxAction<ActionType.SIGN_OUT_ERROR, string>

export type Action =
  | SignInBeginAction
  | SignInSuccessAction
  | SignInErrorAction
  | SignUpBeginAction
  | SignUpSuccessAction
  | SignUpErrorAction
  | SignOutBeginAction
  | SignOutSuccessAction
  | SignOutErrorAction

export default ActionType
