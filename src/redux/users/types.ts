import { User } from '@typings'

enum ActionType {
  SET_USERS = 'users/SET_USERS',
  SET_ERROR = 'users/SET_ERROR',
  RESET_STATE = 'users/RESET_STATE'
}

type SetUsers = {
  type: typeof ActionType.SET_USERS
  users: User[]
}

type SetError = {
  type: typeof ActionType.SET_ERROR
  error: string
}

type ResetState = {
  type: typeof ActionType.RESET_STATE
}

export type Action = SetUsers | SetError | ResetState

export default ActionType
