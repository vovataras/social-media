import Head from 'next/head'
import ProfileView from '@views/profile'
import PrivateRoute from '@utils/private-route'

const ProfilePage: React.FC = () => {
  return (
    <PrivateRoute>
      <Head>
        <title>{'Social Media Profile'}</title>s
      </Head>
      <ProfileView />
    </PrivateRoute>
  )
}

export default ProfilePage
