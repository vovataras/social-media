import Routes from '@constants/routes'
import { signUp } from '@redux/auth/actions'
import { FormikHelpers } from 'formik'
import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import AuthContainer from '../auth-container'
import SignUpForm, { FormValues } from './form'

const mapDispatchToProps = {
  signUp
}

const connector = connect(null, mapDispatchToProps)

interface Props extends ConnectedProps<typeof connector> {}

const SignUpView: React.FC<Props> = ({ signUp }) => {
  const handleSubmit = async (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => {
    await signUp(values.username, values.email, values.password, () => {
      formikHelpers.resetForm()
    })
  }

  return (
    <AuthContainer
      linkTo={Routes.signIn}
      linkMessage="Already have an account? Sign in"
    >
      <SignUpForm handleSubmit={handleSubmit} />
    </AuthContainer>
  )
}

export default connector(SignUpView)
