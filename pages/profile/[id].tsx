import Head from 'next/head'
import ProfileView from '@views/profile'
import PrivateRoute from '@utils/private-route'
import { GetServerSideProps } from 'next'
import Error from 'next/error'

export interface ProfilePageProps {
  id: string | null
}

export const getServerSideProps: GetServerSideProps = async (context) => ({
  props: {
    id: context.query.id || null
  }
})

const ProfilePage: React.FC<ProfilePageProps> = ({ id }) => {
  if (!id) {
    return <Error statusCode={404} />
  }

  return (
    <PrivateRoute>
      <Head>
        <title>{'Social Media Profile'}</title>s
      </Head>
      <ProfileView profileId={id} />
    </PrivateRoute>
  )
}

export default ProfilePage
