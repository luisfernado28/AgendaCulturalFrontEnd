/** @jsxRuntime classic */
/** @jsx  jsx */

import { useField } from 'formik'
import { Fragment } from 'react'
import { jsx, Label, Radio } from 'theme-ui'
import { EventTypeStatus } from '../redux/types'

interface RadioButtonProperties {
    id?: string
    label: string
    defaultChecked?: boolean
    name: string
    value: string | EventTypeStatus | number
    onChange?: (e: any) => void

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
