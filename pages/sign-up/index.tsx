import Head from 'next/head'
import SignUpView from '@views/auth/sign-up'

const SignUpPage = () => (
  <>
    <Head>
      <title>{'Social Media Sign Up'}</title>
    </Head>
    <SignUpView />
  </>
)

export default SignUpPage
