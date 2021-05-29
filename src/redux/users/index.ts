import { User } from '@typings'
import ActionType, { Action } from './types'

interface UsersState {
  isLoaded: boolean
  items: User[]
  error: null | string
}

const initialState: UsersState = {
  isLoaded: false,
  items: [],
  error: null
}

const usersReducer = (state = initialState, action: Action): UsersState => {
  switch (action.type) {
    case ActionType.SET_USERS:
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

export default usersReducer
