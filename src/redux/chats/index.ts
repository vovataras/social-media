import { Chat } from '@typings'
import ActionType, { Action } from './types'

interface ChatsState {
  isLoaded: boolean
  items: Chat[]
  error: null | string
}

const initialState: ChatsState = {
  isLoaded: false,
  items: [],
  error: null
}

const chatsReducer = (state = initialState, action: Action): ChatsState => {
  switch (action.type) {
    case ActionType.SET_CHATS:
      return {
        ...state,
        error: null,
        isLoaded: true,
        items: action.payload
      }
    case ActionType.SET_ERROR:
      return {
        ...state,
        isLoaded: true,
        error: action.payload
      }
    case ActionType.RESET_STATE:
      return {
        ...state,
        ...initialState
      }
    default:
      return state
  }
}

export default chatsReducer
