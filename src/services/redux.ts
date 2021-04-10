import { Store } from 'redux'
import { Action, ReduxState } from '@typings'

let _store: Store<ReduxState, Action>

export const setStore = (store: Store) => (_store = store)
export const getState = () => (_store && _store.getState()) || {}
export const dispatch = (action: Action) =>
  (_store && _store.dispatch(action)) || {}

export default {
  setStore,
  getState,
  dispatch
}
