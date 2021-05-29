import React from 'react'
import {
  Card,
  CardHeader,
  Avatar,
  Typography,
  Tooltip,
  IconButton,
  useTheme,
  useMediaQuery
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import MessageIcon from '@material-ui/icons/Telegram'

import styles from './styles.module.scss'

interface Props {
  username: string
  avatar?: string
  description?: string
  isOwner?: boolean
  handleSettingsClick?: () => void
  handleSendMessageButtonClick?: () => void
}

const ProfileCard: React.FC<Props> = ({
  username,
  avatar,
  description,
  isOwner,
  handleSettingsClick,
  handleSendMessageButtonClick
}) => {
  const theme = useTheme()
  const mobileXS = useMediaQuery('(max-width:400px)')
  const mobile = useMediaQuery(theme.breakpoints.up('sm'))

  return (
    <Card>
      <CardHeader
        className={styles.cardHeader}
        disableTypography
        avatar={
          <Avatar
            className={
              mobileXS
                ? styles.avatarXS
                : mobile
                ? styles.avatar
                : styles.avatarSM
            }
            aria-label={username.toLowerCase()}
            alt={username}
            src={avatar}
          >
            {username[0].toUpperCase()}
          </Avatar>
        }
        action={
          isOwner ? (
            <Tooltip title="Edit profile" aria-label="profile settings">
              <IconButton
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleSettingsClick}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Send message" aria-label="send message">
              <IconButton onClick={handleSendMessageButtonClick}>
                <MessageIcon />
              </IconButton>
            </Tooltip>
          )
        }
        title={
          <Typography
            className={styles.title}
            variant={mobileXS ? 'h6' : mobile ? 'h4' : 'h5'}
            component="h2"
          >
            {username}
          </Typography>
        }
        subheader={
          <Typography
            className={styles.subheader}
            variant="body2"
            color="textSecondary"
          >
            {description}
          </Typography>
        }
      />
    </Card>
  )
}

export default ProfileCard
