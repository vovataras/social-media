import React, { useState } from 'react'
import Link from 'next/link'
import { Menu, MenuItem, Divider, IconButton, Tooltip } from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import Routes from '@constants/routes'

import styles from './styles.module.scss'

interface Props {
  onSignOut: () => void
}

const ProfileMenu: React.FC<Props> = ({ onSignOut }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Tooltip title="Profile" aria-label="profile">
        <IconButton
          color="inherit"
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <AccountCircleIcon />
        </IconButton>
      </Tooltip>
      <Menu
        className={styles.menu}
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link href={Routes.profile}>
          <MenuItem>{'Profile'}</MenuItem>
        </Link>
        <Divider />
        <MenuItem onClick={onSignOut}>{'Exit'}</MenuItem>
      </Menu>
    </div>
  )
}

export default ProfileMenu
