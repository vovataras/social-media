import { Action as ReduxAction } from 'redux'
import rootReducer from '@redux'

interface PersistState {
  _persist?: {
    version: number
    rehydrated: boolean
  }
}

export type ReduxState = ReturnType<typeof rootReducer> & PersistState
export type Action = ReduxAction

declare module 'react-redux' {
  interface DefaultRootState extends ReduxState {}
}

type AuthActionType = import('@redux/auth/types').default
type AuthAction = import('@redux/auth/types').Action

type PostsActionType = import('@redux/posts/types').default
type PostsAction = import('@redux/posts/types').Action

type UsersActionType = import('@redux/users/types').default
type UsersAction = import('@redux/users/types').Action

type ChatsActionType = import('@redux/chats/types').default
type ChatsAction = import('@redux/chats/types').Action

export type AnyActionType =
  | AuthActionType
  | PostsActionType
  | UsersActionType
  | ChatsActionType

export type AnyAction = AuthAction | PostsAction | UsersAction | ChatsAction

type CoreReduxAction<T = unknown> = import('redux').Action<T>

interface ReduxActionWithPayload<T = AnyActionType, P = undefined>
  extends CoreReduxAction<T> {
  payload: P
}

export type ReduxAction<T = AnyActionType, P = undefined> = P extends undefined
  ? CoreReduxAction<T>
  : ReduxActionWithPayload<T, P>

export type AppThunk<
  R = undefined,
  E = undefined
> = import('redux-thunk').ThunkAction<
  R extends undefined ? unknown | Promise<unknown> : R | Promise<R | undefined>,
  ReduxState,
  E,
  AnyAction
>
