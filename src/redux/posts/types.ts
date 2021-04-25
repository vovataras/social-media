import { Post } from '@typings'

enum ActionType {
  SET_POSTS = 'posts/SET_POSTS',
  SET_ERROR = 'posts/SET_ERROR',
  RESET_STATE = 'posts/RESET_STATE'
}

type SetPosts = {
  type: typeof ActionType.SET_POSTS
  posts: Post[]
}

type SetError = {
  type: typeof ActionType.SET_ERROR
  error: string
}

type ResetState = {
  type: typeof ActionType.RESET_STATE
}

export type Action = SetPosts | SetError | ResetState

export default ActionType
