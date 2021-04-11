import Head from 'next/head'
import SignInView from '@views/auth/sign-in'

const SignInPage = () => (
  <>
    <Head>
      <title>{'Social Media Sign In'}</title>
    </Head>
    <SignInView />
  </>
)

export default SignInPage
