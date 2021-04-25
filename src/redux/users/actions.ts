import { User } from '@typings'
import ActionType, { Action } from './types'

export const setUsers = (users: User[]): Action => ({
  type: ActionType.SET_USERS,
  users
})

export const setUsersError = (error: string): Action => ({
  type: ActionType.SET_ERROR,
  error
})

export const resetUsersState = (): Action => ({
  type: ActionType.RESET_STATE
})
