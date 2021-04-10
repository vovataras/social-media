import ReduxBoot from './redux'
import MaterialUIBoot from './theme'

interface Props {
  children?: React.ReactNode
}

const Boot: React.FC<Props> = ({ children }) => (
  <ReduxBoot>
    <MaterialUIBoot>{children}</MaterialUIBoot>
  </ReduxBoot>
)

export default Boot
