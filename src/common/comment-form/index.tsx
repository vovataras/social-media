import React from 'react'
import { IconButton, Paper, TextField } from '@material-ui/core'
import { FormikHelpers, useFormik } from 'formik'
import SendIcon from '@material-ui/icons/Send'
import cn from 'classnames'
import * as Yup from 'yup'

import styles from './styles.module.scss'

const CommentSchema = Yup.object().shape({
  comment: Yup.string().max(300)
})

interface FormValues {
  comment: string
}

const initialValues: FormValues = {
  comment: ''
}

interface Props {
  className?: string
  elevation?: number
  inputMargin?: 'none' | 'dense' | 'normal'
  onSubmit: (commentText: string) => void
}

const CommentForm: React.FC<Props> = ({
  className,
  elevation,
  inputMargin,
  onSubmit
}) => {
  const handleSubmit = (
    values: FormValues,
    helpers: FormikHelpers<FormValues>
  ) => {
    onSubmit(values.comment)
    helpers.resetForm()
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: CommentSchema,
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
          id="comment"
          label="Comment"
          variant="outlined"
          margin={inputMargin ? inputMargin : 'dense'}
          multiline
          fullWidth
          onBlur={handleBlur('comment')}
          helperText={errors.comment && touched.comment ? errors.comment : null}
          onChange={handleChange}
          value={values.comment}
        />
        <IconButton type="submit" disabled={isSubmitting || !formik.dirty}>
          <SendIcon />
        </IconButton>
      </form>
    </Paper>
  )
}

export default CommentForm
