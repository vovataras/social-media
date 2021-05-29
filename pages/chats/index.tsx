import Head from 'next/head'
import ChatsView from '@views/chats'
import PrivateRoute from '@utils/private-route'

const ChatsPage: React.FC = () => {
  return (
    <PrivateRoute>
      <Head>
        <title>{'Social Media Chats'}</title>
      </Head>
      <ChatsView />
    </PrivateRoute>
  )
}

export default ChatsPage
