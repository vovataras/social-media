import ResponsiveContainer from '@common/responsive-container'

import styles from './styles.module.scss'

interface Props {
  posts: JSX.Element[]
}

const View: React.FC<Props> = ({ posts }) => {
  return (
    <ResponsiveContainer maxWidth="sm">
      <div className={styles.feed}>{posts}</div>
    </ResponsiveContainer>
  )
}

export default View
