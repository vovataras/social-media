import React from 'react'
import { IconButton, Paper, TextField } from '@material-ui/core'
import { FormikHelpers, useFormik } from 'formik'
import SendIcon from '@material-ui/icons/Send'
import cn from 'classnames'
import * as Yup from 'yup'

import styles from '../styles.module.scss'

const MessageSchema = Yup.object().shape({
  message: Yup.string().max(300)
})

interface FormValues {
  message: string
}

const initialValues: FormValues = {
  message: ''
}

interface Props {
  className?: string
  elevation?: number
  inputMargin?: 'none' | 'dense' | 'normal'
  onSubmit: (messageText: string) => Promise<void>
}

const MessageForm: React.FC<Props> = ({
  className,
  elevation,
  inputMargin,
  onSubmit
}) => {
  const handleSubmit = (
    values: FormValues,
    helpers: FormikHelpers<FormValues>
  ) => {
    onSubmit(values.message)
    helpers.resetForm()
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: MessageSchema,
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
    <Paper className={cn(styles.inputBlock, className)} elevation={elevation}>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <TextField
          id="message"
          label="Message"
          variant="outlined"
          margin={inputMargin ? inputMargin : 'dense'}
          multiline
          fullWidth
          onBlur={handleBlur('message')}
          helperText={errors.message && touched.message ? errors.message : null}
          onChange={handleChange}
          value={values.message}
        />
        <IconButton type="submit" disabled={isSubmitting || !formik.dirty}>
          <SendIcon />
        </IconButton>
      </form>
    </Paper>
  )
}

export default MessageForm
