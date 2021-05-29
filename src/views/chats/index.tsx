import React, { useEffect, useMemo, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Paper, useMediaQuery } from '@material-ui/core'
import Layout from '@common/layout'
import Loader from '@components/loader'
import ResponsiveContainer from '@common/responsive-container'
import Chat, { ChatMessage } from './chat'
import ChatsList, { ChatListItem } from './list'
import { subscribeMessages } from '@services/listeners'
import { ReduxState } from '@typings/redux'
import { Message } from '@typings'

import styles from './styles.module.scss'

const mapStateToProps = (state: ReduxState) => ({
  currentUID: state.auth.user?.uid,
  isUsersLoaded: state.users.isLoaded,
  usersError: state.users.error,
  users: state.users.items,
  isChatsLoaded: state.chats.isLoaded,
  chatsError: state.chats.error,
  chats: state.chats.items
})

const connector = connect(mapStateToProps)

interface Props extends ConnectedProps<typeof connector> {
  chatId?: string
}

const Chats: React.FC<Props> = ({
  chatId,
  currentUID,
  // isUsersLoaded,
  // usersError,
  users,
  // isChatsLoaded,
  // chatsError,
  chats
}) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [messagesError, setMessagesError] = useState<string | null>(null)
  const [isMessagesLoaded, setIsMessagesLoaded] = useState(true)

  const isMobile = useMediaQuery('(max-width:768px)')

  if (!currentUID) return null

  useEffect(() => {
    if (chatId) {
      setIsMessagesLoaded(false)
    }
  }, [])

  useEffect(() => {
    if (chatId) {
      const unsubscribeMessages = subscribeMessages(
        chatId,
        (chats: Message[]) => {
          setMessages(chats)
          setIsMessagesLoaded(true)
        },
        (error: string | null) => {
          setMessagesError(error)
          setIsMessagesLoaded(true)
        }
      )

      return () => {
        unsubscribeMessages()
      }
    }
  }, [chatId])

  const getChatListItems = (): ChatListItem[] =>
    chats.map((chat, _) => {
      const { id, members, lastMessage } = chat
      const userId = members.find((member) => member !== currentUID)
      const userData = users.find((user) => user.uid === userId)

      return {
        id,
        lastMessage: lastMessage || '',
        avatar: userData?.avatar || '',
        username: userData?.username || ''
      }
    })

  const chatListItems = useMemo(getChatListItems, [chats, users])

  const getChatMessages = (): ChatMessage[] =>
    messages.map((message, _) => {
      const { id, authorUid, content, date } = message

      return {
        id,
        content,
        position: currentUID !== authorUid ? 'left' : 'right',
        date: new Date(date)
      }
    })

  const chatMessages = useMemo(getChatMessages, [messages, users])

  const chatRoot = (
    <div className={styles.chatRoot}>
      {!chatId ? (
        <div className={styles.errorMessage}>{'Select any chat'}</div>
      ) : !isMessagesLoaded ? (
        <div className={styles.errorMessage}>
          <Loader small />
        </div>
      ) : (
        <Chat
          isMobile={isMobile}
          currentUid={currentUID}
          chatId={chatId}
          messages={chatMessages}
          error={messagesError}
          chatListItems={chatListItems}
        />
      )}
    </div>
  )

  const mobileView = (
    <>
      {!chatId ? (
        <ChatsList isMobile={isMobile} chatId={chatId} chats={chatListItems} />
      ) : (
        chatRoot
      )}
    </>
  )

  return (
    <Layout>
      <ResponsiveContainer maxWidth="md">
        <Paper>
          <div className={styles.chatsRoot}>
            {isMobile ? (
              mobileView
            ) : (
              <>
                <ChatsList chatId={chatId} chats={chatListItems} />
                {chatRoot}
              </>
            )}
          </div>
        </Paper>
      </ResponsiveContainer>
    </Layout>
  )
}

export default connector(Chats)
