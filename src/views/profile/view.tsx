import React from 'react'
import Layout from '@common/layout'
import ResponsiveContainer from '@common/responsive-container'
import ProfileCard from '@common/profile-card'

import styles from './styles.module.scss'

interface Props {
  username?: string
  avatar?: string
  description?: string
  content: JSX.Element | JSX.Element[] | null
  isOwner?: boolean
  handleSettingsClick?: () => void
  handleSendMessageButtonClick?: () => void
}

const ProfileView: React.FC<Props> = ({
  username,
  avatar,
  description,
  content,
  isOwner,
  handleSettingsClick,
  handleSendMessageButtonClick
}) => {
  return (
    <Layout>
      <ResponsiveContainer maxWidth="sm">
        <div className={styles.profile}>
          <ProfileCard
            username={username ? username : 'NULL'}
            avatar={avatar}
            description={description}
            isOwner={isOwner}
            handleSettingsClick={handleSettingsClick}
            handleSendMessageButtonClick={handleSendMessageButtonClick}
          />
          {content}
        </div>
      </ResponsiveContainer>
    </Layout>
  )
}

export default ProfileView
