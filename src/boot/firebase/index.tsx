import { verifyAuth } from '@redux/auth/actions'
import { setPosts, setPostsError } from '@redux/posts/actions'
import { setUsers, setUsersError } from '@redux/users/actions'
import { setChats, setChatsError, resetChatsState } from '@redux/chats/actions'
import { firebaseAuth } from '@services/firebase'
import {
  subscribeChats,
  subscribePosts,
  subscribeUsers
} from '@services/listeners'
import { Chat, Post, ReduxState, User } from '@typings'
import { useEffect, useRef } from 'react'
import { connect, ConnectedProps } from 'react-redux'

const mapStateToProps = (state: ReduxState) => ({
  uid: state.auth.user?.uid
})

const mapDispatchToProps = {
  verifyAuth,
  setUsers,
  setUsersError,
  setPosts,
  setPostsError,
  setChats,
  setChatsError,
  resetChatsState
}

const connector = connect(mapStateToProps, mapDispatchToProps)

interface Props extends ConnectedProps<typeof connector> {
  children?: React.ReactNode
}

const FirebaseBoot: React.FC<Props> = ({
  uid,
  children,
  setUsers,
  setUsersError,
  setPosts,
  setPostsError,
  setChats,
  setChatsError,
  resetChatsState
}) => {
  const unsubscribeChats = useRef<(() => void) | null>(null)

  useEffect(() => {
    const unsubscribeAuth = firebaseAuth.onAuthStateChanged((user) => {
      verifyAuth(user)
      if (!user) {
        resetChatsState()
        unsubscribeChats.current?.()
      }
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

    if (uid) {
      unsubscribeChats.current = subscribeChats(
        (chats: Chat[]) => {
          setChats(chats)
        },
        (error: string) => {
          setChatsError(error)
        },
        uid
      )
    }

    return () => {
      unsubscribeAuth()
      unsubscribeUsers()
      unsubscribePosts()
      unsubscribeChats.current?.()
    }
  }, [uid])

  return <>{children}</>
}

export default connector(FirebaseBoot)
