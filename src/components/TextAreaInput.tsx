/*
 * File: TextAreaInput.tsx
 * Project: Agenda Cultural Front End React
 * Author: Luis Fernando Choque (luisfernandochoquea@gmail.com)
 * -----
 * Copyright 2021 - 2022 Universidad Privada Boliviana La Paz, Luis Fernando Choque Arana
 */
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
