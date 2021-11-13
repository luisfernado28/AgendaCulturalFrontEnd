/** @jsxRuntime classic */
/** @jsx  jsx */

import { useField } from 'formik'
import { Fragment } from 'react'
import { jsx, Label, Radio } from 'theme-ui'

interface RadioButtonProperties {
    id?: string
    label: string
    name: string
    value: string
    onChange?: (e:any) => void

}

const RadioButton = ({ label, ...props }: RadioButtonProperties): JSX.Element => {
    const [field] = useField(props)

    return (
        <Fragment>
            <Label>
                <Radio  {...field} {...props} /> {label}
            </Label>
        </Fragment>
    )
}

export default RadioButton
