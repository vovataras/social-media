import { FormikHelpers, useFormik } from 'formik'
import { Button, TextField } from '@material-ui/core'
import styles from '../styles.module.scss'
import * as Yup from 'yup'

const SignUpSchema = Yup.object().shape({
  // username: Yup.string()
  //   .min(3, 'Too Short!')
  //   .max(15, 'Too Long!')
  //   .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Required')
})

export interface FormValues {
  // username: string
  email: string
  password: string
}

const initialValues: FormValues = {
  // username: '',
  email: '',
  password: ''
}

interface Props {
  handleSubmit: (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => void
}

const SignUpForm: React.FC<Props> = ({ handleSubmit }) => {
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: SignUpSchema,
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
      {/* <TextField
        name="username"
        label="Username"
        variant="outlined"
        autoComplete="username"
        required
        onBlur={handleBlur}
        error={!!(errors.username && touched.username)}
        helperText={
          errors.username && touched.username ? errors.username : null
        }
        onChange={handleChange}
        value={values.username}
      /> */}
      <TextField
        name="email"
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
        name="password"
        type="password"
        label="Password"
        autoComplete="new-password"
        required
        onBlur={handleBlur}
        error={!!(errors.password && touched.password)}
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
        {'Sign up'}
      </Button>
    </form>
  )
}

export default SignUpForm
