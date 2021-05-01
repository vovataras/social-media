import { ReduxAction, User } from '@typings'

enum ActionType {
  SET_USERS = 'users/SET_USERS',
  SET_ERROR = 'users/SET_ERROR',
  RESET_STATE = 'users/RESET_STATE'
}

type SetUsers = ReduxAction<ActionType.SET_USERS, User[]>
type SetError = ReduxAction<ActionType.SET_ERROR, string>
type ResetState = ReduxAction<ActionType.RESET_STATE>

export type Action = SetUsers | SetError | ResetState

export default ActionType
