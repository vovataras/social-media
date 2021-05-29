import Head from 'next/head'
import AddPostView from '@views/add-post'
import PrivateRoute from '@utils/private-route'

const AddPostPage = () => (
  <PrivateRoute>
    <Head>
      <title>{'Social Media Add Post'}</title>
    </Head>
    <AddPostView />
  </PrivateRoute>
)

export default AddPostPage
