import React, { useState } from 'react'
import { IconButton, Menu, MenuItem, Tooltip } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'

interface Props {
  onPostDelete?: () => void
}

const PostSettings: React.FC<Props> = ({ onPostDelete }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Tooltip title="Settings" aria-label="post settings">
        <IconButton
          aria-label="settings"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={onPostDelete}>{'Delete'}</MenuItem>
      </Menu>
    </div>
  )
}

export default PostSettings
