import React from 'react'
import Header from '@common/header'

import styles from './styles.module.scss'

interface Props {
  children?: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.content}>
        <>{children}</>
      </div>
    </div>
  )
}

export default Layout
