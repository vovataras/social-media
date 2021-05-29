import { createMuiTheme } from '@material-ui/core/styles'

const primaryColor = {
  primary: {
    dark: '#1769aa',
    main: '#2196f3',
    light: '#4dabf5'
  }
}

const lightTheme = createMuiTheme({
  palette: {
    type: 'light',
    ...primaryColor
  }
})

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    ...primaryColor
  }
})

export { lightTheme, darkTheme }
export default lightTheme
