import { verifyAuth } from '@redux/auth/actions'
import { setPosts, setPostsError } from '@redux/posts/actions'
import { setUsers, setUsersError } from '@redux/users/actions'
import { firebaseAuth } from '@services/firebase'
import { subscribePosts, subscribeUsers } from '@services/listeners'
import { Post, ReduxState, User } from '@typings'
import { useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'

const mapStateToProps = (state: ReduxState) => ({
  uid: state.auth.user?.uid
})

const mapDispatchToProps = {
  verifyAuth,
  setUsers,
  setUsersError,
  setPosts,
  setPostsError
}

const connector = connect(mapStateToProps, mapDispatchToProps)

interface Props extends ConnectedProps<typeof connector> {}

interface Props {
  children?: React.ReactNode
}

const FirebaseBoot: React.FC<Props> = ({
  children,
  setUsers,
  setUsersError,
  setPosts,
  setPostsError
}) => {
  useEffect(() => {
    const unsubscribeAuth = firebaseAuth.onAuthStateChanged((user) => {
      verifyAuth(user)
    })

    const unsubscribeUsers = subscribeUsers(
      (users: User[]) => {
        setUsers(users)
      },
      (error: string) => {
        setUsersError(error)
      }
    )

    const unsubscribePosts = subscribePosts(
      (posts: Post[]) => {
        setPosts(posts)
      },
      (error: string) => {
        setPostsError(error)
      }
    )

    return () => {
      unsubscribeAuth()
      unsubscribeUsers()
      unsubscribePosts()
    }
  }, [])

  return <>{children}</>
}

export default connector(FirebaseBoot)
