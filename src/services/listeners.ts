import { Post, User } from '@typings'
import {
  postsCollection,
  userPostsCollection,
  usersCollection
} from './database'

const subscribeUsers = (
  setUsers: (users: User[]) => void,
  setUsersError: (error: string) => void
) => {
  return usersCollection.ref.onSnapshot(
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
}

const subscribePosts = (
  setPosts: (posts: Post[]) => void,
  setPostsError: (error: string) => void
) => {
  return postsCollection.ref.orderBy('date', 'desc').onSnapshot(
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
}

const subscribeUserPosts = (
  user: firebase.default.User,
  setUserPosts: (posts: Post[]) => void,
  setUserPostsError: (error: string) => void
) => {
  return userPostsCollection
    .ref(user.uid)
    .orderBy('date', 'desc')
    .onSnapshot(
      (snapshot) => {
        if (!snapshot.empty) {
          const posts = snapshot.docs.map((doc) => doc.data() as Post)
          setUserPosts(posts)
        } else {
          setUserPostsError('No posts found')
        }
      },
      (error) => {
        setUserPostsError(error.message)
      }
    )
}

export { subscribeUsers, subscribePosts, subscribeUserPosts }
