import React from 'react'
import PostCard from '@common/post-card'
import { CommentCreate, Post as PostType, User } from '@typings'
import { commentsCollection, postsCollection } from '@services/database'
import Comment from '@common/comment'
import CommentForm from '@common/comment-form'

export interface PostProps {
  post: PostType
  users: User[]
  currentUID: string
}

const Post: React.FC<PostProps> = ({ post, users, currentUID }) => {
  const { uid, date, ...postData } = post

  const userData = users.find((user) => user.uid === uid)
  if (!userData) {
    return null
  }

  const formattedDate = new Date(date).toDateString()

  const { username, avatar } = userData

  let mappedComments: Array<JSX.Element | null> | JSX.Element | null = null

  const handleLikeClick = () => {
    postsCollection.toggleLike(uid, postData.id, currentUID)
  }

  const handleCommentSubmit = (commentText: string) => {
    const comment: CommentCreate = {
      postUid: post.uid,
      postId: post.id,
      authorUid: currentUID,
      commentText,
      date: new Date().toJSON()
    }

    commentsCollection.create(comment)
  }

  if (post.comments) {
    mappedComments = post.comments.map((comment) => {
      const authorData = users.find((user) => user.uid === comment.authorUid)

      if (authorData) {
        return (
          <Comment
            key={comment.id}
            username={authorData.username}
            avatar={authorData.avatar}
            comment={comment.commentText}
          />
        )
      } else {
        return null
      }
    })
  }

  return (
    <div>
      <PostCard
        currentUID={currentUID}
        postId={postData.id}
        username={username}
        avatar={avatar}
        {...postData}
        date={formattedDate}
        onLikeClick={handleLikeClick}
      />
      {mappedComments}
      <CommentForm onSubmit={handleCommentSubmit} />
    </div>
  )
}

export default React.memo(Post)
