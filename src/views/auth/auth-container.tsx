import { Container, Paper, Typography } from '@material-ui/core'
import Link from 'next/link'

import styles from './styles.module.scss'

interface Props {
  children: React.ReactNode
  linkTo: string
  linkMessage: string
}

const AuthContainer: React.FC<Props> = ({ children, linkTo, linkMessage }) => {
  return (
    <div className={styles.authPage}>
      <Container maxWidth="xs">
        <Paper className={styles.paper} elevation={3}>
          <Typography component="h1" variant="h5" className={styles.title}>
            {'Social Media'}
          </Typography>
          {children}
          <Link href={linkTo}>
            <a className={styles.link}>{linkMessage}</a>
          </Link>
        </Paper>
      </Container>
    </div>
  )
}

export default AuthContainer
