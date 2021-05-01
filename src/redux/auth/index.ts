import ActionType, { Action } from './types'

export interface AuthState {
  isLoading: boolean
  user: firebase.default.User | null
  error: string | null
}

const initialState: AuthState = {
  isLoading: false,
  user: null,
  error: null
}

const authReducer = (state = initialState, action: Action): AuthState => {
  switch (action.type) {
    case ActionType.SIGN_IN_BEGIN:
    case ActionType.SIGN_UP_BEGIN:
    case ActionType.SIGN_OUT_BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null
      }
    case ActionType.SIGN_IN_SUCCESS:
    case ActionType.SIGN_UP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        error: null
      }
    case ActionType.SIGN_OUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: null,
        error: null
      }
    case ActionType.SIGN_IN_ERROR:
    case ActionType.SIGN_UP_ERROR:
    case ActionType.SIGN_OUT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    default:
      return state
  }
}

export default authReducer
