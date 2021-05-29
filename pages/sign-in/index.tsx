import Head from 'next/head'
import SignInView from '@views/auth/sign-in'
import AuthRoute from '@utils/auth-route'

const SignInPage = () => (
  <AuthRoute>
    <Head>
      <title>{'Social Media Sign In'}</title>
    </Head>
    <SignInView />
  </AuthRoute>
)

export default SignInPage
