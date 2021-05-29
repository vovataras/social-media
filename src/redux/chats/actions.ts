import action from '@redux/action'
import { AppThunk, Chat } from '@typings'
import ActionType from './types'

const setChats = (posts: Chat[]): AppThunk => (dispatch) =>
  dispatch(action(ActionType.SET_CHATS, posts))

const setChatsError = (error: string): AppThunk => (dispatch) =>
  dispatch(action(ActionType.SET_ERROR, error))

const resetChatsState = (): AppThunk => (dispatch) =>
  dispatch(action(ActionType.RESET_STATE))

export { setChats, setChatsError, resetChatsState }
