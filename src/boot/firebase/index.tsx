import { verifyAuth } from '@redux/auth/actions'
import { setPosts, setPostsError } from '@redux/posts/actions'
import { setUsers, setUsersError } from '@redux/users/actions'
import { postsCollection, usersCollection } from '@services/database'
import { firebaseAuth } from '@services/firebase'
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

    const unsubscribeUsers = usersCollection.ref.onSnapshot(
      (snapshot) => {
        if (!snapshot.empty) {
          const users = snapshot.docs.map((doc) => doc.data() as User)
          setUsers(users)
        } else {
          setUsersError('No users found')
        }
      },
      (error) => {
        setUsersError(error.message)
      }
    )

    const unsubscribePosts = postsCollection.ref.onSnapshot(
      (snapshot) => {
        if (!snapshot.empty) {
          const posts = snapshot.docs.map((doc) => doc.data() as Post)
          setPosts(posts)
        } else {
          setPostsError('No posts found')
        }
      },
      (error) => {
        setPostsError(error.message)
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
