import ReduxBoot from './redux'
import MaterialUIBoot from './theme'
import FirebaseBoot from './firebase'

interface Props {
  children?: React.ReactNode
}

const Boot: React.FC<Props> = ({ children }) => (
  <ReduxBoot>
    <MaterialUIBoot>
      <FirebaseBoot>{children}</FirebaseBoot>
    </MaterialUIBoot>
  </ReduxBoot>
)

export default Boot
