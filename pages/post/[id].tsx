import Head from 'next/head'
import PostView from '@views/post'
import PrivateRoute from '@utils/private-route'
import { GetServerSideProps } from 'next'
import Error from 'next/error'

export interface PostPageProps {
  id: string | null
}

export const getServerSideProps: GetServerSideProps = async (context) => ({
  props: {
    id: context.query.id || null
  }
})

const PostPage: React.FC<PostPageProps> = ({ id }) => {
  if (!id) {
    return <Error statusCode={404} />
  }

  return (
    <PrivateRoute>
      <Head>
        <title>{'Social Media Post'}</title>s
      </Head>
      <PostView postId={id} />
    </PrivateRoute>
  )
}

export default PostPage
