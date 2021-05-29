import Boot from '@boot'
import { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import '@styles/globals.scss'

function App({ Component, pageProps }: AppProps) {
  return (
    <Boot>
      <ToastContainer />
      <Component {...pageProps} />
    </Boot>
  )
}

export default App
