import React from 'react'
import { FormikHelpers, useFormik } from 'formik'
import { Button, TextField } from '@material-ui/core'
import styles from '../styles.module.scss'
import * as Yup from 'yup'

const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required')
})

export interface FormValues {
  email: string
  password: string
}

const initialValues: FormValues = {
  email: '',
  password: ''
}

interface Props {
  handleSubmit: (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => void
}

const SignInForm: React.FC<Props> = ({ handleSubmit }) => {
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: SignInSchema,
    onSubmit: handleSubmit
  })

  const {
    touched,
    errors,
    handleChange,
    values,
    handleBlur,
    isSubmitting
  } = formik

  return (
    <form onSubmit={formik.handleSubmit} className={styles.form}>
      <TextField
        id="email"
        label="Email"
        variant="outlined"
        autoComplete="email"
        required
        onBlur={handleBlur}
        error={!!(errors['email'] && touched['email'])}
        helperText={errors.email && touched.email ? errors.email : null}
        onChange={handleChange}
        value={values.email}
      />
      <TextField
        id="password"
        type="password"
        label="Password"
        autoComplete="current-password"
        required
        onBlur={handleBlur}
        error={!!(errors['password'] && touched['password'])}
        helperText={
          errors.password && touched.password ? errors.password : null
        }
        variant="outlined"
        onChange={handleChange}
        value={values.password}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={styles.submit}
        disabled={isSubmitting}
      >
        {'Sign in'}
      </Button>
    </form>
  )
}

export default SignInForm
