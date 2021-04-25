import { Post } from '@typings'
import ActionType, { Action } from './types'

export const setPosts = (posts: Post[]): Action => ({
  type: ActionType.SET_POSTS,
  posts
})

export const setPostsError = (error: string): Action => ({
  type: ActionType.SET_ERROR,
  error
})

export const resetPostsState = (): Action => ({
  type: ActionType.RESET_STATE
})
