import ActionType, { Action } from './types'

export interface IState {
  isLoading: boolean
  user: firebase.default.User | null
  error: string | null
}

const initialState: IState = {
  isLoading: false,
  user: null,
  error: null
}

const authReducer = (state = initialState, action: Action): IState => {
  switch (action.type) {
    case ActionType.SIGN_IN_BEGIN:
    case ActionType.SIGN_OUT_BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null
      }
    case ActionType.SIGN_IN_SUCCESS:
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