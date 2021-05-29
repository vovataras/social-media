import Head from 'next/head'
import ChatsView from '@views/chats'
import PrivateRoute from '@utils/private-route'
import { GetServerSideProps } from 'next'
import Error from 'next/error'

export interface ChatsPageProps {
  id: string | null
}

export const getServerSideProps: GetServerSideProps = async (context) => ({
  props: {
    id: context.query.id || null
  }
})

const ChatsPage: React.FC<ChatsPageProps> = ({ id }) => {
  if (!id) {
    return <Error statusCode={404} />
  }

  return (
    <PrivateRoute>
      <Head>
        <title>{'Social Media Chats'}</title>
      </Head>
      <ChatsView chatId={id} />
    </PrivateRoute>
  )
}

export default ChatsPage
