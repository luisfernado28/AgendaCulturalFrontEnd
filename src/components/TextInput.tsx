import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useField } from 'formik'
import { Fragment } from 'react'


interface TextInputProps {
  disabled?: boolean
  id?: string
  label: string
  lcolor?: string
  name: string
  onChange?: () => void
  onBlur?: () => void
  placeholder?: string
  type?: string
}

const TextInput = ({ label, ...props }: TextInputProps): JSX.Element => {
  const [field, meta] = useField(props)

  return (
    <Fragment>
      <Typography >
        {label}{' '}
      </Typography>
      <TextField  {...field} {...props} />
      {meta.touched && meta.error ? (
        <div >{meta.error}</div>
      ) : null}
    </Fragment>
  )
}

export default TextInput
