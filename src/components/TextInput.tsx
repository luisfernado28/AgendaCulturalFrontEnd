/** @jsxRuntime classic */
/** @jsx  jsx */

import { useField } from 'formik'
import { Fragment } from 'react'
import { Input, jsx, Label } from 'theme-ui'


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
      <Label sx={{ color: `${props.lcolor}` }} htmlFor={props.id || props.name}>
        {label}{' '}
      </Label>
      <Input {...field} {...props} />
      {meta.touched && meta.error ? (
        <div >{meta.error}</div>
      ) : null}
    </Fragment>
  )
}

export default TextInput
