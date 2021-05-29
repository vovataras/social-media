import Loader from '@components/loader'
import Router from 'next/router'
import { connect, ConnectedProps } from 'react-redux'
import { ReduxState } from '@typings'
import Routes from '@constants/routes'
import { isClient } from '@constants'

const mapStateToProps = (state: ReduxState) => ({
  user: state.auth.user,
  isRehydrated: state._persist?.rehydrated
})

const connector = connect(mapStateToProps)

interface Props extends ConnectedProps<typeof connector> {
  children: React.ReactNode
}

const AuthRoute = ({ children, user, isRehydrated }: Props) => {
  if (isClient && isRehydrated) {
    if (user) {
      Router.replace(Routes.home)

      return <Loader />
    }

    return <>{children}</>
  }

  return <>{children}</>
}

export default connector(AuthRoute)
