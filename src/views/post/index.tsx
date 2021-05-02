// TODO: refactor
import React, { useEffect, useMemo, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
// import InfoMessage from '../../components/InfoMessage'
import Preloader from '@components/loader'
import { commentsCollection, postsCollection } from '@services/database'
import {
  Comment as CommentType,
  CommentCreate,
  CommentWithUser,
  ReduxState
} from '@typings'

import View from './view'
import Layout from '@common/layout'
import { useRouter } from 'next/router'
import Routes from '@constants/routes'

const mapStateToProps = (state: ReduxState) => ({
  currentUID: state.auth.user?.uid,
  isUsersLoaded: state.users.isLoaded,
  usersError: state.users.error,
  users: state.users.items,
  isPostsLoaded: state.posts.isLoaded,
  postsError: state.posts.error,
  posts: state.posts.items
})

const connector = connect(mapStateToProps)

interface Props extends ConnectedProps<typeof connector> {
  postId: string
}

const PostView: React.FC<Props> = ({
  postId,
  currentUID,
  isUsersLoaded,
  usersError,
  users,
  isPostsLoaded,
  postsError,
  posts
}) => {
  const [comments, setComments] = useState<Array<CommentType>>([])

  const router = useRouter()

  const postData = posts.find((post) => post.id === postId)

  useEffect(() => {
    let unsubscribeComments: (() => void) | null = null

    if (postData) {
      unsubscribeComments = commentsCollection
        .getRef(postData.uid, postData.id)
        .orderBy('date')
        .onSnapshot((snapshot) => {
          if (!snapshot.empty) {
            const comments = snapshot.docs.map(
              (doc) => doc.data() as CommentType
            )
            setComments(comments)
          }
        })
    }

    return () => {
      if (unsubscribeComments) {
        unsubscribeComments()
      }
    }
  }, [postData])

  const getCommentsData = () => {
    const commentsData: Array<CommentWithUser> = []

    comments.forEach((comment) => {
      const userData = users.find((user) => user.uid === comment.authorUid)
      if (userData) {
        commentsData.push({
          ...comment,
          username: userData.username,
          avatar: userData.avatar
        })
      }
    })

    return commentsData
  }

  const commentsData = useMemo(getCommentsData, [comments, users])

  if (!isUsersLoaded && !isPostsLoaded) {
    return <Preloader />
  }
  if (!currentUID) {
    return null
  } else if (usersError) {
    return null
  } else if (postsError) {
    return null
  } else if (!postData) {
    return null
  }
  // } else if (usersError) {
  //   return <InfoMessage>{usersError}</InfoMessage>
  // } else if (postsError) {
  //   return <InfoMessage>{postsError}</InfoMessage>
  // } else if (!postData) {
  //   return <InfoMessage>No post data!</InfoMessage>
  // }

  const postAuthorData = users.find((user) => user.uid === postData.uid)
  if (!postAuthorData) {
    return null
    // return (
    //   <InfoMessage>Data of the author of the post was not found</InfoMessage>
    // )
  }

  const handleBackClick = () => {
    if (history.length > 2) {
      router.back()
    } else {
      router.push(Routes.home)
    }
  }

  const handleLikeClick = () => {
    postsCollection.toggleLike(postData.uid, postData.id, currentUID)
  }

  const handleCommentSubmit = (commentText: string) => {
    const comment: CommentCreate = {
      postUid: postData.uid,
      postId: postData.id,
      authorUid: currentUID,
      commentText,
      date: new Date().toJSON()
    }

    commentsCollection.create(comment)
  }

  return (
    <Layout>
      <View
        currentUID={currentUID}
        postData={postData}
        postAuthorData={postAuthorData}
        commentsData={commentsData}
        handleBackClick={handleBackClick}
        handleLikeClick={handleLikeClick}
        handleCommentSubmit={handleCommentSubmit}
      />
    </Layout>
  )
}

export default connector(PostView)
