import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { darkTheme, lightTheme } from '@styles/theme'
import useDarkMode from 'use-dark-mode'

interface Props {
  children?: React.ReactNode
}

const MaterialUIBoot: React.FC<Props> = ({ children }) => {
  const { value: isDark } = useDarkMode(true)

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

export default MaterialUIBoot
