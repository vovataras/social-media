import { Chat, ReduxAction } from '@typings'

enum ActionType {
  SET_CHATS = 'chats/SET_CHATS',
  SET_ERROR = 'chats/SET_ERROR',
  RESET_STATE = 'chats/RESET_STATE'
}

type SetChats = ReduxAction<ActionType.SET_CHATS, Chat[]>
type SetError = ReduxAction<ActionType.SET_ERROR, string>
type ResetState = ReduxAction<ActionType.RESET_STATE>

export type Action = SetChats | SetError | ResetState

export default ActionType
