import { combineReducers } from 'redux'
import authReducer from './auth'
import postsReducer from './posts'
import usersReducer from './users'
import chatsReducer from './chats'

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
  users: usersReducer,
  chats: chatsReducer
})

export default rootReducer
