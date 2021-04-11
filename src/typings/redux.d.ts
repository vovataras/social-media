import { Action as ReduxAction } from 'redux'
import rootReducer from '@redux'

export type ReduxState = ReturnType<typeof rootReducer>
export type Action = ReduxAction

declare module 'react-redux' {
  interface DefaultRootState extends ReduxState {}
}

type AuthActionType = import('@redux/auth/types').default
type AuthAction = import('@redux/auth/types').Action

export type AnyActionType = AuthActionType

export type AnyAction = AuthAction

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
