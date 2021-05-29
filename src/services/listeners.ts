import { Chat, Message, Post, User } from '@typings'
import {
  chatsCollection,
  messagesCollection,
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

const subscribeChats = (
  setChats: (posts: Chat[]) => void,
  setChatsError: (error: string) => void,
  uid: string
) => {
  return chatsCollection.ref
    .where('members', 'array-contains', uid)
    .orderBy('date', 'desc')
    .onSnapshot(
      (snapshot) => {
        if (!snapshot.empty) {
          const chats = snapshot.docs.map((doc) => doc.data() as Chat)
          setChats(chats)
        } else {
          setChatsError('No chats found')
        }
      },
      (error) => {
        setChatsError(error.message)
      }
    )
}

const subscribeMessages = (
  chatId: string,
  setMessages: (messages: Message[]) => void,
  setMessagesError: (error: string | null) => void
) => {
  return messagesCollection
    .getRef(chatId)
    .orderBy('date', 'asc')
    .onSnapshot(
      (snapshot) => {
        if (!snapshot.empty) {
          const messages = snapshot.docs.map((doc) => doc.data() as Message)
          setMessages(messages)
          setMessagesError(null)
        } else {
          setMessagesError('No messages found')
        }
      },
      (error) => {
        console.log(error)
        setMessagesError(error.message)
      }
    )
}

export {
  subscribeUsers,
  subscribePosts,
  subscribeUserPosts,
  subscribeChats,
  subscribeMessages
}
