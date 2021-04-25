import { Container } from '@material-ui/core'

import styles from './styles.module.scss'

interface Props {
  isMobile: boolean
  posts: JSX.Element[]
}

const View: React.FC<Props> = ({ isMobile, posts }) => {
  return (
    <Container maxWidth="sm" disableGutters={isMobile}>
      <div className={styles.feed}>{posts}</div>
    </Container>
  )
}

export default View
