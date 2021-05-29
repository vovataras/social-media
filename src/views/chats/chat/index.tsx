import React from 'react'
import classNames from 'classnames'
import { Avatar, Card, CardHeader, Paper, Typography } from '@material-ui/core'
import MessageForm from './form'
import { ChatListItem } from '../list'
import { messagesCollection } from '@services/database'

import styles from '../styles.module.scss'

export interface ChatMessage {
  id: string
  position: 'left' | 'right'
  content: string
  date: Date
}

interface Props {
  currentUid: string
  chatId: string
  messages: ChatMessage[]
  error: string | null
  chatListItems: ChatListItem[]
}

const Chat = ({
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
      <Card className={styles.chatInfo} elevation={3}>
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
