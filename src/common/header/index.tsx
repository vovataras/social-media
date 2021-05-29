import React from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Tooltip,
  IconButton
} from '@material-ui/core'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto'
import Routes from '@constants/routes'
import { signOut } from '@redux/auth/actions'
import { connect, ConnectedProps } from 'react-redux'
import Link from 'next/link'
import ProfileMenu from './profile-menu'
import ChatsIcon from '@material-ui/icons/Telegram'

import styles from './styles.module.scss'

const mapDispatchToProps = {
  signOut
}

const connector = connect(null, mapDispatchToProps)

interface Props extends ConnectedProps<typeof connector> {}

const Header: React.FC<Props> = ({ signOut }) => {
  return (
    <AppBar position="fixed" color="inherit">
      <Container maxWidth="md" className={styles.container}>
        <Toolbar disableGutters>
          <Typography variant="h6" className={styles.title}>
            <Link href={Routes.home}>
              <a>{'Social Media'}</a>
            </Link>
          </Typography>
          <Tooltip title="Add new post" aria-label="add new post">
            <IconButton color="inherit">
              <Link href={Routes.addPost}>
                <AddAPhotoIcon />
              </Link>
            </IconButton>
          </Tooltip>
          <Tooltip title="Chats" aria-label="chats">
            <IconButton color="inherit">
              <Link href={Routes.chats}>
                <ChatsIcon />
              </Link>
            </IconButton>
          </Tooltip>
          <ProfileMenu onSignOut={signOut} />
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default connector(Header)
