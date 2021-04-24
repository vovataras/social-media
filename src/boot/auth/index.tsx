import { verifyAuth } from '@redux/auth/actions'
import { firebaseAuth } from '@services/firebase'
import { useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'

const mapDispatchToProps = {
  verifyAuth
}

const connector = connect(null, mapDispatchToProps)

interface Props extends ConnectedProps<typeof connector> {}

interface Props {
  children?: React.ReactNode
}

const AuthBoot: React.FC<Props> = ({ children }) => {
  useEffect(() => {
    const listener = firebaseAuth.onAuthStateChanged((authUser) => {
      verifyAuth(authUser)
    })

    return () => {
      if (!!listener) {
        listener()
      }
    }
  }, [])

  return <>{children}</>
}

export default connector(AuthBoot)
