import React from 'react'
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography
} from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ModeCommentIcon from '@material-ui/icons/ModeComment'
import Link from 'next/link'
import cn from 'classnames'
import { Likes } from '@typings'

import styles from './styles.module.scss'

export interface Props {
  currentUID?: string
  profileLink?: string
  username: string
  avatar?: string
  image: string
  imageAlt?: string
  description?: string | null
  date?: string
  likesCount?: number
  likes?: Likes
  postPreview?: boolean
  onLikeClick?: () => void
}

const PostCard: React.FC<Props> = ({
  currentUID,
  profileLink,
  username,
  avatar,
  image,
  imageAlt,
  description,
  date,
  likesCount,
  likes,
  postPreview,
  onLikeClick
}) => {
  const Header = (
    <CardHeader
      avatar={
        <Avatar aria-label={username.toLowerCase()} alt={username} src={avatar}>
          {username && username[0].toUpperCase()}
        </Avatar>
      }
      title={username}
      subheader={date}
    />
  )

  return (
    <Card>
      {profileLink ? (
        <Link href={profileLink}>
          <a>{Header}</a>
        </Link>
      ) : (
        Header
      )}
      <CardMedia className={styles.media} image={image} title={imageAlt} />
      {description && (
        <CardContent classes={{ root: styles.content }}>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      )}
      <CardActions>
        <IconButton aria-label="like" onClick={onLikeClick}>
          <FavoriteIcon
            className={cn(
              likes && currentUID && likes[currentUID] && styles.liked
            )}
          />
        </IconButton>
        {likesCount}
        {postPreview && '∞'}
        <IconButton aria-label="comment">
          <ModeCommentIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default PostCard
