import React from 'react'
import PostCard from '@common/post-card'
import { Post as PostType, User } from '@typings'
import { postsCollection } from '@services/database'

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

  const handleLikeClick = () => {
    postsCollection.toggleLike(uid, postData.id, currentUID)
  }

  return (
    <PostCard
      currentUID={currentUID}
      username={username}
      avatar={avatar}
      {...postData}
      date={formattedDate}
      onLikeClick={handleLikeClick}
    />
  )
}

export default React.memo(Post)
