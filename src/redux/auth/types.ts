import { ReduxAction } from '@typings'

enum ActionType {
  SIGN_IN_BEGIN = 'auth/SIGN_IN_BEGIN',
  SIGN_IN_SUCCESS = 'auth/SIGN_IN_SUCCESS',
  SIGN_IN_ERROR = 'auth/SIGN_IN_ERROR',

  SIGN_OUT_BEGIN = 'auth/SIGN_OUT_BEGIN',
  SIGN_OUT_SUCCESS = 'auth/SIGN_OUT_SUCCESS',
  SIGN_OUT_ERROR = 'auth/SIGN_OUT_ERROR'
}

type LoginBeginAction = ReduxAction<ActionType.SIGN_IN_BEGIN>
type LoginSuccessAction = ReduxAction<
  ActionType.SIGN_IN_SUCCESS,
  firebase.default.User
>
type LoginErrorAction = ReduxAction<ActionType.SIGN_IN_ERROR, string>

type LogoutBeginAction = ReduxAction<ActionType.SIGN_OUT_BEGIN>
type LogoutSuccessAction = ReduxAction<ActionType.SIGN_OUT_SUCCESS>
type LogoutErrorAction = ReduxAction<ActionType.SIGN_OUT_ERROR, string>

export type Action =
  | LoginBeginAction
  | LoginSuccessAction
  | LoginErrorAction
  | LogoutBeginAction
  | LogoutSuccessAction
  | LogoutErrorAction

export default ActionType
