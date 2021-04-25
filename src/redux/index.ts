import { combineReducers } from 'redux'
import authReducer from './auth'
import postsReducer from './posts'
import usersReducer from './users'

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
  users: usersReducer
})

export default rootReducer
