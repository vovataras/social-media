import React from 'react'
import Layout from '@common/layout'
// import ProfileCard from '@common/profile-card'

import styles from './styles.module.scss'
import { Container } from '@material-ui/core'
import ProfileCard from '@common/profile-card'

interface Props {
  username?: string
  avatar?: string
  description?: string
  content: JSX.Element | JSX.Element[] | null
  showSettings?: boolean
  handleSettingsClick?: () => void
}

const ProfileView: React.FC<Props> = ({
  username,
  avatar,
  description,
  content,
  showSettings,
  handleSettingsClick
}) => {
  return (
    <Layout>
      <Container maxWidth="sm">
        <div className={styles.profile}>
          <ProfileCard
            username={username ? username : 'NULL'}
            avatar={avatar}
            description={description}
            showSettings={showSettings}
            handleSettingsClick={handleSettingsClick}
          />
          {content}
        </div>
      </Container>
    </Layout>
  )
}

export default ProfileView
