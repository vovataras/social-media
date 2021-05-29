import React from 'react'
import cn from 'classnames'
import { CircularProgress } from '@material-ui/core'

import styles from './styles.module.scss'

interface Props {
  small?: boolean
  isPagination?: boolean
}

const Loader = ({ small, isPagination }: Props) => (
  <div
    className={cn(styles.loader, {
      [styles.pagination]: isPagination,
      [styles.small]: small
    })}
  >
    <CircularProgress size={small ? '3rem' : '5rem'} />
  </div>
)

export default Loader
