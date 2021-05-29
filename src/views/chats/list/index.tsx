import React from 'react'
import classNames from 'classnames'
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar
} from '@material-ui/core'
import Link from 'next/link'
import Routes from '@constants/routes'

import styles from '../styles.module.scss'

export interface ChatListItem {
  id: string
  username: string
  avatar: string
  lastMessage: string
}

interface Props {
  isMobile?: boolean
  chatId?: string
  chats: ChatListItem[]
}

const ChatsList = ({ isMobile, chatId, chats }: Props) => {
  const renderChats = chats.length ? (
    chats.map((chat, i) => (
      <Link
        key={i}
        href={{
          pathname: Routes.chatsId,
          query: { id: chat.id }
        }}
      >
        <ListItem button selected={chat.id === chatId}>
          <ListItemAvatar>
            <Avatar
              aria-label={chat.username.toLowerCase()}
              alt={chat.username}
              src={chat.avatar}
            >
              {chat.username[0].toUpperCase()}
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={chat.username} secondary={chat.lastMessage} />
        </ListItem>
      </Link>
    ))
  ) : (
    <div className={styles.error}>{'There are not any chats!'}</div>
  )

  return (
    <Box
      borderRight={!isMobile ? 1 : undefined}
      className={classNames(styles.chatsListRoot, isMobile && styles.mobile)}
      borderColor="text.disabled"
    >
      <List>{renderChats}</List>
    </Box>
  )
}

export default ChatsList
