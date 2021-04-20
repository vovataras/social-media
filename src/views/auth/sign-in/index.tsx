import Routes from '@constants/routes'
import { signIn } from '@redux/auth/actions'
import AuthContainer from '../auth-container'
import SignInForm, { FormValues } from './form'
import { FormikHelpers } from 'formik'
import { connect, ConnectedProps } from 'react-redux'

const mapDispatchToProps = {
  signIn
}

const connector = connect(null, mapDispatchToProps)

interface Props extends ConnectedProps<typeof connector> {}

const SignInView: React.FC<Props> = ({ signIn }) => {
  const handleSubmit = async (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => {
    formikHelpers.setSubmitting(true)

    signIn(
      values.email,
      values.password,
      () => {
        formikHelpers.setSubmitting(false)
        formikHelpers.resetForm()
      },
      () => {
        formikHelpers.setSubmitting(false)
      }
    )
  }

  return (
    <AuthContainer
      linkTo={Routes.signUp}
      linkMessage="Don't have an account? Sign Up"
    >
      <SignInForm handleSubmit={handleSubmit} />
    </AuthContainer>
  )
}

export default connector(SignInView)
