import { Post, ReduxAction } from '@typings'

enum ActionType {
  SET_POSTS = 'posts/SET_POSTS',
  SET_ERROR = 'posts/SET_ERROR',
  RESET_STATE = 'posts/RESET_STATE'
}

type SetPosts = ReduxAction<ActionType.SET_POSTS, Post[]>
type SetError = ReduxAction<ActionType.SET_ERROR, string>
type ResetState = ReduxAction<ActionType.RESET_STATE>

export type Action = SetPosts | SetError | ResetState

export default ActionType
