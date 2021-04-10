import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import theme from '@styles/theme'

interface Props {
  children?: React.ReactNode
}

const MaterialUIBoot: React.FC<Props> = ({ children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </ThemeProvider>
)

export default MaterialUIBoot
