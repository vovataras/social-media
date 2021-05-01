import { Post } from '@typings'
import ActionType, { Action } from './types'

interface PostsState {
  isLoaded: boolean
  items: Post[]
  error: null | string
}

const initialState: PostsState = {
  isLoaded: false,
  items: [],
  error: null
}

const postsReducer = (state = initialState, action: Action): PostsState => {
  switch (action.type) {
    case ActionType.SET_POSTS:
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

export default postsReducer
