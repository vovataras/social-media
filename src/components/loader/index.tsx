import cn from 'classnames'

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
  />
)

export default Loader
