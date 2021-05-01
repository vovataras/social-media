import action from '@redux/action'
import { AppThunk, User } from '@typings'
import ActionType from './types'

const setUsers = (users: User[]): AppThunk => (dispatch) =>
  dispatch(action(ActionType.SET_USERS, users))

const setUsersError = (error: string): AppThunk => (dispatch) =>
  dispatch(action(ActionType.SET_ERROR, error))

const resetUsersState = (): AppThunk => (dispatch) =>
  dispatch(action(ActionType.RESET_STATE))

export { setUsers, setUsersError, resetUsersState }
