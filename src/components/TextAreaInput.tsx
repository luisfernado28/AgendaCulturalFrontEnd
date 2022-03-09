import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import { useField } from 'formik'
import { Fragment } from 'react'

interface TextAreaInputProps {
  id?: string
  label: string
  lcolor?: string
  name: string
  onChange?: () => void
  onBlur?: () => void
  placeholder?: string
  type?: string
}

const TextAreaInput = ({
  label,
  ...props
}: TextAreaInputProps): JSX.Element => {
  const [field, meta] = useField(props)

  return (
    <Fragment>
      <Typography >
        {label}{' '}
      </Typography>
      <TextField {...field} {...props} />
      {meta.touched && meta.error ? (
        <div>{meta.error}</div>
      ) : null}
    </Fragment>
  )
}

export default TextAreaInput
