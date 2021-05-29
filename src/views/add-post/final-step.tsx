import React from 'react'
import Preloader from '@components/loader'
import PostCard from '@common/post-card'

import styles from './styles.module.scss'

interface Props {
  username?: string
  avatar?: string
  image: string
  description?: string
  isHandlingShare: boolean
}

const FinalStep: React.FC<Props> = ({
  username,
  avatar,
  isHandlingShare,
  ...props
}) => {
  return (
    <div className={styles.finalStep}>
      {isHandlingShare ? (
        <Preloader />
      ) : (
        <PostCard
          {...props}
          username={username ? username : 'NULL'}
          avatar={avatar}
          postPreview
        />
      )}
    </div>
  )
}

export default FinalStep
