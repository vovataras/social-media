import { Action as ReduxAction } from 'redux'
import rootReducer from '@redux'

export type ReduxState = ReturnType<typeof rootReducer>
export type Action = ReduxAction

declare module 'react-redux' {
  interface DefaultRootState extends ReduxState {}
}
