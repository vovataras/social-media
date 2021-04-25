import React from 'react'
import PostCard from '@common/post-card'
import { Post, User } from '@typings'

export interface PostProps {
  post: Post
  users: User[]
}

const PostWithComments: React.FC<PostProps> = ({ post, users }) => {
  const { uid, date, ...postData } = post

  const userData = users.find((user) => user.uid === uid)
  if (!userData) {
    return null
  }

  const formattedDate = new Date(date).toDateString()

  const { username, avatar } = userData

  return (
    <PostCard
      username={username}
      avatar={avatar}
      {...postData}
      date={formattedDate}
    />
  )
}

export default React.memo(PostWithComments)
