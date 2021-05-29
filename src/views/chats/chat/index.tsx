import React from 'react'
import classNames from 'classnames'
import Link from 'next/link'
import {
  Avatar,
  Card,
  CardHeader,
  IconButton,
  Paper,
  Typography
} from '@material-ui/core'
import MessageForm from './form'
import { ChatListItem } from '../list'
import { messagesCollection } from '@services/database'
import Routes from '@constants/routes'
import ArrowBackIcon from '@material-ui/icons/ArrowBackIos'

import styles from '../styles.module.scss'

export interface ChatMessage {
  id: string
  position: 'left' | 'right'
  content: string
  date: Date
}

interface Props {
  isMobile?: boolean
  currentUid: string
  chatId: string
  messages: ChatMessage[]
  error: string | null
  chatListItems: ChatListItem[]
}

const Chat = ({
  isMobile,
  currentUid,
  chatId,
  messages,
  error,
  chatListItems
}: Props) => {
  const chatInfo = chatListItems.find((item) => item.id === chatId)

  const renderMessages = messages.map((message) => {
    return (
      <Paper
        key={message.id}
        className={classNames(styles.message, styles[message.position])}
      >
        <span>{message.content}</span>
        <span>{message.date.toLocaleString()}</span>
      </Paper>
    )
  })

  const handleSubmit = (message: string) =>
    messagesCollection.create(chatId, {
      authorUid: currentUid,
      content: message
    })

  return (
    <>
      <Paper className={styles.chatInfo} elevation={3}>
        {isMobile && (
          <IconButton color="inherit" className={styles.backLink}>
            <Link href={Routes.chats}>
              <ArrowBackIcon />
            </Link>
          </IconButton>
        )}
        <Card elevation={0}>
          <CardHeader
            className={styles.header}
            disableTypography
            avatar={
              <Avatar
                src={chatInfo?.avatar}
                aria-label={chatInfo?.username.toLowerCase()}
              >
                {chatInfo?.username[0].toUpperCase() || 'NULL'}
              </Avatar>
            }
            title={
              <Typography className={styles.title} variant="body2">
                {chatInfo?.username || 'NULL'}
              </Typography>
            }
          />
        </Card>
      </Paper>
      {error ? (
        <div className={styles.errorMessage}>{error}</div>
      ) : (
        <div className={styles.messagesBoxWrapper}>
          <div className={styles.messagesBox}>{renderMessages}</div>
        </div>
      )}
      <MessageForm className={styles.inputBox} onSubmit={handleSubmit} />
    </>
  )
}

export default Chat
