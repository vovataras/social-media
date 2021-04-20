import { Middleware, Store, applyMiddleware, compose, createStore } from 'redux'
import {
  PersistConfig,
  Persistor,
  persistReducer,
  persistStore
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import logger from 'redux-logger'
import reducer from '@redux'
import { ReduxState, Action, AnyAction } from '@typings'
import { isClient, isDev, isServer } from '@constants'
import thunk from 'redux-thunk'

const persistConfig: PersistConfig<ReduxState> = {
  key: 'root',
  storage
}

export interface IConfigureStore {
  store: Store<ReduxState, Action>
  persistor: Persistor
}

const ConfigureStore = (onCompletion?: () => void): IConfigureStore => {
  let middleware: Middleware[] = []

  if (isClient) {
    middleware.push(thunk)

    if (isDev) {
      middleware.push(logger)
    }
  }

  const composeEnhancers = compose(applyMiddleware(...middleware))
  const persistedReducer = persistReducer(persistConfig, reducer)

  let store: Store<ReduxState, AnyAction>

  if (isServer) {
    store = createStore(reducer)
  } else {
    store = createStore(persistedReducer, composeEnhancers)
  }

  const persistor = persistStore(store, undefined, onCompletion)

  return {
    store,
    persistor
  }
}

export default ConfigureStore
