import action from '@redux/action'
import { AppThunk, Post } from '@typings'
import ActionType from './types'

const setPosts = (posts: Post[]): AppThunk => (dispatch) =>
  dispatch(action(ActionType.SET_POSTS, posts))

const setPostsError = (error: string): AppThunk => (dispatch) =>
  dispatch(action(ActionType.SET_ERROR, error))

const resetPostsState = (): AppThunk => (dispatch) =>
  dispatch(action(ActionType.RESET_STATE))

export { setPosts, setPostsError, resetPostsState }
