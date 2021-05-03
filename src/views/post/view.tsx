import React from 'react'
import { Button, Container } from '@material-ui/core'
import Comment from '@common/comment'
import CommentForm from '@common/comment-form'
import PostCard from '@common/post-card'
import { CommentWithUser, Post, User } from '@typings'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import Routes from '@constants/routes'

import styles from './styles.module.scss'

interface Props {
  currentUID: string
  postData: Post
  postAuthorData: User
  commentsData: Array<CommentWithUser>
  handleBackClick: () => void
  handleLikeClick: () => void
  handleCommentSubmit: (commentText: string) => void
}

const PostView: React.FC<Props> = ({
  currentUID,
  postData,
  postAuthorData,
  commentsData,
  handleBackClick,
  handleLikeClick,
  handleCommentSubmit
}) => {
  const { image, date, description, likes, likesCount } = postData
  const { username, avatar } = postAuthorData

  const profileLink = Routes.profileId.replace('[id]', postAuthorData.uid)

  const renderItems = commentsData.map((item, index) => (
    <Comment
      key={index}
      username={item.username}
      avatar={item.avatar}
      comment={item.commentText}
    />
  ))

  return (
    <div className={styles.root}>
      <Container maxWidth="sm">
        <Button
          classes={{
            root: styles.back
          }}
          // className={styles.back}
          onClick={handleBackClick}
        >
          <ArrowBackIosIcon />
          {'Back'}
        </Button>

        <PostCard
          profileLink={profileLink}
          currentUID={currentUID}
          username={username}
          avatar={avatar}
          image={image}
          date={new Date(date).toDateString()}
          description={description}
          likes={likes}
          likesCount={likesCount}
          onLikeClick={handleLikeClick}
        />
        {renderItems}
        <CommentForm elevation={5} onSubmit={handleCommentSubmit} />
      </Container>
    </div>
  )
}

export default PostView
