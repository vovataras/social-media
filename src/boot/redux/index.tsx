import React from 'react'
import { Provider } from 'react-redux'
import { Store } from 'redux'
import { Persistor } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import configureStore from './configure'
import { setStore } from '@services/redux'
import Loader from '@components/loader'

interface Props {
  children?: React.ReactNode
}

interface State {
  store: Store
  persistor: Persistor
  isLoadingEnd: boolean
}

class ReduxBoot extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    const { store, persistor } = configureStore(() =>
      this.setState({ isLoadingEnd: false })
    )

    setStore(store)

    this.state = {
      store,
      persistor,
      isLoadingEnd: true
    }
  }

  render() {
    const { children } = this.props
    const { store, persistor } = this.state

    return (
      <PersistGate loading={<Loader />} persistor={persistor}>
        <Provider store={store}>{children}</Provider>
      </PersistGate>
    )
  }
}

export default ReduxBoot
