import Head from 'next/head'
import HomeView from '@views/home'
import PrivateRoute from '@utils/private-route'

const HomePage = () => (
  <PrivateRoute>
    <Head>
      <title>{'Social Media'}</title>
    </Head>
    <HomeView />
  </PrivateRoute>
)

export default HomePage
