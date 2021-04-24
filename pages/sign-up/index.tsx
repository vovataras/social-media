import Head from 'next/head'
import SignUpView from '@views/auth/sign-up'
import AuthRoute from '@utils/auth-route'

const SignUpPage = () => (
  <AuthRoute>
    <Head>
      <title>{'Social Media Sign Up'}</title>
    </Head>
    <SignUpView />
  </AuthRoute>
)

export default SignUpPage
