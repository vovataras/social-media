import { firestore } from './firebase'
import {
  Comment,
  CommentCreate,
  Post,
  PostCreate,
  User,
  Chat,
  MessageCreate
} from '@typings'

const usersCollectionRef = firestore.collection('users')
const postsCollectionRef = firestore.collectionGroup('posts')
const commentsCollectionRef = firestore.collectionGroup('comments')
const chatsCollectionRef = firestore.collection('chats')

const usersCollection = {
  create: (user: User) => {
    return usersCollectionRef.doc(user.uid).set(user)
  },
  update: (uid: string, user: Partial<User>) => {
    return usersCollectionRef.doc(uid).update(user)
  },
  ref: usersCollectionRef
}

const postsCollection = {
  ref: postsCollectionRef,
  toggleLike: (postUid: string, postId: string, uid: string) => {
    const postRef = usersCollectionRef
      .doc(postUid)
      .collection('posts')
      .doc(postId)

    firestore.runTransaction((transaction) => {
      return transaction.get(postRef).then((postDoc) => {
        if (postDoc.exists) {
          const post = postDoc.data() as Post

          if (post.likes && post.likes[uid]) {
            post.likesCount--
            post.likes[uid] = null
          } else {
            post.likesCount++
            if (!post.likes) {
              post.likes = {}
            }
            post.likes[uid] = true
          }

          transaction.update(postRef, {
            likes: post.likes,
            likesCount: post.likesCount
          })
        }
      })
    })
  }
}

const userPostsCollection = {
  create: (uid: string, post: PostCreate) => {
    const newCityRef = usersCollectionRef.doc(uid).collection('posts').doc()
    const newPost: Post = { ...post, id: newCityRef.id }

    return newCityRef.set(newPost)
  },
  ref: (uid: string) => usersCollectionRef.doc(uid).collection('posts'),
  delete: (postUid: string, postId: string) => {
    return usersCollectionRef
      .doc(postUid)
      .collection('posts')
      .doc(postId)
      .delete()
  }
}

const commentsCollection = {
  create: (comment: CommentCreate) => {
    const postRef = usersCollectionRef
      .doc(comment.postUid)
      .collection('posts')
      .doc(comment.postId)

    const newCommentRef = postRef.collection('comments').doc()

    newCommentRef.set({
      id: newCommentRef.id,
      ...comment
    })

    firestore.runTransaction((transaction) => {
      return transaction.get(postRef).then((postDoc) => {
        if (postDoc.exists) {
          const post = postDoc.data() as Post
          const newComments: Comment[] = []

          if (post.comments) {
            if (post.comments.length === 2) {
              newComments.push(post.comments[1])
            } else if (post.comments.length === 1) {
              newComments.push(post.comments[0])
            }
          }

          newComments.push({
            id: newCommentRef.id,
            ...comment
          })

          transaction.update(postRef, {
            comments: newComments
          })
        }
      })
    })
  },
  ref: commentsCollectionRef,
  getRef: (postUid: string, postId: string) =>
    usersCollection.ref
      .doc(postUid)
      .collection('posts')
      .doc(postId)
      .collection('comments')
}

const chatsCollection = {
  create: async (uid: string, anotherUid: string) => {
    const newChatRef = chatsCollectionRef.doc()
    await newChatRef.set({
      id: newChatRef.id,
      members: [uid, anotherUid],
      date: new Date().toJSON()
    })

    return newChatRef.id
  },
  ref: chatsCollectionRef
}

const messagesCollection = {
  create: (chatId: string, message: MessageCreate) => {
    const chatRef = chatsCollectionRef.doc(chatId)

    const newMessageRef = chatRef.collection('messages').doc()

    const date = new Date().toJSON()

    newMessageRef.set({
      id: newMessageRef.id,
      date: date,
      ...message
    })

    return firestore.runTransaction((transaction) => {
      return transaction.get(chatRef).then((chatDoc) => {
        if (chatDoc.exists) {
          const chat = chatDoc.data() as Chat

          chat.lastMessage = message.content
          chat.date = date

          transaction.update(chatRef, chat)
        }
      })
    })
  },
  getRef: (chatId: string) =>
    chatsCollectionRef.doc(chatId).collection('messages')
}

export {
  usersCollection,
  postsCollection,
  userPostsCollection,
  commentsCollection,
  chatsCollection,
  messagesCollection
}
