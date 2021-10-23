/** @jsxRuntime classic */
/** @jsx  jsx */

import { useField } from 'formik'
import { Fragment } from 'react'
import { jsx, Label, Textarea } from 'theme-ui'


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
      <Label sx={{ color: `${props.lcolor}` }} htmlFor={props.id || props.name}>
        {label}{' '}
      </Label>
      <Textarea {...field} {...props} />
      
    </Fragment>
  )
}

export default TextAreaInput
