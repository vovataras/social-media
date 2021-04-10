import Boot from '@boot'
import '@styles/globals.scss'

import { AppProps } from 'next/app'

function App({ Component, pageProps }: AppProps) {
  return (
    <Boot>
      <Component {...pageProps} />
    </Boot>
  )
}

export default App
